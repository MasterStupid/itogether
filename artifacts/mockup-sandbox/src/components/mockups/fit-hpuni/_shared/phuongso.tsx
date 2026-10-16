import type { ReactNode } from "react";
import { BRAND, PALETTE } from "./brand";
import { Embroidery, FitLogo } from "./garments";

export const C = { navy: PALETTE.navy.hex, deep: PALETTE.navyDeep.hex, red: PALETTE.phuong.hex, yellow: PALETTE.nhuy.hex, white: PALETTE.white.hex };

// Spoon-shaped, stepped petals: four scarlet petals and one upright standard.
export function PixelPhuong({ x = 0, y = 0, size = 100, compact = false }: { x?: number; y?: number; size?: number; compact?: boolean }) {
  if (compact) return <g transform={`translate(${x} ${y}) scale(${size / 100})`}>
    <g fill={C.red}>
      <path d="M48 48H32V40H16V32H8V16H24V24H32V32H40V40H48Z" />
      <path d="M56 48H64V40H72V24H88V32H96V48H80V56H56Z" />
      <path d="M48 56V80H40V96H24V88H16V72H32V64H40V56Z" />
      <path d="M56 56H64V64H80V72H88V88H72V96H64V80H56Z" />
    </g>
    <path d="M40 8H64V24H56V48H48V32H40Z" fill={C.white} />
    <path d="M48 8H56V24H48Z" fill={C.red} />
    <path d="M48 48Q40 78 8 64M56 48Q64 76 96 64" stroke={C.red} strokeWidth="4" fill="none" />
    <g fill={C.yellow}><path d="M48 48H56V56H48Z" /><rect x="0" y="60" width="8" height="8" /><rect x="92" y="60" width="8" height="8" /></g>
  </g>;
  return <g transform={`translate(${x} ${y}) scale(${size / 100})`}>
    <g fill={C.red}>
      <path d="M49 52H38V45H23V39H13V26H18V18H31V23H39V35H45Z" />
      <path d="M53 51H64V41H73V29H87V34H94V47H87V54H70V59H58Z" />
      <path d="M48 55H37V61H25V72H20V85H29V91H42V85H49V67Z" />
      <path d="M55 56H66V64H79V73H85V85H77V92H65V85H58V72Z" />
    </g>
    <path d="M48 49V37H42V24H38V10H44V4H59V10H65V24H59V36H54V49Z" fill={C.white} stroke={C.yellow} strokeWidth="3" />
    <path d="M46 13H50V24H54V34M57 12V22M48 31V39" fill="none" stroke={C.red} strokeWidth="3" />
    <g fill="none" stroke={C.red} strokeWidth="2.7">
      <path d="M51 53Q43 75 7 65M52 54Q45 87 8 84M54 55Q63 85 97 69" />
    </g>
    <g fill={C.yellow}><rect x="4" y="62" width="5" height="5" /><rect x="5" y="81" width="5" height="5" /><rect x="95" y="66" width="5" height="5" /><rect x="48" y="48" width="8" height="8" /></g>
  </g>;
}

function Fern({ x, y, angle, size = 1 }: { x: number; y: number; angle: number; size?: number }) {
  return <g transform={`translate(${x} ${y}) rotate(${angle}) scale(${size})`} fill={C.navy}>
    <path d="M0 0H4V94H0Z" />
    {[12, 28, 44, 60, 76].map((p, i) => <g key={p} transform={`translate(2 ${p})`}>
      <path d={`M0 0L${-26 + i * 3} -15M0 0L${26 - i * 3} -15`} fill="none" stroke={C.navy} strokeWidth="3.5" />
      {[0, 1, 2, 3].map(j => <g key={j}>
        <rect x={-9 - j * 4.5 + i} y={-9 - j * 2.7} width="7" height="3.5" />
        <rect x={4 + j * 4.5 - i} y={-9 - j * 2.7} width="7" height="3.5" />
        <rect x={-9 - j * 4.5 + i} y={-3 - j * 2.7} width="7" height="3.5" />
        <rect x={4 + j * 4.5 - i} y={-3 - j * 2.7} width="7" height="3.5" />
      </g>)}
    </g>)}
  </g>;
}

export function PhuongBranch() {
  return <g>
    <path d="M13 236H35V209H62V182H93V155H132V126H169V101H213V77M93 155V112H73V87M132 126V177H166V205" fill="none" stroke={C.navy} strokeWidth="5" />
    <Fern x={77} y={120} angle={112} size={0.88} />
    <Fern x={127} y={150} angle={-43} size={0.88} />
    <Fern x={166} y={108} angle={-150} size={0.8} />
    <path d="M167 183V233Q174 246 180 233V183Z" fill={C.navy} />
    <PixelPhuong x={0} y={15} size={90} />
    <PixelPhuong x={89} y={0} size={95} />
    <PixelPhuong x={188} y={39} size={90} />
    <g fill={C.red}><rect x="57" y="225" width="5" height="5" /><rect x="67" y="236" width="5" height="5" /><rect x="82" y="223" width="5" height="5" /></g>
  </g>;
}

export function PoloArt({ back = false }: { back?: boolean }) {
  return back ? <g>
    <Embroidery><PixelPhuong x={477.5} y={135} size={45} compact />
      <g fill={C.white} textAnchor="middle" fontFamily="'Be Vietnam Pro', sans-serif" fontSize="10" fontWeight="500">
        <text x="500" y="224">You can do IT,</text>
        <text x="500" y="241">we are ready to accompany</text>
      </g>
    </Embroidery>
  </g> : <FitLogo cx={600} cy={250} d={80} embroidered />;
}

export function TeeArt({ back = false }: { back?: boolean }) {
  return back ? <g transform="translate(360 190)">
    <PhuongBranch />
    <text x="0" y="279" fontFamily="'Be Vietnam Pro', sans-serif" fontWeight="800" fontSize="28" fill={C.navy}>{BRAND.short}</text>
    <path d="M0 294H280" stroke={C.red} strokeWidth="3" />
    <g fontFamily="'Be Vietnam Pro', sans-serif" fontSize="11" fontWeight="500" fill={C.navy}>
      <text x="0" y="314">You can do IT,</text>
      <text x="0" y="331">we are ready to accompany</text>
    </g>
  </g> : <FitLogo cx={598} cy={238} d={90} />;
}

export function Intro({ polo }: { polo: boolean }) {
  return <div style={{ height: 103, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 32px" }}>
    <div><div style={{ color: C.red, fontSize: 11, fontWeight: 700, letterSpacing: "0.13em", marginBottom: 6 }}>HẢI PHÒNG · HOA HỌC TRÒ · NGÔN NGỮ SỐ</div>
      <h1 style={{ fontSize: 31, lineHeight: 1.2, letterSpacing: "-0.045em", fontWeight: 750, margin: 0 }}>{polo ? "Một dấu hoa. Đủ nhận ra." : "Mang mùa phượng trên vai."}</h1>
    </div>
    <div style={{ fontSize: 11, textAlign: "right", lineHeight: 1.8, color: C.navy }}>C / {polo ? "01" : "02"}<br />{polo ? "TRANG PHỤC ĐẠI DIỆN" : "TRANG PHỤC HOẠT ĐỘNG"}</div>
  </div>;
}

export function Detail({ number, title, note, children }: { number: string; title: string; note: string; children: ReactNode }) {
  return <div style={{ borderTop: `2px solid ${C.navy}`, background: "#e9edf0", height: 207, overflow: "hidden" }}>
    <div style={{ height: 130, overflow: "hidden", position: "relative" }}><span style={{ position: "absolute", top: 8, left: 10, fontSize: 11, color: "#FFFFFF", background: C.red, padding: "1px 6px", borderRadius: 3, lineHeight: "16px", fontWeight: 700, zIndex: 2 }}>{number}</span>{children}</div>
    <div style={{ padding: "9px 12px" }}><div style={{ fontWeight: 700, fontSize: 12, marginBottom: 4 }}>{title}</div><div style={{ fontSize: 11, lineHeight: 1.6, color: C.navy }}>{note}</div></div>
  </div>;
}

export function Specs({ polo }: { polo: boolean }) {
  const rows = polo ? [
    ["Chất liệu", "Piqué CVC 60/40 · 220–240 g/m². Bo cổ, bo tay dệt; nẹp 3 cúc."],
    ["Ngực trái", "Logo thêu Ø80 mm; tâm lệch giữa trước +100 mm, dưới HPS 190 mm. 2 màu chỉ."],
    ["Sau gáy & lưng", "Hoa 45 × 45 mm; đỉnh dưới HPS 75 mm. 3 màu chỉ. Slogan 150 × 30 mm, dưới HPS 155 mm; 1 màu trắng, cao chữ ≥5 mm."],
    ["Bo & số hóa", "Viền đỏ 3,2 mm, cách mép 5,5 mm ở cổ; 5 mm ở tay. Ô thêu ≥3 mm; nhụy giản lược bằng mũi satin. Tối đa 3 màu/vị trí."],
    ["Lưu ý bắt buộc", "Giản lược phím bàn phím của logo trong file số hóa thêu. Duyệt mẫu thêu thật trước sản xuất."]
  ] : [
    ["Chất liệu", "Cotton chải kỹ 100% · 200–220 g/m². Cổ bo 1×1 xanh FIT; phom unisex."],
    ["Ngực trái", "Logo Ø90 mm; tâm lệch giữa trước +98 mm, dưới HPS 178 mm. In lụa 2 màu navy / trắng."],
    ["Hình lưng", "280 × 335 mm; căn giữa lưng, đỉnh dưới HPS 130 mm. Gồm cành hoa, tên khoa FIT-HPUni và slogan; trong khổ 300 × 400 mm."],
    ["Kỹ thuật", "In lụa 3 màu: xanh FIT, đỏ, vàng; trắng chừa nền vải. Ô nhỏ ≥2,5 mm; nét ≥2,5 mm. DTF cho lô nhỏ; không in chuyển thăng hoa."],
    ["Kết cấu", "Hình nằm trọn trên thân sau, không qua đường may sườn. Không in tràn thân trên cotton."]
  ];
  return <aside style={{ background: C.deep, color: C.white, padding: "22px 22px 19px", height: "100%", display: "flex", flexDirection: "column" }}>
    <div style={{ color: "#d0d8df", fontSize: 11, letterSpacing: "0.14em" }}>THÔNG SỐ ĐỀ XUẤT / SIZE L</div>
    <h2 style={{ fontSize: 22, margin: "8px 0 15px", fontWeight: 650 }}>{polo ? "Kín đáo, đúng nghi thức." : "Nhận diện từ phía sau."}</h2>
    {rows.map(([label, text]) => <div key={label} style={{ padding: "12px 0", borderTop: "1px solid #ffffff25" }}><div style={{ fontSize: 12, fontWeight: 700, marginBottom: 5 }}>{label}</div><p style={{ margin: 0, fontSize: 11, lineHeight: 1.65, color: "#d6dfe6" }}>{text}</p></div>)}
    <div style={{ marginTop: "auto", borderTop: "1px solid #ffffff25", paddingTop: 15 }}>
      <div style={{ fontSize: 11, fontWeight: 700, marginBottom: 9 }}>BẢNG MÀU / {polo ? "VẢI XANH FIT" : "VẢI TRẮNG"}</div>
      <div style={{ display: "flex", gap: 9 }}>{[C.navy, C.red, C.yellow, C.white].map(c => <div key={c}><div style={{ width: 53, height: 19, background: c, border: "1px solid #ffffff40" }} /><div style={{ fontSize: 11, marginTop: 5 }}>{c}</div></div>)}</div>
      <p style={{ fontSize: 11, lineHeight: 1.65, color: "#d6dfe6", margin: "11px 0 0" }}>PANTONE tham khảo:<br />19-4035 TCX Dark Blue · 17-1664 TCX Poppy Red.<br />Chốt màu bằng lab dip / so màu vải.</p>
    </div>
  </aside>;
}

export function Rationale({ polo }: { polo: boolean }) {
  return <div style={{ borderLeft: `3px solid ${C.red}`, paddingLeft: 14, marginTop: 16, fontSize: 11, lineHeight: 1.8, color: C.navy }}>
    <strong style={{ color: C.deep }}>Hoa của thành phố, ký ức của người học.</strong> Phượng nở tháng 5–6, mùa thi và tốt nghiệp; nhánh mạch số thuộc về dân IT.<br />
    {polo ? "Thu nhỏ thành dấu thêu, giữ sự trang trọng cho giảng viên và lễ nghi." : "Cành phượng số tạo nhận diện địa phương mạnh, hợp ảnh mùa hoa và ngày ra trường."}<br />
    <strong>Đánh đổi:</strong> thêm màu đỏ tăng chi phí; cần tiết chế chi tiết. Đỏ trên navy phải lab dip kỹ.
  </div>;
}

export function ViewLabel({ back }: { back?: boolean }) {
  return <div style={{ position: "absolute", bottom: 3, left: 28, right: 28, display: "flex", justifyContent: "space-between", borderTop: "1px solid #35526f30", paddingTop: 9, fontSize: 11, color: C.navy }}><strong>{back ? "02 / MẶT SAU" : "01 / MẶT TRƯỚC"}</strong><span>Tỷ lệ size L · đơn vị mm</span></div>;
}

export const slogan = BRAND.slogan;
