// Snapshot the approved garment artwork without modifying the original website.
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { createServer } from "vite";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const sourceRoot = path.resolve(root, "../fit-hpuni");
const out = path.join(root, "public/assets");
await fs.mkdir(out, { recursive: true });
const logo = await fs.readFile(path.join(sourceRoot, "public/assets/fit-logo.png"));
await fs.copyFile(path.join(sourceRoot, "public/assets/fit-logo.png"), path.join(out, "fit-logo.png"));
await fs.copyFile(path.join(sourceRoot, "public/assets/hai-phong-university-logo.png"), path.join(out, "university-logo.png"));

const fontResponse = await fetch("https://fonts.googleapis.com/css2?family=Be+Vietnam+Pro:wght@400;500;600;700;800;900&display=swap", {
  headers: { "User-Agent": "Mozilla/5.0" },
});
if (!fontResponse.ok) throw new Error("Unable to load approved garment font");
let fontCss = await fontResponse.text();
const urls = [...new Set(fontCss.match(/https:\/\/[^)\s]+/g))];
for (const url of urls) {
  const response = await fetch(url);
  if (!response.ok) throw new Error(`Font download failed: ${response.status}`);
  const bytes = Buffer.from(await response.arrayBuffer());
  fontCss = fontCss.split(url).join(`data:font/woff2;base64,${bytes.toString("base64")}`);
}

const server = await createServer({
  configFile: false,
  root: sourceRoot,
  base: "/",
  server: { middlewareMode: true },
  appType: "custom",
  optimizeDeps: { noDiscovery: true },
  resolve: { alias: { "@": path.join(sourceRoot, "src") } },
  esbuild: { jsx: "automatic" },
  plugins: [{
    name: "export-approved-garment-snapshots",
    enforce: "pre",
    transform(code, id) {
      if (id.endsWith("/DongDieuTee.tsx")) return `${code}\nexport { Front, Back, COLORWAYS };`;
    },
  }],
});
try {
  const { Front, Back, COLORWAYS } = await server.ssrLoadModule("/src/components/fit-hpuni/DongDieuTee.tsx");
  const shots = [
    ["navy-front", Front, "navy", undefined],
    ["white-front", Front, "white", undefined],
    ["navy-back", Back, "navy", undefined],
    ["white-back", Back, "white", undefined],
    ["it-detail", Back, "navy", { x: 330, y: 155, w: 350, h: 210 }],
    ["slogan-detail", Back, "navy", { x: 330, y: 355, w: 350, h: 110 }],
    ["collar-detail", Front, "navy", { x: 325, y: 25, w: 350, h: 200 }],
    ["cuff-detail", Front, "navy", { x: 58, y: 158, w: 150, h: 220 }],
    ["label-detail", Front, "white", { x: 442, y: 88, w: 116, h: 34 }],
  ];
  for (const [name, Component, color, crop] of shots) {
    let svg = renderToStaticMarkup(React.createElement(Component, {
      colorway: COLORWAYS[color], size: "L", crop,
      pad: { top: 4, right: 6, bottom: 8, left: 6 },
      style: { width: "100%", height: "100%" },
    }));
    svg = svg.replace(/<link\b[^>]*>/g, "")
      .replace(/<animate\b[^>]*\/>|<animate\b[^>]*>[\s\S]*?<\/animate>/g, "")
      .replace(/(?:href|xlink:href)="[^"]*assets\/fit-logo.png"/g, `href="data:image/png;base64,${logo.toString("base64")}"`)
      .replace("<svg ", '<svg xmlns="http://www.w3.org/2000/svg" ')
      .replace(/(<svg\b[^>]*>)/, `$1<defs><style>${fontCss}</style></defs>`);
    await fs.writeFile(path.join(out, `${name}.svg`), svg);
  }
} finally {
  await server.close();
}
console.log("Saved nine exact approved garment snapshots and both official logos.");
