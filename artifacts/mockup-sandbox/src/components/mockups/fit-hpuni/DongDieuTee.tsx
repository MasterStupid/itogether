import type { ComponentProps, ReactNode } from "react";
import { BRAND, PALETTE } from "./_shared/brand";
import { FitLogo, TeeShirt, ANCHORS } from "./_shared/garments";

/* ==================================================================
   Đồng Điệu · áo thun mặc hằng ngày (board label only — never printed)
   One focal motif: a phượng flower whose centre is a PCB via and whose
   stem is four circuit traces growing out of the faculty wordmark.
   1 SVG unit = 1 mm on size L. All callouts read from the constants below.
   ================================================================== */

const K = {
  deep: PALETTE.navyDeep.hex,
  navy: PALETTE.navy.hex,
  red: PALETTE.phuong.hex,
  white: PALETTE.white.hex,
  paper: "#F1ECE4",
  card: "#F8F5F0",
  rule: "#DDD5CA",
  ink: "#17222E",
  muted: "#5E6772",
};
const SANS = "'Be Vietnam Pro', sans-serif";
const MONO = "'JetBrains Mono', monospace";

/* ---------- artwork geometry (mm) ---------- */
const C = { x: 500, y: 286 }; // flower centre = via
const ART = { x: 380, top: 195, right: 620, bottom: 524 }; // measured bbox
const ART_W = ART.right - ART.x; // 240
const ART_H = ART.bottom - ART.top; // 329
const HPS_Y = 60;
const LOGO = { ...ANCHORS.tee.front.wearerLeftChest, d: 80 };
const LABEL = { x: 475, y: 78, w: 50, h: 20 };

const PETAL =
  "M0,-10 C-5,-20 -7,-32 -16,-44 C-34,-62 -38,-86 -22,-95 C-14,-99 -8,-94 -3,-98 C2,-101 8,-97 12,-98 C30,-97 40,-80 30,-60 C24,-48 10,-34 5,-22 C3,-16 2,-12 0,-10 Z";
const VEINS = ["M0,-18 L0,-84", "M-2,-38 Q-12,-58 -20,-82", "M2,-38 Q12,-58 20,-82"];
const STREAKS = ["M0,-16 L0,-70", "M-3,-34 Q-10,-50 -14,-66", "M3,-34 Q10,-50 14,-66", "M-6,-48 L-22,-72", "M6,-48 L22,-72"];
const RED_PETALS: [number, number][] = [
  [70, 1],
  [142, 0.97],
  [218, 1],
  [290, 0.98],
];

const TRACES = [
  { d: `M493,296 V360 L462,391 V398`, pad: [462, 404] },
  { d: `M493,296 V386 L477,402 V410`, pad: [477, 416] },
  { d: `M500,296 V414`, pad: [500, 420] },
  { d: `M507,296 V380 L527,400 V404`, pad: [527, 410] },
];

type Ink = { body: string; ink: string; red: string };

function Pad({ x, y, ink, body, r = 4.4 }: { x: number; y: number; ink: string; body: string; r?: number }) {
  return (
    <g>
      <circle cx={x} cy={y} r={r} fill={ink} />
      <circle cx={x} cy={y} r={r * 0.42} fill={body} />
    </g>
  );
}

/** The whole back print. ink = white on navy, navy on white fabric. */
function BackArt({ body, ink, red }: Ink) {
  return (
    <g>
      {/* traces first so the petals overlap their roots */}
      <g fill="none" stroke={ink} strokeWidth={2.6} strokeLinecap="round" strokeLinejoin="round">
        {TRACES.map((t, i) => (
          <path key={i} d={t.d} />
        ))}
      </g>
      {TRACES.map((t, i) => (
        <Pad key={i} x={t.pad[0]} y={t.pad[1]} ink={ink} body={body} />
      ))}

      {/* four scarlet petals, veins knocked out to the fabric */}
      {RED_PETALS.map(([a, s]) => (
        <g key={a} transform={`translate(${C.x} ${C.y}) rotate(${a}) scale(${s})`}>
          <path d={PETAL} fill={red} />
          <g fill="none" stroke={body} strokeWidth={1.5 / s} strokeLinecap="round">
            {VEINS.map((d) => (
              <path key={d} d={d} />
            ))}
          </g>
        </g>
      ))}
      {/* upright standard petal: ink with red streaks */}
      <g transform={`translate(${C.x} ${C.y}) scale(0.92)`}>
        <path d={PETAL} fill={ink} />
        <g fill="none" stroke={red} strokeWidth={2.2} strokeLinecap="round">
          {STREAKS.map((d) => (
            <path key={d} d={d} />
          ))}
        </g>
      </g>
      {/* centre = via */}
      <circle cx={C.x} cy={C.y} r={13} fill={body} />
      <circle cx={C.x} cy={C.y} r={10} fill={ink} />
      <circle cx={C.x} cy={C.y} r={4.4} fill={body} />

      {/* one fallen petal */}
      <g transform="translate(588 402) rotate(128) scale(0.3)">
        <path d={PETAL} fill={red} />
      </g>

      {/* faculty identity + verbatim slogan */}
      <text
        x={500}
        y={476}
        textAnchor="middle"
        textLength={ART_W}
        lengthAdjust="spacingAndGlyphs"
        fontFamily={SANS}
        fontWeight={800}
        fontSize={46}
        fill={ink}
      >
        FIT-HPUni
      </text>
      <text
        x={500}
        y={503}
        textAnchor="middle"
        textLength={ART_W}
        lengthAdjust="spacingAndGlyphs"
        fontFamily={SANS}
        fontWeight={600}
        fontSize={11}
        fill={ink}
      >
        You can do <tspan fill={red}>IT</tspan>, we are ready to accompany
      </text>
      <text
        x={500}
        y={ART.bottom}
        textAnchor="middle"
        textLength={ART_W}
        lengthAdjust="spacing"
        fontFamily={SANS}
        fontWeight={500}
        fontSize={7}
        fill={ink}
        opacity={0.78}
      >
        KHOA CÔNG NGHỆ THÔNG TIN · TRƯỜNG ĐẠI HỌC HẢI PHÒNG
      </text>
    </g>
  );
}

function FrontArt() {
  return <FitLogo cx={LOGO.x} cy={LOGO.y} d={LOGO.d} />;
}

/** Tagless neck print, visible inside the back neck in front views. */
function NeckLabel({ color }: { color: string }) {
  return (
    <g fontFamily={SANS} fill={color} textAnchor="middle" opacity={0.9}>
      <text x={500} y={LABEL.y + 6.5} fontSize={6.4} fontWeight={800} textLength={34} lengthAdjust="spacingAndGlyphs">
        FIT-HPUni
      </text>
      <text x={500} y={LABEL.y + 13} fontSize={4.4} fontWeight={600}>
        L · 100% COTTON
      </text>
      <text x={500} y={LABEL.y + 18.6} fontSize={3.6}>
        Giặt lộn trái · không sấy
      </text>
    </g>
  );
}

/* ---------- annotation helpers (mm) ---------- */
function Pill({ x, y, children, anchor = "middle" }: { x: number; y: number; children: string; anchor?: "middle" | "start" | "end" }) {
  const w = children.length * 15.5 + 22;
  const rx = anchor === "middle" ? x - w / 2 : anchor === "start" ? x : x - w;
  return (
    <g>
      <rect x={rx} y={y - 19} width={w} height={38} rx={19} fill={K.paper} stroke={K.red} strokeWidth={1.6} />
      <text x={rx + w / 2} y={y + 9} textAnchor="middle" fontFamily={MONO} fontWeight={700} fontSize={26} fill={K.ink}>
        {children}
      </text>
    </g>
  );
}

function DimH({ x1, x2, y, label }: { x1: number; x2: number; y: number; label: string }) {
  return (
    <g stroke={K.paper} strokeWidth={1.6} fill="none">
      <path d={`M${x1},${y} H${x2}`} strokeDasharray="6 4" />
      <path d={`M${x1},${y - 9} V${y + 9} M${x2},${y - 9} V${y + 9}`} />
      <Pill x={(x1 + x2) / 2} y={y}>{label}</Pill>
    </g>
  );
}

function DimV({ x, y1, y2, label }: { x: number; y1: number; y2: number; label: string }) {
  return (
    <g stroke={K.paper} strokeWidth={1.6} fill="none">
      <path d={`M${x},${y1} V${y2}`} strokeDasharray="6 4" />
      <path d={`M${x - 9},${y1} H${x + 9} M${x - 9},${y2} H${x + 9}`} />
      <Pill x={x} y={(y1 + y2) / 2}>{label}</Pill>
    </g>
  );
}

function Marker({ x, y, n }: { x: number; y: number; n: number }) {
  return (
    <g>
      <circle cx={x} cy={y} r={17} fill={K.red} stroke={K.paper} strokeWidth={3} />
      <text x={x} y={y + 7.5} textAnchor="middle" fontFamily={SANS} fontWeight={800} fontSize={21} fill={K.white}>
        {n}
      </text>
    </g>
  );
}

/* ---------- garments ---------- */
const NAVY: Ink = { body: K.deep, ink: K.white, red: K.red };
const WHITE: Ink = { body: K.white, ink: K.deep, red: K.red };
const PAD = { top: 20, right: 40, bottom: 30, left: 40 };

function Back({ c = NAVY, ...rest }: { c?: Ink } & Omit<ComponentProps<typeof TeeShirt>, "body">) {
  return (
    <TeeShirt side="back" body={c.body} {...rest}>
      <BackArt {...c} />
    </TeeShirt>
  );
}

function Front({ c = NAVY, ...rest }: { c?: Ink } & Omit<ComponentProps<typeof TeeShirt>, "body">) {
  return (
    <TeeShirt side="front" body={c.body} {...rest}>
      <FrontArt />
    </TeeShirt>
  );
}

/* ---------- board pieces ---------- */
function Eyebrow({ children }: { children: ReactNode }) {
  return <div className="text-[10.5px] font-bold tracking-[0.18em]" style={{ color: K.red }}>{children}</div>;
}

function Loupe({ n, title, note, children }: { n: number; title: string; note: string; children: ReactNode }) {
  return (
    <div className="flex min-w-0 flex-col">
      <div className="overflow-hidden rounded-[14px] border" style={{ borderColor: K.rule, background: "#E7E1D8" }}>
        {children}
      </div>
      <div className="mt-2.5 flex items-start gap-2">
        <span
          className="mt-[1px] flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded-full text-[10px] font-extrabold text-white"
          style={{ background: K.red }}
        >
          {n}
        </span>
        <div>
          <div className="text-[12.5px] font-bold leading-tight">{title}</div>
          <div className="mt-1 text-[11px] leading-[1.45]" style={{ color: K.muted }}>{note}</div>
        </div>
      </div>
    </div>
  );
}

function Row({ k, children }: { k: string; children: ReactNode }) {
  return (
    <div className="grid grid-cols-[86px_1fr] gap-3 border-t py-2.5" style={{ borderColor: K.rule }}>
      <div className="text-[10.5px] font-bold uppercase tracking-[0.08em]" style={{ color: K.muted }}>{k}</div>
      <div className="text-[11.5px] leading-[1.5]">{children}</div>
    </div>
  );
}

const STD_TEE =
  "M405,60 Q330,74 262,100 Q160,140 63,193 L132,370 Q182,332 230,300 L236,800 Q500,812 764,800 L770,300 Q818,332 868,370 L937,193 Q840,140 738,100 Q670,74 595,60 Q500,40 405,60 Z";

function FitCompare() {
  /* comparison only: chest 54 → 58 cm, length 74 → 72 cm, same HPS */
  const sx = 58 / 54;
  const sy = 720 / 740;
  return (
    <svg viewBox="20 20 960 820" className="block h-[118px] w-full">
      <path d={STD_TEE} fill={K.card} stroke={K.muted} strokeWidth={5} />
      <path
        d={STD_TEE}
        transform={`translate(500 60) scale(${sx} ${sy}) translate(-500 -60)`}
        fill="none"
        stroke={K.red}
        strokeWidth={6}
        strokeDasharray="22 14"
      />
    </svg>
  );
}

export function DongDieuTee() {
  return (
    <div
      className="flex h-screen w-full flex-col overflow-hidden"
      style={{ fontFamily: SANS, background: K.paper, color: K.ink }}
    >
      {/* grain */}
      <div
        className="pointer-events-none fixed inset-0 opacity-[0.05]"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='2'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")",
        }}
      />

      <header className="flex h-[58px] shrink-0 items-center justify-between border-b px-8" style={{ borderColor: K.rule }}>
        <div className="flex items-center gap-3">
          <img src={BRAND.logo} alt="Logo Khoa Công nghệ Thông tin" className="h-9 w-9" />
          <div className="leading-tight">
            <div className="text-[12px] font-bold tracking-[0.1em]">ÁO ĐỒNG PHỤC KHOA CNTT</div>
            <div className="text-[10.5px]" style={{ color: K.muted }}>
              {BRAND.universityVi} · {BRAND.short}
            </div>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <span className="rounded-full px-3 py-1 text-[11px] font-semibold text-white" style={{ background: K.deep }}>
            Đề xuất mới
          </span>
          <span className="text-[17px] font-extrabold tracking-tight">Đồng Điệu</span>
          <span style={{ color: "#A79E92" }}>/</span>
          <span className="text-[14px]" style={{ color: K.muted }}>Áo thun mặc hằng ngày</span>
        </div>
      </header>

      <main className="grid min-h-0 flex-1 grid-cols-[292px_1fr_318px] gap-6 px-8 py-6">
        {/* ---------- left: idea + reasoning ---------- */}
        <section className="flex min-h-0 flex-col">
          <Eyebrow>BẢN TINH GỌN · CHO NGÀY THƯỜNG</Eyebrow>
          <h1 className="mt-3 text-[30px] font-extrabold leading-[1.08] tracking-[-0.02em]">
            Một bông phượng.
            <br />
            Một mạch điện.
            <br />
            <span style={{ color: K.red }}>Vậy là đủ.</span>
          </h1>
          <p className="mt-4 text-[13px] leading-[1.55]" style={{ color: K.muted }}>
            Chiếc áo để mặc đi học, đi cà phê, đi thực tập — không chỉ trong ngày hội khoa. Nhụy hoa là một
            lỗ via; cuống hoa là bốn đường mạch mọc lên từ tên khoa.
          </p>

          <div className="mt-5 space-y-3">
            {[
              ["Mặt trước gần như trơn", "Chỉ logo Ø80 mm ở ngực trái: dễ phối với quần jean, sơ mi khoác ngoài."],
              ["Một điểm nhấn duy nhất", `Hình lưng ${ART_W} × ${ART_H} mm, không kín lưng. Xa nhìn là hoa, lại gần mới thấy mạch.`],
              ["Bớt hẳn công đoạn", "Không in nổi, không tên riêng, không họa tiết tay, không sọc cổ, không màu vàng."],
            ].map(([t, d], i) => (
              <div key={t} className="flex gap-3">
                <span className="font-mono text-[11px] font-bold" style={{ color: K.red, fontFamily: MONO }}>
                  0{i + 1}
                </span>
                <div>
                  <div className="text-[13px] font-bold">{t}</div>
                  <div className="text-[11.5px] leading-[1.45]" style={{ color: K.muted }}>{d}</div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-5">
            <div className="text-[10.5px] font-bold uppercase tracking-[0.12em]" style={{ color: K.muted }}>
              Hai màu áo
            </div>
            <div className="mt-2 grid grid-cols-2 gap-3">
              {[
                { c: NAVY, name: "Xanh than", sub: "3 khuôn in" },
                { c: WHITE, name: "Trắng", sub: "2 khuôn in" },
              ].map(({ c, name, sub }) => (
                <div key={name} className="rounded-[12px] border px-2 pb-2 pt-1" style={{ borderColor: K.rule, background: K.card }}>
                  <Back c={c} pad={10} style={{ width: "100%", height: 96 }} />
                  <div className="mt-1 text-center text-[11.5px] font-bold">{name}</div>
                  <div className="text-center text-[10px]" style={{ color: K.muted }}>{sub}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-auto rounded-[12px] border-l-[3px] px-3.5 py-3 text-[11px] leading-[1.5]" style={{ borderColor: K.red, background: K.card, color: K.muted }}>
            Đây là giả thuyết thiết kế, chưa có số liệu khảo sát. Nên may 2–3 áo mẫu cho sinh viên mặc thử một tuần
            trước khi chốt.
          </div>
        </section>

        {/* ---------- centre: garments + details ---------- */}
        <section className="flex min-h-0 flex-col">
          <div className="flex items-end justify-center gap-4">
            <figure className="flex flex-col items-center">
              <Back
                pad={PAD}
                style={{ width: 520, height: 520 * (910 / 1080) }}
                annotations={
                  <>
                    <DimH x1={ART.x} x2={ART.right} y={560} label={`${ART_W} mm`} />
                    <DimV x={660} y1={ART.top} y2={ART.bottom} label={`${ART_H}`} />
                    <DimV x={350} y1={HPS_Y} y2={ART.top} label={`${ART.top - HPS_Y}`} />
                    <Marker x={612} y={232} n={1} />
                    <Marker x={360} y={452} n={2} />
                  </>
                }
              />
              <figcaption className="mt-1 text-center">
                <div className="text-[13px] font-bold">Mặt sau</div>
                <div className="text-[11px]" style={{ color: K.muted, fontFamily: MONO }}>
                  in lụa {ART_W}×{ART_H} mm · mép trên dưới HPS {ART.top - HPS_Y} mm
                </div>
              </figcaption>
            </figure>
            <figure className="flex flex-col items-center">
              <Front
                pad={PAD}
                style={{ width: 344, height: 344 * (910 / 1080) }}
                annotations={
                  <>
                    <NeckLabel color={K.white} />
                    <Marker x={668} y={186} n={3} />
                    <Marker x={430} y={40} n={4} />
                  </>
                }
              />
              <figcaption className="mt-1 text-center">
                <div className="text-[13px] font-bold">Mặt trước</div>
                <div className="text-[11px]" style={{ color: K.muted, fontFamily: MONO }}>
                  logo gốc Ø{LOGO.d} mm · ép DTF
                </div>
              </figcaption>
            </figure>
          </div>

          <div className="mt-auto grid grid-cols-4 gap-4 pt-5">
            <Loupe n={1} title="Nhụy hoa là một lỗ via" note="4 cánh đỏ, gân để lộ màu vải. Cánh cờ trắng sọc đỏ, đúng hình hoa phượng thật.">
              <Back crop={{ x: 392, y: 182, w: 216, h: 150 }} style={{ width: "100%", height: 168 }} />
            </Loupe>
            <Loupe n={2} title="Hoa mọc lên từ tên khoa" note={`4 đường mạch nét 2,6 mm. Chữ FIT-HPUni rộng ${ART_W} mm; câu khẩu hiệu cao 11 mm, chữ IT màu đỏ.`}>
              <Back crop={{ x: 372, y: 372, w: 256, h: 178 }} style={{ width: "100%", height: 168 }} />
            </Loupe>
            <Loupe n={3} title="Logo giữ nguyên bản gốc" note={`Ép DTF Ø${LOGO.d} mm, tâm cách HPS ${LOGO.y - HPS_Y} mm, lệch tâm ${LOGO.x - 500} mm về ngực trái.`}>
              <Front crop={{ x: 524, y: 182, w: 160, h: 112 }} style={{ width: "100%", height: 168 }} />
            </Loupe>
            <Loupe n={4} title="Nhãn in trong cổ" note={`${LABEL.w} × ${LABEL.h} mm, 1 màu, in cùng xưởng. Không mác cứng cấn gáy.`}>
              <Front
                crop={{ x: 428, y: 46, w: 144, h: 100 }}
                style={{ width: "100%", height: 168 }}
                annotations={<NeckLabel color={K.white} />}
              />
            </Loupe>
          </div>
        </section>

        {/* ---------- right: materials + production ---------- */}
        <section className="flex min-h-0 flex-col">
          <Eyebrow>CHẤT LIỆU & SẢN XUẤT</Eyebrow>
          <h2 className="mt-2 text-[19px] font-extrabold leading-tight tracking-tight">
            Ít công đoạn hơn, nên dễ làm đều tay hơn.
          </h2>

          <div className="mt-3">
            <Row k="Vải">Cotton chải kỹ 100%, single jersey 220–230 g/m², xử lý co trước khi cắt.</Row>
            <Row k="Cổ">Bo rib 1×1 cao 2 cm cùng màu thân, không sọc. Băng chặn vai trong.</Row>
            <Row k="Lưng">
              In lụa plastisol mềm (hoặc gốc nước), {ART_W} × {ART_H} mm trong khổ 300 × 400.
              <div className="mt-1.5 flex flex-col gap-1" style={{ fontFamily: MONO }}>
                {[
                  [K.white, "1 · Lót trắng (dưới mọi màu)"],
                  [K.red, "2 · Đỏ Phượng"],
                  [K.white, "3 · Trắng phủ (chữ, mạch)"],
                ].map(([c, t]) => (
                  <span key={t} className="flex items-center gap-2 text-[10.5px]">
                    <span className="h-3 w-3 rounded-[3px] border" style={{ background: c, borderColor: K.rule }} />
                    {t}
                  </span>
                ))}
              </div>
              <div className="mt-1 text-[10.5px]" style={{ color: K.muted }}>Áo trắng: chỉ 2 khuôn (đỏ, xanh than), không lót.</div>
            </Row>
            <Row k="Ngực trái">Logo chính thức ép DTF Ø{LOGO.d} mm, dùng nguyên file gốc, không vẽ lại.</Row>
            <Row k="Kỹ thuật">Nét nhỏ nhất 1,5 mm (gân cánh); chữ nhỏ nhất 7 mm. Không có hình nào chạy qua đường may sườn.</Row>
          </div>

          <div className="mt-3 rounded-[12px] border p-3" style={{ borderColor: K.rule, background: K.card }}>
            <div className="flex items-baseline justify-between">
              <span className="text-[12px] font-bold">Phom đề xuất: rộng vừa</span>
              <span className="text-[10px]" style={{ color: K.muted, fontFamily: MONO }}>size L</span>
            </div>
            <FitCompare />
            <div className="text-[10.5px] leading-[1.45]" style={{ color: K.muted }}>
              <span style={{ color: K.red }}>Nét đứt</span>: ngang ngực 58 cm (chuẩn 54), dài 72 cm (chuẩn 74), vai rơi
              khoảng 3 cm. Hình áo trên bảng vẫn dùng phom chuẩn chung để so sánh công bằng.
            </div>
          </div>

          <div className="mt-auto text-[11px] leading-[1.5]" style={{ color: K.muted }}>
            <span className="font-bold" style={{ color: K.ink }}>Đánh đổi: </span>
            ít “chất lễ hội” hơn Hoa Học Trò — không tên riêng, không chữ nổi. Đổi lại, áo hợp mặc thường ngày và đơn giản
            hơn khi đặt in số lượng lớn.
          </div>
        </section>
      </main>

      <footer className="flex h-[30px] shrink-0 items-center justify-between border-t px-8 text-[10.5px]" style={{ borderColor: K.rule, color: K.muted }}>
        <span>{BRAND.slogan}</span>
        <span>Bản phác thảo ý tưởng · Hình vẽ đúng tỷ lệ size L, 1 đơn vị = 1 mm · Màu trên màn hình chỉ mang tính tham khảo</span>
      </footer>
    </div>
  );
}
