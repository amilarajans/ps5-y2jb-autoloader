/**
 * Atmosphere (background) + combat HUD layer:
 *   TL health · ML quickhacks · BL arasaka info
 *   TR minimap · MR uplink · BR weapon
 *
 * HUD sits in its own stacking layer above the main splash chrome
 * so package panels are never clipped behind the console.
 */

import { MinimapPanel } from "./MinimapPanel";
import { HealthPanel } from "./HealthPanel";
import { InfoPanel } from "./InfoPanel";
import { WeaponHud } from "./WeaponHud";

const COLS = 18;
const ROWS = 24;

const BINARY_L =
  "01001000 01000001\n00110001 00110000\n11010010 10101100\n01001110 01000101\n01010010 01010101\n01001010 01000010\n01001001 01001110\n01000001 01000011\n01010110 01000101\n00110000 00110111\n01001000 01000001\n00110001 00110000\n11010010 10101100\n01001110 01000101\n01010010 01010101\n01001010 01000010";

const BINARY_R =
  "01001100 01001001\n01001110 01001011\n00100000 00110010\n00110000 00110111\n01001000 01000001\n00110001 00110000\n11010010 10101100\n01001110 01000101\n01001100 01001001\n01001110 01001011\n00100000 00110010\n00110000 00110111\n01001000 01000001\n00110001 00110000\n11010010 10101100\n01001110 01000101";

function makeColumn(seed: number) {
  const lines: string[] = [];
  for (let i = 0; i < ROWS; i++) {
    const n = ((seed * 17 + i * 31) % 1000) / 1000;
    lines.push(n.toFixed(4));
  }
  return lines.join("\n");
}

export function Atmosphere() {
  return (
    <>
      {/* Background only — z-index 0, may clip */}
      <div className="cp-atm" aria-hidden="true">
        <div className="cp-atm__haze" />
        <div className="cp-atm__grid" />
        <div className="cp-atm__vignette" />
        <div className="cp-atm__scanlines" />

        <div className="cp-atm__rain">
          {Array.from({ length: COLS }, (_, i) => (
            <pre
              key={i}
              className={`cp-atm__col cp-atm__col--${(i % 3) + 1}`}
              style={{
                left: `${(i / COLS) * 100}%`,
                animationDelay: `${-(i * 0.45)}s`,
                animationDuration: `${10 + (i % 5)}s`,
              }}
            >
              {makeColumn(i + 3)}
            </pre>
          ))}
        </div>

        <div className="cp-depth">
          <div className="cp-depth__plane cp-depth__plane--1" />
          <div className="cp-depth__plane cp-depth__plane--2" />
        </div>

        <div className="cp-binary cp-binary--right">
          <pre>{BINARY_R}</pre>
        </div>
        <div className="cp-binary cp-binary--left cp-binary--faint">
          <pre>{BINARY_L}</pre>
        </div>

        <svg className="cp-skill-circuit" viewBox="0 0 1920 1080" preserveAspectRatio="none">
          <g className="cp-skill-circuit__paths">
            <path d="M1800 220 H1640 V380 H1720 V540 H1580" />
            <path d="M1720 920 H1520 V800 H1360" />
          </g>
          <g className="cp-skill-circuit__nodes">
            <circle cx="1640" cy="220" r="5" />
            <circle cx="1520" cy="920" r="4" />
          </g>
        </svg>

        <div className="cp-data-streams">
          <span className="cp-stream cp-stream--1" />
          <span className="cp-stream cp-stream--2" />
          <span className="cp-stream cp-stream--3" />
        </div>

        <div className="cp-tape cp-tape--h" />
        <div className="cp-kana cp-kana--r">ナイトシティ・システム侵入</div>
        <div className="cp-wm">2077</div>

        <div className="cp-gauge">
          <div className="cp-gauge__outer" />
          <div className="cp-gauge__inner" />
          <svg className="cp-gauge__svg" viewBox="0 0 100 100">
            <circle
              cx="50"
              cy="50"
              r="46"
              fill="none"
              stroke="rgba(0,240,255,0.25)"
              strokeWidth="0.5"
              strokeDasharray="1 5"
            />
            <circle
              cx="50"
              cy="50"
              r="30"
              fill="none"
              stroke="rgba(255,60,60,0.4)"
              strokeWidth="1"
              strokeDasharray="60 200"
              transform="rotate(-90 50 50)"
            />
          </svg>
          <div className="cp-gauge__label">SYNC</div>
        </div>

        <div className="cp-gblock cp-gblock--2" />
        <div className="cp-gblock cp-gblock--3" />

        <div className="cp-corners">
          <div className="cp-corner cp-corner--tl" />
          <div className="cp-corner cp-corner--tr" />
          <div className="cp-corner cp-corner--bl" />
          <div className="cp-corner cp-corner--br" />
        </div>
      </div>

      {/* Combat HUD — above splash chrome, no clip */}
      <div className="cp-hud-layer" aria-hidden="true">
        {/* TL */}
        <HealthPanel />

        {/* ML */}
        <div className="cp-sidepanel cp-sidepanel--left-mid">
          <div className="cp-sidepanel__corner cp-sidepanel__corner--tl" />
          <div className="cp-sidepanel__title">// QUICKHACKS</div>
          <div className="cp-sidepanel__row cp-sidepanel__row--active">
            <span>REBOOT OPTICS</span>
            <span className="cp-sidepanel__tag">READY</span>
          </div>
          <div className="cp-sidepanel__row">
            <span>SHORT CIRCUIT</span>
            <span className="cp-sidepanel__tag">READY</span>
          </div>
          <div className="cp-sidepanel__row">
            <span>CONTAGION</span>
            <span className="cp-sidepanel__tag">READY</span>
          </div>
          <div className="cp-sidepanel__row cp-sidepanel__row--dim">
            <span>BREACH PROTOCOL</span>
            <span className="cp-sidepanel__tag">WAIT</span>
          </div>
          <div className="cp-mini-bar cp-mini-bar--red">
            <div className="cp-mini-bar__fill cp-mini-bar__fill--hot" style={{ width: "64%" }} />
          </div>
          <div className="cp-widget__foot">
            RAM <span className="cp-widget__val--yellow">6 / 9</span>
          </div>
        </div>

        {/* BL */}
        <InfoPanel />

        {/* TR */}
        <MinimapPanel />

        {/* MR */}
        <div className="cp-widget cp-widget--uplink">
          <div className="cp-widget__title cp-widget__title--red">UPLINK NODES</div>
          <div className="cp-uplink-row">
            <span>NC-CENTRAL</span>
            <span className="cp-dot cp-dot--on">●</span>
          </div>
          <div className="cp-uplink-row">
            <span>WATSON RELAY</span>
            <span className="cp-dot cp-dot--on">●</span>
          </div>
          <div className="cp-uplink-row">
            <span>PACIFICA GW</span>
            <span className="cp-dot cp-dot--half">◐</span>
          </div>
          <div className="cp-uplink-row cp-uplink-row--dim">
            <span>BADLANDS SAT</span>
            <span className="cp-dot cp-dot--off">○</span>
          </div>
          <div className="cp-mini-bar">
            <div className="cp-mini-bar__fill cp-mini-bar__fill--cyan" style={{ width: "78%" }} />
          </div>
          <div className="cp-widget__foot">
            PING <span className="cp-widget__val--cyan">14ms</span>
          </div>
        </div>

        {/* BR */}
        <WeaponHud />
      </div>
    </>
  );
}
