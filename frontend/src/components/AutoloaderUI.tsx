import { useCallback, useEffect, useRef, useSyncExternalStore } from "react";
import { getState, subscribe } from "../store";
import { Atmosphere } from "./Atmosphere";
import { HudBar } from "./HudBar";
import { Y2JBLogo } from "./Y2JBLogo";

const PROMPT: Record<string, string> = {
  info: "»",
  success: "+",
  warning: "*",
  error: "!",
};

function useScaleToFit() {
  const apply = useCallback(() => {
    const shell = document.querySelector(".splash-shell") as HTMLElement | null;
    if (!shell) return;
    const sw = window.innerWidth;
    const sh = window.innerHeight;
    const scale = Math.min(sw / 1920, sh / 1080);
    shell.style.transform = `scale(${scale})`;
    const ox = (sw - 1920 * scale) / 2;
    const oy = (sh - 1080 * scale) / 2;
    shell.style.left = `${Math.max(0, ox)}px`;
    shell.style.top = `${Math.max(0, oy)}px`;
  }, []);

  useEffect(() => {
    apply();
    window.addEventListener("resize", apply);
    return () => window.removeEventListener("resize", apply);
  }, [apply]);
}

export function AutoloaderUI() {
  const state = useSyncExternalStore(subscribe, getState);
  const scrollRef = useRef<HTMLDivElement>(null);
  useScaleToFit();

  useEffect(() => {
    const el = scrollRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [state.logs]);

  if (!state.visible) return null;

  const p = Math.max(0, Math.min(100, Number(state.progress) || 0));

  return (
    <div className="splash-shell" data-theme="cyberpunk" role="dialog" aria-label="Y2JB Autoloader">
      <Atmosphere />
      <div className="cp-hazard" aria-hidden="true" />
      <HudBar version={state.version} />

      <div className="splash-layout">
        <header className="splash-header">
          <p className="splash-tagline">BREACH PROTOCOL // SYSTEM ACCESS</p>
          <h1 className="cp-logo" aria-label="Y2JB Autoload">
            <span className="cp-logo__mark">
              <Y2JBLogo />
            </span>
            <span className="cp-logo__auto" data-text="Autoload">
              Autoload
            </span>
            <span className="cp-logo__underline" aria-hidden="true" />
          </h1>
          <p className="splash-subtitle">
            payload chain // <span>{state.version || "dev"}</span>
          </p>
          <div className="splash-status">
            <span className="splash-pill">
              <span className="splash-pill__dot" />
              net secured
            </span>
            <span className="splash-pill splash-pill--cyan">
              <span className="splash-pill__dot" />
              ice bypass
            </span>
          </div>
        </header>

        {/* Log on top */}
        <section className="glass-card splash-log" aria-label="Autoloader log">
          <div className="splash-log__chrome">
            <span>// breach // console</span>
            <span className="splash-log__meta">
              BUF {String(state.logs.length).padStart(2, "0")} // LIVE
            </span>
          </div>
          <div className="splash-log__scroll" ref={scrollRef} id="logContainer">
            {state.logs.length === 0 ? (
              <div className="splash-log__empty">Waiting for log output…</div>
            ) : (
              state.logs.map((log, i) => {
                const type = log.type || "info";
                return (
                  <div key={log.id} className={`cp-log-line cp-log-line--${type}`}>
                    <span className="cp-log-line__num" aria-hidden="true">
                      {String(i + 1).padStart(3, " ")}
                    </span>
                    <span className="cp-log-line__prompt" aria-hidden="true">
                      {PROMPT[type] || "»"}
                    </span>
                    <span className="cp-log-line__text">{log.text}</span>
                  </div>
                );
              })
            )}
            <div className="cp-log-line cp-log-line--info">
              <span className="cp-log-line__num" aria-hidden="true">
                {"   "}
              </span>
              <span className="cp-log-line__prompt" aria-hidden="true">
                »
              </span>
              <span className="cp-log-line__text">
                <span className="cp-log-line__cursor" aria-hidden="true" />
              </span>
            </div>
          </div>
        </section>

        {/* Progress on bottom */}
        <section className="splash-progress" aria-label="Payload progress">
          <div className="splash-progress__labels">
            <span>// payload pipeline</span>
            <span>{Math.round(p)}%</span>
          </div>
          <div className="splash-progress__track">
            <div
              className="splash-progress__fill"
              id="progressBar"
              style={{ width: `calc((100% - 6px) * ${p / 100})` }}
            />
            <div className="splash-progress__ticks" />
            <div className="splash-progress__msg" id="progressLabel">
              {state.progressMessage || "STAND BY..."}
            </div>
          </div>
          <p className="splash-punchline">
            Wake the fuck up, samurai.
            <span className="splash-punchline__sub">We have a city to burn.</span>
          </p>
        </section>
      </div>
    </div>
  );
}
