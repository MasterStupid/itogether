import { useId, type ReactNode } from "react";
import { BRAND, PALETTE } from "./_shared/brand";

/* ==================================================================
   Đồng Điệu · mô phỏng nhiều góc độ (companion to DongDieuTee board)
   Two "artwork chuẩn" views overlay the exact print file (1 unit = 1 mm,
   same geometry as DongDieuTee) onto a blank photographed tee.
   The other views are AI renders — mood and proportion reference only.
   ================================================================== */

const K = {
  deep: PALETTE.navyDeep.hex,
  navy: PALETTE.navy.hex,
  silver: PALETTE.silver.hex,
  white: PALETTE.white.hex,
  paper: "#F1ECE4",
  card: "#F8F5F0",
  rule: "#DDD5CA",
  ink: "#17222E",
  muted: "#5E6772",
};
const SANS = "'Be Vietnam Pro', sans-serif";
const MONO = "'JetBrains Mono', monospace";
const IMG = (n: string) => `/__mockup/images/dongdieuangles-${n}.png`;

/* ---------- exact back artwork (copied from DongDieuTee, mm) ---------- */
const ART = { x: 360, top: 170, right: 640, bottom: 476 };
const BLOCK = { x: 360, y: 222, w: 220, h: 130 };
type Ink = { ink: string; ink2: string };

function BackArt({ ink, ink2 }: Ink) {
  const id = useId().replace(/:/g, "");
  return (
    <g fontFamily={SANS}>
      <defs>
        <mask id={`ko${id}`} maskUnits="userSpaceOnUse" x={BLOCK.x} y={BLOCK.y} width={BLOCK.w} height={BLOCK.h}>
          <rect x={BLOCK.x} y={BLOCK.y} width={BLOCK.w} height={BLOCK.h} fill="#fff" />
          <text x={BLOCK.x + BLOCK.w / 2} y={BLOCK.y + BLOCK.h / 2 + 50} textAnchor="middle" fontWeight={900} fontSize={140} letterSpacing={-4} fill="#000">
            IT
          </text>
        </mask>
      </defs>
      <text x={ART.x} y={208} textLength={280} lengthAdjust="spacingAndGlyphs" fontWeight={800} fontSize={50} fill={ink}>
        You can do
      </text>
      <rect x={BLOCK.x} y={BLOCK.y} width={BLOCK.w} height={BLOCK.h} fill={ink} mask={`url(#ko${id})`} />
      <text x={588} y={330} fontWeight={900} fontSize={130} fill={ink}>
        ,
      </text>
      <text x={ART.x} y={396} textLength={262} lengthAdjust="spacingAndGlyphs" fontWeight={500} fontSize={40} fill={ink2}>
        we are ready
      </text>
      <text x={ART.x} y={440} textLength={262} lengthAdjust="spacingAndGlyphs" fontWeight={500} fontSize={40} fill={ink2}>
        to accompany
      </text>
      <rect x={628} y={411} width={12} height={29} fill={ink} />
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

/**
 * Exact artwork composited on a blank photographed tee (1024 px image).
 * Mapping: chest ≈ 445 px ≈ 560 mm → 0.793 px/mm; art top 110 mm under HPS.
 */
function Composite({ src, c, alt, fill = false }: { src: string; c: Ink; alt: string; fill?: boolean }) {
  const id = useId().replace(/:/g, "");
  const s = 0.793;
  const t = `translate(${512 - 500 * s} ${200 - ART.top * s}) scale(${s})`;
  return (
    <div className={`${fill ? "absolute inset-0" : "relative aspect-square w-full"} overflow-hidden`}>
      <img src={src} alt={alt} className="absolute inset-0 h-full w-full object-cover" />
      <svg viewBox="0 0 1024 1024" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 h-full w-full" aria-hidden>
        <defs>
          <mask id={`pm${id}`} maskUnits="userSpaceOnUse" x={0} y={0} width={1024} height={1024}>
            <g transform={t}>
              <BackArt ink="#fff" ink2="#fff" />
            </g>
          </mask>
          <filter id={`soft${id}`}>
            <feGaussianBlur stdDeviation={0.35} />
          </filter>
        </defs>
        <g transform={t} filter={`url(#soft${id})`} opacity={0.96}>
          <BackArt {...c} />
        </g>
        {/* fabric folds read through the ink */}
        <image href={src} x={0} y={0} width={1024} height={1024} mask={`url(#pm${id})`} style={{ mixBlendMode: "multiply" }} opacity={0.12} />
      </svg>
    </div>
  );
}

/** Photo with the real logo laid over the AI's placeholder badge. */
function LogoPhoto({ src, alt, logo, className = "" }: { src: string; alt: string; logo: { x: number; y: number; d: number; sx?: number }; className?: string }) {
  return (
    <div className={`overflow-hidden ${className}`}>
      <img src={src} alt={alt} className="absolute inset-0 h-full w-full object-cover" />
      <svg viewBox="0 0 1024 1024" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 h-full w-full" aria-hidden>
        <g transform={`translate(${logo.x} ${logo.y}) scale(${logo.sx ?? 1} 1)`} style={{ filter: "drop-shadow(0 1px 1px rgba(0,0,0,.35))" }}>
          <image href={BRAND.logo} x={-logo.d / 2} y={-logo.d / 2} width={logo.d} height={logo.d} />
        </g>
      </svg>
    </div>
  );
}

/** Top-down camera dial: shirt as an ellipse, camera dot at the given angle (0° = front). */
function Dial({ deg }: { deg: number }) {
  const r = 13;
  const a = ((deg + 90) * Math.PI) / 180;
  const cx = 17 + r * Math.cos(a);
  const cy = 17 + r * Math.sin(a);
  return (
    <svg width={34} height={34} viewBox="0 0 34 34" aria-label={`Góc máy ${deg}°`}>
      <circle cx={17} cy={17} r={r} fill="none" stroke={K.rule} strokeDasharray="2 2" />
      <ellipse cx={17} cy={17} rx={7} ry={4} fill={K.deep} />
      <path d="M13.6,20.6 L17,22.2 L20.4,20.6" fill="none" stroke={K.silver} strokeWidth={1} />
      <line x1={cx} y1={cy} x2={17} y2={17} stroke="#C46A3C" strokeWidth={0.8} strokeDasharray="1.5 1.5" />
      <circle cx={cx} cy={cy} r={3} fill="#C46A3C" />
    </svg>
  );
}

function Tag({ kind }: { kind: "exact" | "ai" }) {
  return kind === "exact" ? (
    <span className="rounded-full px-2 py-[2px] text-[9.5px] font-bold tracking-[0.06em] text-white" style={{ background: K.deep }}>
      ARTWORK CHUẨN
    </span>
  ) : (
    <span className="rounded-full border px-2 py-[1px] text-[9.5px] font-semibold tracking-[0.06em] backdrop-blur-sm" style={{ borderColor: "#BDB3A6", color: K.muted, background: "rgba(248,245,240,.88)" }}>
      MÔ PHỎNG AI
    </span>
  );
}

function View({ n, title, note, deg, kind, children }: { n: string; title: string; note: string; deg?: number; kind: "exact" | "ai"; children: ReactNode }) {
  return (
    <figure className="flex min-h-0 flex-col overflow-hidden rounded-[14px] border" style={{ borderColor: K.rule, background: K.card }}>
      <div className="relative min-h-0 flex-1">
        {children}
        <div className="absolute left-2.5 top-2.5">
          <Tag kind={kind} />
        </div>
      </div>
      <figcaption className="flex items-center gap-2.5 border-t px-3 py-2" style={{ borderColor: K.rule }}>
        {deg !== undefined && <Dial deg={deg} />}
        <div className="min-w-0 leading-tight">
          <div className="text-[12.5px] font-bold">
            <span style={{ fontFamily: MONO, color: "#C46A3C" }} className="mr-1.5 text-[11px]">
              {n}
            </span>
            {title}
          </div>
          <div className="mt-0.5 truncate text-[10.5px]" style={{ color: K.muted }}>
            {note}
          </div>
        </div>
      </figcaption>
    </figure>
  );
}

/** Turntable map: where each camera sits around the shirt (top view). */
function Turntable() {
  const stops = [
    { n: "02", deg: 35 },
    { n: "03", deg: 90 },
    { n: "04", deg: 140 },
    { n: "01", deg: 180 },
  ];
  const cx = 180;
  const cy = 76;
  const R = 74;
  const pt = (deg: number, r = R) => {
    const a = ((deg + 90) * Math.PI) / 180;
    return { x: cx + r * Math.cos(a) * 1.9, y: cy + r * Math.sin(a) * 0.8 };
  };
  return (
    <div className="mt-3 shrink-0 rounded-[14px] border px-4 pb-2 pt-2.5" style={{ borderColor: K.rule, background: K.card }}>
      <div className="flex items-baseline justify-between">
        <div className="text-[12px] font-bold">Vị trí máy quanh áo</div>
        <div className="text-[10px]" style={{ color: K.muted, fontFamily: MONO }}>nhìn từ trên xuống</div>
      </div>
      <svg viewBox="0 0 360 150" className="mt-1 w-full" aria-label="Sơ đồ vị trí góc chụp">
        <ellipse cx={cx} cy={cy} rx={R * 1.9} ry={R * 0.8} fill="none" stroke={K.rule} strokeDasharray="3 3" />
        {/* shirt seen from above: front faces down */}
        <ellipse cx={cx} cy={cy} rx={58} ry={22} fill={K.deep} />
        <path d={`M${cx - 15},${cy + 15} Q${cx},${cy + 26} ${cx + 15},${cy + 15}`} fill="none" stroke={K.silver} strokeWidth={2} />
        <text x={cx} y={cy + 44} textAnchor="middle" fontSize={9} fill={K.muted} fontFamily={MONO}>TRƯỚC · 0°</text>
        <text x={cx} y={cy - 30} textAnchor="middle" fontSize={9} fill={K.muted} fontFamily={MONO}>SAU · 180°</text>
        {stops.map((s) => {
          const p = pt(s.deg);
          return (
            <g key={s.n}>
              <line x1={p.x} y1={p.y} x2={cx} y2={cy} stroke="#C46A3C" strokeWidth={0.8} strokeDasharray="2 2" opacity={0.6} />
              <circle cx={p.x} cy={p.y} r={11} fill="#C46A3C" />
              <text x={p.x} y={p.y + 3.5} textAnchor="middle" fontSize={9.5} fontWeight={800} fill="#fff" fontFamily={MONO}>{s.n}</text>
            </g>
          );
        })}
      </svg>

    </div>
  );
}

export function DongDieuAngles() {
  return (
    <div className="flex h-screen w-full flex-col overflow-hidden" style={{ fontFamily: SANS, background: K.paper, color: K.ink }}>
      <div
        className="pointer-events-none fixed inset-0 z-10 opacity-[0.05]"
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
          <span className="rounded-full border px-3 py-1 text-[11px] font-semibold" style={{ borderColor: K.deep, color: K.deep }}>
            Mô phỏng góc nhìn
          </span>
          <span className="text-[10.5px]" style={{ color: K.muted, fontFamily: MONO }}>FIT-DD-01</span>
          <span className="text-[17px] font-extrabold tracking-tight">Đồng Điệu</span>
          <span style={{ color: "#A79E92" }}>/</span>
          <span className="text-[14px]" style={{ color: K.muted }}>Áo thun mặc hằng ngày</span>
        </div>
      </header>

      <main className="grid min-h-0 flex-1 grid-cols-[400px_1fr] gap-6 px-8 py-6">
        {/* ---------- left: intro + hero composite ---------- */}
        <section className="flex min-h-0 flex-col">
          <div className="text-[10.5px] font-bold tracking-[0.16em]" style={{ color: "#C46A3C" }}>
            XOAY QUANH CHIẾC ÁO · 0° → 180°
          </div>
          <h1 className="mt-2 text-[30px] font-extrabold leading-[1.08] tracking-[-0.02em]">
            Một câu khẩu hiệu,
            <br />
            <span style={{ color: K.navy }}>nhìn từ mọi phía.</span>
          </h1>
          <p className="mt-3 text-[12.5px] leading-[1.65]" style={{ color: K.muted }}>
            Mặt trước kín đáo, chỉ logo. Xoay ra sau mới gặp câu trả lời: khối IT để trống lộ màu vải. Các góc dưới đây cho thấy hình in đọc được thế nào khi áo
            thật sự được mặc.
          </p>

          <figure className="mt-4 shrink-0 overflow-hidden rounded-[16px] border" style={{ borderColor: K.rule, background: K.card }}>
            <div className="relative">
              <Composite src={IMG("blank-navy-back")} c={{ ink: K.white, ink2: K.silver }} alt="Áo xanh than mặt sau với hình in khẩu hiệu" />
              <div className="absolute left-3 top-3">
                <Tag kind="exact" />
              </div>
            </div>
            <figcaption className="flex items-center gap-3 border-t px-4 py-2.5" style={{ borderColor: K.rule }}>
              <Dial deg={180} />
              <div className="leading-tight">
                <div className="text-[13px] font-bold">
                  <span style={{ fontFamily: MONO, color: "#C46A3C" }} className="mr-1.5 text-[11px]">01</span>
                  Mặt sau · 180°
                </div>
                <div className="mt-0.5 text-[10.5px]" style={{ color: K.muted }}>
                  File in thật 280 × 306 mm · mép trên dưới HPS 110 mm
                </div>
              </div>
            </figcaption>
          </figure>

          <Turntable />

          <div className="mt-auto shrink-0 rounded-[12px] border-l-[3px] px-4 py-2.5 text-[11px] leading-[1.6]" style={{ borderColor: "#C46A3C", background: K.card, color: K.muted }}>
            <b style={{ color: K.ink }}>Cách đọc board:</b> ảnh gắn nhãn <b style={{ color: K.ink }}>Artwork chuẩn</b> ghép đúng file in lên ảnh áo trơn. Ảnh{" "}
            <b style={{ color: K.ink }}>Mô phỏng AI</b> chỉ để cảm nhận phom và không khí; chữ ở góc nghiêng có thể lệch so với file in.
          </div>
        </section>

        {/* ---------- right: product turn + worn ---------- */}
        <section className="grid min-h-0 grid-rows-[1fr_1.18fr] gap-5">
          <div className="grid min-h-0 grid-cols-4 gap-4">
            <View n="02" title="Trước 3/4 · 35°" note="Logo gốc Ø80 mm, ngực trái" deg={35} kind="ai">
              <LogoPhoto src={IMG("front34")} alt="Áo xanh than góc trước ba phần tư" logo={{ x: 705, y: 293, d: 60, sx: 0.84 }} className="absolute inset-0" />
            </View>
            <View n="03" title="Nghiêng · 90°" note="Vai rơi ~3 cm, sườn sạch không in" deg={90} kind="ai">
              <img src={IMG("side")} alt="Áo xanh than góc nghiêng" className="absolute inset-0 h-full w-full object-cover" />
            </View>
            <View n="04" title="Sau 3/4 · 140°" note="Khối IT vẫn đọc rõ khi xoay" deg={140} kind="ai">
              <img src={IMG("back34")} alt="Áo xanh than góc sau ba phần tư" className="absolute inset-0 h-full w-full object-cover" />
            </View>
            <View n="05" title="Bản trắng · 180°" note="2 khuôn: xanh than đậm + xanh FIT" deg={180} kind="exact">
              <Composite fill src={IMG("blank-white-back")} c={{ ink: K.deep, ink2: K.navy }} alt="Áo trắng mặt sau với hình in khẩu hiệu" />
            </View>
          </div>

          <div className="grid min-h-0 grid-cols-[1fr_1fr_0.82fr] gap-4">
            <View n="06" title="Khi mặc · đi học" note="Hình lưng không bị quai balo che hết" kind="ai">
              <img src={IMG("worn-back")} alt="Sinh viên mặc áo nhìn từ phía sau" className="absolute inset-0 h-full w-full object-cover object-[50%_30%]" />
            </View>
            <View n="07" title="Khi mặc · quán cà phê" note="Mặt trước gọn, dễ phối jeans" kind="ai">
              <LogoPhoto src={IMG("worn-front")} alt="Sinh viên mặc áo mặt trước tại quán cà phê" logo={{ x: 557, y: 586, d: 40 }} className="absolute inset-0" />
            </View>
            <View n="08" title="Cận cảnh hình in" note="Plastisol mềm, IT lộ sợi vải" kind="ai">
              <img src={IMG("macro")} alt="Cận cảnh khối IT để trống trên vải" className="absolute inset-0 h-full w-full object-cover" />
            </View>
          </div>
        </section>
      </main>

      <footer className="flex h-[30px] shrink-0 items-center justify-between border-t px-8 text-[10.5px]" style={{ borderColor: K.rule, color: K.muted }}>
        <span>{BRAND.slogan}</span>
        <span>Ảnh mô phỏng dùng để trao đổi ý tưởng · màu thật chốt bằng lab dip và áo mẫu</span>
      </footer>
    </div>
  );
}
