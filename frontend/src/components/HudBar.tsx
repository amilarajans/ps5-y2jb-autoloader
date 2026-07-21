/**
 * Top HUD strip — same chrome as payload manager cyberpunk HudBar.
 */
export function HudBar({ version }: { version?: string }) {
  return (
    <header className="cp-hudbar" aria-hidden="false">
      <div className="cp-hudbar__left">
        <span className="cp-hudbar__stat">
          <span className="cp-hudbar__num">Y2JB</span>
          <span className="cp-hudbar__label">SPLASH</span>
        </span>
        <span className="cp-hudbar__sep" />
        <span className="cp-hudbar__stat cp-hudbar__stat--cyan">
          <span className="cp-hudbar__num">LINK</span>
          <span className="cp-hudbar__label">ACTIVE</span>
        </span>
      </div>
      <div className="cp-hudbar__mid">
        <span className="cp-hudbar__protocol">PROTOCOL 6920-A44 // YOUTUBE AUTOLOAD</span>
      </div>
      <div className="cp-hudbar__right">
        <span className="cp-hudbar__meta">{version || "—"}</span>
        <span className="cp-hudbar__sep" />
        <span className="cp-hudbar__meta cp-hudbar__meta--cyan">ICE BYPASS</span>
      </div>
    </header>
  );
}
