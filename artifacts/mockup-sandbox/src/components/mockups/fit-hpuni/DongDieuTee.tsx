import { useId, type ComponentProps, type ReactNode } from "react";
import { BRAND, PALETTE } from "./_shared/brand";
import { FitLogo, PoloShirt } from "./_shared/garments";

/* ==================================================================
   ITogether · Chung nhịp công nghệ (board label only — never printed)
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
const ART = { x: 360, top: 170, right: 640, bottom: 570 };
const ART_W = ART.right - ART.x; // 280
const ART_H = ART.bottom - ART.top; // 342 — within the 300 × 400 mm back-print limit
const HPS_Y = 60;
// The label keeps its original, readable width; the collar is widened around it.
const LABEL = { x: 466, y: 70, w: 68, h: 25 };
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
      <path d={`M${ART.x},462 H${ART.right}`} stroke={ink2} strokeWidth={2} />
      <text x={ART.x} y={490} fontWeight={800} fontSize={26} letterSpacing={0.5} fill={ink}>
        FIT-HPUni
      </text>
      <text x={ART.right} y={488} textAnchor="end" fontWeight={600} fontSize={16} letterSpacing={0.4} fill={ink2}>
        Since 2012
      </text>
      <text
        x={ART.x}
        y={518}
        textLength={ART_W}
        lengthAdjust="spacingAndGlyphs"
        fontWeight={600}
        fontSize={15}
        fill={ink2}
      >
        KHOA CÔNG NGHỆ THÔNG TIN · TRƯỜNG ĐH HẢI PHÒNG
      </text>
    </g>
  );
}

function FrontArt() {
  return <FitLogo cx={598} cy={238} d={90} />;
}

/** Tagless neck print, visible inside the back neck in front views. */
function NeckLabel({ color }: { color: string }) {
  return (
    <g fontFamily={SANS}>
      {/* Broaden the collar leaves around the full-width neck label. These
          overlay paths stay local to this concept and do not alter shared flats. */}
      <path d="M390,58 Q500,18 610,58 L575,73 Q500,49 425,73 Z" fill="#20354B" stroke="#142638" strokeWidth="1.7" />
      <path d="M420,65 Q500,43 580,65 Q570,73 560,81 Q540,94 524,110 L500,142 L476,110 Q460,94 440,81 Q430,73 420,65 Z" fill="#111D2A" />
      <path d="M390,58 C363,72 350,96 365,122 L420,180 L488,108 C479,93 465,82 448,75 C438,71 428,67 420,65 Z" fill="#20354B" stroke="#142638" strokeWidth="1.8" />
      <path d="M610,58 C637,72 650,96 635,122 L580,180 L512,108 C521,93 535,82 552,75 C562,71 572,67 580,65 Z" fill="#20354B" stroke="#142638" strokeWidth="1.8" />
      <path d="M488,108 C479,93 465,82 448,75 C438,71 428,67 420,65" fill="none" stroke="#101A26" strokeWidth="2.1" />
      <path d="M512,108 C521,93 535,82 552,75 C562,71 572,67 580,65" fill="none" stroke="#101A26" strokeWidth="2.1" />
      <g fill={color} opacity={0.94}>
      <rect
        x={LABEL.x}
        y={LABEL.y}
        width={LABEL.w}
        height={LABEL.h}
        rx={1.8}
        fill="none"
        stroke={color}
        strokeWidth={0.55}
        opacity={0.62}
      />
      <text x={500} y={LABEL.y + 7.5} textAnchor="middle" fontSize={4.4} fontWeight={800} textLength={46} lengthAdjust="spacingAndGlyphs" letterSpacing={0.12}>
        FIT - HPUni
      </text>
      <text x={500} y={LABEL.y + 16.5} textAnchor="middle" fontSize={2.8} fontWeight={600} textLength={62} lengthAdjust="spacingAndGlyphs" letterSpacing={0.08}>
        INFORMATION TECHNOLOGY
      </text>
      <text x={500} y={LABEL.y + 23.5} textAnchor="middle" fontSize={4.6} fontWeight={800} textLength={18} lengthAdjust="spacingAndGlyphs" letterSpacing={0.2}>
        SIZE L
      </text>
      </g>
    </g>
  );
}

/* ---------- garments ---------- */
const NAVY: Ink = { body: K.deep, ink: K.white, ink2: K.silver };
const WHITE: Ink = { body: K.white, ink: K.deep, ink2: K.navy };
const PAD = { top: 4, right: 6, bottom: 8, left: 6 };

/** Continuous fine piping, inset just inside each angled sleeve-cuff opening. */
function SleeveCuffTrim({ color }: { color: string }) {
  return (
    <g pointerEvents="none" fill="none" stroke={color} strokeWidth={6} strokeLinecap="butt" opacity={0.98}>
      <path d="M73.5,186.5 L132.5,356.5" />
      <path d="M926.5,186.5 L867.5,356.5" />
    </g>
  );
}

/** Matching contrast piping along the visible edge of the polo collar. */
function CollarTrim({
  color,
  side,
  wideFront = false,
}: {
  color: string;
  side: "front" | "back";
  wideFront?: boolean;
}) {
  if (side === "back") {
    return (
      <g pointerEvents="none" fill="none" stroke={color} strokeWidth={5} strokeLinecap="round" opacity={0.96}>
        <path d="M388,104 Q500,120 612,104" />
      </g>
    );
  }
  return (
    <g pointerEvents="none" fill="none" stroke={color} strokeWidth={5} strokeLinecap="round" strokeLinejoin="round" opacity={0.96}>
      {wideFront ? (
        <>
          <path d="M365,122 L420,180 L488,108" />
          <path d="M635,122 L580,180 L512,108" />
        </>
      ) : (
        <>
          <path d="M406,58 C390,68 380,86 386,104 L432,168 L446,187" />
          <path d="M594,58 C610,68 620,86 614,104 L568,168 L554,187" />
        </>
      )}
    </g>
  );
}

function Back({
  c = NAVY,
  annotations,
  ...rest
}: { c?: Ink } & Omit<ComponentProps<typeof PoloShirt>, "body">) {
  return (
    <PoloShirt
      side="back"
      body={c.body}
      {...rest}
      annotations={
        <>
          {annotations}
          <SleeveCuffTrim color={c.body === K.white ? K.navy : K.silver} />
          <CollarTrim side="back" color={c.body === K.white ? K.navy : K.silver} />
        </>
      }
    >
      <BackArt {...c} />
    </PoloShirt>
  );
}

function Front({
  c = NAVY,
  annotations,
  wideCollar = false,
  ...rest
}: { c?: Ink; wideCollar?: boolean } & Omit<ComponentProps<typeof PoloShirt>, "body">) {
  return (
    <PoloShirt
      side="front"
      body={c.body}
      {...rest}
      annotations={
        <>
          {annotations}
          <SleeveCuffTrim color={c.body === K.white ? K.navy : K.silver} />
          <CollarTrim side="front" wideFront={wideCollar} color={c.body === K.white ? K.navy : K.silver} />
        </>
      }
    >
      <FrontArt />
    </PoloShirt>
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
          { label: "Mặt trước", node: <Front pad={PAD} wideCollar style={{ width: "100%", height: "100%" }} annotations={<NeckLabel color={K.white} />} /> },
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
            <figcaption className="absolute left-5 top-4 text-[26px] font-extrabold uppercase tracking-[0.12em]" style={{ color: K.navy }}>
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
          <span className="text-[22px] font-semibold" style={{ color: K.navy, fontFamily: SANS }}>
            ITogether · Chung nhịp công nghệ
          </span>
        </div>
        <div className="grid grid-cols-[1.25fr_1fr_1fr_1fr] gap-3">
          <Highlight
            n="01"
            dark
            kicker="Chữ là hình"
            title="Chữ IT để trống, lộ màu vải"
            note="Khối mực đặc, riêng chữ IT không in — điểm nhìn mạnh nhất áo, vải pique vẫn mềm và thoáng."
          >
            <Back crop={{ x: 255, y: 148, w: 490, h: 214 }} style={{ width: "100%", height: "100%" }} />
          </Highlight>
          <Highlight
            n="02"
            kicker="Hai giọng nói"
            title="Bạn nói, Khoa đáp lời"
            note="“You can do IT,” trắng và đậm; “we are ready to accompany” xám bạc, kèm con trỏ chờ."
          >
            <Back crop={{ x: 320, y: 356, w: 350, h: 192 }} style={{ width: "100%", height: "100%" }} />
          </Highlight>
          <Highlight
            n="03"
            kicker="Tem nhãn trong cổ"
            title="FIT - HPUni · Size L"
            note="Tem cổ ba dòng; SIZE L được nhấn lớn bên dưới INFORMATION TECHNOLOGY, giữ nguyên tên ngành."
          >
            <Front
              crop={{ x: 450, y: 70, w: 100, h: 40 }}
              wideCollar
              annotations={<NeckLabel color={K.white} />}
              style={{ width: "100%", height: "100%" }}
            />
          </Highlight>
          <Highlight
            n="04"
            kicker="Hai màu áo"
            title="Polo xanh than và trắng"
            note="Cùng mẫu polo xanh than và trắng, viền tương phản đồng bộ ở cổ bẻ và bo tay."
          >
            <div className="flex h-full items-center justify-center gap-1 px-3">
              <Front c={NAVY} pad={14} style={{ width: "50%", height: "92%" }} />
              <Front c={WHITE} pad={14} style={{ width: "50%", height: "92%" }} />
            </div>
          </Highlight>
        </div>
      </section>
    </div>
  );
}
