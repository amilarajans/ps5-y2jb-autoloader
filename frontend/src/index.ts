// Dev entry — mounts the UI and runs the simulated demo sequence so the
// design can be reviewed with `bun run dev`, without needing a real PS5.
import { bootstrap } from "./bootstrap";
import { runDemo } from "./demo";

bootstrap();
runDemo();
