import { useId, type ComponentProps, type ReactNode } from "react";
import { PALETTE } from "./_shared/brand";
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

type Ink = {
  body: string;
  sleeve: string;
  rib: string;
  tip: string;
  ink: string;
  ink2: string;
  block: string;
  spark: string;
};

/* Phối màu — lấy từ bảng màu chung: xanh royal (sáng của xanh FIT), xanh than đậm,
   vàng nhụy, cam cảng. Vàng là điểm nhấn chính, cam chỉ là "tia lửa" nhỏ. */
const C = {
  royal: "#2463D4",
  navy: PALETTE.navyDeep.hex,
  yellow: PALETTE.nhuy.hex,
  orange: PALETTE.cang.hex,
  white: PALETTE.white.hex,
};

/* Sleeve panels: everything outboard of the armhole seam (clipped by the silhouette). */
const SLEEVE_L = "M262,100 C272,170 266,262 230,300 L140,390 L0,430 L0,0 L262,0 Z";
const SLEEVE_R = "M738,100 C728,170 734,262 770,300 L860,390 L1000,430 L1000,0 L738,0 Z";
/* 6 mm accent band, 6 mm in from the sleeve hem, parallel to it */
const BAND_L = "M77.6,153.8 L168.6,386.8 L174.2,384.6 L83.2,151.6 Z";
const BAND_R = "M922.4,153.8 L831.4,386.8 L825.8,384.6 L916.8,151.6 Z";

function SleeveBlocks({ sleeve, tip }: Ink) {
  return (
    <g>
      <path d={SLEEVE_L} fill={sleeve} />
      <path d={SLEEVE_R} fill={sleeve} />
      <path d={BAND_L} fill={tip} />
      <path d={BAND_R} fill={tip} />
    </g>
  );
}

/**
 * The whole back print — the slogan set as a two-voice dialogue.
 * Voice 1 (student, loud):  "You can do IT,"
 * Voice 2 (faculty, calm):  "we are ready to accompany"  + a waiting cursor.
 */
function BackArt({ ink, ink2, block, spark }: Ink) {
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
      <rect x={BLOCK.x} y={BLOCK.y} width={BLOCK.w} height={BLOCK.h} fill={block} mask={`url(#ko${id})`} />
      <text x={588} y={330} fontWeight={900} fontSize={130} fill={spark}>
        ,
      </text>

      {/* voice 2 */}
      <text x={ART.x} y={396} textLength={262} lengthAdjust="spacingAndGlyphs" fontWeight={500} fontSize={40} fill={ink2}>
        we are ready
      </text>
      <text x={ART.x} y={440} textLength={262} lengthAdjust="spacingAndGlyphs" fontWeight={500} fontSize={40} fill={ink2}>
        to accompany
      </text>
      <rect x={628} y={411} width={12} height={29} fill={block}>
        <animate attributeName="opacity" values="1;1;0;0" keyTimes="0;0.5;0.5;1" dur="1.1s" repeatCount="indefinite" />
      </rect>

      {/* signature */}
      <path d={`M${ART.x},456 H${ART.x + 70}`} stroke={spark} strokeWidth={1.5} />
      <path d={`M${ART.x + 70},456 H${ART.right}`} stroke={ink2} strokeWidth={1.5} />
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

/* ---------- garments ---------- */
const ROYAL: Ink = {
  body: C.royal,
  sleeve: C.navy,
  rib: C.navy,
  tip: C.yellow,
  ink: C.white,
  ink2: "#DCE8FF",
  block: C.yellow,
  spark: C.orange,
};
const WHITE: Ink = {
  body: C.white,
  sleeve: C.royal,
  rib: C.royal,
  tip: C.yellow,
  ink: C.navy,
  ink2: C.royal,
  block: C.royal,
  spark: C.orange,
};
const PAD = { top: 4, right: 6, bottom: 8, left: 6 };

function Back({ c = ROYAL, ...rest }: { c?: Ink } & Omit<ComponentProps<typeof TeeShirt>, "body">) {
  return (
    <TeeShirt side="back" body={c.body} rib={c.rib} ribTipping={[c.tip]} {...rest}>
      <SleeveBlocks {...c} />
      <BackArt {...c} />
    </TeeShirt>
  );
}

function Front({ c = ROYAL, ...rest }: { c?: Ink } & Omit<ComponentProps<typeof TeeShirt>, "body">) {
  return (
    <TeeShirt side="front" body={c.body} rib={c.rib} ribTipping={[c.tip]} {...rest}>
      <SleeveBlocks {...c} />
      <FrontArt />
    </TeeShirt>
  );
}

/* ---------- highlight blocks ---------- */
function Highlight({
  n,
  kicker,
  title,
  note,
  children,
  dark = false,
}: {
  n: string;
  kicker: string;
  title: string;
  note: string;
  children: ReactNode;
  dark?: boolean;
}) {
  return (
    <article
      className="dd-rise group flex min-w-0 flex-col overflow-hidden rounded-[18px] border"
      style={{
        borderColor: dark ? K.deep : K.rule,
        background: dark ? K.deep : K.card,
        color: dark ? K.white : K.ink,
        animationDelay: `${Number(n) * 60 + 80}ms`,
      }}
    >
      <div className="relative h-[132px] overflow-hidden" style={{ background: dark ? "#18293B" : "#E8E2D9" }}>
        <div className="h-full w-full transition-transform duration-700 ease-out group-hover:scale-[1.04]">{children}</div>
        <span
          className="absolute left-3 top-3 rounded-full px-2.5 py-[3px] text-[10px] font-bold tracking-[0.12em]"
          style={{ background: dark ? K.white : K.deep, color: dark ? K.deep : K.white, fontFamily: MONO }}
        >
          {n}
        </span>
      </div>
      <div className="flex flex-1 flex-col px-4 pb-3.5 pt-3">
        <div className="text-[10px] font-bold uppercase tracking-[0.16em]" style={{ color: dark ? K.silver : K.navy }}>
          {kicker}
        </div>
        <h3 className="mt-1.5 text-[17px] font-extrabold leading-[1.2] tracking-[-0.01em]">{title}</h3>
        <p className="mt-2 text-[12px] leading-[1.55]" style={{ color: dark ? "#B9C4CF" : K.muted }}>
          {note}
        </p>
      </div>
    </article>
  );
}

export function DongDieuTee() {
  return (
    <div className="flex h-screen w-full flex-col overflow-hidden" style={{ fontFamily: SANS, background: K.paper, color: K.ink }}>
      <style>{`
        @keyframes dd-rise { from { opacity: 0; transform: translateY(14px); } to { opacity: 1; transform: none; } }
        .dd-rise { animation: dd-rise .7s cubic-bezier(.2,.7,.2,1) both; }
      `}</style>
      {/* grain */}
      <div
        className="pointer-events-none fixed inset-0 opacity-[0.05]"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='2'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")",
        }}
      />

      {/* ---------- two equal views ---------- */}
      <section className="relative grid min-h-0 flex-1 grid-cols-2 gap-3 px-5 pt-4">
        {[
          { label: "Mặt trước", node: <Front pad={PAD} style={{ width: "100%", height: "100%" }} annotations={<NeckLabel color={K.white} />} /> },
          { label: "Mặt sau", node: <Back pad={PAD} style={{ width: "100%", height: "100%" }} /> },
        ].map((v, i) => (
          <figure
            key={v.label}
            className="dd-rise relative flex min-h-0 flex-col items-center justify-end overflow-hidden rounded-[24px]"
            style={{
              background: "radial-gradient(ellipse 70% 62% at 50% 50%, #FBF8F3 0%, #ECE6DD 70%, transparent 100%)",
              animationDelay: `${i * 120}ms`,
            }}
          >
            <div className="min-h-0 w-full flex-1">{v.node}</div>
            <figcaption className="absolute left-5 top-4 text-[11px] font-bold uppercase tracking-[0.22em]" style={{ color: K.muted }}>
              {v.label}
            </figcaption>
          </figure>
        ))}
      </section>

      {/* ---------- highlights ---------- */}
      <section className="shrink-0 px-5 pb-5 pt-3">
        <div className="mb-3 flex items-end justify-between">
          <h2 className="text-[19px] font-extrabold tracking-[-0.02em]">
            Điểm nổi bật <span style={{ color: K.navy, fontWeight: 500 }}>của chiếc áo</span>
          </h2>
          <div className="flex items-center gap-4">
            {[
              [C.royal, "Xanh royal", "thân áo"],
              [C.navy, "Xanh than", "tay & cổ"],
              [C.yellow, "Vàng nhụy", "điểm nhấn"],
              [C.orange, "Cam", "tia lửa"],
              [C.white, "Trắng", "chữ"],
            ].map(([hex, name, role]) => (
              <div key={name} className="flex items-center gap-2">
                <span className="h-5 w-5 rounded-full border" style={{ background: hex, borderColor: K.rule }} />
                <span className="leading-[1.1]">
                  <span className="block text-[11px] font-bold">{name}</span>
                  <span className="block text-[10px]" style={{ color: K.muted, fontFamily: MONO }}>{role}</span>
                </span>
              </div>
            ))}
          </div>
        </div>
        <div className="grid grid-cols-[1.25fr_1fr_1fr_1fr] gap-3">
          <Highlight
            n="01"
            dark
            kicker="Chữ là hình"
            title="Khối vàng, chữ IT lộ xanh vải"
            note="Vàng nhụy trên nền royal — cặp tương phản sáng nhất áo. Chữ IT không in mực, để vải tự lên màu."
          >
            <Back crop={{ x: 255, y: 148, w: 490, h: 214 }} style={{ width: "100%", height: "100%" }} />
          </Highlight>
          <Highlight
            n="02"
            kicker="Hai giọng nói"
            title="Bạn nói, Khoa đáp lời"
            note="“You can do IT” trắng đậm, dấu phẩy cam; lời đáp xanh nhạt kèm con trỏ vàng đang chờ."
          >
            <Back crop={{ x: 320, y: 356, w: 350, h: 192 }} style={{ width: "100%", height: "100%" }} />
          </Highlight>
          <Highlight
            n="03"
            kicker="Phối tay áo"
            title="Tay xanh than, viền vàng"
            note="Tay áo đậm hơn thân làm dáng gọn, vai khỏe. Viền vàng 6 mm ở gấu tay và cổ nối nhịp với khối IT."
          >
            <Front crop={{ x: 40, y: 120, w: 300, h: 200 }} style={{ width: "100%", height: "100%" }} />
          </Highlight>
          <Highlight
            n="04"
            kicker="Hai bản phối"
            title="Royal phối than · Trắng phối royal"
            note="Cùng bộ màu, đảo vai trò nền và tay. Lưng in tối đa 4 khuôn: lót trắng, trắng, vàng, cam."
          >
            <div className="flex h-full items-center justify-center gap-1 px-3">
              <Back c={ROYAL} pad={14} style={{ width: "50%", height: "92%" }} />
              <Back c={WHITE} pad={14} style={{ width: "50%", height: "92%" }} />
            </div>
          </Highlight>
        </div>
      </section>
    </div>
  );
}
