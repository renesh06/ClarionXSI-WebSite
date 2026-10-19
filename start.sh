#!/usr/bin/env sh
set -eu
cd "$(dirname "$0")"
if ! command -v node >/dev/null 2>&1; then
  echo 'Please install Node.js 20 or later, or open dist/index.html directly.'
  exit 1
fi
node scripts/build.mjs
exec node scripts/serve.mjs
