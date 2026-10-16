import { BoardShell } from "./_shared/BoardShell";
import { BRAND } from "./_shared/brand";
import { Detail, GarmentPair, SIGNATURE, SignatureGarment, SignatureSpecs, SignatureTitle } from "./_shared/signature";

export function SignaturePolo() {
  return <BoardShell code="A" concept="Dấu Ấn" garment="Áo polo" accent={BRAND.navy}>
    <div style={{ display: "flex", height: "100%", background: SIGNATURE.paper, color: "#233D53" }}>
      <div style={{ flex: 1, minWidth: 0 }}>
        <SignatureTitle />
        <GarmentPair />
        <div style={{ margin: "0 30px", borderTop: `1px solid ${SIGNATURE.rule}`, paddingTop: 18, display: "grid", gridTemplateColumns: "1.08fr 1.08fr 0.84fr", gap: 22 }}>
          <Detail number="01" title="Viền dệt, không phải viền in" note="Hai sọc 3,2 mm; cách nhau 2,6 mm. Đồng nhất cổ và bo tay; mép ngoài cách sọc 5,5 mm.">
            <SignatureGarment crop={{ x: 365, y: 50, w: 270, h: 130 }} style={{ width: "100%", height: "100%" }} />
          </Detail>
          <Detail number="02" title="Chữ ký dưới cổ sau" note="Thêu 170 × 30 mm; cách HPS 82 mm. Đặt ngoài chân cổ để đọc được mà không làm lưng áo nặng.">
            <SignatureGarment back crop={{ x: 395, y: 107, w: 210, h: 80 }} style={{ width: "100%", height: "100%" }} />
          </Detail>
          <Detail number="03" title="Bản trắng / mùa hè" note="Thân trắng; giữ cổ và bo tay xanh FIT. Chữ thêu sau chuyển xanh, logo giữ nguyên.">
            <SignatureGarment white style={{ width: "100%", height: "100%" }} />
          </Detail>
        </div>
      </div>
      <SignatureSpecs />
    </div>
  </BoardShell>;
}
