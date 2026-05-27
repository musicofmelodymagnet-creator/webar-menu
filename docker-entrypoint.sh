#!/bin/sh
set -e

echo "==> Applying database migrations..."
# Prisma 5.22+ WASM schema parser reads env() from .env file, not process.env
printf 'DATABASE_URL=%s\n' "$DATABASE_URL" > /app/.env
node node_modules/prisma/build/index.js migrate deploy --schema=./prisma/schema.prisma

echo "==> Starting WebAR Menu on port $PORT..."
exec node server.js
