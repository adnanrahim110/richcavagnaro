#!/bin/sh
set -eu

if [ -n "${SMTP_PASSWORD_FILE:-}" ]; then
  if [ -n "${SMTP_PASSWORD:-}" ]; then
    echo "[env] Set either SMTP_PASSWORD or SMTP_PASSWORD_FILE, not both" >&2
    exit 1
  fi
  if [ ! -r "$SMTP_PASSWORD_FILE" ]; then
    echo "[env] Cannot read SMTP_PASSWORD_FILE" >&2
    exit 1
  fi
  SMTP_PASSWORD=$(cat "$SMTP_PASSWORD_FILE")
  export SMTP_PASSWORD
  unset SMTP_PASSWORD_FILE
fi

node scripts/check-env.mjs
exec "$@"
