import { BoardShell } from "./_shared/BoardShell";
import { BRAND } from "./_shared/brand";
import { Detail, GarmentPair, SIGNATURE, SignatureGarment, SignatureSpecs, SignatureTitle } from "./_shared/signature";

export function SignatureTee() {
  return <BoardShell code="A" concept="Dấu Ấn" garment="Áo thun" accent={BRAND.navy}>
    <div style={{ display: "flex", height: "100%", background: SIGNATURE.paper, color: "#233D53" }}>
      <div style={{ flex: 1, minWidth: 0 }}>
        <SignatureTitle tee />
        <GarmentPair tee />
        <div style={{ margin: "0 30px", borderTop: `1px solid ${SIGNATURE.rule}`, paddingTop: 18, display: "grid", gridTemplateColumns: "1.08fr 1.08fr 0.84fr", gap: 22 }}>
          <Detail number="01" title="Huy hiệu chung một tập thể" note="Logo Ø90 mm. Tâm ở HPS +178 mm, lệch giữa thân 98 mm; DTF giữ nguyên hình gốc.">
            <SignatureGarment tee crop={{ x: 531, y: 177, w: 134, h: 122 }} style={{ width: "100%", height: "100%" }} />
          </Detail>
          <Detail number="02" title="Một lời đồng hành ở lưng trên" note="Khung 180 × 48 mm, HPS +135 mm. In lụa 1 màu xám bạc; khoảng thở lớn quanh cụm chữ.">
            <SignatureGarment tee back crop={{ x: 390, y: 180, w: 220, h: 85 }} style={{ width: "100%", height: "100%" }} />
          </Detail>
          <Detail number="03" title="Bản trắng / hoạt động ngày" note="Thân và bo cổ trắng; chữ lưng xanh FIT. Cùng hệ thống, nhẹ hơn cho ngày ngoài trời.">
            <SignatureGarment tee white style={{ width: "100%", height: "100%" }} />
          </Detail>
        </div>
      </div>
      <SignatureSpecs tee />
    </div>
  </BoardShell>;
}
