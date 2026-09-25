#!/usr/bin/env bash
set -Eeuo pipefail
umask 077

APP_DIR="${APP_DIR:-/srv/apps/rich}"
RELEASE_DIR="$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")" && pwd -P)"
VERIFY_URL="${VERIFY_URL:-}"
AUTH_DIR=""
ROLLOUT_STARTED=0
PREVIOUS_RELEASE=""

fail() { echo "[deploy] $*" >&2; exit 1; }

[[ "${BUILD_SHA:-}" =~ ^[a-f0-9]{40}$ ]] || fail "BUILD_SHA must be a commit SHA"
[[ "${IMAGE_REF:-}" =~ ^ghcr\.io/[a-z0-9._/-]+(@sha256:[a-f0-9]{64}|:[a-zA-Z0-9_.-]+)$ ]] || fail "IMAGE_REF must be a GHCR image reference"
case "$RELEASE_DIR" in
  "$APP_DIR"/releases/*) ;;
  *) fail "Upload deployment assets beneath $APP_DIR/releases/" ;;
esac
[[ -z "$VERIFY_URL" || "$VERIFY_URL" == https://* ]] || fail "VERIFY_URL must use HTTPS"
[[ -s "$APP_DIR/app.env" ]] || fail "Missing $APP_DIR/app.env"
[[ -s "$APP_DIR/secrets/SMTP_PASSWORD" ]] || fail "Missing or empty secret file: SMTP_PASSWORD"

# Serialize manual and automated deployments; never cancel a rollout halfway.
exec 9>"$APP_DIR/.deploy.lock"
flock -n 9 || fail "Another Rich deployment is running"
if [[ -L "$APP_DIR/current" ]]; then
  PREVIOUS_RELEASE="$(readlink -f "$APP_DIR/current")"
  [[ -f "$PREVIOUS_RELEASE/release.env" ]] || fail "Current release metadata is missing"
  [[ "$PREVIOUS_RELEASE" != "$RELEASE_DIR" ]] || fail "Use a new release directory for each deployment"
fi

compose() {
  local release="$1"
  shift
  # The project directory anchors app.env and secrets to /srv/apps/rich.
  env -u IMAGE_REF -u APP_DOMAIN docker compose \
    --project-name rich --project-directory "$APP_DIR" \
    --env-file "$APP_DIR/app.env" --env-file "$release/release.env" \
    -f "$release/docker-compose.prod.yml" "$@"
}

cleanup() {
  local status=$?
  trap - EXIT
  if [[ "$status" -ne 0 && "$ROLLOUT_STARTED" -eq 1 ]]; then
    echo "[deploy] Release failed; restoring the previous container" >&2
    docker logs --tail 40 rich >&2 || true
    if [[ -n "$PREVIOUS_RELEASE" ]]; then
      ln -sfn "$PREVIOUS_RELEASE" "$APP_DIR/.current-next"
      mv -Tf "$APP_DIR/.current-next" "$APP_DIR/current"
      if compose "$PREVIOUS_RELEASE" up -d --wait --wait-timeout 180 app; then
        echo "[deploy] Previous release restored" >&2
      else
        echo "[deploy] ROLLBACK FAILED: inspect the rich container on the VPS" >&2
      fi
    else
      echo "[deploy] No previous release; stopping the failed first deployment" >&2
      compose "$RELEASE_DIR" stop app || true
      if [[ -L "$APP_DIR/current" && "$(readlink -f "$APP_DIR/current")" == "$RELEASE_DIR" ]]; then
        rm -- "$APP_DIR/current"
      fi
    fi
  fi
  if [[ -n "$AUTH_DIR" ]]; then rm -rf -- "$AUTH_DIR"; fi
  exit "$status"
}
trap cleanup EXIT
trap 'exit 130' INT
trap 'exit 143' TERM
trap 'exit 129' HUP

docker network inspect proxy >/dev/null
printf 'IMAGE_REF=%s\n' "$IMAGE_REF" > "$RELEASE_DIR/release.env"
compose "$RELEASE_DIR" config --quiet

# GitHub supplies its short-lived registry token through stdin. Remove the
# temporary login when deployment finishes; do not change other apps' logins.
if [[ -n "${GHCR_USERNAME:-}" ]]; then
  AUTH_DIR="$(mktemp -d /tmp/rich-ghcr.XXXXXX)"
  export DOCKER_CONFIG="$AUTH_DIR"
  docker login ghcr.io --username "$GHCR_USERNAME" --password-stdin
fi

docker pull "$IMAGE_REF"
image_sha="$(docker image inspect -f '{{ index .Config.Labels "org.opencontainers.image.revision" }}' "$IMAGE_REF")"
[[ "$image_sha" == "$BUILD_SHA" ]] || fail "Image revision does not match the requested commit"
expected_id="$(docker image inspect -f '{{.Id}}' "$IMAGE_REF")"

ROLLOUT_STARTED=1
compose "$RELEASE_DIR" up -d --wait --wait-timeout 180 app
actual_id="$(docker inspect -f '{{.Image}}' rich)"
[[ "$actual_id" == "$expected_id" ]] || fail "Running container uses a different image"
docker exec rich node scripts/verify-release.mjs http://127.0.0.1:3000 "$BUILD_SHA"

if [[ -n "$VERIFY_URL" ]]; then
  for attempt in $(seq 1 12); do
    if docker exec rich node scripts/verify-release.mjs "$VERIFY_URL" "$BUILD_SHA"; then
      break
    fi
    [[ "$attempt" -lt 12 ]] || fail "Public URL did not serve the requested release"
    sleep 5
  done
fi

if [[ -n "$PREVIOUS_RELEASE" ]]; then
  ln -sfn "$PREVIOUS_RELEASE" "$APP_DIR/previous"
fi
ln -sfn "$RELEASE_DIR" "$APP_DIR/.current-next"
mv -Tf "$APP_DIR/.current-next" "$APP_DIR/current"
ROLLOUT_STARTED=0
echo "[deploy] Rich release $BUILD_SHA is healthy"
