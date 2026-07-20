# Y2JB Autoloader UI — Cyberpunk 2077 theme

React + Bun + Vite UI for the PS5 YouTube (Y2JB) autoloader splash.

Preserves the legacy bridge used by exploit scripts:

| API | Purpose |
|-----|---------|
| `window.autoloader_ui(version?)` | Mount / show the overlay |
| `window.uiLog(message, type?)` | Append a log line (`info` / `success` / `warning` / `error`) |
| `window.updateProgress(percent, message?)` | Update the progress bar + log |
| `window.hideUI()` | Hide / tear down the overlay |

## Commands

```bash
cd frontend
bun install
bun run dev      # browser preview with mock autoload sequence
bun run build    # production IIFE → dist/ui.js (for PS5 package)
```

From the repo root, `make ui` builds and copies `dist/ui.js` → `src/ui.js`.

## Design notes

- Fixed **1920×1080** design space, scaled to the viewport (same as the old UI).
- Night City palette: CDPR yellow `#fcee0a`, cyan `#00f0ff`, magenta `#ff2a6d`.
- Scanlines, grid, corner brackets, glitch title, neon progress pipeline.
- Build target: **ES2015 / Safari 12** for Cobalt / YouTube app compatibility.
- CSS is injected at runtime (single `ui.js` file, no extra assets).

## Integration

`src/main.js` loads `ui.js` via `load_localscript` before calling `autoloader_ui()`.
The Makefile runs the frontend build as part of `make all`.
