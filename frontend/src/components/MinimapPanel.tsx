/**
 * Tactical minimap — from package (Minimap Panel.dc.html + minimap-trace.svg).
 */
import mapUrl from "../assets/images/minimap-trace.svg";

export function MinimapPanel() {
  return (
    <div className="cp-minimap" aria-hidden="true">
      <div className="cp-minimap__panel">
        <div className="cp-minimap__conn">CONNECTION 6S138.28</div>
        <div className="cp-minimap__lock">⌖</div>

        <div className="cp-minimap__stage">
          <div className="cp-minimap__tilt">
            <svg className="cp-minimap__frame" viewBox="0 0 340 250">
              <polygon
                points="30,4 336,4 336,214 312,246 4,246 4,30"
                fill="none"
                stroke="#ff3c3c"
                strokeOpacity="0.85"
                strokeWidth="2"
              />
              <path d="M30,4 L4,30" stroke="#fcee0a" strokeWidth="2.4" />
              <path d="M4,30 L4,246" stroke="#ff3c3c" strokeOpacity="0.35" strokeWidth="4" />
            </svg>
            <div className="cp-minimap__clip">
              <img className="cp-minimap__art" src={mapUrl} alt="" draggable={false} />
              <div className="cp-minimap__scan" />
              <div className="cp-minimap__ping" />
            </div>
          </div>
        </div>

        <div className="cp-minimap__combat">COMBAT</div>
        <div className="cp-minimap__status-line" />
        <div className="cp-minimap__status">
          <span>24:32</span>
          <span>
            ✉ <span className="cp-minimap__mail">10</span>
          </span>
        </div>
      </div>
    </div>
  );
}
