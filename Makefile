VERSION    := 0.9

# Git info for versioning
GIT_HASH   := $(shell git rev-parse --short HEAD 2>/dev/null || echo "unknown")
GIT_DIRTY  := $(shell git status --porcelain 2>/dev/null)
BUILD_TYPE ?= dev
ifeq ($(BUILD_TYPE),stable)
RELEASE_VERSION := v$(VERSION)-$(if $(GIT_DIRTY),$(shell date +"%Y%m%d%H%M%S"),$(GIT_HASH))
else
RELEASE_VERSION := v$(VERSION)-$(BUILD_TYPE)-$(if $(GIT_DIRTY),$(shell date +"%Y%m%d%H%M%S"),$(GIT_HASH))
endif

SRC_FILES := $(shell find src -type f)
ELFLDR_FILE := $(shell basename $(shell ls src/elfldr-ps5-*.elf 2>/dev/null | head -n 1) 2>/dev/null)
KEXP_FILE := $(shell basename $(shell ls src/kexp-*.bin 2>/dev/null | head -n 1) 2>/dev/null)

# Prefer bun, fall back to npm
BUN ?= $(shell command -v bun 2>/dev/null)
NPM ?= $(shell command -v npm 2>/dev/null)

all: splash y2jb_update.zip

# Cyberpunk splash UI → src/splash.html (single-file YouTube entry page)
splash: src/splash.html

src/splash.html: $(shell find frontend/src -type f 2>/dev/null) frontend/package.json frontend/splash.html frontend/scripts/build.ts
	@echo "=== Building Y2JB splash UI (frontend → splash.html) ==="
	@if [ -n "$(BUN)" ]; then \
		cd frontend && bun install && bun run build; \
	else \
		echo "Error: bun is required to build the splash frontend" >&2; exit 1; \
	fi
	cp frontend/dist/splash.html src/splash.html
	@echo "Installed src/splash.html"

# Back-compat alias used by older docs / habits
ui: splash

y2jb_update.zip: $(SRC_FILES) src/splash.html
	rm -rf build_dir
	cp -r src build_dir
	sed -i.bak "s/@@VERSION@@/$(RELEASE_VERSION)/g" build_dir/main.js && rm build_dir/main.js.bak
	sed -i.bak "s/@@ELFLDR_FILE@@/$(ELFLDR_FILE)/g" build_dir/aioshellcode.js && rm build_dir/aioshellcode.js.bak
	sed -i.bak "s/@@KEXP_FILE@@/$(KEXP_FILE)/g" build_dir/aioshellcode.js && rm build_dir/aioshellcode.js.bak
	python3 third_party/y2jb-updater/create_update_package.py build_dir
	rm -rf build_dir

clean:
	rm -rf build_dir y2jb_update.zip frontend/dist
	# Keep a committed splash.html; only remove if rebuilding from scratch is desired:
	# rm -f src/splash.html

.PHONY: all clean print-version splash ui
print-version:
	@echo $(RELEASE_VERSION)
