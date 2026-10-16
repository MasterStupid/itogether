import { FitLogo, TeeShirt } from "./_shared/garments";
import {
  H,
  HemTab,
  HeroLockup,
  Intro,
  Loupe,
  Loupes,
  Marker,
  NeckPrint,
  Rail,
  SleeveBloom,
  Stage,
  SvBoard,
} from "./_shared/hoahoctro";

const TEE = { body: H.deep, rib: H.deep, ribTipping: [H.red, H.yellow] } as const;

const PAD = { top: 30, right: 20, bottom: 10, left: 20 };

/* back lockup: 37 x 7 mm = 259 mm wide (A3 limit 300 x 400), top ~HPS +115 mm */
const HERO = { x: 370.5, y: 170, s: 7 };

function FrontArt() {
  return (
    <>
      <FitLogo cx={598} cy={238} d={90} />
      <SleeveBloom cx={172} cy={241} cell={6.5} rot={61.2} />
    </>
  );
}

function BackArt() {
  return <HeroLockup {...HERO} user="baongoc" puff />;
}

function Mini({ body, rib }: { body: string; rib: string }) {
  return (
    <TeeShirt body={body} rib={rib} ribTipping={[H.red, H.yellow]} style={{ width: 72, height: 62 }}>
      <FitLogo cx={598} cy={238} d={90} />
      <SleeveBloom cx={172} cy={241} cell={6.5} rot={61.2} />
    </TeeShirt>
  );
}

export function HoaHocTroTee() {
  return (
    <SvBoard
      garment="Áo thun"
      intro={
        <Intro
          eyebrow="BẢN SINH VIÊN · PHÁT TRIỂN TỪ PHƯƠNG ÁN C"
          title="Chiếc áo muốn mặc đến mùa phượng cuối."
          sub="Phom rộng, vải dày, chữ IT in nổi — và tên của bạn ngay trên lưng áo."
          minis={[
            { label: "Trắng", node: <Mini body={H.white} rib={H.deep} /> },
            { label: "Xanh FIT", node: <Mini body={H.navy} rib={H.deep} /> },
          ]}
        />
      }
      stage={
        <Stage
          frontNote="Logo DTF · phượng tay phải · nhãn in trong cổ"
          backNote="Hình lưng 260 × 315 mm · chữ IT in nổi"
          front={
            <TeeShirt
              {...TEE}
              pad={PAD}
              style={{ width: "100%", height: 428 }}
              annotations={
                <>
                  <NeckPrint cx={500} y={76} />
                  <HemTab x={765} y={742} />
                  <Marker x={618} y={112} n={3} />
                  <Marker x={246} y={150} n={4} />
                </>
              }
            >
              <FrontArt />
            </TeeShirt>
          }
          back={
            <TeeShirt
              {...TEE}
              side="back"
              pad={PAD}
              style={{ width: "100%", height: 428 }}
              annotations={
                <>
                  <Marker x={343} y={178} n={1} />
                  <Marker x={655} y={225} n={2} />
                </>
              }
            >
              <BackArt />
            </TeeShirt>
          }
        />
      }
      loupes={
        <Loupes>
          <Loupe n={1} title="Dòng lệnh mang tên bạn" note="Chữ tên cao 8,7 mm. Bản chung in “sinhvien”; bản có tên in DTF riêng từng áo.">
            <TeeShirt {...TEE} side="back" crop={{ x: 360, y: 160, w: 272, h: 140 }} style={{ width: "100%", height: 128 }}>
              <BackArt />
            </TeeShirt>
          </Loupe>
          <Loupe n={2} title="Dấu phẩy là cánh phượng rơi" note="Chữ IT in nổi (puff), sờ thấy được. Câu kết bằng con trỏ vàng: khoa luôn sẵn sàng.">
            <TeeShirt {...TEE} side="back" crop={{ x: 362, y: 366, w: 262, h: 135 }} style={{ width: "100%", height: 128 }}>
              <BackArt />
            </TeeShirt>
          </Loupe>
          <Loupe n={3} title="Nhãn in trong cổ" note="Không mác cứng, không cấn gáy. Size và chất liệu in 56 × 15 mm bên trong cổ.">
            <TeeShirt
              {...TEE}
              crop={{ x: 436, y: 44, w: 128, h: 66 }}
              style={{ width: "100%", height: 128 }}
              annotations={<NeckPrint cx={500} y={76} />}
            >
              <FrontArt />
            </TeeShirt>
          </Loupe>
          <Loupe n={4} title="Phượng ở tay phải" note="58 × 58 mm, in lụa 3 khuôn; cách gấu tay 55 mm, đứng thẳng khi buông tay.">
            <TeeShirt {...TEE} crop={{ x: 84, y: 196, w: 170, h: 88 }} style={{ width: "100%", height: 128 }}>
              <FrontArt />
            </TeeShirt>
          </Loupe>
        </Loupes>
      }
      rail={
        <Rail
          heading="Dày dặn, rộng rãi, mặc mãi không chán."
          rows={[
            [
              "Chất liệu & phom",
              "Cotton 100% 250 g/m², xử lý co trước khi cắt. Phom boxy vai rơi, bảng size riêng (hình vẽ dùng phom chuẩn để so sánh).",
            ],
            ["Ngực trái · tay phải", "Logo chính thức DTF Ø90 mm, giữ nguyên ảnh gốc. Phượng pixel 58 × 58 mm, in lụa 3 khuôn."],
            [
              "Lưng",
              "Hình 260 × 315 mm (trong khổ 300 × 400), mép trên dưới HPS 115 mm. In lụa 4 khuôn: lót trắng (kiêm chữ nhỏ, lá tram 40%), đỏ, vàng, trắng in nổi cho chữ IT.",
            ],
            ["Cổ & nhãn", "Bo cổ rib 2 cm, 2 sọc đỏ – vàng. Nhãn size in trong cổ; tab dệt đỏ “FIT” ở sườn trái."],
            ["Cá nhân hóa", "Bản chung in “sinhvien”. Bản có tên: dòng lệnh in DTF riêng từng áo theo danh sách lớp."],
            ["Giới hạn kỹ thuật", "Ô pixel ở lưng 7 mm, ở tay 6,5 mm; nét chữ nhỏ nhất 1,2 mm. Không in thăng hoa (sublimation) trên cotton."],
          ]}
          tradeoff="In nổi và tên riêng làm tăng chi phí; hình lưng lớn hợp hoạt động, không hợp dịp trang trọng."
        />
      }
    />
  );
}
