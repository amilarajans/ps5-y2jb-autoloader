import index from "./index.html";

const server = Bun.serve({
  port: 3000,
  routes: {
    "/": index,
  },
  development: true,
});

console.log(`Dev server running at ${server.url}`);
