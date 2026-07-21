#!/usr/bin/env bash
# Build splash + y2jb_update.zip on WSL (Ubuntu)
set -euo pipefail

ROOT="/mnt/c/Development/git/ps5-y2jb-autoloader"
cd "$ROOT"

echo "=== Build splash.html (frontend/) ==="
if command -v bun >/dev/null 2>&1; then
  (cd frontend && bun install && bun run build)
else
  echo "ERROR: bun required for splash build" >&2
  exit 1
fi
cp -f frontend/dist/splash.html src/splash.html

# Ensure deps present (download if missing)
if ! ls src/elfldr-ps5-*.elf >/dev/null 2>&1 || ! ls src/kexp-*.bin >/dev/null 2>&1; then
  echo "=== Downloading binary deps ==="
  if [[ -x scripts/download_deps.sh ]]; then
    sed -i 's/\r$//' scripts/download_deps.sh
    bash scripts/download_deps.sh
  fi
fi

VERSION="0.9"
GIT_HASH=$(git rev-parse --short HEAD 2>/dev/null || echo unknown)
if [[ -n "$(git status --porcelain 2>/dev/null)" ]]; then
  TS=$(date +%Y%m%d%H%M%S)
  RELEASE_VERSION="v${VERSION}-dev-${TS}"
else
  RELEASE_VERSION="v${VERSION}-dev-${GIT_HASH}"
fi

ELFLDR_FILE=$(basename "$(ls src/elfldr-ps5-*.elf 2>/dev/null | head -n1)")
KEXP_FILE=$(basename "$(ls src/kexp-*.bin 2>/dev/null | head -n1)")
echo "RELEASE_VERSION=${RELEASE_VERSION}"
echo "ELFLDR_FILE=${ELFLDR_FILE}"
echo "KEXP_FILE=${KEXP_FILE}"

rm -rf build_dir
cp -r src build_dir
sed -i "s/@@VERSION@@/${RELEASE_VERSION}/g" build_dir/main.js
sed -i "s/@@ELFLDR_FILE@@/${ELFLDR_FILE}/g" build_dir/aioshellcode.js
sed -i "s/@@KEXP_FILE@@/${KEXP_FILE}/g" build_dir/aioshellcode.js

python3 third_party/y2jb-updater/create_update_package.py build_dir
rm -rf build_dir

ls -la y2jb_update.zip
echo "=== DONE y2jb_update.zip ==="
