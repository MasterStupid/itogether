import { Fragment, useId, type ComponentProps, type ReactNode } from "react";
import { BRAND, PALETTE } from "./_shared/brand";
import { FitLogo, TeeShirt, ANCHORS } from "./_shared/garments";

/* ==================================================================
   Đồng Điệu · áo thun mặc hằng ngày (board label only — never printed)
   One focal motif: the faculty slogan set as a two-voice dialogue —
   the student's "You can do IT," answered by the faculty's promise.
   1 SVG unit = 1 mm on size L. All callouts read from the constants below.
   ================================================================== */

const K = {
  deep: PALETTE.navyDeep.hex,
  navy: PALETTE.navy.hex,
  silver: PALETTE.silver.hex,
  accent: PALETTE.navy.hex,
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
const ART = { x: 360, top: 170, right: 640, bottom: 476 };
const ART_W = ART.right - ART.x; // 280
const ART_H = ART.bottom - ART.top; // 306
const HPS_Y = 60;
const LOGO = { ...ANCHORS.tee.front.wearerLeftChest, d: 80 };
const LABEL = { x: 475, y: 78, w: 50, h: 20 };
/* the "IT" block: solid ink, letters left open so the fabric shows through */
const BLOCK = { x: 360, y: 222, w: 220, h: 130 };
const IT_SIZE = 140;

type Ink = { body: string; ink: string; ink2: string };

/**
 * The whole back print — the slogan set as a two-voice dialogue.
 * Voice 1 (student, loud):  "You can do IT,"
 * Voice 2 (faculty, calm):  "we are ready to accompany"  + a waiting cursor.
 */
function BackArt({ ink, ink2 }: Ink) {
  const id = useId().replace(/:/g, "");
  return (
    <g fontFamily={SANS}>
      <defs>
        <mask id={`ko${id}`} maskUnits="userSpaceOnUse" x={BLOCK.x} y={BLOCK.y} width={BLOCK.w} height={BLOCK.h}>
          <rect x={BLOCK.x} y={BLOCK.y} width={BLOCK.w} height={BLOCK.h} fill="#fff" />
          <text
            x={BLOCK.x + BLOCK.w / 2}
            y={BLOCK.y + BLOCK.h / 2 + 50}
            textAnchor="middle"
            fontWeight={900}
            fontSize={IT_SIZE}
            letterSpacing={-4}
            fill="#000"
          >
            IT
          </text>
        </mask>
      </defs>

      {/* voice 1 */}
      <text x={ART.x} y={208} textLength={ART_W} lengthAdjust="spacingAndGlyphs" fontWeight={800} fontSize={50} fill={ink}>
        You can do
      </text>
      <rect x={BLOCK.x} y={BLOCK.y} width={BLOCK.w} height={BLOCK.h} fill={ink} mask={`url(#ko${id})`} />
      <text x={588} y={330} fontWeight={900} fontSize={130} fill={ink}>
        ,
      </text>

      {/* voice 2 */}
      <text x={ART.x} y={396} textLength={262} lengthAdjust="spacingAndGlyphs" fontWeight={500} fontSize={40} fill={ink2}>
        we are ready
      </text>
      <text x={ART.x} y={440} textLength={262} lengthAdjust="spacingAndGlyphs" fontWeight={500} fontSize={40} fill={ink2}>
        to accompany
      </text>
      <rect x={628} y={411} width={12} height={29} fill={ink}>
        <animate attributeName="opacity" values="1;1;0;0" keyTimes="0;0.5;0.5;1" dur="1.1s" repeatCount="indefinite" />
      </rect>

      {/* signature */}
      <path d={`M${ART.x},456 H${ART.right}`} stroke={ink2} strokeWidth={1.5} />
      <text x={ART.x} y={ART.bottom} fontWeight={800} fontSize={10} fill={ink}>
        FIT-HPUni
      </text>
      <text x={ART.right} y={ART.bottom} textAnchor="end" fontWeight={500} fontSize={8} fill={ink2}>
        KHOA CÔNG NGHỆ THÔNG TIN · ĐH HẢI PHÒNG
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
      <rect x={rx} y={y - 19} width={w} height={38} rx={19} fill={K.paper} stroke={K.accent} strokeWidth={1.6} />
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
      <circle cx={x} cy={y} r={17} fill={K.accent} stroke={K.paper} strokeWidth={3} />
      <text x={x} y={y + 7.5} textAnchor="middle" fontFamily={SANS} fontWeight={800} fontSize={21} fill={K.white}>
        {n}
      </text>
    </g>
  );
}

/* ---------- garments ---------- */
const NAVY: Ink = { body: K.deep, ink: K.white, ink2: K.silver };
const WHITE: Ink = { body: K.white, ink: K.deep, ink2: K.navy };
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
  return <div className="text-[10.5px] font-bold tracking-[0.18em]" style={{ color: K.accent }}>{children}</div>;
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
          style={{ background: K.accent }}
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
    <svg viewBox="20 20 960 820" className="block h-[84px] w-full">
      <path d={STD_TEE} fill={K.card} stroke={K.muted} strokeWidth={5} />
      <path
        d={STD_TEE}
        transform={`translate(500 60) scale(${sx} ${sy}) translate(-500 -60)`}
        fill="none"
        stroke={K.accent}
        strokeWidth={6}
        strokeDasharray="22 14"
      />
    </svg>
  );
}

/* ---------- size grading: two screen frames, mm-true ---------- */
const GRADE = [
  { s: "S", chest: 52, len: 67, k: 0.9 },
  { s: "M", chest: 55, len: 69.5, k: 0.9 },
  { s: "L", chest: 58, len: 72, k: 1 },
  { s: "XL", chest: 61, len: 74.5, k: 1 },
  { s: "XXL", chest: 64, len: 77, k: 1 },
];
const FRAME_A = { w: Math.round(ART_W * 0.9), h: Math.round(ART_H * 0.9) };

function GradeTee({ chest, len, k, active }: { chest: number; len: number; k: number; active: boolean }) {
  /* STD_TEE is drawn at chest 54 / length 74 cm in mm units, HPS at y 60 */
  const sx = chest / 54;
  const sy = len / 74;
  const w = ART_W * k;
  const h = ART_H * k;
  const top = HPS_Y + (ART.top - HPS_Y) * k;
  return (
    <svg viewBox="-70 20 1140 860" className="block h-[86px] w-full">
      <path
        d={STD_TEE}
        transform={`translate(500 60) scale(${sx} ${sy}) translate(-500 -60)`}
        fill={active ? K.deep : "#DCD5CB"}
        stroke={active ? K.deep : "#C9C0B4"}
        strokeWidth={6}
      />
      <rect x={500 - w / 2} y={top} width={w} height={h} fill="none" stroke={active ? K.white : K.muted} strokeWidth={7} strokeDasharray={active ? "0" : "18 12"} />
      <rect x={500 - w / 2} y={top + h * 0.17} width={w * 0.79} height={h * 0.42} fill={active ? K.white : "#BDB3A6"} opacity={active ? 0.9 : 0.8} />
    </svg>
  );
}

function SizeStrip() {
  return (
    <div className="rounded-[14px] border px-4 pb-3 pt-3" style={{ borderColor: K.rule, background: K.card }}>
      <div className="flex items-baseline justify-between">
        <div className="flex items-baseline gap-3">
          <span className="text-[13px] font-bold">Nhảy cỡ hình in theo size</span>
          <span className="text-[11px]" style={{ color: K.muted }}>
            Hai khung lưới thay vì một — chữ IT không bị “lọt thỏm” trên áo nhỏ hay “tràn” trên áo lớn.
          </span>
        </div>
        <span className="text-[10px]" style={{ color: K.muted, fontFamily: MONO }}>phom rộng vừa · cm</span>
      </div>
      <div className="mt-2 grid grid-cols-[1fr_1fr_14px_1fr_1fr_1fr] items-end gap-2">
        {GRADE.map((g, i) => (
          <Fragment key={g.s}>
            {i === 2 && <div className="h-[70%] w-px justify-self-center" style={{ background: K.rule }} />}
            <div className="flex flex-col items-center">
              <GradeTee chest={g.chest} len={g.len} k={g.k} active={g.s === "L"} />
              <div className="mt-1 flex items-baseline gap-1.5">
                <span className="text-[13px] font-extrabold" style={{ color: g.s === "L" ? K.ink : K.muted }}>{g.s}</span>
                <span className="text-[10px]" style={{ color: K.muted, fontFamily: MONO }}>
                  {g.chest}×{String(g.len).replace(".", ",")}
                </span>
              </div>
            </div>
          </Fragment>
        ))}
      </div>
      <div className="mt-2 grid grid-cols-[2fr_14px_3fr] gap-2 text-[10.5px]" style={{ fontFamily: MONO, color: K.muted }}>
        <div className="border-t pt-1.5 text-center" style={{ borderColor: K.muted }}>
          <b style={{ color: K.ink }}>Khung A · 90%</b> · {FRAME_A.w} × {FRAME_A.h} mm
        </div>
        <span />
        <div className="border-t pt-1.5 text-center" style={{ borderColor: K.ink }}>
          <b style={{ color: K.ink }}>Khung B · 100%</b> · {ART_W} × {ART_H} mm · bản vẽ chính
        </div>
      </div>
    </div>
  );
}

const CHECKS = [
  ["File logo vector từ Khoa", "thay ảnh 474 px trước khi làm phim DTF"],
  ["Lab dip vải xanh than", "so với #1F3349, duyệt dưới đèn D65"],
  ["In thử khuôn trên vải thật", "mép chữ IT sắc, không lem vào lòng chữ"],
  ["Giặt thử 5 lần ở 40 °C", "mực không nứt, cổ không bai"],
  ["Áo mẫu mặc thử 1 tuần", "2–3 sinh viên, ghi nhận phom & cảm giác"],
];

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
            Bản hoàn thiện · v1.0
          </span>
          <span className="text-[10.5px]" style={{ color: K.muted, fontFamily: MONO }}>FIT-DD-01</span>
          <span className="text-[17px] font-extrabold tracking-tight">Đồng Điệu</span>
          <span style={{ color: "#A79E92" }}>/</span>
          <span className="text-[14px]" style={{ color: K.muted }}>Áo thun mặc hằng ngày</span>
        </div>
      </header>

      <main className="grid min-h-0 flex-1 grid-cols-[292px_1fr_318px] gap-6 px-8 py-6">
        {/* ---------- left: idea + reasoning ---------- */}
        <section className="flex min-h-0 flex-col">
          <Eyebrow>CHỈ CÓ KHẨU HIỆU · CHO NGÀY THƯỜNG</Eyebrow>
          <h1 className="mt-3 text-[30px] font-extrabold leading-[1.08] tracking-[-0.02em]">
            Bạn nói:
            <br />
            “You can do IT,”
            <br />
            <span style={{ color: K.accent }}>Khoa đáp lời.</span>
          </h1>
          <p className="mt-4 text-[13px] leading-[1.55]" style={{ color: K.muted }}>
            Không biểu tượng, không minh họa — chỉ câu khẩu hiệu của khoa, dàn trang như một cuộc đối
            thoại. Nửa đầu là giọng sinh viên: to, đậm. Nửa sau là lời hứa của khoa: bình tĩnh, kèm con trỏ đang chờ.
          </p>

          <div className="mt-5 space-y-3">
            {[
              ["Chữ là hình", "Khối IT đặc, chữ để trống lộ màu vải — điểm nhìn duy nhất, đọc rõ từ xa."],
              ["Hai giọng nói", `Hai cỡ chữ, hai sắc độ: trắng cho “You can do IT,”, xám bạc cho “we are ready to accompany”. Hình lưng ${ART_W} × ${ART_H} mm.`],
              ["Bớt hẳn công đoạn", "Mặt trước chỉ logo. Không minh họa, không in nổi, không tên riêng, không sọc cổ."],
            ].map(([t, d], i) => (
              <div key={t} className="flex gap-3">
                <span className="font-mono text-[11px] font-bold" style={{ color: K.accent, fontFamily: MONO }}>
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

          <div className="mt-4 rounded-[12px] border px-3.5 py-3" style={{ borderColor: K.rule, background: K.card }}>
            <div className="flex items-center justify-between">
              <span className="text-[10.5px] font-bold uppercase tracking-[0.12em]" style={{ color: K.muted }}>Khẩu hiệu nguyên văn</span>
              <span className="rounded-full px-2 py-[1px] text-[9.5px] font-bold" style={{ background: K.deep, color: K.white }}>ĐÃ KHỚP</span>
            </div>
            <div className="mt-2 text-[14px] leading-[1.35]">
              <span className="font-extrabold">You can do </span>
              <span className="rounded-[3px] px-1 font-black" style={{ background: K.deep, color: K.card }}>IT</span>
              <span className="font-extrabold">,</span>{" "}
              <span className="font-medium" style={{ color: K.navy }}>we are ready to accompany</span>
              <span className="ml-0.5 inline-block h-[14px] w-[6px] translate-y-[2px]" style={{ background: K.deep }} />
            </div>
            <div className="mt-1.5 text-[10.5px] leading-[1.45]" style={{ color: K.muted }}>
              Không thêm, bớt hay đảo từ — chỉ đổi cỡ chữ và sắc độ. Con trỏ là ô in tĩnh, không phải chữ.
            </div>
          </div>

          <div className="mt-auto rounded-[12px] border-l-[3px] px-3.5 py-3 text-[11px] leading-[1.5]" style={{ borderColor: K.accent, background: K.card, color: K.muted }}>
            Đây là giả thuyết thiết kế, chưa có số liệu khảo sát. Nên may 2–3 áo mẫu cho sinh viên mặc thử một tuần
            trước khi chốt.
          </div>
        </section>

        {/* ---------- centre: garments + details ---------- */}
        <section className="flex min-h-0 flex-col justify-between">
          <div className="flex items-end justify-center gap-4">
            <figure className="flex flex-col items-center">
              <Back
                pad={PAD}
                style={{ width: 470, height: 470 * (910 / 1080) }}
                annotations={
                  <>
                    <DimH x1={ART.x} x2={ART.right} y={512} label={`${ART_W} mm`} />
                    <DimV x={676} y1={ART.top} y2={ART.bottom} label={`${ART_H}`} />
                    <DimV x={330} y1={HPS_Y} y2={ART.top} label={`${ART.top - HPS_Y}`} />
                    <Marker x={330} y={287} n={1} />
                    <Marker x={330} y={418} n={2} />
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
                style={{ width: 320, height: 320 * (910 / 1080) }}
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

          <SizeStrip />

          <div className="grid grid-cols-4 gap-4">
            <Loupe n={1} title="IT để trống, lộ màu vải" note={`Khối ${BLOCK.w} × ${BLOCK.h} mm; chữ IT cao ≈100 mm không in mực — vải thở, nhẹ tay hơn mảng đặc.`}>
              <Back crop={{ x: 340, y: 160, w: 305, h: 206 }} style={{ width: "100%", height: 150 }} />
            </Loupe>
            <Loupe n={2} title="Lời đáp và con trỏ chờ" note="Chữ hoa ≈29 mm, xám bạc. Con trỏ trắng 12 × 29 mm: khoa luôn sẵn sàng. Dòng ký tên chữ nhỏ nhất 6 mm.">
              <Back crop={{ x: 345, y: 362, w: 300, h: 203 }} style={{ width: "100%", height: 150 }} />
            </Loupe>
            <Loupe n={3} title="Logo giữ nguyên bản gốc" note={`Ép DTF Ø${LOGO.d} mm, tâm cách HPS ${LOGO.y - HPS_Y} mm, lệch tâm ${LOGO.x - 500} mm về ngực trái.`}>
              <Front crop={{ x: 528, y: 191, w: 140, h: 95 }} style={{ width: "100%", height: 150 }} />
            </Loupe>
            <Loupe n={4} title="Nhãn in trong cổ" note={`${LABEL.w} × ${LABEL.h} mm, 1 màu, in cùng xưởng. Không mác cứng cấn gáy.`}>
              <Front
                crop={{ x: 440, y: 46, w: 120, h: 81 }}
                style={{ width: "100%", height: 150 }}
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
                  [K.silver, "2 · Xám bạc (lời đáp, đường kẻ)"],
                  [K.white, "3 · Trắng phủ (khối IT, chữ lớn)"],
                ].map(([c, t]) => (
                  <span key={t} className="flex items-center gap-2 text-[10.5px]">
                    <span className="h-3 w-3 rounded-[3px] border" style={{ background: c, borderColor: K.rule }} />
                    {t}
                  </span>
                ))}
              </div>
              <div className="mt-1 text-[10.5px]" style={{ color: K.muted }}>Áo trắng: 2 khuôn (xanh than đậm, xanh FIT), không lót.</div>
            </Row>
            <Row k="Ngực trái">Logo chính thức ép DTF Ø{LOGO.d} mm, dùng nguyên file gốc, không vẽ lại.</Row>
            <Row k="Kỹ thuật">Nét nhỏ nhất 1,5 mm (đường kẻ); chữ nhỏ nhất 6 mm. Không có hình nào chạy qua đường may sườn.</Row>
          </div>

          <div className="mt-3 rounded-[12px] border p-3" style={{ borderColor: K.rule, background: K.card }}>
            <div className="flex items-baseline justify-between">
              <span className="text-[12px] font-bold">Phom đề xuất: rộng vừa</span>
              <span className="text-[10px]" style={{ color: K.muted, fontFamily: MONO }}>size L</span>
            </div>
            <FitCompare />
            <div className="text-[10.5px] leading-[1.45]" style={{ color: K.muted }}>
              <span style={{ color: K.accent }}>Nét đứt</span>: ngang ngực 58 cm (chuẩn 54), dài 72 cm (chuẩn 74), vai rơi
              khoảng 3 cm. Hình áo trên bảng vẫn dùng phom chuẩn chung để so sánh công bằng.
            </div>
          </div>

          <div className="mt-3">
            <div className="text-[10.5px] font-bold uppercase tracking-[0.12em]" style={{ color: K.muted }}>Duyệt trước sản xuất</div>
            <ol className="mt-1.5 space-y-1">
              {CHECKS.map(([t, d], i) => (
                <li key={t} className="flex gap-2 text-[11px] leading-[1.35]">
                  <span className="mt-[1px] flex h-[15px] w-[15px] shrink-0 items-center justify-center rounded-[4px] border text-[9px] font-bold" style={{ borderColor: K.accent, color: K.accent, fontFamily: MONO }}>
                    {i + 1}
                  </span>
                  <span>
                    <b>{t}</b> <span style={{ color: K.muted }}>— {d}</span>
                  </span>
                </li>
              ))}
            </ol>
          </div>

          <div className="mt-auto text-[11px] leading-[1.5]" style={{ color: K.muted }}>
            <span className="font-bold" style={{ color: K.ink }}>Đánh đổi: </span>
            không kể chuyện địa phương như các bản phượng — toàn bộ sức nặng dồn vào câu khẩu hiệu. Đổi lại, áo ai mặc
            cũng hợp, không lỗi thời, in số lượng lớn rất đều.
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
