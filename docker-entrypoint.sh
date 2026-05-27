#!/bin/sh
set -e

echo "==> Applying database migrations..."
node_modules/.bin/prisma migrate deploy --schema=./prisma/schema.prisma

echo "==> Starting WebAR Menu on port $PORT..."
exec node server.js
