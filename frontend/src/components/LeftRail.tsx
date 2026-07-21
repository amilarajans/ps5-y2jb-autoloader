/**
 * Mid-left HUD rail — fills the gap between Arasaka mark and minimap.
 */

const TRACE_LINES = [
  "0x7FF2 · HEAP SPRAY",
  "0x7FF8 · UAF READY",
  "0x8001 · ROP CHAIN",
  "0x8014 · KASLR MAP",
  "0x80A0 · RING-0 OPEN",
  "0x80C2 · AUTH OPEN",
];

export function LeftRail() {
  return (
    <div className="cp-left-rail" aria-hidden="true">
      {/* Vertical spine connecting Arasaka → minimap */}
      <div className="cp-left-rail__spine">
        <span className="cp-left-rail__spine-node" />
        <span className="cp-left-rail__spine-node cp-left-rail__spine-node--mid" />
        <span className="cp-left-rail__spine-node cp-left-rail__spine-node--bot" />
      </div>

      <div className="cp-left-rail__panel">
        <div className="cp-left-rail__title">// NETRUNNER TRACE</div>

        <div className="cp-left-rail__meters">
          <div className="cp-left-rail__meter">
            <span className="cp-left-rail__meter-label">ICE</span>
            <div className="cp-left-rail__meter-track">
              <div className="cp-left-rail__meter-fill cp-left-rail__meter-fill--hot" style={{ width: "72%" }} />
            </div>
            <span className="cp-left-rail__meter-val">72%</span>
          </div>
          <div className="cp-left-rail__meter">
            <span className="cp-left-rail__meter-label">BAND</span>
            <div className="cp-left-rail__meter-track">
              <div className="cp-left-rail__meter-fill cp-left-rail__meter-fill--cyan" style={{ width: "88%" }} />
            </div>
            <span className="cp-left-rail__meter-val">88%</span>
          </div>
          <div className="cp-left-rail__meter">
            <span className="cp-left-rail__meter-label">THREAT</span>
            <div className="cp-left-rail__meter-track">
              <div className="cp-left-rail__meter-fill cp-left-rail__meter-fill--yellow" style={{ width: "41%" }} />
            </div>
            <span className="cp-left-rail__meter-val">41%</span>
          </div>
        </div>

        <div className="cp-left-rail__trace">
          {TRACE_LINES.map((line, i) => (
            <div key={i} className="cp-left-rail__trace-line">
              <span className="cp-left-rail__trace-dot" />
              <span>{line}</span>
            </div>
          ))}
        </div>

        <div className="cp-left-rail__status">
          <span className="cp-left-rail__status-pill">BYPASS</span>
          <span className="cp-left-rail__status-pill cp-left-rail__status-pill--cyan">LINKED</span>
        </div>
      </div>

      <div className="cp-left-rail__kana">システム侵入</div>
    </div>
  );
}
