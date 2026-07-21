/**
 * Y2JB wordmark — RGB split, glitch slices, slash letterforms.
 */
export function Y2JBLogo({ className = "" }: { className?: string }) {
  const uid = "y2jb";
  const glowId = `${uid}-glow`;
  const ltrId = `${uid}-ltr`;
  const sa = `${uid}-sa`;
  const sb = `${uid}-sb`;
  const sc = `${uid}-sc`;

  return (
    <svg
      className={`cp-y2jb-svg ${className}`.trim()}
      viewBox="-40 -10 720 175"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Y2JB"
    >
      <defs>
        <filter id={glowId} x="-20%" y="-30%" width="140%" height="160%">
          <feGaussianBlur in="SourceGraphic" stdDeviation="1.6" result="blur" />
          <feColorMatrix
            in="blur"
            type="matrix"
            values="1 0 0 0 0  0 0.9 0 0 0  0 0 0.2 0 0  0 0 0 0.6 0"
            result="glow"
          />
          <feMerge>
            <feMergeNode in="glow" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>

        <g id={ltrId}>
          <path d="M 0 24 L 40 6 L 74 24 L 74 38 L 52 38 L 96 6 L 142 6 L 142 28 L 112 28 L 74 64 L 74 134 L 34 134 L 34 64 L 0 38 Z" />
          <path d="M 172 16 L 278 16 L 304 42 L 304 64 L 220 64 L 290 114 L 290 134 L 162 134 L 162 112 L 254 112 L 184 64 L 184 50 L 272 50 L 272 42 L 196 42 Z" />
          <path d="M 324 16 L 418 16 L 442 6 L 460 30 L 418 40 L 418 100 L 400 134 L 328 134 L 306 112 L 306 92 L 344 92 L 344 106 L 378 106 L 378 40 L 324 40 Z" />
          <path
            fillRule="evenodd"
            d="M 478 16 L 560 16 L 598 48 L 560 70 L 598 102 L 560 134 L 478 134 Z M 502 38 L 502 60 L 548 60 L 560 50 L 548 38 Z M 502 84 L 502 112 L 548 112 L 560 102 L 548 84 Z"
          />
          <path d="M 588 18 L 660 2 L 678 22 L 610 40 Z" />
          <path d="M 566 120 L 636 96 L 650 112 L 588 136 Z" />
          <path d="M -34 40 L 34 18 L 26 34 L -20 52 Z" />
        </g>

        <clipPath id={sa}>
          <rect x="-40" y="44" width="720" height="15" />
        </clipPath>
        <clipPath id={sb}>
          <rect x="-40" y="96" width="720" height="12" />
        </clipPath>
        <clipPath id={sc}>
          <rect x="-40" y="20" width="720" height="8" />
        </clipPath>
      </defs>

      <g className="cp-y2jb-svg__rgb" transform="skewX(-16)">
        <use href={`#${ltrId}`} fill="#ff2a6d" transform="translate(-6 3)" opacity="0.6" />
        <use href={`#${ltrId}`} fill="#00e5f0" transform="translate(6 -3)" opacity="0.7" />
        <use href={`#${ltrId}`} fill="#fcee0a" filter={`url(#${glowId})`} />

        <g clipPath={`url(#${sa})`}>
          <use href={`#${ltrId}`} fill="#00f0ff" className="cp-y2jb-svg__slice-a" />
        </g>
        <g clipPath={`url(#${sb})`}>
          <use href={`#${ltrId}`} fill="#ff2a6d" className="cp-y2jb-svg__slice-b" />
        </g>
        <g clipPath={`url(#${sc})`}>
          <use href={`#${ltrId}`} fill="#ffffff" opacity="0.85" className="cp-y2jb-svg__slice-a" />
        </g>

        <g className="cp-y2jb-svg__scratches">
          <rect x="16" y="58" width="230" height="4" fill="#050508" opacity="0.7" />
          <rect x="250" y="88" width="200" height="3" fill="#050508" opacity="0.6" />
          <rect x="440" y="52" width="120" height="3" fill="#00e5f0" opacity="0.8" />
          <rect x="90" y="72" width="80" height="2" fill="#fff59a" opacity="0.85" />
          <rect x="320" y="30" width="60" height="2" fill="#00f0ff" opacity="0.7" />
          <path d="M150 40 L196 40 L188 50 L142 50 Z" fill="#050508" opacity="0.55" />
          <path d="M382 74 L436 74 L428 84 L374 84 Z" fill="#050508" opacity="0.5" />
          <path d="M500 44 L544 44 L538 52 L494 52 Z" fill="#050508" opacity="0.45" />
        </g>
      </g>
    </svg>
  );
}
