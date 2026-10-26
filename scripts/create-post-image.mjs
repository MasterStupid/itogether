// Single large social-post image (3000 × 3750, 4:5) combining every detail of the five report images:
// both colours, front & back, back artwork, collar & faculty logo, cuff, and neck label.
// Garment SVGs and logos are reused unaltered; detail views only change the SVG viewBox.
// The page is captured in two 3000 × 1875 halves (open with ?part=2 for the lower half) and stacked.
import fs from "node:fs/promises";
import path from "node:path";

const out = path.resolve("generated-artifacts/anh-bao-cao");
await fs.mkdir(out, { recursive: true });
const assets = path.resolve("artifacts/itogether-presentation/public/assets");
async function svg(name, crop) {
  let source = await fs.readFile(path.join(assets, `${name}.svg`), "utf8");
  if (crop) source = source.replace(/viewBox="[^"]+"/, `viewBox="${crop.join(" ")}"`);
  return `data:image/svg+xml;base64,${Buffer.from(source).toString("base64")}`;
}
const png = async (name) =>
  `data:image/png;base64,${(await fs.readFile(path.join(assets, `${name}.png`))).toString("base64")}`;
const fontCss = (await fs.readFile(path.join(assets, "navy-front.svg"), "utf8")).match(/<style>([\s\S]*?)<\/style>/)?.[1] || "";

const details = [
  ["back", "MẶT LƯNG · SLOGAN", [320, 140, 375, 425]],
  ["front", "CỔ ÁO & LOGO KHOA", [320, 20, 400, 285]],
  ["front", "BO TAY", [55, 155, 165, 225]],
  ["front", "NHÃN CỔ", [438, 84, 124, 42]],
];
const figure = (src, caption) => `<figure><img src="${src}" alt=""><figcaption>${caption}</figcaption></figure>`;
const band = async (colour, label, swatch) => `
  <section>
    <h2><i style="background:${swatch}"></i>${label}</h2>
    <div class="shirts">${figure(await svg(`${colour}-front`), "MẶT TRƯỚC")}${figure(await svg(`${colour}-back`), "MẶT SAU")}</div>
    <div class="details">${(await Promise.all(details.map(async ([side, caption, crop]) =>
      `<div class="tile">${figure(await svg(`${colour}-${side}`, crop), caption)}</div>`))).join("")}</div>
  </section>`;

const html = `<!doctype html><meta charset="utf-8"><style>
${fontCss}
*{box-sizing:border-box;margin:0}
html{height:1875px;overflow:hidden}
body{width:3000px;height:3750px;background:#f4f1eb;color:#203749;font-family:'Be Vietnam Pro',sans-serif;padding:92px 110px 80px;display:flex;flex-direction:column}
body.part2{margin-top:-1875px}
.top{display:flex;justify-content:space-between;align-items:center;height:150px}
.top small{font-size:34px;letter-spacing:7px;font-weight:600;color:#53636e}
.identity{display:flex;align-items:center;gap:26px}
.identity img{width:142px;height:142px;object-fit:contain}
.identity div{font-size:36px;line-height:1.6;font-weight:700;text-align:right;margin-left:8px}
header{padding:36px 0 44px;border-bottom:2px solid #d5cec1}
h1{font-size:146px;line-height:1.08;font-weight:900;letter-spacing:-1px}
.sub{font-size:46px;margin-top:18px;color:#5d6c76;font-weight:500}
.slogan{font-size:48px;margin-top:22px;font-weight:700;font-style:italic}
.slogan span{font-style:normal;font-weight:500;color:#5d6c76;font-size:38px;margin-left:16px}
main{flex:1;display:grid;grid-template-rows:1fr 1fr;gap:44px;padding:46px 0 40px;min-height:0}
section{background:#eae6df;border:1px solid #ded8cf;border-radius:40px;padding:38px 46px 34px;display:grid;grid-template-columns:700px 1fr;grid-template-rows:auto 1fr;column-gap:46px;min-height:0}
h2{grid-column:1/-1;font-size:42px;letter-spacing:7px;font-weight:800;display:flex;align-items:center;gap:20px;margin-bottom:26px}
h2 i{width:42px;height:42px;border-radius:50%;border:3px solid #203749}
.shirts{display:grid;grid-template-rows:1fr 1fr;gap:16px;min-height:0}
.details{display:grid;grid-template-columns:1fr 1fr;grid-template-rows:1fr 1fr;gap:24px;min-height:0}
.tile{background:#f6f4f0;border:1px solid #e1dbd1;border-radius:28px;padding:26px 26px 14px;display:flex;min-height:0}
figure{flex:1;display:flex;flex-direction:column;align-items:center;min-height:0;height:100%}
figure img{flex:1;width:100%;min-height:0;object-fit:contain;filter:drop-shadow(0 18px 13px #172d3e1c)}
figcaption{font-size:30px;letter-spacing:5px;font-weight:600;color:#53636e;margin-top:8px}
footer{display:flex;justify-content:space-between;font-size:32px;letter-spacing:2px;color:#62717b}
</style>
<script>if (location.search.includes("part=2")) addEventListener("DOMContentLoaded", () => document.body.classList.add("part2"));</script>
<div class="top"><small>ITOGETHER / FIT-HPUNI</small>
  <aside class="identity"><img src="${await png("fit-logo")}" alt="Logo Khoa"><img src="${await png("university-logo")}" alt="Logo Trường"><div>TRƯỜNG ĐẠI HỌC HẢI PHÒNG<br>KHOA CÔNG NGHỆ THÔNG TIN</div></aside>
</div>
<header>
  <h1>ÁO ĐỒNG PHỤC ITOGETHER</h1>
  <p class="sub">Hai phiên bản màu: Xanh than &amp; Trắng · Mặt trước, mặt sau và chi tiết hoàn thiện</p>
  <p class="slogan">“You can do IT, we are ready to accompany”<span>— slogan của Khoa</span></p>
</header>
<main>${await band("navy", "PHIÊN BẢN XANH THAN", "#1F3349")}${await band("white", "PHIÊN BẢN TRẮNG", "#ffffff")}</main>
<footer><span>KHOA CÔNG NGHỆ THÔNG TIN · TRƯỜNG ĐẠI HỌC HẢI PHÒNG</span><span>itogether.me</span></footer>`;

const name = "anh-dang-bai-day-du";
await fs.writeFile(path.join(out, `${name}.html`), html);
if (process.env.SERVE_PREVIEWS) await fs.writeFile(path.join(assets, `${name}.html`), html);
console.log(`${name}.html`);
