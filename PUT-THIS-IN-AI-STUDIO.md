# Double N site → GHL AI Studio

This folder is the finished Double N website as a React (Vite) project: the same 26 pages, design,
copy, estimate form, menu, gallery and search markup as the static site. It was generated
from the site itself (`_build/export_react.py`), built, and checked page by page against
the original: identical links, images, schema and text on every page.

**Don't let AI Studio "improve" it.** Every step below tells it to keep files exactly as pasted.

---

## Step 1 — Start the project (paste this prompt into AI Studio)

```
Create a new React + Vite + TypeScript project with these exact files and nothing else:
index.html, package.json, vite.config.ts, tsconfig.json, src/main.tsx, src/App.tsx.
Use React 18. Do not add a router, UI library, Tailwind, or any components.
I will paste the contents of every file myself in the code editor. Never rewrite,
reformat, restyle, rename or "improve" any file I paste. Do not generate any page
content. Every URL path must serve index.html (single-page app fallback).
```

## Step 2 — Paste the files (Code view)

Open **Code**, then create or replace each file below with the contents of the file of the
same name in this folder. Copy each one whole.

| File | What it is |
|---|---|
| `index.html` | Page shell + the GHL chat widget |
| `package.json`, `vite.config.ts`, `tsconfig.json` | Project setup |
| `src/main.tsx` | Starts the app |
| `src/App.tsx` | Picks the page for the URL, sets its title, meta and schema |
| `src/site.ts` | The site's interactions (menu, estimate form, gallery, Floor Finder) |
| `src/styles.css` | The full design |
| `src/assets.ts` | Where images, fonts and video load from (see Step 3) |
| `src/pages/index.ts` + the 26 files in `src/pages/` | One file per page |

## Step 3 — Images, fonts and video (47 files, 3.2 MB, in `public/assets/`)

**If AI Studio lets you add files to `public/`:** upload the `public/assets` folder as-is,
plus `public/robots.txt`, `public/sitemap.xml`, `public/llms.txt` and `public/_redirects`. Done.

**If it doesn't:** upload the 47 files to the **GHL Media Library** (folder "double-n-site"),
then open `src/assets.ts` and paste each file's Media Library link between the quotes next to
its name. For example:

```
"img/g8.webp": "https://assets.cdn.filesafe.space/…/g8.webp",
```

Nothing else needs to change. Every image, font and video picks up the new link automatically.

## Step 4 — Publish, then check these 6 things on the preview link

1. Home page loads with the hero video and the Newsreader headings.
2. **Services** menu opens; click **Hardwood flooring** → the page loads at `/hardwood-flooring/`.
3. Refresh that page. It must still load, not show a 404. If it 404s, ask AI Studio:
   *"Every URL path must serve index.html — add the single-page app fallback."*
4. Estimate form: pick **Cleaning** → step 2 shows Carpet / Couch or chairs / … .
5. **Our work** → filter buttons work.
6. **Search engines see the content:** open any page, right-click → **View page source**. You
   should see the page's text and its title in the source, not just `<div id="root"></div>`.
   The build writes a real HTML file per page (`vite.config.ts` → "prerender"). If the source
   is empty, AI Studio isn't running the project's own `vite build`: ask it to
   *"build with `npm run build` and serve the `dist` folder as static files"*.

## Before go-live (same as the static site)

- **Chat widget:** `index.html` still has TryEmma's widget id. Swap `data-widget-id` for Double N's.
- **Estimate form:** until a webhook is set, the form tells visitors to call instead of sending.
  To switch it on, create a GHL workflow with an **Inbound Webhook** trigger, copy its URL into
  `"webhook"` in `double-n-site/_build/build.py`, re-run the build + export, push, and send one
  test lead to confirm it lands in GHL.

## Changing content later

Edit the static site source (`_build/content_*.py`), then run:

```bash
python3 _build/build.py && python3 _build/export_react.py
```

Re-paste only the files that changed (usually one file in `src/pages/`).
