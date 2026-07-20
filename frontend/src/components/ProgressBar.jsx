export default function ProgressBar({ percent, message }) {
  const p = Math.max(0, Math.min(100, Number(percent) || 0))
  const label = message || 'STAND BY...'

  return (
    <div className="cp-progress-wrap">
      <div className="cp-progress-labels">
        <span className="cp-progress-labels__left">// payload pipeline</span>
        <span className="cp-progress-labels__right">{Math.round(p)}%</span>
      </div>
      <div className="cp-progress">
        <div
          className="cp-progress__fill"
          id="progressBar"
          style={{ transform: `scaleX(${p / 100})` }}
        />
        <div className="cp-progress__ticks" />
        <div className="cp-progress__label" id="progressLabel">
          {label}
        </div>
      </div>
    </div>
  )
}
