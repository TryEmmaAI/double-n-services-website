// Where each image, font and video is served from.
// By default they load from this project's public GitHub repo via the jsDelivr CDN,
// so they work even if the host doesn't copy the image files over.
// To serve a file from somewhere else (e.g. the GHL Media Library), paste its link
// next to its name below — nothing else needs changing.
export const ASSET_BASE = "https://cdn.jsdelivr.net/gh/TryEmmaAI/double-n-services-website@main/public/assets/";

export const ASSET_URLS: Record<string, string> = {
  "fonts/archivo.woff2": "",
  "fonts/newsreader.woff2": "",
  "img/favicon.webp": "",
  "img/g1.webp": "",
  "img/g11.webp": "",
  "img/g12.webp": "",
  "img/g13.webp": "",
  "img/g16.webp": "",
  "img/g2.webp": "",
  "img/g23.webp": "",
  "img/g28.webp": "",
  "img/g29.webp": "",
  "img/g34.webp": "",
  "img/g35.webp": "",
  "img/g37.webp": "",
  "img/g38.webp": "",
  "img/g39.webp": "",
  "img/g41.webp": "",
  "img/g42.webp": "",
  "img/g43.webp": "",
  "img/g7.webp": "",
  "img/g8.webp": "",
  "img/g9.webp": "",
  "img/gen-carpet.jpg": "",
  "img/gen-clean.jpg": "",
  "img/gen-duct.jpg": "",
  "img/gen-hardwood.jpg": "",
  "img/gen-lvp.jpg": "",
  "img/gen-refinish.jpg": "",
  "img/gen-tile-2.jpg": "",
  "img/gen-tile.jpg": "",
  "img/logo-trans.png": "",
  "img/mark.png": "",
  "img/n-carpet-attic.jpg": "",
  "img/n-carpet-bedroom.jpg": "",
  "img/n-carpet-bonus.jpg": "",
  "img/n-carpet-gray.jpg": "",
  "img/n-carpet-stairs.jpg": "",
  "img/n-foyer-install.jpg": "",
  "img/n-lvp-gray.jpg": "",
  "img/n-lvp-light.jpg": "",
  "img/n-lvp-sun.jpg": "",
  "img/n-stairs-before.jpg": "",
  "img/n-stairs-treads.jpg": "",
  "img/n-tile-bath-2.jpg": "",
  "img/n-tile-bath.jpg": "",
  "img/n-tile-shower-niche.jpg": "",
  "img/n-tile-shower-pebble.jpg": "",
  "img/n-tile-tearout.jpg": "",
  "img/p11.webp": "",
  "img/p15.webp": "",
  "img/p17.webp": "",
  "img/p21.webp": "",
  "img/p30.webp": "",
  "img/p45.webp": "",
  "img/p47.webp": "",
  "img/p49.webp": "",
  "img/p50.webp": "",
  "img/p51.webp": "",
  "img/pcarpet.webp": "",
  "video/hero-poster.jpg": "",
  "video/hero.mp4": "",
  "video/hero.webm": "",
};

export function assetUrl(file: string): string {
  return ASSET_URLS[file] || ASSET_BASE + file;
}

export function rewriteAssets(markup: string): string {
  return markup.replace(/\/assets\/([^"'?#\s)]+)/g, (_m, file) => assetUrl(file));
}
