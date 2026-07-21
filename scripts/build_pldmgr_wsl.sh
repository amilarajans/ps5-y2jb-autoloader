#!/usr/bin/env bash
# Native pldmgr build on Ubuntu 24.04 with existing /opt/ps5-payload-sdk
set -euo pipefail

export PATH="/opt/ps5-payload-sdk/bin:${PATH}"

PLDMGR="/mnt/c/Development/git/ps5-y2jb-autoloader/third_party/ps5-unified-autoloader/third_party/ps5-payload-manager"
cd "$PLDMGR"

echo "=== OS ==="
grep PRETTY_NAME /etc/os-release || true

echo "=== SDK tools ==="
command -v prospero-clang
prospero-clang --version | head -1

echo "=== Ensure LF on build scripts ==="
sed -i 's/\r$//' build_deps.sh build_release.sh 2>/dev/null || true

need_deps=0
for lib in libcurl.a libmbedtls.a libmicrohttpd.a; do
  if [[ ! -f "/opt/ps5-payload-sdk/target/lib/${lib}" ]]; then
    echo "missing ${lib}"
    need_deps=1
  fi
done

if [[ "$need_deps" -eq 1 ]]; then
  echo "=== Building SDK third-party deps ==="
  if [[ -w /opt/ps5-payload-sdk/target ]]; then
    bash build_deps.sh
  else
    sudo bash build_deps.sh
  fi
fi

echo "=== Frontend ==="
if [[ ! -f frontend/dist/index.html ]]; then
  if command -v bun >/dev/null 2>&1; then
    (cd frontend && bun install && bun run build)
  elif command -v npm >/dev/null 2>&1; then
    (cd frontend && npm install && npm run build)
  else
    echo "ERROR: need bun or npm to build frontend" >&2
    exit 1
  fi
else
  ls -la frontend/dist/index.html
fi

echo "=== make clean all ==="
make clean all
ls -la pldmgr.elf

VER=$(grep '#define MENU_VERSION' include/pldmgr.h | awk '{print $3}' | tr -d '"')
cp -f pldmgr.elf "pldmgr_v${VER}.elf"
ls -la "pldmgr_v${VER}.elf"
echo "=== DONE pldmgr_v${VER}.elf ==="
