/**
 * Bottom-left Arasaka info card + Cyberpunk logo
 * (package Info Panel.dc.html — Goin_to_the_top BL).
 */
import arasakaUrl from "../assets/images/arasaka-logo-cyan.svg";
import logoUrl from "../assets/images/cyberpunk-logo.svg";

export function InfoPanel() {
  return (
    <div className="cp-info" aria-hidden="true">
      <div className="cp-info__panel">
        <div className="cp-info__menu">
          <span>ATTRIBUTES</span>
          <span>CYBERWARE</span>
          <span>INVENTORY</span>
          <span>SKILLS</span>
        </div>

        <svg className="cp-info__globe" viewBox="0 0 22 22">
          <circle cx="11" cy="11" r="9.2" fill="none" stroke="#3fe0ee" strokeWidth="1.3" />
          <ellipse cx="11" cy="11" rx="4" ry="9.2" fill="none" stroke="#3fe0ee" strokeWidth="1.1" />
          <path d="M2 11 H20 M4 6 H18 M4 16 H18" stroke="#3fe0ee" strokeWidth="0.9" />
        </svg>

        <div className="cp-info__conn">CONNECTION 6S5.441.20</div>

        <div className="cp-info__card">
          <div className="cp-info__block cp-info__block--a">
            <span>0x1A 22F9 5E03 9B7C 4410</span>
            <span>C4E1 8802 6DF0 11A9 730B</span>
            <span>DAEMON MASS_VULN QUEUED</span>
            <span>SUBNET 172.19.4.0 / 24</span>
            <span>PORT 8080 OPEN · 443 OPEN</span>
            <span>KEY F19A 77C3 DE10 4B8E</span>
            <span>UPLINK STABLE · AES256</span>
            <span>TRACE 34% // MASK ACTIVE</span>
          </div>

          <img
            className="cp-info__arasaka"
            src={arasakaUrl}
            alt=""
            draggable={false}
          />

          <div className="cp-info__block cp-info__block--b">
            <span>CLEARANCE BLACKWALL / T3</span>
            <span>CRED 812B // BAL ₪9220</span>
            <span>SECTOR WATSON / KABUKI</span>
            <span>THREAT LVL ELEVATED ▲</span>
            <span>DECK QIANT SANDEVISTAN</span>
            <span>RAM 8 / 12 · BUF 0x40</span>
            <span>RELAY // 6 HOPS STABLE</span>
            <span>ICE 4B2C 9E01 · OK</span>
          </div>

          <div className="cp-info__labels">
            <span>OBJECT: SHARD</span>
            <span>ENCODE: BASE//64</span>
            <span>SIGN: ARASAKA.SEC</span>
            <span>REV: 0x1F</span>
          </div>

          <svg className="cp-info__barcode" viewBox="0 0 320 34" preserveAspectRatio="none">
            <g fill="#5ad6e2" fillOpacity="0.82">
              <rect x="0" y="0" width="3" height="34" />
              <rect x="5" y="0" width="1.5" height="34" />
              <rect x="9" y="0" width="4" height="34" />
              <rect x="15" y="0" width="1.5" height="34" />
              <rect x="19" y="0" width="2.5" height="34" />
              <rect x="24" y="0" width="5" height="34" />
              <rect x="32" y="0" width="1.5" height="34" />
              <rect x="36" y="0" width="3" height="34" />
              <rect x="42" y="0" width="2" height="34" />
              <rect x="47" y="0" width="4.5" height="34" />
              <rect x="54" y="0" width="1.5" height="34" />
              <rect x="58" y="0" width="3" height="34" />
              <rect x="64" y="0" width="2.5" height="34" />
              <rect x="70" y="0" width="1.5" height="34" />
              <rect x="74" y="0" width="5" height="34" />
              <rect x="82" y="0" width="2" height="34" />
              <rect x="87" y="0" width="3.5" height="34" />
              <rect x="93" y="0" width="1.5" height="34" />
              <rect x="97" y="0" width="2.5" height="34" />
              <rect x="102" y="0" width="4" height="34" />
              <rect x="109" y="0" width="1.5" height="34" />
              <rect x="113" y="0" width="3" height="34" />
              <rect x="119" y="0" width="2" height="34" />
              <rect x="124" y="0" width="5" height="34" />
              <rect x="132" y="0" width="1.5" height="34" />
              <rect x="136" y="0" width="2.5" height="34" />
              <rect x="141" y="0" width="4" height="34" />
              <rect x="148" y="0" width="1.5" height="34" />
              <rect x="152" y="0" width="3" height="34" />
              <rect x="158" y="0" width="2.5" height="34" />
              <rect x="164" y="0" width="1.5" height="34" />
              <rect x="168" y="0" width="4.5" height="34" />
              <rect x="175" y="0" width="2" height="34" />
              <rect x="180" y="0" width="3" height="34" />
              <rect x="186" y="0" width="1.5" height="34" />
              <rect x="190" y="0" width="5" height="34" />
              <rect x="198" y="0" width="2.5" height="34" />
              <rect x="203" y="0" width="1.5" height="34" />
              <rect x="207" y="0" width="3.5" height="34" />
              <rect x="213" y="0" width="2" height="34" />
            </g>
          </svg>
          <div className="cp-info__barcode-lbl">NC-77 · 441 20 · CONSTANTS</div>

          <div className="cp-info__bar cp-info__bar--1" />
          <div className="cp-info__bar cp-info__bar--2" />
          <div className="cp-info__scan" />
        </div>

        <img
          className="cp-info__logo"
          src={logoUrl}
          alt=""
          draggable={false}
        />

        <div className="cp-info__fine">
          ONLY 9 COINS AND CHEAP CERTIFIED · PROCURE ANY ACCESS · OPEN 24H · NO REFUND
        </div>
        <svg className="cp-info__corner" viewBox="0 0 16 16">
          <rect x="1" y="1" width="14" height="14" fill="none" stroke="#3fe0ee" strokeWidth="1.3" />
          <path d="M2 14 L14 2" stroke="#3fe0ee" strokeWidth="1.3" />
        </svg>
      </div>
    </div>
  );
}
