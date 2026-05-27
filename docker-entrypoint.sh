#!/bin/sh
set -e

echo "==> Applying database migrations..."
node node_modules/prisma/build/index.js migrate deploy --schema=./prisma/schema.prisma

echo "==> Starting WebAR Menu on port $PORT..."
exec node server.js
