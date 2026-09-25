# syntax=docker/dockerfile:1
FROM node:24.16.0-alpine AS base
WORKDIR /app
ENV NEXT_TELEMETRY_DISABLED=1

FROM base AS dependencies
RUN npm install --global pnpm@11.13.1
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
RUN pnpm install --frozen-lockfile

FROM dependencies AS builder
COPY . .
ENV NEXT_PUBLIC_ENDPOINT_URL=/api/sendEmail
RUN pnpm test:mail && pnpm build

FROM base AS runner
ARG APP_BUILD_SHA=local
ARG APP_BUILD_TIMESTAMP=
ENV NODE_ENV=production \
    PORT=3000 \
    HOSTNAME=0.0.0.0 \
    APP_BUILD_SHA=$APP_BUILD_SHA \
    APP_BUILD_TIMESTAMP=$APP_BUILD_TIMESTAMP
LABEL org.opencontainers.image.title="rich" \
      org.opencontainers.image.revision=$APP_BUILD_SHA
RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nextjs
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
COPY --from=builder --chown=nextjs:nodejs /app/public ./public
COPY --chown=nextjs:nodejs --chmod=755 scripts/docker-entrypoint.sh ./scripts/docker-entrypoint.sh
COPY --chown=nextjs:nodejs scripts/check-env.mjs scripts/verify-release.mjs ./scripts/
COPY --chown=nextjs:nodejs libs/server/mail-config.mjs ./libs/server/mail-config.mjs
RUN mkdir -p .next/cache && chown nextjs:nodejs .next/cache
USER nextjs
EXPOSE 3000
HEALTHCHECK --interval=15s --timeout=10s --start-period=30s --retries=5 \
  CMD ["node", "scripts/verify-release.mjs"]
ENTRYPOINT ["./scripts/docker-entrypoint.sh"]
CMD ["node", "server.js"]
