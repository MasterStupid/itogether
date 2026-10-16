import { BoardShell } from "./_shared/BoardShell";
import { TeeShirt } from "./_shared/garments";
import { C, Detail, Intro, Rationale, Specs, TeeArt, ViewLabel } from "./_shared/phuongso";

const tee = { body: C.white, rib: C.navy } as const;

export function PhuongSoTee() {
  return <BoardShell code="C" concept="Phượng Số" garment="Áo thun" accent={C.red}>
    <div style={{ height: "100%", background: "#f3f2ee", color: C.deep }}>
      <Intro polo={false} />
      <div style={{ display: "grid", gridTemplateColumns: "minmax(0,1fr) 336px", gap: 24, padding: "0 32px 22px", height: "calc(100% - 103px)" }}>
        <div>
          <div style={{ height: 435, display: "grid", gridTemplateColumns: "1fr 1fr", background: "#e8eced" }}>
            <div style={{ position: "relative", padding: "3px 0 32px" }}><TeeShirt {...tee} style={{ width: "100%", height: 398 }}><TeeArt /></TeeShirt><ViewLabel /></div>
            <div style={{ position: "relative", padding: "3px 0 32px" }}><TeeShirt {...tee} side="back" style={{ width: "100%", height: 398 }}><TeeArt back /></TeeShirt><ViewLabel back /></div>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 14, marginTop: 16 }}>
            <Detail number="C.1" title="Ngực trái · logo Ø90 mm" note="Tâm x +98 / HPS +178 mm; in 2 màu.">
              <TeeShirt {...tee} crop={{ x: 535, y: 180, w: 126, h: 114 }} style={{ width: "100%", height: 130 }}><TeeArt /></TeeShirt>
            </Detail>
            <Detail number="C.2" title="Phượng thật, nhịp pixel · ô ≥2,5 mm" note="4 cánh đỏ; cánh cờ trắng, vệt đỏ, nhụy vàng.">
              <TeeShirt {...tee} side="back" crop={{ x: 441, y: 185, w: 115, h: 113 }} style={{ width: "100%", height: 130 }}><TeeArt back /></TeeShirt>
            </Detail>
            <Detail number="C.3" title="Cụm lưng · 280 × 335 mm" note="Đỉnh HPS +130 mm; lá kép, quả dẹt, mạch số.">
              <TeeShirt {...tee} side="back" crop={{ x: 344, y: 175, w: 312, h: 360 }} style={{ width: "100%", height: 130 }}><TeeArt back /></TeeShirt>
            </Detail>
          </div>
          <Rationale polo={false} />
        </div>
        <Specs polo={false} />
      </div>
    </div>
  </BoardShell>;
}
