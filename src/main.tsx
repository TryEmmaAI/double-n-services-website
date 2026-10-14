import { createRoot } from "react-dom/client";
import App from "./App";
import { initSite } from "./site";
import "./styles.css";

// Pages are pre-rendered to real HTML at build time (see vite.config.ts), so search
// engines and AI crawlers get the full page. When that HTML is already here, React
// doesn't re-render it; the site script just wires up the menu, form and gallery.
// Any other URL falls back to the React app.
const root = document.getElementById("root")!;
const path = location.pathname.endsWith("/") ? location.pathname : location.pathname + "/";

if (root.dataset.prerendered === path) {
  initSite();
} else {
  // No StrictMode: it runs effects twice in development, attaching handlers twice.
  createRoot(root).render(<App />);
}
