# Stage 1: Install dependencies
FROM node:22-alpine AS deps
RUN apk add --no-cache libc6-compat openssl
WORKDIR /app
COPY package*.json ./
RUN npm ci

# Stage 2: Build
FROM node:22-alpine AS builder
RUN apk add --no-cache openssl
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npx prisma generate
ENV NEXT_TELEMETRY_DISABLED=1
RUN npm run build

# Stage 3: Runtime (uses Next.js standalone output)
FROM node:22-alpine AS runner
RUN apk add --no-cache openssl
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=3006
ENV HOSTNAME=0.0.0.0

RUN addgroup -g 1001 -S nodejs && adduser -S nextjs -u 1001

# Standalone server + static assets
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static   ./.next/static
COPY --from=builder --chown=nextjs:nodejs /app/public         ./public

# Prisma CLI + client for migrations
COPY --from=builder /app/prisma                           ./prisma
COPY --from=builder /app/node_modules/.prisma             ./node_modules/.prisma
COPY --from=builder /app/node_modules/@prisma             ./node_modules/@prisma
COPY --from=builder /app/node_modules/prisma              ./node_modules/prisma

# Seed script runtime deps
COPY --from=builder /app/node_modules/bcryptjs            ./node_modules/bcryptjs
COPY --from=builder /app/node_modules/dotenv              ./node_modules/dotenv
COPY --from=builder /app/prisma/seed.js                   ./prisma/seed.js
COPY --from=builder /app/package.json                     ./package.json

# Persistent storage directories (mounted as volumes)
RUN mkdir -p /data public/uploads/models public/uploads/logos && \
    chown -R nextjs:nodejs /data public/uploads && \
    touch /app/.env && chown nextjs:nodejs /app/.env

COPY --chown=nextjs:nodejs docker-entrypoint.sh .
RUN chmod +x docker-entrypoint.sh

USER nextjs
EXPOSE 3006
ENTRYPOINT ["./docker-entrypoint.sh"]
