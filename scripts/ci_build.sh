#!/usr/bin/env bash
# CI build for Y2JB autoloader (fork-friendly).
#
# - Downloads stock elfldr + kexp releases (itsPLK)
# - Checks out themed payload-manager (amilarajans) and builds it
# - Builds ps5-unified-autoloader embedding that pldmgr
# - Builds splash UI (frontend) + y2jb_update.zip
#
# Usage (from repo root):
#   ./scripts/ci_build.sh --dev
#   ./scripts/ci_build.sh --stable
#
set -euo pipefail
cd "$(dirname "$0")/.."

BUILD_TYPE="dev"
PLDMGR_REPO="${PLDMGR_REPO:-https://github.com/amilarajans/ps5-payload-manager.git}"
PLDMGR_REF="${PLDMGR_REF:-feature/cyberpunk-2077-theme}"

while [[ "$#" -gt 0 ]]; do
  case "$1" in
    --stable) BUILD_TYPE="stable" ;;
    --dev) BUILD_TYPE="dev" ;;
    --pldmgr-ref)
      PLDMGR_REF="$2"
      shift
      ;;
    --pldmgr-repo)
      PLDMGR_REPO="$2"
      shift
      ;;
    *)
      echo "Unknown parameter: $1" >&2
      exit 1
      ;;
  esac
  shift
done

DEST_DIR="src"
mkdir -p "$DEST_DIR"

need_cmd() {
  command -v "$1" >/dev/null 2>&1 || {
    echo "Error: required command not found: $1" >&2
    exit 1
  }
}

need_cmd curl
need_cmd python3
need_cmd make
need_cmd docker
need_cmd git

# Prefer bun for frontend builds
if ! command -v bun >/dev/null 2>&1 && ! command -v npm >/dev/null 2>&1; then
  echo "Error: need bun or npm for frontend builds" >&2
  exit 1
fi

echo "=== CI build (BUILD_TYPE=${BUILD_TYPE}) ==="
echo "    pldmgr: ${PLDMGR_REPO} @ ${PLDMGR_REF}"

# -----------------------------------------------------------------------
# 1) elfldr + kexp from public releases
# -----------------------------------------------------------------------
echo "=== [1/4] Download elfldr + kexp ==="

ELFLDR_URL=$(curl -fsSL https://api.github.com/repos/itsPLK/ps5-elfldr/releases/latest \
  | grep -o 'https://github.com/itsPLK/ps5-elfldr/releases/download/[^"]*\.elf' | head -n 1)
KEXP_URL=$(curl -fsSL https://api.github.com/repos/itsPLK/ps5-kexp/releases/latest \
  | grep -o 'https://github.com/itsPLK/ps5-kexp/releases/download/[^"]*\.bin' | head -n 1)

if [[ -z "${ELFLDR_URL}" || -z "${KEXP_URL}" ]]; then
  echo "Error: could not resolve elfldr/kexp release URLs" >&2
  exit 1
fi

ELFLDR_VER=$(echo "$ELFLDR_URL" | grep -oE 'download/[^/]+' | cut -d'/' -f2)
KEXP_VER=$(echo "$KEXP_URL" | grep -oE 'download/[^/]+' | cut -d'/' -f2)
ELFLDR_FILE="elfldr-ps5-${ELFLDR_VER}.elf"
KEXP_FILE="kexp-${KEXP_VER}.bin"

rm -f "$DEST_DIR"/kexp-*.bin "$DEST_DIR"/elfldr-ps5-*.elf "$DEST_DIR"/elfldr*.elf
rm -f "$DEST_DIR"/ps5-unified-autoloader*.elf

curl -fL -o "$DEST_DIR/$ELFLDR_FILE" "$ELFLDR_URL"
curl -fL -o "$DEST_DIR/$KEXP_FILE" "$KEXP_URL"
echo "  elfldr: ${ELFLDR_VER}"
echo "  kexp:   ${KEXP_VER}"

# -----------------------------------------------------------------------
# 2) Checkout themed payload-manager inside unified-autoloader
# -----------------------------------------------------------------------
echo "=== [2/4] Checkout themed payload-manager ==="

UNIFIED="third_party/ps5-unified-autoloader"
PLDMGR_PATH="${UNIFIED}/third_party/ps5-payload-manager"

if [[ ! -d "${UNIFIED}/.git" && ! -f "${UNIFIED}/.git" ]]; then
  echo "Error: ${UNIFIED} submodule missing. Use: git submodule update --init --recursive" >&2
  exit 1
fi

# Ensure nested submodule exists, then force the themed ref
git submodule update --init --recursive "${UNIFIED}" || true
git -C "${UNIFIED}" submodule update --init --recursive third_party/ps5-payload-manager || true

if [[ ! -e "${PLDMGR_PATH}/.git" && ! -f "${PLDMGR_PATH}/.git" ]]; then
  echo "Error: payload-manager submodule not present at ${PLDMGR_PATH}" >&2
  exit 1
fi

# Detach to the requested themed tip (fork branch or SHA)
git -C "${PLDMGR_PATH}" remote remove themed 2>/dev/null || true
git -C "${PLDMGR_PATH}" remote add themed "${PLDMGR_REPO}"
git -C "${PLDMGR_PATH}" fetch --depth=1 themed "${PLDMGR_REF}"
git -C "${PLDMGR_PATH}" checkout -f FETCH_HEAD

PLDMGR_SHA=$(git -C "${PLDMGR_PATH}" rev-parse --short HEAD)
PLDMGR_DESCRIBE=$(git -C "${PLDMGR_PATH}" describe --tags --always 2>/dev/null || echo "${PLDMGR_SHA}")
echo "  pldmgr @ ${PLDMGR_DESCRIBE} (${PLDMGR_SHA})"

# -----------------------------------------------------------------------
# 3) Build unified-autoloader with pldmgr from source (Docker)
# -----------------------------------------------------------------------
echo "=== [3/4] Build unified-autoloader (+ pldmgr) ==="

# LF line endings for shell scripts (Windows checkouts break Docker RUN scripts)
if command -v sed >/dev/null 2>&1; then
  find "${PLDMGR_PATH}" -maxdepth 1 -type f \( -name '*.sh' -o -name 'Dockerfile*' \) \
    -exec sed -i 's/\r$//' {} + 2>/dev/null || true
  find "${UNIFIED}" -maxdepth 1 -type f \( -name '*.sh' -o -name 'Dockerfile*' \) \
    -exec sed -i 's/\r$//' {} + 2>/dev/null || true
fi

chmod +x "${UNIFIED}/build_release.sh" "${PLDMGR_PATH}/build_release.sh" 2>/dev/null || true

(
  cd "${UNIFIED}"
  ./build_release.sh -b
)

AUTOLOADER_ELF=$(ls "${UNIFIED}"/autoloader_v*.elf 2>/dev/null | head -n 1)
if [[ -z "${AUTOLOADER_ELF}" ]]; then
  echo "Error: unified-autoloader build produced no autoloader_v*.elf" >&2
  exit 1
fi

cp "${AUTOLOADER_ELF}" "${DEST_DIR}/ps5-unified-autoloader.elf"
AUTOLOADER_VER=$(git -C "${UNIFIED}" describe --tags --always 2>/dev/null || echo "local")
echo "  unified-autoloader: ${AUTOLOADER_VER} (embeds pldmgr ${PLDMGR_DESCRIBE})"

# -----------------------------------------------------------------------
# 4) Package y2jb_update.zip (builds frontend ui.js via Makefile)
# -----------------------------------------------------------------------
echo "=== [4/4] Build y2jb_update.zip ==="
make all BUILD_TYPE="${BUILD_TYPE}"

# Export versions for GitHub Actions release notes
if [[ -n "${GITHUB_OUTPUT:-}" ]]; then
  {
    echo "elfldr_ver=${ELFLDR_VER}"
    echo "kexp_ver=${KEXP_VER}"
    echo "unified_autoloader_ver=${AUTOLOADER_VER}"
    echo "pldmgr_ver=${PLDMGR_DESCRIBE}"
    echo "pldmgr_sha=${PLDMGR_SHA}"
    echo "pldmgr_ref=${PLDMGR_REF}"
  } >> "${GITHUB_OUTPUT}"
fi

echo "=== CI build complete ==="
ls -la y2jb_update.zip "${DEST_DIR}/ps5-unified-autoloader.elf" "${DEST_DIR}/${ELFLDR_FILE}" "${DEST_DIR}/${KEXP_FILE}"
