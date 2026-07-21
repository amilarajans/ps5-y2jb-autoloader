import { readFileSync, writeFileSync } from "fs";
import { dirname, join } from "path";

const outdir = join(import.meta.dir, "..", "dist");

const result = await Bun.build({
  entrypoints: [join(import.meta.dir, "..", "splash.html")],
  outdir,
  minify: true,
});

if (!result.success) {
  for (const log of result.logs) console.error(log);
  process.exit(1);
}

const htmlPath = join(outdir, "splash.html");
let html = readFileSync(htmlPath, "utf8");

// Inline every emitted <link rel="stylesheet"> and <script type="module">
// into the HTML itself, so the output is one flat self-contained file —
// the real exploit page loads a single splash.html, not a JS/CSS pair.
html = html.replace(
  /<link rel="stylesheet"[^>]*href="([^"]+)"[^>]*>/g,
  (_match, href) => {
    const css = readFileSync(join(outdir, href.replace(/^\//, "")), "utf8");
    return `<style>${css}</style>`;
  }
);

html = html.replace(
  /<script([^>]*)\ssrc="([^"]+)"([^>]*)><\/script>/g,
  (_match, before, src, after) => {
    let js = readFileSync(join(outdir, src.replace(/^\//, "")), "utf8");
    // The bundle can legitimately contain the literal substring "</script"
    // inside a string/regex literal (React's own internals do). The HTML
    // parser doesn't know that — it would close the tag right there and
    // dump the rest of the bundle onto the page as plain text. Escape it.
    js = js.replace(/<\/script/gi, "<\\/script");
    return `<script${before}${after}>${js}</script>`;
  }
);

writeFileSync(htmlPath, html);
console.log(`Built single-file ${htmlPath} (${(html.length / 1024).toFixed(1)} KB)`);
