/**
 * Production entry — mounts React UI and exposes the legacy window APIs
 * expected by main.js / lapse.js / update.js / misc.js:
 *   window.autoloader_ui()
 *   window.uiLog(message, type?)
 *   window.updateProgress(percent, message?)
 *   window.hideUI()
 */
import { createRoot } from 'react-dom/client'
import App from './App'
import {
  showUI,
  hideUI as storeHide,
  appendLog,
  updateProgress as storeProgress,
} from './store'
import { injectCyberpunkStyles } from './injectStyles'

let root = null
let host = null

function ensureHost() {
  if (host && document.body.contains(host)) return host
  host = document.getElementById('y2jb-ui-root')
  if (!host) {
    host = document.createElement('div')
    host.id = 'y2jb-ui-root'
    document.body.appendChild(host)
  }
  return host
}

function ensureRoot() {
  const el = ensureHost()
  if (!root) {
    root = createRoot(el)
    root.render(<App />)
  }
  return root
}

function shouldHideOnError(message) {
  return (
    typeof message === 'string' &&
    (message.includes('[ERROR]') || message.includes('[-]'))
  )
}

function installBridge() {
  injectCyberpunkStyles()

  window.autoloader_ui = function autoloader_ui(version) {
    injectCyberpunkStyles()
    ensureRoot()
    // Prefer version passed by main.js, fall back to global if set
    const ver =
      version ||
      (typeof window.__Y2JB_VERSION__ !== 'undefined'
        ? window.__Y2JB_VERSION__
        : 'dev')
    showUI(ver)
  }

  window.uiLog = function uiLog(message, type) {
    if (shouldHideOnError(message)) {
      if (typeof window.hideUI === 'function') window.hideUI()
      return
    }
    ensureRoot()
    appendLog(message, type)
  }

  window.updateProgress = function updateProgress(percent, message) {
    ensureRoot()
    storeProgress(percent, message != null ? message : 'Loading...')
  }

  window.hideUI = function hideUI() {
    storeHide()
  }
}

installBridge()

// Signal readiness for consumers that race script load
window.__Y2JB_UI_READY__ = true
if (typeof window.dispatchEvent === 'function') {
  try {
    window.dispatchEvent(new Event('y2jb-ui-ready'))
  } catch (_) {
    /* Event constructor may be limited on very old engines */
  }
}
