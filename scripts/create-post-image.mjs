// Single large social-post image (2400 × 3000, 4:5) showing both shirt colours.
// Reuses the approved garment SVGs and logos unaltered.
import fs from "node:fs/promises";
import path from "node:path";

const out = path.resolve("generated-artifacts/anh-bao-cao");
await fs.mkdir(out, { recursive: true });
const assets = path.resolve("artifacts/itogether-presentation/public/assets");
const svg = async (name) =>
  `data:image/svg+xml;base64,${(await fs.readFile(path.join(assets, `${name}.svg`))).toString("base64")}`;
const png = async (name) =>
  `data:image/png;base64,${(await fs.readFile(path.join(assets, `${name}.png`))).toString("base64")}`;
const fontCss = (await fs.readFile(path.join(assets, "navy-front.svg"), "utf8")).match(/<style>([\s\S]*?)<\/style>/)?.[1] || "";

const row = async (colour, label, swatch) => `
  <section>
    <h2><i style="background:${swatch}"></i>${label}</h2>
    <div class="pair">
      <figure><img src="${await svg(`${colour}-front`)}" alt=""><figcaption>MẶT TRƯỚC</figcaption></figure>
      <figure><img src="${await svg(`${colour}-back`)}" alt=""><figcaption>MẶT SAU</figcaption></figure>
    </div>
  </section>`;

const html = `<!doctype html><meta charset="utf-8"><style>
${fontCss}
*{box-sizing:border-box;margin:0}
body{width:2400px;height:3000px;overflow:hidden;background:#f4f1eb;color:#203749;font-family:'Be Vietnam Pro',sans-serif;padding:76px 96px 70px;display:flex;flex-direction:column}
.top{display:flex;justify-content:space-between;align-items:center;height:132px}
.top small{font-size:28px;letter-spacing:6px;font-weight:600;color:#53636e}
.identity{display:flex;align-items:center;gap:22px}
.identity img{width:120px;height:120px;object-fit:contain}
.identity div{font-size:29px;line-height:1.6;font-weight:700;text-align:right;margin-left:6px}
header{padding:40px 0 44px;border-bottom:2px solid #d5cec1}
h1{font-size:118px;line-height:1.08;font-weight:900;letter-spacing:-1px}
.sub{font-size:38px;margin-top:20px;color:#5d6c76;font-weight:500}
.slogan{font-size:40px;margin-top:26px;font-weight:700;font-style:italic;color:#203749}
.slogan span{font-style:normal;font-weight:500;color:#5d6c76;font-size:32px;margin-left:14px}
main{flex:1;display:grid;grid-template-rows:1fr 1fr;gap:36px;padding:44px 0 36px}
section{background:#eae6df;border:1px solid #ded8cf;border-radius:32px;padding:34px 40px 26px;display:flex;flex-direction:column}
h2{font-size:34px;letter-spacing:6px;font-weight:800;display:flex;align-items:center;gap:18px}
h2 i{width:34px;height:34px;border-radius:50%;border:2px solid #203749}
.pair{flex:1;display:grid;grid-template-columns:1fr 1fr;gap:28px;min-height:0}
figure{display:flex;flex-direction:column;align-items:center;min-height:0}
figure img{flex:1;width:100%;min-height:0;object-fit:contain;filter:drop-shadow(0 20px 14px #172d3e1c)}
figcaption{font-size:27px;letter-spacing:5px;font-weight:600;color:#53636e;margin-top:6px}
footer{display:flex;justify-content:space-between;font-size:26px;letter-spacing:2px;color:#62717b}
</style>
<div class="top"><small>ITOGETHER / FIT-HPUNI</small>
  <aside class="identity"><img src="${await png("fit-logo")}" alt="Logo Khoa"><img src="${await png("university-logo")}" alt="Logo Trường"><div>TRƯỜNG ĐẠI HỌC HẢI PHÒNG<br>KHOA CÔNG NGHỆ THÔNG TIN</div></aside>
</div>
<header>
  <h1>ÁO ĐỒNG PHỤC ITOGETHER</h1>
  <p class="sub">Hai phiên bản màu: Xanh than &amp; Trắng · Mặt trước và mặt sau</p>
  <p class="slogan">“You can do IT, we are ready to accompany”<span>— slogan của Khoa</span></p>
</header>
<main>${await row("navy", "PHIÊN BẢN XANH THAN", "#1F3349")}${await row("white", "PHIÊN BẢN TRẮNG", "#ffffff")}</main>
<footer><span>KHOA CÔNG NGHỆ THÔNG TIN · TRƯỜNG ĐẠI HỌC HẢI PHÒNG</span><span>itogether.me</span></footer>`;

const name = "anh-dang-bai";
await fs.writeFile(path.join(out, `${name}.html`), html);
if (process.env.SERVE_PREVIEWS) await fs.writeFile(path.join(assets, `${name}.html`), html);
console.log(`${name}.html`);
