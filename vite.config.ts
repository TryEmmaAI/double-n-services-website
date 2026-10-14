import { defineConfig, type Plugin } from "vite";
import react from "@vitejs/plugin-react";
import { mkdirSync, readFileSync, readdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";

const here = fileURLToPath(new URL(".", import.meta.url));

/** After the build, write a real HTML file for every page (title, meta, schema and the
 *  full content), so search engines and AI crawlers that don't run JavaScript see it. */
function prerender(): Plugin {
  return {
    name: "prerender-pages",
    apply: "build",
    closeBundle() {
      const dist = join(here, "dist");
      const template = readFileSync(join(dist, "index.html"), "utf8");
      const assetsTs = readFileSync(join(here, "src/assets.ts"), "utf8");
      const base = /ASSET_BASE = "([^"]*)"/.exec(assetsTs)![1];
      const overrides: Record<string, string> = {};
      for (const m of assetsTs.matchAll(/"([^"]+)": "([^"]+)"/g)) overrides[m[1]] = m[2];
      const asset = (f: string) => overrides[f] || base + f;
      const rewrite = (s: string) => s.replace(/\/assets\/([^"'?#\s)]+)/g, (_m, f) => asset(f));
      const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");
      const fonts = `<style>@font-face{font-family:"Newsreader";src:url("${asset("fonts/newsreader.woff2")}") format("woff2-variations");font-weight:200 800;font-style:normal;font-display:swap}@font-face{font-family:"Archivo";src:url("${asset("fonts/archivo.woff2")}") format("woff2-variations");font-weight:100 900;font-stretch:62% 125%;font-display:swap}</style>`;
      const dir = join(here, "src/pages");
      let n = 0;
      for (const file of readdirSync(dir)) {
        if (file === "index.ts") continue;
        const src = readFileSync(join(dir, file), "utf8");
        const p = JSON.parse(src.slice(src.indexOf("const page = ") + 13, src.lastIndexOf(";\nexport default page;")));
        const head = [
          `<title>${esc(p.title)}</title>`,
          ...p.meta.map(([k, name, c]: string[]) => `<meta ${k}="${esc(name)}" content="${esc(rewrite(c))}">`),
          `<link rel="canonical" href="${p.canonical}">`,
          ...p.alternates.map(([l, h]: string[]) => `<link rel="alternate" hreflang="${l}" href="${h}">`),
          ...p.jsonld.map((j: string) => `<script type="application/ld+json">${rewrite(j)}</script>`),
          `<link rel="icon" href="${asset("img/favicon.webp")}" type="image/webp">`,
          `<link rel="preload" href="${asset("fonts/newsreader.woff2")}" as="font" type="font/woff2" crossorigin>`,
          `<link rel="preload" href="${asset("fonts/archivo.woff2")}" as="font" type="font/woff2" crossorigin>`,
          fonts,
          p.redirect ? `<meta http-equiv="refresh" content="0; url=${p.redirect}">` : "",
        ].join("\n");
        const html = template
          .replace(/<html lang="[^"]*">/, `<html lang="${p.lang}">`)
          .replace(/<title>[\s\S]*?<\/title>/, () => head)
          .replace('<div id="root"></div>', () => `<div id="root" data-prerendered="${p.path}">${rewrite(p.body)}</div>`);
        const out = p.path === "/" ? dist : join(dist, p.path);
        mkdirSync(out, { recursive: true });
        writeFileSync(join(out, "index.html"), html);
        n++;
      }
      console.log(`prerendered ${n} pages`);
    },
  };
}

export default defineConfig({ plugins: [react(), prerender()] });
