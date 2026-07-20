/**
 * Tiny pub/sub store for UI state shared between the React tree
 * and the window.* bridge used by main.js / exploit scripts.
 */

const listeners = new Set()

const initialState = {
  visible: false,
  version: 'dev',
  progress: 0,
  progressMessage: 'STAND BY...',
  logs: [],
  maxLogs: 24,
}

let state = { ...initialState, logs: [] }

export function getState() {
  return state
}

export function subscribe(fn) {
  listeners.add(fn)
  return () => listeners.delete(fn)
}

function emit() {
  listeners.forEach((fn) => {
    try {
      fn(state)
    } catch (_) {
      /* ignore subscriber errors */
    }
  })
}

export function setState(partial) {
  state = { ...state, ...partial }
  emit()
}

export function showUI(version) {
  state = {
    ...initialState,
    logs: [],
    visible: true,
    version: version || state.version || 'dev',
  }
  emit()
}

export function hideUI() {
  state = { ...state, visible: false, logs: [] }
  emit()
}

export function updateProgress(percent, message) {
  const p = Math.max(0, Math.min(100, Number(percent) || 0))
  const msg = message != null ? String(message) : state.progressMessage
  state = {
    ...state,
    progress: p,
    progressMessage: msg,
  }
  // Match legacy behavior: progress updates also land in the log
  appendLog(msg, 'warning')
}

export function appendLog(message, type) {
  if (message == null) return
  const text = String(message)
  const entryType = type || classifyMessage(text)
  const entry = {
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    text,
    type: entryType,
  }
  const logs = state.logs.concat(entry)
  while (logs.length > state.maxLogs) logs.shift()
  state = { ...state, logs }
  emit()
}

function classifyMessage(text) {
  if (/\[ERROR\]|\[-\]|error|fail|fatal/i.test(text)) return 'error'
  if (/success|finished|loaded|complete|done/i.test(text)) return 'success'
  if (/running|loading|starting|found|wait/i.test(text)) return 'warning'
  return 'info'
}

export function resetStore() {
  state = { ...initialState, logs: [] }
  emit()
}
