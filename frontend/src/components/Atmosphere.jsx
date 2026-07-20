/**
 * CP2077 atmosphere — base HUD + extras ported from CPAtmosphere.dc.html
 * and side widgets from Y2JB Autoloader.dc.html
 */

const BINARY_L =
  '01001000 01000001\n00110001 00110000\n11010010 10101100\n01001110 01000101\n01010010 01010101\n01001010 01000010\n01001001 01001110\n01000001 01000011\n01010110 01000101\n00110000 00110111\n01001000 01000001\n00110001 00110000\n11010010 10101100\n01001110 01000101\n01010010 01010101\n01001010 01000010'

const BINARY_R =
  '01001100 01001001\n01001110 01001011\n00100000 00110010\n00110000 00110111\n01001000 01000001\n00110001 00110000\n11010010 10101100\n01001110 01000101\n01001100 01001001\n01001110 01001011\n00100000 00110010\n00110000 00110111\n01001000 01000001\n00110001 00110000\n11010010 10101100\n01001110 01000101'

export default function Atmosphere() {
  return (
    <>
      <div className="cp-haze" aria-hidden="true" />
      <div className="cp-grid" aria-hidden="true" />

      {/* Soft depth planes */}
      <div className="cp-depth" aria-hidden="true">
        <div className="cp-depth__plane cp-depth__plane--1" />
        <div className="cp-depth__plane cp-depth__plane--2" />
        <div className="cp-depth__plane cp-depth__plane--3" />
      </div>

      {/* Binary edges */}
      <div className="cp-binary cp-binary--left" aria-hidden="true">
        <pre>{BINARY_L}</pre>
      </div>
      <div className="cp-binary cp-binary--right" aria-hidden="true">
        <pre>{BINARY_R}</pre>
      </div>

      {/* Skill-tree circuits */}
      <svg
        className="cp-skill-circuit"
        viewBox="0 0 1920 1080"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <g className="cp-skill-circuit__paths">
          <path d="M120 200 H280 V360 H200 V520 H340" />
          <path d="M1800 220 H1640 V380 H1720 V540 H1580" />
          <path d="M200 900 H400 V780 H560" />
          <path d="M1720 920 H1520 V800 H1360" />
        </g>
        <g className="cp-skill-circuit__nodes">
          <circle cx="280" cy="200" r="5" />
          <circle cx="340" cy="520" r="5" />
          <circle cx="1640" cy="220" r="5" />
          <circle cx="400" cy="900" r="4" />
          <circle cx="1520" cy="920" r="4" />
        </g>
      </svg>

      {/* HUD bars */}
      <div className="cp-hud-bar cp-hud-bar--top" aria-hidden="true">
        <span>PROTOCOL 6920-A44 // ACCESS GRANTED</span>
        <span className="cp-hud-bar__mid">NIGHT CITY CORP RECORDS // Y2JB LINK</span>
        <span>
          <span className="cp-hud-bar__warn">!</span> ICE BYPASS ACTIVE
        </span>
      </div>
      <div className="cp-hud-bar cp-hud-bar--bottom" aria-hidden="true">
        <span>NC-4884 0252 5584 0415</span>
        <span className="cp-hud-bar__sep">//</span>
        <span>KERNEL INTERFACE</span>
        <span className="cp-hud-bar__sep">//</span>
        <span>SELECT // EXECUTE</span>
      </div>

      {/* Data streams */}
      <div className="cp-data-streams" aria-hidden="true">
        <span className="cp-stream cp-stream--1" />
        <span className="cp-stream cp-stream--2" />
        <span className="cp-stream cp-stream--3" />
      </div>

      {/* Radar */}
      <div className="cp-radar" aria-hidden="true">
        <span className="cp-radar__ring" />
        <span className="cp-radar__ring cp-radar__ring--2" />
        <span className="cp-radar__sweep" />
        <span className="cp-radar__cross" />
      </div>

      {/* ── Ported from CPAtmosphere.dc.html ── */}

      {/* Hazard tape */}
      <div className="cp-tape cp-tape--h" aria-hidden="true" />
      <div className="cp-tape cp-tape--v" aria-hidden="true" />

      {/* Katakana signage */}
      <div className="cp-kana cp-kana--r" aria-hidden="true">
        ナイトシティ・システム侵入
      </div>
      <div className="cp-kana cp-kana--l" aria-hidden="true">
        サムライ・起動
      </div>

      {/* Big 2077 watermark */}
      <div className="cp-wm" aria-hidden="true">
        2077
      </div>

      {/* SYNC gauge */}
      <div className="cp-gauge" aria-hidden="true">
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

      {/* Glitch blocks */}
      <div className="cp-gblock cp-gblock--1" aria-hidden="true" />
      <div className="cp-gblock cp-gblock--2" aria-hidden="true" />
      <div className="cp-gblock cp-gblock--3" aria-hidden="true" />

      {/* Warning label */}
      <div className="cp-warn-label" aria-hidden="true">
        DELAMAIN 6.1 // TRACE ACTIVE
      </div>

      {/* ── Ported side widgets from Y2JB Autoloader.dc.html ── */}

      {/* Cyberdeck / RAM — scanner-style HUD widget */}
      <div className="cp-widget cp-widget--deck" aria-hidden="true">
        <div className="cp-widget__title cp-widget__title--cyan">
          CYBERDECK <span>V.6.62</span>
        </div>
        <div className="cp-deck-ram">
          <span className="cp-deck-ram__label">RAM</span>
          <div className="cp-deck-ram__slots">
            <span className="cp-deck-ram__slot cp-deck-ram__slot--on" />
            <span className="cp-deck-ram__slot cp-deck-ram__slot--on" />
            <span className="cp-deck-ram__slot cp-deck-ram__slot--on" />
            <span className="cp-deck-ram__slot cp-deck-ram__slot--on" />
          </div>
          <span className="cp-deck-ram__count">4 / 4</span>
        </div>
        <div className="cp-deck-row">
          <span>OPTICS</span>
          <span className="cp-deck-row__ok">READY</span>
        </div>
        <div className="cp-deck-row">
          <span>SHORT CIRCUIT</span>
          <span className="cp-deck-row__ok">READY</span>
        </div>
        <div className="cp-deck-row cp-deck-row--busy">
          <span>BREACH PROTOCOL</span>
          <span className="cp-deck-row__wait">RECOMP…</span>
        </div>
        <div className="cp-widget__foot">
          BUFFER <span className="cp-widget__val--cyan">SECURE</span>
        </div>
      </div>

      {/* UPLINK NODES */}
      <div className="cp-widget cp-widget--uplink" aria-hidden="true">
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
          <div className="cp-mini-bar__fill cp-mini-bar__fill--cyan" style={{ width: '78%' }} />
        </div>
        <div className="cp-widget__foot">
          PING <span className="cp-widget__val--cyan">14ms</span>
        </div>
      </div>

      {/* QUICKHACKS */}
      <div className="cp-sidepanel cp-sidepanel--left" aria-hidden="true">
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
          <div className="cp-mini-bar__fill cp-mini-bar__fill--hot" style={{ width: '64%' }} />
        </div>
        <div className="cp-widget__foot">
          RAM <span className="cp-widget__val--yellow">6 / 9</span>
        </div>
      </div>

      {/* SCAN // DATA */}
      <div className="cp-sidepanel cp-sidepanel--right" aria-hidden="true">
        <div className="cp-sidepanel__corner cp-sidepanel__corner--br" />
        <div className="cp-sidepanel__title cp-sidepanel__title--cyan">SCAN // DATA</div>
        <div className="cp-sidepanel__kv">
          <span>TARGET</span>
          <span className="cp-sidepanel__val">AUTOLOADER</span>
        </div>
        <div className="cp-sidepanel__kv">
          <span>AFFIL</span>
          <span className="cp-sidepanel__val">Y2JB</span>
        </div>
        <div className="cp-sidepanel__kv">
          <span>FIRMWARE</span>
          <span className="cp-sidepanel__val">PS5 / EXP</span>
        </div>
        <div className="cp-sidepanel__kv">
          <span>STATUS</span>
          <span className="cp-sidepanel__val cp-sidepanel__val--ok">LINKED</span>
        </div>
        <div className="cp-sidepanel__map" />
        <div className="cp-sidepanel__caption">NODE 0x1F.4C // SECTOR 7</div>
      </div>

      {/* Base FX */}
      <div className="cp-noise" aria-hidden="true" />
      <div className="cp-vignette" aria-hidden="true" />
      <div className="cp-scanlines" aria-hidden="true" />
      <div className="cp-corners" aria-hidden="true">
        <div className="cp-corner cp-corner--tl" />
        <div className="cp-corner cp-corner--tr" />
        <div className="cp-corner cp-corner--bl" />
        <div className="cp-corner cp-corner--br" />
      </div>
    </>
  )
}
