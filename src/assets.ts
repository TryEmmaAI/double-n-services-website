// Where each image, font and video is served from.
// Leave "" to serve the file from this project's public/assets/ folder.
// If AI Studio can't host files, upload them to the GHL Media Library and paste
// each file's link here — nothing else needs changing.
export const ASSET_URLS: Record<string, string> = {
  "fonts/archivo.woff2": "",
  "fonts/newsreader.woff2": "",
  "img/favicon.webp": "",
  "img/g1.webp": "",
  "img/g10.webp": "",
  "img/g11.webp": "",
  "img/g12.webp": "",
  "img/g13.webp": "",
  "img/g15.webp": "",
  "img/g16.webp": "",
  "img/g17.webp": "",
  "img/g2.webp": "",
  "img/g23.webp": "",
  "img/g25.webp": "",
  "img/g27.webp": "",
  "img/g28.webp": "",
  "img/g29.webp": "",
  "img/g3.webp": "",
  "img/g31.webp": "",
  "img/g32.webp": "",
  "img/g34.webp": "",
  "img/g35.webp": "",
  "img/g36c.jpg": "",
  "img/g37.webp": "",
  "img/g38.webp": "",
  "img/g39.webp": "",
  "img/g4.webp": "",
  "img/g40.webp": "",
  "img/g41.webp": "",
  "img/g42.webp": "",
  "img/g43.webp": "",
  "img/g7.webp": "",
  "img/g8.webp": "",
  "img/g9.webp": "",
  "img/logo-trans.png": "",
  "img/mark.png": "",
  "img/p12.webp": "",
  "img/p45.webp": "",
  "img/p46.webp": "",
  "img/p47.webp": "",
  "img/p48.webp": "",
  "img/p49.webp": "",
  "img/p50.webp": "",
  "img/p51.webp": "",
  "video/hero-poster.jpg": "",
  "video/hero.mp4": "",
  "video/hero.webm": "",
};

export function assetUrl(file: string): string {
  return ASSET_URLS[file] || "/assets/" + file;
}

export function rewriteAssets(markup: string): string {
  return markup.replace(/\/assets\/([^"'?#\s)]+)/g, (_m, file) => assetUrl(file));
}
