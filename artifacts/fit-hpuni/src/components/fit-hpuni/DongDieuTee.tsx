import { useEffect, useId, useRef, useState, type ComponentProps, type MouseEvent, type ReactNode } from "react";
import { BRAND, PALETTE } from "./_shared/brand";
import { FitLogo, PoloShirt } from "./_shared/garments";

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
const PAD = { top: 4, right: 6, bottom: 8, left: 6 };
const ART = { x: 360, right: 640 };
const ART_W = ART.right - ART.x;
const BLOCK = { x: 360, y: 222, w: 220, h: 130 };
const IT_SIZE = 140;
const SIZES = ["S", "M", "L", "XL", "XXL"] as const;
type ShirtColor = "navy" | "white";
type Size = (typeof SIZES)[number];
type Preview = "front" | "back" | "detail-1" | "detail-2" | "detail-3" | "detail-4";
type Ink = { body: string; ink: string; ink2: string };

const COLORWAYS: Record<ShirtColor, Ink> = {
  navy: { body: K.deep, ink: K.white, ink2: K.silver },
  white: { body: K.white, ink: K.deep, ink2: K.navy },
};

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
  // Center between the placket edge (519.35) and armhole seam (741.31)
  // at this height, so both sides of the chest logo have equal clearance.
  return <FitLogo cx={(519.35 + 741.31) / 2} cy={238} d={90} />;
}

/** A compact, rib-knit tipped collar and the matching two-compartment neck label. */
function NeckLabel({ color, size }: { color: string; size: Size }) {
  return (
    <g fontFamily={SANS} fill={color}>
      <rect x="452" y="92" width="96" height="24" rx="1.4" fill="none" stroke={color} strokeWidth="1.25" />
      <path d="M521,92 V116" fill="none" stroke={color} strokeWidth="1.1" />
      <text x="486" y="102" textAnchor="middle" fontSize="5.3" fontWeight="800" textLength="50" lengthAdjust="spacingAndGlyphs">
        FIT - HPUni
      </text>
      <text x="486" y="111" textAnchor="middle" fontSize="3.25" fontWeight="700" textLength="64" lengthAdjust="spacingAndGlyphs">
        INFORMATION TECHNOLOGY
      </text>
      <text x="534.5" y="110.3" textAnchor="middle" fontSize="12.2" fontWeight="800">{size}</text>
    </g>
  );
}

/**
 * This design uses a compact tipped knit collar rather than the shared
 * standard collar. It is passed into the optional replacement hook on this
 * board only, leaving every other garment's construction untouched.
 */
function DongDieuCollar({ body, stripe, side }: { body: string; stripe: string; side: "front" | "back" }) {
  const collarColor = body === K.white ? K.deep : body;
  const edge = "#142638";
  const opening = body === K.white ? "#d8dce0" : "#162638";
  const placket = body === K.white ? K.deep : "#162638";
  return (
    <g pointerEvents="none" strokeLinejoin="round">
      {side === "back" ? (
        <g>
          {/* Back view: soft folded band whose top edge dips gently at centre back. */}
          <path d="M379,74 C382,46 400,30 427,28 Q500,36 573,28 C600,30 618,46 623,74 L621,92 Q500,110 379,92 Z" fill={collarColor} />
          {/* Twin tipping: medium-width white bands with a visible navy gap. */}
          <path d="M392,72 Q500,90 608,72" fill="none" stroke={stripe} strokeWidth="4.5" />
          <path d="M390,80 Q500,98 610,80" fill="none" stroke={stripe} strokeWidth="4.5" />
        </g>
      ) : (
        <g>
          {/* Slim placket, sitting beneath the point where the leaves meet. */}
          <path d="M484,170 L516,170 L516,284 L484,284 Z" fill={placket} stroke={edge} strokeWidth="1.6" />
          <path d="M511,186 V279" fill="none" stroke={stripe} strokeOpacity="0.32" strokeWidth="0.9" strokeDasharray="3.6 2.7" />
          {/* Upper band: soft curve dipping at centre, no squared stand. */}
          <path d="M379,74 C382,46 400,30 427,28 Q500,36 573,28 C600,30 618,46 623,74 L568,69 Q500,80 432,69 Z" fill={collarColor} />
          {/* Inner neckline: curved sides tapering to a central V at the placket. */}
          <path d="M432,69 Q500,80 568,69 C564,120 530,165 500,185 C470,165 436,120 432,69 Z" fill={opening} />
          {/* Broad folded leaves: outer tips hang lowest, inner tips frame the V. */}
          <path d="M379,74 C381,120 386,165 393,199 L471,179 C452,152 436,115 432,69 Q404,64 379,74 Z" fill={collarColor} />
          <path d="M621,74 C619,120 614,165 607,199 L529,179 C548,152 564,115 568,69 Q596,64 621,74 Z" fill={collarColor} />
          {/* Double white tipping tracks the natural outer edges. */}
          <g fill="none" stroke={stripe} strokeWidth="4.5" strokeLinecap="butt">
            <path d="M396,60 C398,118 403,164 409,190" />
            <path d="M404,53 C406,116 411,162 417,188" />
            <path d="M604,60 C602,118 597,164 591,190" />
            <path d="M596,53 C594,116 589,162 583,188" />
          </g>
          {/* Buttons and ivory end bar. */}
          {[204, 244].map((y) => (
            <g key={y}>
              <circle cx="500" cy={y} r="5.2" fill={stripe} stroke={edge} strokeWidth="1.1" />
              <g fill={placket}>
                <circle cx="498.3" cy={y - 1.7} r="0.8" />
                <circle cx="501.7" cy={y - 1.7} r="0.8" />
                <circle cx="498.3" cy={y + 1.7} r="0.8" />
                <circle cx="501.7" cy={y + 1.7} r="0.8" />
              </g>
            </g>
          ))}
          <path d="M484,278 H516 V284 H484 Z" fill={stripe} stroke={edge} strokeWidth="1.1" />
        </g>
      )}
    </g>
  );
}

/* ---------- garments ---------- */




/** Contrasting outer/inner stripes, separated by the shirt's body colour. */
function SleeveCuffTrim({ body }: { body: string }) {
  const stripe = body === K.white ? K.deep : K.white;
  return (
    <g pointerEvents="none">
      <path d="M72,189 L131,359 L153,347 L95,178 Z" fill={body} />
      <path d="M928,189 L869,359 L847,347 L905,178 Z" fill={body} />
      <g fill="none" stroke={stripe} strokeWidth={4.5} strokeLinecap="butt">
        <path d="M74.2,187.95 L133.2,357.8" />
        <path d="M82.2,184.1 L141.2,353.4" />
        <path d="M925.8,187.95 L866.8,357.8" />
        <path d="M917.8,184.1 L858.8,353.4" />
      </g>
    </g>
  );
}

function Back({
  colorway: c,
  annotations,
  ...rest
}: { colorway: Ink } & Omit<ComponentProps<typeof PoloShirt>, "body">) {
  return (
    <PoloShirt
      side="back"
      body={c.body}
      collarOverlay={<DongDieuCollar body={c.body} stripe={K.white} side="back" />}
      {...rest}
      annotations={
        <>
          {annotations}
          <SleeveCuffTrim body={c.body} />
        </>
      }
    >
      <BackArt {...c} />
    </PoloShirt>
  );
}

function Front({
  colorway: c,
  size,
  annotations,
  wideCollar = true,
  ...rest
}: { colorway: Ink; size: Size; wideCollar?: boolean } & Omit<ComponentProps<typeof PoloShirt>, "body">) {
  return (
    <PoloShirt
      side="front"
      body={c.body}
      collarOverlay={<DongDieuCollar body={c.body} stripe={K.white} side="front" />}
      {...rest}
      annotations={
        <>
          {wideCollar && <NeckLabel color={c.body === K.white ? K.deep : K.white} size={size} />}
          {annotations}
          <SleeveCuffTrim body={c.body} />
        </>
      }
    >
      <FrontArt />
    </PoloShirt>
  );
}

function DetailCard({
  number, kicker, title, note, dark = false, children, onClick, testId,
}: {
  number: string; kicker: string; title: string; note: string; dark?: boolean;
  children: ReactNode; onClick: (event: MouseEvent<HTMLButtonElement>) => void; testId: string;
}) {
  return (
    <button className={`detail-card${dark ? " dark" : ""}`} onClick={onClick} type="button" data-testid={testId} aria-label={`Phóng to chi tiết ${number}: ${title}`}>
      <span className="detail-art">
        <span className="detail-number">{number}</span>
        <span className="detail-svg">{children}</span>
      </span>
      <span className="detail-copy">
        <span className="detail-kicker">{kicker}</span>
        <span className="sr-only"> </span>
        <span className="detail-title">{title}</span>
        <span className="detail-note">{note}</span>
      </span>
    </button>
  );
}

function PreviewArt({ preview, colorway, size, large = false }: { preview: Preview; colorway: Ink; size: Size; large?: boolean }) {
  const detailStyle = { width: "100%", height: "100%" };
  if (preview === "front") return <Front colorway={colorway} size={size} pad={PAD} style={detailStyle} title="Áo FIT-HPUni, mặt trước" />;
  if (preview === "back") return <Back colorway={colorway} pad={PAD} style={detailStyle} title="Áo FIT-HPUni, mặt sau" />;
  if (preview === "detail-1") return <Back colorway={colorway} crop={{ x: 255, y: 148, w: 490, h: 214 }} style={detailStyle} title="Cận cảnh chữ IT để trống, lộ màu vải" />;
  if (preview === "detail-2") return <Back colorway={colorway} crop={{ x: 320, y: 356, w: 350, h: 192 }} style={detailStyle} title="Cận cảnh câu slogan phía sau" />;
  if (preview === "detail-3") return <Front colorway={colorway} size={size} crop={large ? { x: 442, y: 88, w: 116, h: 34 } : { x: 446, y: 89, w: 108, h: 30 }} style={detailStyle} title="Cận cảnh nhãn trong cổ FIT-HPUni" />;
  return <Front colorway={colorway} size={size} crop={{ x: 170, y: 30, w: 660, h: 730 }} style={detailStyle} title={`Màu áo ${colorway.body === K.deep ? "xanh than" : "trắng"}`} />;
}

function PreviewDialog({ preview, colorway, size, onClose }: { preview: Preview; colorway: Ink; size: Size; onClose: () => void }) {
  const closeRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    closeRef.current?.focus();
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
      if (event.key === "Tab" && dialogRef.current) {
        const focusables = dialogRef.current.querySelectorAll<HTMLElement>("button");
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last?.focus(); }
        else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus(); }
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [onClose]);
  const labels: Record<Preview, [string, string]> = {
    front: ["Mặt trước", "Logo FIT-HPUni chính thức đặt gọn trên ngực trái."],
    back: ["Mặt sau", "Câu slogan của Khoa trên nền áo đã chọn."],
    "detail-1": ["Chữ IT để trống", "Khối mực đặc, riêng chữ IT không in — màu vải tạo nên khoảng âm."],
    "detail-2": ["Hai giọng nói", "“You can do IT,” và lời đáp “we are ready to accompany”."],
    "detail-3": ["Nhãn trong cổ", `FIT - HPUni · Information Technology · size ${size}.`],
    "detail-4": ["Màu áo", `Bản xem trước màu ${colorway.body === K.deep ? "xanh than" : "trắng"}.`],
  };
  const [title, description] = labels[preview];
  return (
    <div className="dialog-backdrop" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose(); }}>
      <div className="detail-dialog" role="dialog" aria-modal="true" aria-labelledby="preview-dialog-title" aria-describedby="preview-dialog-description" ref={dialogRef} data-testid="dialog-preview">
        <div className="dialog-head">
          <div><p className="eyebrow">FIT-HPUni · ITogether</p><h2 id="preview-dialog-title">{title}</h2><p id="preview-dialog-description">{description}</p></div>
          <button className="close-button" type="button" onClick={onClose} ref={closeRef} aria-label="Đóng cửa sổ xem trước" data-testid="button-close-preview">×</button>
        </div>
        <div className="dialog-art"><PreviewArt preview={preview} colorway={colorway} size={size} large /></div>
        <p className="dialog-caption">Nhấn Escape hoặc nút đóng để quay lại bảng thiết kế.</p>
      </div>
    </div>
  );
}

function readPreference<T extends string>(key: string, allowed: readonly T[], fallback: T): T {
  try {
    const saved = localStorage.getItem(key);
    return saved && (allowed as readonly string[]).includes(saved) ? saved as T : fallback;
  } catch {
    return fallback;
  }
}

export function DongDieuTee() {
  const [color, setColor] = useState<ShirtColor>(() => readPreference("fit-hpuni-shirt-color", ["navy", "white"], "navy"));
  const [size, setSize] = useState<Size>(() => readPreference("fit-hpuni-shirt-size", SIZES, "L"));
  const [preview, setPreview] = useState<Preview | null>(null);
  const triggerRef = useRef<HTMLElement | null>(null);
  const colorway = COLORWAYS[color];
  const openPreview = (value: Preview, trigger: HTMLElement) => {
    triggerRef.current = trigger;
    setPreview(value);
  };
  const closePreview = () => {
    setPreview(null);
    window.requestAnimationFrame(() => triggerRef.current?.focus());
  };
  const chooseColor = (next: ShirtColor) => {
    setColor(next);
    try { localStorage.setItem("fit-hpuni-shirt-color", next); } catch { /* Preferences remain usable if storage is unavailable. */ }
  };
  const chooseSize = (next: Size) => {
    setSize(next);
    try { localStorage.setItem("fit-hpuni-shirt-size", next); } catch { /* Preferences remain usable if storage is unavailable. */ }
  };
  const mainPreviewButton = (key: "front" | "back") => (event: MouseEvent<HTMLElement>) => openPreview(key, event.currentTarget);
  const detailTrigger = (key: Preview) => (event: MouseEvent<HTMLButtonElement>) => openPreview(key, event.currentTarget);

  return (
    <main className="board">
      <header className="masthead">
        <div className="brand-lockup">
          <img className="brand-mark" src={BRAND.logo} alt="Logo chính thức FIT-HPUni" />
          <div><p className="eyebrow">Khoa Công nghệ Thông tin · Trường Đại học Hải Phòng</p><h1 className="brand-title">CUỘC THI SÁNG TẠO DẤU ẤN RIÊNG KHOA CÔNG NGHỆ THÔNG TIN </h1></div>
        </div>
      </header>

      <section className="control-strip" aria-label="Tùy chọn xem thiết kế">
        <div className="controls-group">
          <div className="control-unit">
            <span className="control-label">Màu áo</span>
            <div className="swatch-list" role="group" aria-label="Chọn màu áo">
              <button type="button" className="swatch-button" aria-pressed={color === "navy"} onClick={() => chooseColor("navy")} data-testid="button-color-navy"><span className="swatch-dot" style={{ background: K.deep }} />Xanh than</button>
              <button type="button" className="swatch-button" aria-pressed={color === "white"} onClick={() => chooseColor("white")} data-testid="button-color-white"><span className="swatch-dot" style={{ background: "#fff" }} />Trắng</button>
            </div>
          </div>
          <label className="control-unit" htmlFor="shirt-size">
            <span className="control-label">Nhãn cổ · cỡ</span>
            <select id="shirt-size" className="size-select" value={size} onChange={(event) => chooseSize(event.target.value as Size)} data-testid="select-size">
              {SIZES.map((option) => <option key={option} value={option}>{option}</option>)}
            </select>
          </label>
        </div>
        <span className="state-note" aria-live="polite" data-testid="text-current-selection">Đang xem: {color === "navy" ? "xanh than" : "trắng"} · size {size}</span>
      </section>

      <section className="hero-board" aria-label="Hai mặt áo">
        <figure className="hero-figure">
          <figcaption className="view-title">Mặt trước</figcaption><span className="view-index">01 / 02</span>
          <button className="hero-button" type="button" aria-label="Phóng to mặt trước áo" onClick={mainPreviewButton("front")} data-testid="button-preview-front">
            <PreviewArt preview="front" colorway={colorway} size={size} />
          </button><span className="hero-hint">Nhấn để xem lớn</span>
        </figure>
        <figure className="hero-figure">
          <figcaption className="view-title">Mặt sau</figcaption><span className="view-index">02 / 02</span>
          <button className="hero-button" type="button" aria-label="Phóng to mặt sau áo" onClick={mainPreviewButton("back")} data-testid="button-preview-back">
            <PreviewArt preview="back" colorway={colorway} size={size} />
          </button><span className="hero-hint">Nhấn để xem lớn</span>
        </figure>
      </section>

      <section className="details-section" aria-labelledby="details-heading">
        <div className="section-heading">
          <h2 id="details-heading">Điểm nổi bật <span>của chiếc áo</span></h2>
          <span className="section-slogan">{BRAND.short} · {BRAND.slogan}</span>
        </div>
        <div className="detail-grid">
          <DetailCard number="01" dark kicker="Chữ là hình" title="Chữ IT để trống, lộ màu vải" note="Khối mực đặc, riêng chữ IT không in — điểm nhìn mạnh nhất áo." onClick={detailTrigger("detail-1")} testId="card-detail-1">
            <PreviewArt preview="detail-1" colorway={colorway} size={size} />
          </DetailCard>
          <DetailCard number="02" kicker="Hai giọng nói" title="Bạn nói, Khoa đáp lời" note="“You can do IT,” đậm; “we are ready to accompany” xám bạc." onClick={detailTrigger("detail-2")} testId="card-detail-2">
            <PreviewArt preview="detail-2" colorway={colorway} size={size} />
          </DetailCard>
          <DetailCard number="03" kicker="Tem nhãn trong cổ" title={`Nhãn FIT-HPUni · Cỡ ${size}`} note={`Nhãn viền chữ nhật chia ngăn: FIT - HPUni, Information Technology và chữ cỡ ${size}.`} onClick={detailTrigger("detail-3")} testId="card-detail-3">
            <PreviewArt preview="detail-3" colorway={colorway} size={size} />
          </DetailCard>
          <DetailCard number="04" kicker="Màu áo" title="Polo xanh than và trắng" note="Cùng mẫu polo xanh than và trắng, viền tương phản đồng bộ ở cổ bẻ và bo tay." onClick={detailTrigger("detail-4")} testId="card-detail-4">
            <div style={{ display: "flex", width: "100%", height: "100%", gap: 4 }}><Front colorway={COLORWAYS.navy} size={size} pad={PAD} style={{width:"50%",height:"100%"}} /><Front colorway={COLORWAYS.white} size={size} pad={PAD} style={{width:"50%",height:"100%"}} /></div>
          </DetailCard>
        </div>
      </section>
      {preview && <PreviewDialog preview={preview} colorway={colorway} size={size} onClose={closePreview} />}
    </main>
  );
}
