import { useEffect, useRef } from 'react'

const PREFIX = {
  info: '>',
  success: '+',
  warning: '*',
  error: '!',
}

export default function Terminal({ logs }) {
  const scrollRef = useRef(null)

  useEffect(() => {
    const el = scrollRef.current
    if (el) {
      el.scrollTop = el.scrollHeight
    }
  }, [logs])

  return (
    <section className="cp-terminal" id="logWrapper" aria-label="Autoloader log">
      <div className="cp-terminal__chrome">
        <span className="cp-terminal__label">// breach // console</span>
        <span className="cp-terminal__meta">
          BUF {String(logs.length).padStart(2, '0')} // LIVE
        </span>
      </div>
      <div className="cp-terminal__body">
        <div className="cp-terminal__scroll" ref={scrollRef} id="logContainer">
          {logs.map((line) => {
            const type = line.type || 'info'
            return (
              <div key={line.id} className={`cp-log-line cp-log-line--${type}`}>
                <span className="cp-log-line__prefix">{PREFIX[type] || '›'}</span>
                <span>{line.text}</span>
              </div>
            )
          })}
          <div className="cp-log-line cp-log-line--info">
            <span className="cp-log-line__prefix">›</span>
            <span>
              <span className="cp-cursor" aria-hidden="true" />
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}
