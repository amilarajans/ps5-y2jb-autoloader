// Simulated run for local development only — not in production splash.html.

const steps: Array<
  | { log: string; type?: "info" | "success" | "warning" | "error" }
  | { progress: number; msg: string }
> = [
  { log: "Y2JB Autoloader v0.9-demo by PLK", type: "success" },
  { progress: 5, msg: "Running userland exploit..." },
  { log: "Starting Exploit", type: "info" },
  { log: "Spraying JS heap...", type: "info" },
  { log: "Triggering vulnerability...", type: "info" },
  { progress: 25, msg: "Userland RCE achieved" },
  { log: "Userland code execution achieved", type: "success" },
  { progress: 45, msg: "Loading kernel exploit..." },
  { log: "Sending kernel payload...", type: "info" },
  { log: "Waiting for kernel R/W...", type: "info" },
  { progress: 70, msg: "Kernel R/W achieved" },
  { log: "Kernel read/write achieved", type: "success" },
  { progress: 88, msg: "Patching code signing..." },
  { log: "Homebrew enabled", type: "success" },
  { progress: 100, msg: "Autoload sequence starting" },
  { log: "Loading goldhen_v2.4b17.elf", type: "info" },
  { log: "Loading etaHEN_1.8.elf", type: "info" },
  { log: "All payloads launched", type: "success" },
];

export async function runDemo() {
  window.autoloader_ui("v0.9-cyberpunk");
  let i = 0;
  while (true) {
    const step = steps[i % steps.length];
    if ("progress" in step) {
      window.updateProgress(step.progress, step.msg);
    } else {
      window.uiLog(step.log, step.type);
    }
    await new Promise((r) => setTimeout(r, 650));
    i++;
    if (i % steps.length === 0) {
      await new Promise((r) => setTimeout(r, 1500));
      window.autoloader_ui("v0.9-cyberpunk");
    }
  }
}
