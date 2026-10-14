import { useEffect, useState } from "react";
import { pages, type Page } from "./pages";
import { assetUrl, rewriteAssets } from "./assets";
import { initSite } from "./site";

function currentPath(): string {
  const path = window.location.pathname;
  return path.endsWith("/") ? path : path + "/";
}

const FONTS = `
@font-face { font-family: "Newsreader"; src: url("${assetUrl("fonts/newsreader.woff2")}") format("woff2-variations"); font-weight: 200 800; font-style: normal; font-display: swap; }
@font-face { font-family: "Archivo"; src: url("${assetUrl("fonts/archivo.woff2")}") format("woff2-variations"); font-weight: 100 900; font-stretch: 62% 125%; font-display: swap; }`;

function applyHead(page: Page) {
  document.title = page.title;
  document.documentElement.lang = page.lang;
  document.querySelectorAll("[data-page-head]").forEach((n) => n.remove());
  const add = (el: HTMLElement) => { el.setAttribute("data-page-head", ""); document.head.appendChild(el); };
  for (const [key, name, content] of page.meta) {
    const m = document.createElement("meta");
    m.setAttribute(key, name);
    m.setAttribute("content", rewriteAssets(content));
    add(m);
  }
  const canonical = document.createElement("link");
  canonical.rel = "canonical"; canonical.href = page.canonical; add(canonical);
  for (const [lang, href] of page.alternates) {
    const l = document.createElement("link");
    l.rel = "alternate"; l.hreflang = lang; l.href = href; add(l);
  }
  for (const json of page.jsonld) {
    const s = document.createElement("script");
    s.type = "application/ld+json"; s.textContent = rewriteAssets(json); add(s);
  }
  const icon = document.createElement("link");
  icon.rel = "icon"; icon.href = assetUrl("img/favicon.webp"); add(icon);
  const fonts = document.createElement("style");
  fonts.textContent = FONTS; add(fonts);
}

export default function App() {
  const [page, setPage] = useState<Page | null>(null);

  useEffect(() => {
    const load = pages[currentPath()] || pages["/"]; // unknown URL -> homepage
    load().then((m) => setPage(m.default));
  }, []);

  useEffect(() => {
    if (!page) return;
    if (page.redirect) { window.location.replace(page.redirect); return; }
    applyHead(page);
    if (!pages[currentPath()]) { // unknown URL: show the homepage, but keep it out of search
      const m = document.createElement("meta");
      m.name = "robots"; m.content = "noindex"; m.setAttribute("data-page-head", ""); document.head.appendChild(m);
    }
    initSite();
    if (window.location.hash) document.querySelector(window.location.hash)?.scrollIntoView();
  }, [page]);

  if (!page) return null;
  return <div dangerouslySetInnerHTML={{ __html: rewriteAssets(page.body) }} />;
}
