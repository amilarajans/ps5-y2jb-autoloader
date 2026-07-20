/**
 * Y2JB Autoloader splash UI — Cyberpunk 2077 theme.
 * Driven by the store + window bridge (autoloader_ui / uiLog / updateProgress).
 */
import { useEffect, useState, useCallback } from 'react'
import { getState, subscribe } from './store'
import Atmosphere from './components/Atmosphere'
import Header from './components/Header'
import ProgressBar from './components/ProgressBar'
import Terminal from './components/Terminal'

function useScaleToFit() {
  const apply = useCallback(() => {
    const shell = document.querySelector('.cp-shell')
    if (!shell) return
    const sw = window.innerWidth
    const sh = window.innerHeight
    const scale = Math.min(sw / 1920, sh / 1080)
    shell.style.transform = `scale(${scale})`
    const ox = (sw - 1920 * scale) / 2
    const oy = (sh - 1080 * scale) / 2
    shell.style.left = `${Math.max(0, ox)}px`
    shell.style.top = `${Math.max(0, oy)}px`
  }, [])

  useEffect(() => {
    apply()
    window.addEventListener('resize', apply)
    return () => window.removeEventListener('resize', apply)
  }, [apply])
}

export default function App() {
  const [state, setLocal] = useState(() => getState())

  useEffect(() => subscribe((s) => setLocal({ ...s })), [])
  useScaleToFit()

  if (!state.visible) return null

  return (
    <div className="cp-shell" role="dialog" aria-label="Y2JB Autoloader">
      <Atmosphere />
      <div className="cp-scanlines" aria-hidden="true" />
      <div className="cp-vignette" aria-hidden="true" />
      <div className="cp-corners" aria-hidden="true">
        <span className="cp-corner cp-corner--tl" />
        <span className="cp-corner cp-corner--tr" />
        <span className="cp-corner cp-corner--bl" />
        <span className="cp-corner cp-corner--br" />
      </div>

      <div className="cp-layout">
        <Header version={state.version} />
        {/* Log on top, progress pipeline anchored at the bottom */}
        <Terminal logs={state.logs} />
        <ProgressBar percent={state.progress} message={state.progressMessage} />
      </div>
    </div>
  )
}
