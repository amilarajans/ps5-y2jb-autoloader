/**
 * Dev preview — full SPA with mock exploit log sequence.
 * Run: bun run dev
 */
import { createRoot } from 'react-dom/client'
import { useEffect, useState } from 'react'
import App from './App'
import {
  showUI,
  hideUI,
  appendLog,
  updateProgress,
  getState,
  subscribe,
} from './store'
import { injectCyberpunkStyles } from './injectStyles'

// Install same bridge so behavior matches production
import './bridge.jsx'

injectCyberpunkStyles()

const MOCK_SEQUENCE = [
  { t: 400, fn: () => appendLog('Y2JB Autoloader v0.9-dev by PLK', 'success') },
  { t: 800, fn: () => updateProgress(0, 'Running userland exploit...') },
  { t: 1400, fn: () => appendLog('Y2JB by Gezine', 'info') },
  { t: 1800, fn: () => appendLog('FW: 7.61', 'info') },
  { t: 2400, fn: () => updateProgress(20, 'Running kernel exploit...') },
  { t: 2800, fn: () => appendLog('Y2JB Lapse 2.0 by Gezine', 'info') },
  { t: 3600, fn: () => updateProgress(50, 'Kernel exploit finished.') },
  {
    t: 4200,
    fn: () =>
      appendLog(
        'Found autoload config at: /mnt/sandbox/.../ps5_autoloader/autoload.txt',
        'info'
      ),
  },
  {
    t: 4800,
    fn: () =>
      appendLog('Loading ELF from: /mnt/sandbox/.../pldmgr_v0.1.0.elf', 'info'),
  },
  { t: 5400, fn: () => updateProgress(75, 'Starting ELF Loader...') },
  {
    t: 6000,
    fn: () => appendLog('Successfully sent 2050320 bytes to loader', 'success'),
  },
  { t: 6600, fn: () => appendLog('Loaded pldmgr_v0.1.0.elf', 'success') },
  { t: 7200, fn: () => updateProgress(100, 'Autoload finished.') },
  { t: 7600, fn: () => appendLog('Closing YT app', 'info') },
]

function DevToolbar() {
  const [visible, setVisible] = useState(() => getState().visible)
  const timers = useState(() => [])[0]

  useEffect(() => subscribe((s) => setVisible(s.visible)), [])

  const clearTimers = () => {
    while (timers.length) {
      clearTimeout(timers.pop())
    }
  }

  const runMock = () => {
    clearTimers()
    window.autoloader_ui('v0.9-cyberpunk-dev')
    MOCK_SEQUENCE.forEach(({ t, fn }) => {
      timers.push(setTimeout(fn, t))
    })
  }

  const randomLog = () => {
    const types = ['info', 'success', 'warning', 'error']
    const type = types[Math.floor(Math.random() * types.length)]
    const msgs = {
      info: 'Scanning memory regions...',
      success: 'Stage complete.',
      warning: 'Retrying handshake...',
      error: 'Timeout on pipe channel',
    }
    appendLog(msgs[type], type)
  }

  return (
    <div className="cp-devbar">
      <button type="button" onClick={runMock}>
        Simulate autoload
      </button>
      <button
        type="button"
        onClick={() => {
          clearTimers()
          showUI('v0.9-cyberpunk-dev')
        }}
      >
        Show UI
      </button>
      <button
        type="button"
        onClick={() => {
          clearTimers()
          hideUI()
        }}
      >
        Hide UI
      </button>
      <button type="button" onClick={randomLog}>
        Random log
      </button>
      <button
        type="button"
        onClick={() => updateProgress(Math.floor(Math.random() * 100), 'Manual tick')}
      >
        Random progress
      </button>
      <span style={{ color: '#6a6a80', alignSelf: 'center' }}>
        {visible ? 'VISIBLE' : 'hidden'}
      </span>
    </div>
  )
}

function DevApp() {
  useEffect(() => {
    // Auto-run once so the theme is visible immediately
    const t = setTimeout(() => {
      if (typeof window.autoloader_ui === 'function') {
        window.autoloader_ui('v0.9-cyberpunk-dev')
        MOCK_SEQUENCE.forEach(({ t: delay, fn }) => setTimeout(fn, delay))
      }
    }, 200)
    return () => clearTimeout(t)
  }, [])

  return (
    <>
      <App />
      <DevToolbar />
    </>
  )
}

const el = document.getElementById('root')
createRoot(el).render(<DevApp />)
