# Y2JB Autoloader Frontend (splash UI)

Cyberpunk combat-HUD splash for the **PS5 YouTube (Y2JB) autoloader**.

Built as a **single self-contained** `splash.html` (CSS, JS, fonts inlined) that
ships in the update package as `src/splash.html`.

Styled to match **ps5-payload-manager** (Night City HUD: code rain, hazard stripe,
HudBar, glass-card BR cut + yellow corner ticks, log console, pipeline bar).

This package is **UI only**. No exploit code lives here. The real chain drives the
screen through four globals.

## Exploit contract

```js
window.autoloader_ui(version?)          // show UI, reset state
window.updateProgress(percent, message) // progress bar + log line
window.uiLog(message, type?)            // append log (info/success/warning/error)
window.hideUI()                         // hide (also auto on [ERROR] / [-])
```

`src/main.js` calls these after the YouTube app loads `splash.html`.

## Commands

```sh
cd frontend
bun install
bun run dev     # http://localhost:3000 — live demo sequence
bun run build   # → dist/splash.html (single self-contained file)
```

From the repo root:

```sh
make splash     # build + copy → src/splash.html
make all        # splash + y2jb_update.zip
```

## YouTube / package integration

1. `make splash` (or `bun run build` then copy `dist/splash.html` → `src/splash.html`)
2. Package via `make all` / `y2jb_update.zip`
3. On console, YouTube loads `splash.html`; exploit scripts call the bridge APIs

`dist/splash.html` inlines CSS, JS, and fonts — one file drop-in, no extra assets.
