import { FitLogo, PoloShirt, shade } from "./_shared/garments";
import {
  H,
  HemTab,
  HeroLockup,
  Intro,
  Loupe,
  Loupes,
  Marker,
  Rail,
  SleeveBloom,
  Stage,
  SvBoard,
} from "./_shared/hoahoctro";

const POLO = {
  body: H.deep,
  collar: H.deep,
  cuff: H.deep,
  tipping: [H.red, H.yellow],
  placketInner: H.red,
  buttons: shade(H.deep, -0.25),
} as const;

const PAD = { top: 30, right: 20, bottom: 10, left: 20 };

/* back lockup: 37 x 4.8 mm = 178 mm wide, centred; top ~HPS +120 mm */
const HERO = { x: 411.2, y: 180, s: 4.8 };

function FrontArt() {
  return (
    <>
      <FitLogo cx={600} cy={250} d={80} embroidered />
      <SleeveBloom cx={174} cy={237} cell={4.5} rot={62.9} embroidered />
    </>
  );
}

function BackArt() {
  return <HeroLockup {...HERO} user="minhanh" />;
}

function Mini({ body, collar }: { body: string; collar: string }) {
  return (
    <PoloShirt body={body} collar={collar} cuff={collar} tipping={[H.red, H.yellow]} placketInner={H.red} style={{ width: 72, height: 62 }}>
      <FitLogo cx={600} cy={250} d={80} />
      <SleeveBloom cx={174} cy={237} cell={4.5} rot={62.9} />
    </PoloShirt>
  );
}

export function HoaHocTroPolo() {
  return (
    <SvBoard
      garment="Áo polo"
      intro={
        <Intro
          eyebrow="BẢN SINH VIÊN · PHÁT TRIỂN TỪ PHƯƠNG ÁN C"
          title="Polo mà sinh viên tự muốn mặc."
          sub="Giữ hoa phượng của C, mượn chơi chữ “do IT” của B, thêm tên riêng của từng bạn."
          minis={[
            { label: "Trắng", node: <Mini body={H.white} collar={H.deep} /> },
            { label: "Xanh FIT", node: <Mini body={H.navy} collar={H.deep} /> },
          ]}
        />
      }
      stage={
        <Stage
          frontNote="Logo thêu · phượng tay phải · tab sườn trái"
          backNote="Hình lưng 178 × 215 mm"
          front={
            <PoloShirt
              {...POLO}
              pad={PAD}
              style={{ width: "100%", height: 428 }}
              annotations={
                <>
                  <HemTab x={767} y={686} />
                  <Marker x={652} y={118} n={3} />
                  <Marker x={238} y={156} n={4} />
                </>
              }
            >
              <FrontArt />
            </PoloShirt>
          }
          back={
            <PoloShirt
              {...POLO}
              side="back"
              pad={PAD}
              style={{ width: "100%", height: 428 }}
              annotations={
                <>
                  <Marker x={386} y={188} n={1} />
                  <Marker x={614} y={222} n={2} />
                </>
              }
            >
              <BackArt />
            </PoloShirt>
          }
        />
      }
      loupes={
        <Loupes>
          <Loupe n={1} title="Dòng lệnh mang tên bạn" note="Chữ tên cao 6 mm. Bản chung in “sinhvien”; bản có tên in DTF theo danh sách lớp.">
            <PoloShirt {...POLO} side="back" crop={{ x: 403, y: 174, w: 192, h: 99 }} style={{ width: "100%", height: 128 }}>
              <BackArt />
            </PoloShirt>
          </Loupe>
          <Loupe
            n={2}
            title="Dấu phẩy là cánh phượng rơi"
            note="Đọc trọn “You can do IT, we are ready to accompany”, kết bằng con trỏ vàng."
          >
            <PoloShirt {...POLO} side="back" crop={{ x: 404, y: 304, w: 186, h: 96 }} style={{ width: "100%", height: 128 }}>
              <BackArt />
            </PoloShirt>
          </Loupe>
          <Loupe n={3} title="Viền đỏ – vàng ở cổ và tay" note="Bo dệt 2 sọc 3,2 mm, cách mép 5,5 mm; nẹp trong đỏ 3 mm.">
            <PoloShirt {...POLO} crop={{ x: 375, y: 40, w: 250, h: 129 }} style={{ width: "100%", height: 128 }}>
              <FrontArt />
            </PoloShirt>
          </Loupe>
          <Loupe n={4} title="Phượng thêu ở tay phải" note="40 × 40 mm, 3 màu chỉ, ô 4,5 mm; cách bo tay 35 mm, đứng thẳng khi buông tay.">
            <PoloShirt {...POLO} crop={{ x: 80, y: 196, w: 160, h: 82.5 }} style={{ width: "100%", height: 128 }}>
              <FrontArt />
            </PoloShirt>
          </Loupe>
        </Loupes>
      }
      rail={
        <Rail
          heading="Đủ lịch sự để lên lớp, đủ chất để đi chơi."
          rows={[
            [
              "Chất liệu & phom",
              "Cá sấu cotton 100%, 230–250 g/m², mặt vải dày. Phom regular rộng, có bảng size phom rộng riêng (hình vẽ dùng phom chuẩn để so sánh).",
            ],
            ["Ngực trái · tay phải", "Logo chính thức thêu Ø80 mm, tâm dưới HPS 190 mm. Phượng pixel thêu 40 × 40 mm, 3 màu chỉ."],
            [
              "Lưng",
              "Hình 178 × 215 mm, mép trên dưới HPS 120 mm. In lụa 4 khuôn: lót trắng (kiêm lá tram), trắng, đỏ, vàng; DTF cho lô nhỏ.",
            ],
            ["Cổ, tay & gấu", "Bo dệt than đậm, 2 sọc đỏ – vàng; nẹp trong đỏ. Tab dệt đỏ “FIT” 11 × 24 mm may vào sườn trái."],
            ["Cá nhân hóa", "Bản chung in “sinhvien”. Bản có tên: dòng lệnh in DTF riêng từng áo theo danh sách lớp."],
            ["Lưu ý sản xuất", "Cần file logo vector gốc; giản lược phím bàn phím trong file thêu logo."],
          ]}
          tradeoff="Hình lưng và tên riêng làm tăng chi phí, thêm khâu xử lý danh sách; không thay polo trang trọng (A hoặc C) của giảng viên."
        />
      }
    />
  );
}
