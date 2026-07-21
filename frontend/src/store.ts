export type LogType = "info" | "success" | "warning" | "error";
export type LogEntry = { id: string; text: string; type: LogType };

type State = {
  visible: boolean;
  version: string;
  progress: number;
  progressMessage: string;
  logs: LogEntry[];
  maxLogs: number;
};

const initialState: State = {
  visible: false,
  version: "dev",
  progress: 0,
  progressMessage: "STAND BY...",
  logs: [],
  maxLogs: 40,
};

let state: State = { ...initialState, logs: [] };
const listeners = new Set<() => void>();

function emit() {
  for (const fn of listeners) {
    try {
      fn();
    } catch {
      /* ignore subscriber errors */
    }
  }
}

export function subscribe(fn: () => void) {
  listeners.add(fn);
  return () => {
    listeners.delete(fn);
  };
}

export function getState() {
  return state;
}

function classifyMessage(text: string): LogType {
  if (/\[ERROR\]|\[-\]|error|fail|fatal/i.test(text)) return "error";
  if (/success|finished|loaded|complete|done/i.test(text)) return "success";
  if (/running|loading|starting|found|wait/i.test(text)) return "warning";
  return "info";
}

// Contract used by the real exploit chain via window.*
export function showUI(version?: string) {
  state = {
    ...initialState,
    logs: [],
    visible: true,
    version: version || state.version || "dev",
  };
  emit();
}

export function hideUI() {
  state = { ...state, visible: false, logs: [] };
  emit();
}

export function addLog(text: string, type?: string) {
  if (text == null) return;
  const msg = String(text);
  const entryType = (type as LogType) || classifyMessage(msg);
  const entry: LogEntry = {
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    text: msg,
    type: entryType,
  };
  const logs = state.logs.concat(entry);
  while (logs.length > state.maxLogs) logs.shift();
  state = { ...state, logs };
  emit();
}

export function updateProgress(percent: number, message = "Loading...") {
  const p = Math.max(0, Math.min(100, Number(percent) || 0));
  const msg = message != null ? String(message) : state.progressMessage;
  state = {
    ...state,
    progress: p,
    progressMessage: msg,
  };
  // Match legacy + pldmgr: progress updates also land in the log
  addLog(msg, "warning");
}
