import type { CSSProperties, ReactNode } from "react";
import { PALETTE } from "./brand";
import { Embroidery, FitLogo, PoloShirt, TeeShirt, shade } from "./garments";

export const C = { navy: PALETTE.navy.hex, deep: PALETTE.navyDeep.hex, green: PALETTE.terminal.hex, white: PALETTE.white.hex, ink: shade(PALETTE.terminal.hex, -.5), paper: shade(PALETTE.navy.hex, .95), rule: shade(PALETTE.navy.hex, .79) };
const mono = "'IBM Plex Mono', 'Space Mono', monospace";

export function TeeArtwork({ back = false }: { back?: boolean }) {
  return back ? <g fontFamily={mono}>
    <path d="M230 480 H320 Q350 480 350 450 V420" fill="none" stroke={C.green} strokeWidth="4" />
    <g transform="translate(355 210)">
      <text x="0" y="15" fontSize="10" fill={C.green}>01  / FIT-HPUni</text>
      <path d="M0 32 H290" stroke={C.green} strokeWidth="1.5" />
      <text x="0" y="78" fontSize="34" fontWeight="600" fill={C.white}>You can</text>
      <text x="0" y="151" fontSize="66" fontWeight="700" fill={C.white}>do <tspan fill={C.green}>IT,</tspan></text>
      <text x="0" y="196" fontSize="20" fill={C.white}>we are ready</text>
      <text x="0" y="226" fontSize="20" fill={C.white}>to accompany</text>
      <rect x="0" y="253" width="14" height="24" fill={C.green} />
      <path d="M28 277 H290" stroke={C.green} strokeWidth="1.5" />
    </g>
  </g> : <g>
    <path d="M637 258 H675 Q697 258 697 280 V458 Q697 480 720 480 H770" fill="none" stroke={C.green} strokeWidth="4" strokeLinejoin="round" />
    <FitLogo cx={598} cy={238} d={90} />
  </g>;
}

export function PoloArtwork({ back = false }: { back?: boolean }) {
  return back ? <Embroidery><g fontFamily={mono} textAnchor="middle" fontSize="11" fontWeight="600">
    <text x="500" y="181" fill={C.white}>You can do <tspan fill={C.green}>IT,</tspan></text>
    <text x="500" y="199" fill={C.white}>we are ready to accompany</text>
    <path d="M485 215 H515" stroke={C.green} strokeWidth="2" />
  </g></Embroidery> : <g>
    <Embroidery><path d="M600 290 V309 Q600 316 592 316 H550" fill="none" stroke={C.green} strokeWidth="1.8" /></Embroidery>
    <FitLogo cx={600} cy={250} d={80} embroidered />
  </g>;
}

export function DoItGarment({ polo = false, back = false, crop, style }: { polo?: boolean; back?: boolean; crop?: { x: number; y: number; w: number; h: number }; style?: CSSProperties }) {
  return polo ? <PoloShirt side={back ? "back" : "front"} body={C.deep} collar={C.deep} cuff={C.deep} tipping={[C.green]} placketInner={C.green} buttons={C.deep} buttonCount={2} crop={crop} style={style}><PoloArtwork back={back} /></PoloShirt>
    : <TeeShirt side={back ? "back" : "front"} body={C.deep} rib={C.deep} crop={crop} style={style}><TeeArtwork back={back} /></TeeShirt>;
}

export function Detail({ number, title, note, children }: { number: string; title: string; note: string; children: ReactNode }) {
  return <div style={{ minWidth: 0 }}>
    <div style={{ height: 145, background: shade(C.navy, .88), overflow: "hidden", border: `1px solid ${C.rule}`, position: "relative" }}>
      {children}<span style={{ position: "absolute", top: 8, left: 8, fontSize: 11, color: C.ink, fontWeight: 700, background: C.white, padding: "1px 6px", borderRadius: 3, lineHeight: "16px" }}>{number}</span>
    </div>
    <div style={{ fontSize: 12, fontWeight: 700, marginTop: 9 }}>{title}</div>
    <div style={{ fontSize: 11, lineHeight: 1.55, marginTop: 4, color: C.navy }}>{note}</div>
  </div>;
}

export function Spec({ title, children }: { title: string; children: ReactNode }) {
  return <div style={{ borderTop: `1px solid ${C.rule}`, paddingTop: 10, marginTop: 11 }}>
    <h3 style={{ fontSize: 11, letterSpacing: 1.1, fontWeight: 700, marginBottom: 6, color: C.ink }}>{title}</h3>
    <div style={{ fontSize: 11.5, lineHeight: 1.58 }}>{children}</div>
  </div>;
}

export function Palette() {
  return <div style={{ marginTop: 14 }}>
    {[["Nền · Xanh than", C.deep], ["Logo · Xanh FIT", C.navy], ["Nhấn · Terminal", C.green], ["Chữ · Trắng", C.white]].map(([name, hex]) => <div key={hex} style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 7, fontSize: 11 }}><i style={{ width: 17, height: 17, background: hex, border: `1px solid ${C.rule}` }} /><span style={{ flex: 1 }}>{name}</span><span style={{ fontFamily: mono }}>{hex}</span></div>)}
    <p style={{ fontSize: 11, lineHeight: 1.5, color: C.navy, marginTop: 10 }}>Xanh FIT: PANTONE 19-4035 TCX Dark Blue (tham khảo). Duyệt màu bằng lab dip / so màu vải.</p>
  </div>;
}

export function BoardBody({ polo = false }: { polo?: boolean }) {
  return <div style={{ height: "100%", background: C.paper, color: C.deep, padding: "26px 36px 22px", display: "grid", gridTemplateColumns: "minmax(0, 1fr) 304px", gap: 28 }}>
    <section style={{ minWidth: 0, display: "flex", flexDirection: "column" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", height: 106, flexShrink: 0 }}>
        <div><div style={{ color: C.ink, fontSize: 11, letterSpacing: 2, fontWeight: 700 }}>B / {polo ? "PHIÊN BẢN ĐẠI DIỆN" : "PHIÊN BẢN SINH VIÊN"}</div>
          <h1 style={{ fontSize: 42, fontWeight: 750, letterSpacing: -2, lineHeight: 1.15, marginTop: 7 }}>{polo ? "Giữ tinh thần. Hạ âm lượng." : "Mặc một lời khẳng định."}</h1>
          <p style={{ fontSize: 12, color: C.navy, marginTop: 8 }}>{polo ? "Một nét chỉ xanh, một lời đồng hành — đủ để nhận ra nhau." : "“do IT”: cứ làm đi. Và làm cùng Khoa Công nghệ Thông tin."}</p>
        </div>
        <div style={{ fontFamily: mono, fontSize: 12, color: C.ink, paddingTop: 4, textAlign: "right" }}>do <b style={{ fontSize: 28 }}>IT</b><span style={{ display: "block", fontSize: 11 }}>_</span></div>
      </div>
      <div style={{ height: 433, position: "relative", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 0, borderBottom: `1px solid ${C.rule}` }}>
        {[false, true].map(back => <div key={String(back)} style={{ position: "relative", minHeight: 0 }}>
          <div style={{ position: "absolute", top: 0, left: 8, fontSize: 11, color: C.navy }}>{back ? "02 / MẶT SAU" : "01 / MẶT TRƯỚC"}</div>
          <DoItGarment polo={polo} back={back} style={{ width: "100%", height: 400, marginTop: 15 }} />
          <div style={{ position: "absolute", bottom: 9, left: 8, color: C.navy, fontSize: 11 }}>{back ? (polo ? "Slogan thêu nhỏ dưới cổ sau" : "Slogan chủ đạo · 290 × 280 mm") : `Logo chính thức · ${polo ? "80" : "90"} mm · ngực trái`}</div>
        </div>)}
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, margin: "14px 0 10px", color: C.ink, fontWeight: 700 }}><span>CHI TIẾT & ĐỊNH VỊ</span><span>Kích thước thật · mm · size L</span></div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 16 }}>
        <Detail number="01" title={polo ? "Logo thêu & nét cáp" : "Điểm khởi đầu: ngực trái"} note={polo ? "Ø80 mm · tâm cách HPS 190 mm; lệch tâm thân 100 mm. Nét cáp 1,8 mm." : "Ø90 mm · tâm cách HPS 178 mm; lệch tâm thân 98 mm. Nét cáp 4 mm."}>
          <DoItGarment polo={polo} crop={polo ? { x: 535, y: 195, w: 140, h: 135 } : { x: 535, y: 182, w: 180, h: 135 }} style={{ width: "100%", height: "100%" }} />
        </Detail>
        <Detail number="02" title={polo ? "Nét xanh ở cổ & nẹp" : "Slogan là thiết kế"} note={polo ? "Tipping 3,2 mm; nẹp trong xanh 3 mm. Hai cúc đồng màu nền." : "Khung chữ 290 × 280 mm; mép trên cách HPS 150 mm. IT là điểm nhấn."}>
          <DoItGarment polo={polo} back={!polo} crop={polo ? { x: 365, y: 40, w: 270, h: 190 } : { x: 340, y: 200, w: 320, h: 300 }} style={{ width: "100%", height: "100%" }} />
        </Detail>
        <Detail number="03" title={polo ? "Lời đồng hành dưới cổ" : "Hai mảnh in, một đường nối"} note={polo ? "Khung 170 × 50 mm; mép trên cách HPS 110 mm. Chiều cao chữ hoa ≥7 mm." : "Hai đầu gặp ở sườn trái, cách HPS 420 mm; canh khớp ±2 mm, không in đè đường may."}>
          {polo ? <DoItGarment polo back crop={{ x: 392, y: 147, w: 216, h: 90 }} style={{ width: "100%", height: "100%" }} />
            : <svg viewBox="0 0 300 145" style={{ width: "100%", height: "100%" }}><path d="M0 0 H148 V145 H0 M152 0 H300 V145 H152" fill={C.deep}/><path d="M148 0 V145 M152 0 V145" stroke={C.navy} strokeWidth="1" strokeDasharray="3 3"/><path d="M20 44 H84 Q105 44 105 65 V80 H148 M152 80 H201 Q222 80 222 59 V30" fill="none" stroke={C.green} strokeWidth="3"/><g fontFamily="'Be Vietnam Pro', sans-serif" fontSize="11" fill={C.white}><text x="25" y="124">Thân trước</text><text x="192" y="124">Thân sau</text></g><path d="M150 17 V62" stroke={C.white}/><text x="155" y="27" fontSize="11" fill={C.white}>Sườn trái</text></svg>}
        </Detail>
      </div>
    </section>
    <aside style={{ borderLeft: `1px solid ${C.rule}`, paddingLeft: 24, minWidth: 0 }}>
      <div style={{ fontSize: 11, letterSpacing: 1.4, fontWeight: 700, color: C.ink }}>HỒ SƠ THIẾT KẾ / B.{polo ? "01" : "02"}</div>
      <h2 style={{ fontSize: 24, fontWeight: 700, lineHeight: 1.3, marginTop: 10 }}>{polo ? "Lịch sự, không mất chất." : "Nối từ tôi đến chúng ta."}</h2>
      <p style={{ fontSize: 12, lineHeight: 1.75, marginTop: 12 }}>{polo ? "Thu nhỏ slogan, chuyển đường cáp thành nét thêu và viền cổ. Phù hợp giảng viên, tư vấn tuyển sinh và sự kiện của khoa." : "Đường cáp rời logo, vòng qua sườn và chạm vào lời đồng hành. Ngôn ngữ terminal dành cho sinh viên, câu lạc bộ và hackathon."}</p>
      <Spec title="01 / CHẤT LIỆU">{polo ? "Piqué cotton 65% / polyester 35%, 220–240 g/m². Dáng regular; cổ và bo tay dệt định hình." : "Cotton chải kỹ 100%, 210–230 g/m². Dáng relaxed, cổ rib 1×1; xử lý co trước khi cắt."}</Spec>
      <Spec title="02 / KỸ THUẬT & SỐ MÀU">{polo ? <><b>Thêu ngực:</b> 3 màu chỉ theo logo gốc; nét cáp 1 màu Terminal.<br/><b>Thêu lưng:</b> 2 màu trắng / Terminal.<br/>Mỗi vị trí ≤4 màu chỉ; chữ hoa ≥5 mm. Đơn giản hóa phím bàn phím trong file số hóa thêu.</> : <><b>Logo ngực:</b> DTF giữ nguyên ảnh gốc.<br/><b>Cáp trước:</b> in lụa 2 màu: trắng lót + Terminal.<br/><b>Lưng & cáp sau:</b> 2 màu mực: trắng + Terminal (trắng đồng thời làm lót). Không vị trí nào quá 4 màu in.</>}</Spec>
      <Spec title="03 / KÍCH THƯỚC & THI CÔNG">{polo ? <>Logo Ø80 mm; slogan 170 × 50 mm. Nét cáp thêu riêng dưới logo, không chạy qua sườn. Duyệt mẫu thêu trước sản xuất.</> : <>Lưng chính 290 × 280 mm, trong giới hạn 300 × 400 mm. Cáp trước 135 × 230 mm; cáp sau 120 × 64 mm, tách khuôn. In hai thân phẳng trước khi ráp, canh cùng mốc HPS; không in tràn / thăng hoa trên cotton.</>}</Spec>
      <Spec title="04 / BẢNG MÀU"><Palette /></Spec>
      <div style={{ background: shade(C.green, .85), borderLeft: `3px solid ${C.ink}`, padding: "11px 12px", marginTop: 17, fontSize: 11, lineHeight: 1.65 }}>
        <b style={{ color: C.ink }}>ĐÁNH ĐỔI</b><br/>{polo ? "Áo thun hút sinh viên và truyền thông hơn nhưng quá casual cho nghi lễ; polo giảm sắc xanh và tỷ lệ slogan để cân bằng." : "Sức hút mạnh nhất với sinh viên và mạng xã hội, nhưng quá casual cho dịp trang trọng. Đường cáp cần canh đăng chính xác ở hai thân."}
      </div>
    </aside>
  </div>;
}
