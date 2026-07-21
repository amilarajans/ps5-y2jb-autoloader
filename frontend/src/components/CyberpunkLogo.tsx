/**
 * Cyberpunk 2077 wordmark — package HUD asset.
 */
import logoUrl from "../assets/images/cyberpunk-logo.svg";

export function CyberpunkLogo() {
  return (
    <div className="cp-cp2077-logo" aria-hidden="true">
      <img className="cp-cp2077-logo__img" src={logoUrl} alt="" draggable={false} />
    </div>
  );
}
