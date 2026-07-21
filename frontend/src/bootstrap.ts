import { createRoot, type Root } from "react-dom/client";
import { createElement } from "react";
import { AutoloaderUI } from "./components/AutoloaderUI";
import { showUI, updateProgress, addLog, hideUI } from "./store";
import "./styles/fonts.css";
import "./styles/splash.css";

declare global {
  interface Window {
    autoloader_ui: (version?: string) => void;
    updateProgress: (percent: number, message?: string) => void;
    uiLog: (message: string, type?: string) => void;
    hideUI: () => void;
    __Y2JB_VERSION__?: string;
    __Y2JB_UI_READY__?: boolean;
  }
}

let root: Root | null = null;

function shouldHideOnError(message: unknown) {
  return (
    typeof message === "string" &&
    (message.includes("[ERROR]") || message.includes("[-]"))
  );
}

/**
 * Same global API the real exploit's main.js calls.
 * Keep names/signatures stable so dist/splash.html is a drop-in.
 */
export function bootstrap() {
  window.autoloader_ui = function autoloader_ui(version?: string) {
    const ver =
      version ||
      (typeof window.__Y2JB_VERSION__ !== "undefined" ? window.__Y2JB_VERSION__ : "dev");
    showUI(ver);
  };

  window.updateProgress = function updateProgressBridge(percent, message) {
    updateProgress(percent, message != null ? message : "Loading...");
  };

  window.uiLog = function uiLog(message, type) {
    if (shouldHideOnError(message)) {
      hideUI();
      return;
    }
    addLog(message, type);
  };

  window.hideUI = hideUI;

  const container = document.getElementById("root");
  if (!container) throw new Error("#root not found");
  if (!root) {
    root = createRoot(container);
    root.render(createElement(AutoloaderUI));
  }

  window.__Y2JB_UI_READY__ = true;
  try {
    window.dispatchEvent(new Event("y2jb-ui-ready"));
  } catch {
    /* old engines */
  }
}
