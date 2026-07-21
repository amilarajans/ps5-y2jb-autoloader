/**
 * Bottom-right weapon strip — matches CP2077 combat HUD
 * (Goin_to_the_top: △ 011  87  gun  body).
 */
import gunUrl from "../assets/images/gun-trace.svg";
import bodyUrl from "../assets/images/body-trace.svg";

export function WeaponHud() {
  return (
    <div className="cp-weapon-hud" aria-hidden="true">
      <div className="cp-weapon-hud__panel">
        {/* traced art — native 533×122 package alignment */}
        <img
          className="cp-weapon-hud__art cp-weapon-hud__art--body"
          src={bodyUrl}
          alt=""
          draggable={false}
        />
        <img
          className="cp-weapon-hud__art cp-weapon-hud__art--gun"
          src={gunUrl}
          alt=""
          draggable={false}
        />

        {/* warning triangle */}
        <svg className="cp-weapon-hud__tri" viewBox="0 0 40 36">
          <path
            d="M20 2 L38 34 L2 34 Z"
            fill="rgba(255,70,70,0.08)"
            stroke="#ff5560"
            strokeWidth="2.4"
            strokeLinejoin="round"
          />
          <rect x="18.4" y="13" width="3.2" height="12" fill="#ff5560" />
          <circle cx="20" cy="29.5" r="1.7" fill="#ff5560" />
        </svg>

        {/* primary cyan / reserve red — 87 ≈ 4/5 of 011 */}
        <div className="cp-weapon-hud__mag">011</div>
        <div className="cp-weapon-hud__reserve">87</div>

        <div className="cp-weapon-hud__name">M-179E ACHILLES</div>
      </div>
    </div>
  );
}
