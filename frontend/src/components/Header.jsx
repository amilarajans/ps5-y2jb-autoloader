import Y2JBLogo from './Y2JBLogo'

export default function Header({ version }) {
  return (
    <header className="cp-header">
      <div className="cp-tagline">BREACH PROTOCOL // SYSTEM ACCESS</div>

      <h1 className="cp-logo" aria-label="Y2JB Autoloader">
        <span className="cp-logo__mark">
          <Y2JBLogo />
        </span>
        <span className="cp-logo__auto" data-text="AUTOLOADER">
          AUTOLOADER
        </span>
        <span className="cp-logo__underline" aria-hidden="true" />
      </h1>

      <div className="cp-subtitle">
        payload chain // <span>{version || 'dev'}</span>
      </div>
      <div className="cp-status-row">
        <div className="cp-status-pill">
          <span className="cp-status-pill__dot" />
          net secured
        </div>
        <div className="cp-status-pill cp-status-pill--warn">
          <span className="cp-status-pill__dot" />
          ice bypass
        </div>
      </div>
    </header>
  )
}
