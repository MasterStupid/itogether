import type { CSSProperties, ReactNode } from "react";
import { BRAND, PALETTE } from "./brand";
import { ANCHORS, Embroidery, FitLogo, PoloShirt, TeeShirt } from "./garments";

export const SIGNATURE = {
  ink: PALETTE.navy.hex,
  silver: PALETTE.silver.hex,
  paper: "#EDF0F3",
  rule: "#D1D9E0",
};

export function SignatureGarment({ tee = false, back = false, white = false, crop, style }: {
  tee?: boolean; back?: boolean; white?: boolean;
  crop?: { x: number; y: number; w: number; h: number };
  style?: CSSProperties;
}) {
  const color = white ? BRAND.navy : PALETTE.silver.hex;
  const anchor = tee ? ANCHORS.tee.front.wearerLeftChest : ANCHORS.polo.front.wearerLeftChest;
  const slogan = (
    <g fontFamily="'Be Vietnam Pro', sans-serif" fill={color} textAnchor="middle">
      {tee && <text x="500" y="208" fontSize="15" fontWeight="600" letterSpacing="2">FIT-HPUni</text>}
      <text x="500" y={tee ? 230 : 150} fontSize="10" fontWeight="500">You can do IT,</text>
      <text x="500" y={tee ? 247 : 167} fontSize="10" fontWeight="500">we are ready to accompany</text>
    </g>
  );
  const art = back ? (tee ? slogan : <Embroidery>{slogan}</Embroidery>) :
    <FitLogo cx={anchor.x} cy={anchor.y} d={tee ? 90 : 80} embroidered={!tee} />;
  return tee ? (
    <TeeShirt side={back ? "back" : "front"} body={white ? PALETTE.white.hex : BRAND.navy}
      rib={white ? PALETTE.white.hex : BRAND.navy} crop={crop} style={style}>{art}</TeeShirt>
  ) : (
    <PoloShirt side={back ? "back" : "front"} body={white ? PALETTE.white.hex : BRAND.navy}
      collar={BRAND.navy} cuff={BRAND.navy} tipping={[PALETTE.white.hex, PALETTE.silver.hex]}
      placketInner={PALETTE.silver.hex} buttons={white ? BRAND.navy : PALETTE.silver.hex}
      buttonCount={2} crop={crop} style={style}>{art}</PoloShirt>
  );
}

export function SignatureTitle({ tee = false }: { tee?: boolean }) {
  return <div style={{ padding: "25px 30px 0", height: 118, display: "flex", alignItems: "flex-start", justifyContent: "space-between" }}>
    <div>
      <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.18em", color: BRAND.navy, marginBottom: 8 }}>DẤU ẤN / {tee ? "02 — THƯỜNG NHẬT" : "01 — ĐẠI DIỆN"}</div>
      <h1 style={{ fontFamily: "'Lora', serif", fontWeight: 500, fontSize: 39, lineHeight: 1.18, letterSpacing: "-0.04em", margin: 0 }}>{tee ? "Cùng một dấu ấn. Gần hơn mỗi ngày." : "Một huy hiệu. Một niềm tự hào."}</h1>
    </div>
    <div style={{ fontSize: 11, lineHeight: 1.8, textAlign: "right", color: "#667888", paddingTop: 6, flexShrink: 0, marginLeft: 12 }}>
      <div>FIT-HPUni</div><div>{tee ? "Sinh hoạt · Câu lạc bộ" : "Giảng đường · Nghi lễ"}</div>
    </div>
  </div>;
}

export function Detail({ number, title, children, note }: { number: string; title: string; children: ReactNode; note: string }) {
  return <section style={{ minWidth: 0 }}>
    <div style={{ display: "flex", gap: 8, alignItems: "baseline", marginBottom: 10 }}>
      <span style={{ fontSize: 11, color: "#708294" }}>{number}</span>
      <h3 style={{ fontSize: 13, fontWeight: 600, margin: 0 }}>{title}</h3>
    </div>
    <div style={{ height: 116, overflow: "hidden", background: "#E2E7EC", border: `1px solid ${SIGNATURE.rule}` }}>{children}</div>
    <p style={{ fontSize: 11, lineHeight: 1.65, color: "#526577", marginTop: 9 }}>{note}</p>
  </section>;
}

export function SpecRow({ title, children }: { title: string; children: ReactNode }) {
  return <div style={{ padding: "12px 0", borderBottom: `1px solid ${SIGNATURE.rule}` }}>
    <h3 style={{ fontSize: 11, letterSpacing: "0.09em", fontWeight: 700, margin: "0 0 6px", color: BRAND.navy }}>{title}</h3>
    <div style={{ fontSize: 12, lineHeight: 1.7, color: "#42576B" }}>{children}</div>
  </div>;
}

export function SignatureSpecs({ tee = false }: { tee?: boolean }) {
  return <aside style={{ width: 328, flexShrink: 0, borderLeft: `1px solid ${SIGNATURE.rule}`, padding: "27px 26px 18px", background: "#E7ECF0" }}>
    <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
      <div style={{ width: 28, height: 2, background: BRAND.navy }} />
      <span style={{ fontSize: 11, letterSpacing: "0.13em", fontWeight: 700 }}>HỒ SƠ THIẾT KẾ</span>
    </div>
    <h2 style={{ margin: "0 0 10px", fontSize: 22, fontWeight: 500, fontFamily: "'Lora', serif" }}>{tee ? "Tinh giản để đồng hành." : "Đĩnh đạc, không phô trương."}</h2>
    <p style={{ fontSize: 12, lineHeight: 1.8, margin: "0 0 5px", color: "#526577" }}>
      {tee ? "Giữ huy hiệu ngực trái, bỏ nẹp và viền bo. Một cụm chữ nhỏ ở lưng trên nối trang phục hoạt động với bộ nhận diện chính thức." : "Logo là huy hiệu của tập thể. Viền dệt và đường thêu thay cho đồ họa lớn; chữ ký dưới cổ sau chỉ hiện rõ khi đến gần."}
    </p>
    <SpecRow title="01 / CHẤT LIỆU & PHOM">
      {tee ? "Cotton chải kỹ compact 100%, 220 g/m². Phom suông vừa; bo cổ 1×1 có sợi đàn hồi, băng vai chống giãn." : "Piqué CVC 60% cotton / 40% polyester, 230 g/m². Phom suông vừa; cổ và bo tay dệt định hình, nẹp 2 cúc."}
    </SpecRow>
    <SpecRow title="02 / KỸ THUẬT & SỐ MÀU">
      {tee ? "Logo: DTF nguyên bản cho lô nhỏ, không tách lại màu logo. Cụm chữ lưng: in lụa 1 màu xám bạc; bản trắng dùng xanh FIT. Không in tràn thân." : "Logo thêu vi tính: tối đa 3 màu chỉ theo mẫu gốc (xanh / trắng / tông đậm). Đơn giản hóa phím bàn phím trong file số hóa thêu. Chữ gáy: thêu 1 màu xám bạc; chiều cao chữ hoa ≥ 5 mm."}
    </SpecRow>
    <SpecRow title="03 / KÍCH THƯỚC & ĐỊNH VỊ">
      {tee ? <>Ngực trái: Ø90 mm; tâm cách HPS 178 mm, lệch giữa thân 98 mm.<br />Lưng trên: khung 180 × 48 mm; tâm ngang thân, mép trên cách HPS 135 mm. Không phải vị trí in gáy.</> : <>Ngực trái: Ø80 mm; tâm cách HPS 190 mm, lệch giữa thân 100 mm.<br />Chữ dưới cổ sau: khung 170 × 30 mm; mép trên cách HPS 82 mm, giữa lưng.</>}
    </SpecRow>
    <SpecRow title="04 / BẢNG MÀU VẢI">
      <div style={{ display: "flex", gap: 13, marginBottom: 8 }}>
        {[PALETTE.navy, PALETTE.white, PALETTE.silver].map(c => <div key={c.hex}>
          <div style={{ height: 21, width: 67, background: c.hex, border: "1px solid #BAC6D0", marginBottom: 4 }} />
          <span style={{ fontSize: 11 }}>{c.hex}</span>
        </div>)}
      </div>
      <div style={{ fontSize: 11, lineHeight: 1.65 }}>{PALETTE.navy.pantone}.<br />Duyệt cuối bằng lab dip / so màu vải.</div>
    </SpecRow>
    <div style={{ marginTop: 16, borderLeft: `2px solid ${BRAND.navy}`, paddingLeft: 12 }}>
      <h3 style={{ fontSize: 11, fontWeight: 700, margin: "0 0 5px" }}>ĐÁNH ĐỔI CÓ CHỦ ĐÍCH</h3>
      <p style={{ fontSize: 11, lineHeight: 1.75, color: "#526577", margin: 0 }}>Lịch sự, dùng lâu dài trên 5 năm; ít sôi nổi với sinh viên. Cảm giác cao cấp phụ thuộc vào {tee ? "vải, bo cổ và độ sắc của bản in" : "chỉ thêu, mật độ mũi và chất lượng viền dệt"}. Cần duyệt mẫu thật trước sản xuất.</p>
    </div>
  </aside>;
}

export function GarmentPair({ tee = false }: { tee?: boolean }) {
  return <div style={{ height: 467, display: "grid", gridTemplateColumns: "1fr 1fr", position: "relative", padding: "0 10px" }}>
    {[false, true].map(back => <div key={String(back)} style={{ position: "relative", paddingTop: 10 }}>
      <SignatureGarment tee={tee} back={back} style={{ width: "100%", height: 420 }} />
      <div style={{ display: "flex", justifyContent: "space-between", padding: "0 35px", color: "#607487", fontSize: 11 }}>
        <span style={{ letterSpacing: "0.12em" }}>{back ? "MẶT SAU" : "MẶT TRƯỚC"}</span>
        <span>{back ? (tee ? "Cụm chữ 180 × 48 mm" : "Chữ ký 170 × 30 mm") : (tee ? "Logo Ø90 mm" : "Logo thêu Ø80 mm")}</span>
      </div>
    </div>)}
  </div>;
}
