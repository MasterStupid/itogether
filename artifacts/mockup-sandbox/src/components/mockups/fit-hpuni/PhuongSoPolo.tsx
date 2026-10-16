import { BoardShell } from "./_shared/BoardShell";
import { PoloShirt } from "./_shared/garments";
import { C, Detail, Intro, PoloArt, Rationale, Specs, ViewLabel } from "./_shared/phuongso";

const polo = { body: C.navy, collar: C.deep, cuff: C.deep, tipping: [C.red], placketInner: C.red, buttons: C.deep } as const;

export function PhuongSoPolo() {
  return <BoardShell code="C" concept="Phượng Số" garment="Áo polo" accent={C.red}>
    <div style={{ height: "100%", background: "#f3f2ee", color: C.deep }}>
      <Intro polo />
      <div style={{ display: "grid", gridTemplateColumns: "minmax(0,1fr) 336px", gap: 24, padding: "0 32px 22px", height: "calc(100% - 103px)" }}>
        <div>
          <div style={{ height: 435, display: "grid", gridTemplateColumns: "1fr 1fr", background: "#e8eced" }}>
            <div style={{ position: "relative", padding: "3px 0 32px" }}><PoloShirt {...polo} style={{ width: "100%", height: 398 }}><PoloArt /></PoloShirt><ViewLabel /></div>
            <div style={{ position: "relative", padding: "3px 0 32px" }}><PoloShirt {...polo} side="back" style={{ width: "100%", height: 398 }}><PoloArt back /></PoloShirt><ViewLabel back /></div>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 14, marginTop: 16 }}>
            <Detail number="C.1" title="Logo chính thức · thêu Ø80 mm" note="Tâm ngực trái: x +100 / HPS +190 mm.">
              <PoloShirt {...polo} crop={{ x: 537, y: 193, w: 126, h: 114 }} style={{ width: "100%", height: 130 }}><PoloArt /></PoloShirt>
            </Detail>
            <Detail number="C.2" title="Bo cổ & bo tay · một sọc đỏ" note="Sọc 3,2 mm; cổ cách mép 5,5 mm.">
              <PoloShirt {...polo} crop={{ x: 377, y: 42, w: 246, h: 142 }} style={{ width: "100%", height: 130 }} />
            </Detail>
            <Detail number="C.3" title="Dấu phượng sau gáy · 45 × 45 mm" note="Đỉnh HPS +75 mm; khối satin ≥3 mm.">
              <PoloShirt {...polo} side="back" crop={{ x: 455, y: 122, w: 90, h: 72 }} style={{ width: "100%", height: 130 }}><PoloArt back /></PoloShirt>
            </Detail>
          </div>
          <Rationale polo />
        </div>
        <Specs polo />
      </div>
    </div>
  </BoardShell>;
}
