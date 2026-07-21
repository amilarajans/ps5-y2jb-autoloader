/**
 * Top-left health / Arasaka vitals — package Health Panel.dc.html
 */
import arasakaUrl from "../assets/images/arasaka-logo-cyan.svg";

const HP = 198;
const HP_MAX = 330;
const SEGMENTS = 42;

function buildSegments() {
  const lit = Math.round((HP / HP_MAX) * SEGMENTS);
  return Array.from({ length: SEGMENTS }, (_, i) => {
    if (i < lit) {
      const edge = i >= lit - 3;
      return {
        lit: true,
        bg: edge
          ? "linear-gradient(180deg,#8ff4ff,#2fd0e0)"
          : "linear-gradient(rgb(95, 232, 244), rgb(34, 184, 200))",
      };
    }
    return { lit: false, bg: "#0f363c" };
  });
}

const segs = buildSegments();
const redPct = Math.round(Math.min(1, (HP / HP_MAX) * 0.86) * 100);

export function HealthPanel() {
  return (
    <div className="cp-health" aria-hidden="true">
      <div className="cp-health__panel">
        {/* Arasaka wordmark SVG only (no separate clover icon) */}
        <img
          className="cp-health__brand"
          src={arasakaUrl}
          alt=""
          draggable={false}
        />

        <div className="cp-health__menu">
          <span>ATTRIBUTES</span>
          <span>CYBERWARE</span>
          <span>INVENTORY</span>
          <span>SKILLS</span>
        </div>

        {/* level badge — package chamfered plate (not rotated diamond) */}
        <svg className="cp-health__lvl-box" viewBox="0 0 54 50">
          <path
            d="M3 3 H51 V47 H19 L3 32 Z"
            fill="rgba(8,26,30,0.72)"
            stroke="#4fe6f2"
            strokeWidth="2.2"
            strokeLinejoin="round"
          />
        </svg>
        <div className="cp-health__lvl">30</div>
        <div className="cp-health__xp">812B</div>

        <div className="cp-health__bars">
          <div className="cp-health__damage">
            <div className="cp-health__damage-fill" style={{ width: `${redPct}%` }} />
          </div>
          <div className="cp-health__segs">
            {segs.map((s, i) => (
              <div
                key={i}
                className={`cp-health__seg${s.lit ? "" : " cp-health__seg--empty"}`}
                style={{ background: s.bg }}
              />
            ))}
          </div>
        </div>

        <div className="cp-health__cur">{HP}</div>
        <div className="cp-health__max">{HP_MAX}</div>

        <div className="cp-health__baseline" />
        <div className="cp-health__scan" />
      </div>
    </div>
  );
}
