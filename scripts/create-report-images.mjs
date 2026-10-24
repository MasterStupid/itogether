// Standalone report images: preserve the approved garment artwork exactly.
import fs from "node:fs/promises";
import path from "node:path";

const out = path.resolve("generated-artifacts/anh-bao-cao");
await fs.mkdir(out, { recursive: true });
const assets = path.resolve("artifacts/itogether-presentation/public/assets");
async function image(name, crop) {
  let svg = await fs.readFile(path.join(assets, `${name}.svg`), "utf8");
  if (crop) svg = svg.replace(/viewBox="[^"]+"/, `viewBox="${crop.join(" ")}"`);
  return `data:image/svg+xml;base64,${Buffer.from(svg).toString("base64")}`;
}
const fontSvg = await fs.readFile(path.join(assets, "navy-front.svg"), "utf8");
const fontCss = fontSvg.match(/<style>([\s\S]*?)<\/style>/)?.[1] || "";
const facultyLogo = `data:image/png;base64,${(await fs.readFile(path.join(assets, "fit-logo.png"))).toString("base64")}`;
const universityLogo = `data:image/png;base64,${(await fs.readFile(path.join(assets, "university-logo.png"))).toString("base64")}`;
const identity = `<aside class="identity"><img src="${facultyLogo}" alt="Logo Khoa"><img src="${universityLogo}" alt="Logo Trường"><div>TRƯỜNG ĐẠI HỌC HẢI PHÒNG<br>KHOA CÔNG NGHỆ THÔNG TIN</div></aside>`;
const cards = async (entries, detail = false) => (await Promise.all(entries.map(async ([asset, label, crop]) =>
  `<section><div class="picture ${detail ? "detail" : ""}"><img src="${await image(asset, crop)}"></div><h2>${label}</h2></section>`
))).join("");
const jobs = [
  ["01-bo-ao-xanh-than", "PHIÊN BẢN XANH THAN", "Mặt trước & mặt sau", [["navy-front", "MẶT TRƯỚC"], ["navy-back", "MẶT SAU"]]],
  ["02-bo-ao-trang", "PHIÊN BẢN TRẮNG", "Mặt trước & mặt sau", [["white-front", "MẶT TRƯỚC"], ["white-back", "MẶT SAU"]]],
  ["03-dau-an-mat-lung", "DẤU ẤN MẶT LƯNG", "Hai phiên bản màu • Một thông điệp chung", [["navy-back", "XANH THAN", [320, 140, 375, 425]], ["white-back", "TRẮNG", [320, 140, 375, 425]]], true],
  ["04-co-ao-va-logo", "CỔ ÁO & LOGO KHOA", "Chi tiết nhận diện trên hai phiên bản", [["navy-front", "XANH THAN", [320, 20, 400, 285]], ["white-front", "TRẮNG", [320, 20, 400, 285]]], true],
  ["05-bo-tay-va-nhan-co", "BO TAY & NHÃN CỔ", "Phối màu tương phản • Nhận diện đồng bộ", [["navy-front", "BO TAY · XANH THAN", [55, 155, 165, 225]], ["white-front", "BO TAY · TRẮNG", [55, 155, 165, 225]], ["navy-front", "NHÃN CỔ · XANH THAN", [438, 84, 124, 42]], ["white-front", "NHÃN CỔ · TRẮNG", [438, 84, 124, 42]]], true],
];
for (const [name, title, subtitle, entries, detail] of jobs) {
  const html = `<!doctype html><meta charset="utf-8"><style>
  ${fontCss}
  *{box-sizing:border-box}body{margin:0;width:2400px;height:1600px;background:#f4f1eb;color:#203749;font-family:'Be Vietnam Pro',sans-serif;padding:74px 96px}
  header{position:relative;height:220px;border-bottom:2px solid #d5cec1}small{font-size:25px;letter-spacing:5px}h1{font-size:66px;margin:22px 0 12px;font-weight:800}p{font-size:29px;margin:0;color:#64717a}
  .identity{position:absolute;right:0;top:10px;display:flex;align-items:center;gap:22px}
  .identity img{width:112px;height:112px;object-fit:contain}
  .identity div{font-size:27px;line-height:1.65;font-weight:700;text-align:right;letter-spacing:.2px;margin-left:5px}
  main{display:grid;grid-template-columns:1fr 1fr;gap:32px;padding-top:38px;height:1145px}
  section{background:#eae6df;border:1px solid #ded8cf;border-radius:28px;display:flex;flex-direction:column;align-items:center;justify-content:center;overflow:hidden}
  .picture{width:100%;height:965px;padding:10px 30px}.picture img{width:100%;height:100%;object-fit:contain;filter:drop-shadow(0 18px 13px #172d3e18)}
  .detail{padding:55px;height:930px}h2{font-size:26px;letter-spacing:4px;margin:8px 0 25px;font-weight:600}
  footer{height:60px;display:flex;justify-content:space-between;align-items:end;font-size:23px;letter-spacing:2px;color:#62717b}
  ${entries.length === 4 ? "main{grid-template-rows:600px 470px}.picture.detail{height:490px;padding:35px}.picture.detail img{object-fit:contain}section:nth-child(n+3) .picture{height:335px;padding:65px}" : ""}
  </style><header><small>ITogether / FIT-HPUni</small><h1>${title}</h1><p>${subtitle}</p>${identity}</header><main>${await cards(entries, detail)}</main><footer><span>KHOA CÔNG NGHỆ THÔNG TIN · TRƯỜNG ĐẠI HỌC HẢI PHÒNG</span><span>itogether.me</span></footer>`;
  const file = path.join(out, `${name}.html`);
  await fs.writeFile(file, html);
  if (process.env.SERVE_PREVIEWS) await fs.writeFile(path.join(assets, `${name}.html`), html);
  console.log(`${name}.html`);
}
