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
const LABEL = { x: 466, y: 70, w: 68, h: 25 };
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
  return <FitLogo cx={598} cy={238} d={90} />;
}

/** Tagless neck print, visible inside the back neck in front views. */
function NeckLabel({ color, size }: { color: string; size: Size }) {
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
        SIZE {size}
      </text>
      </g>
    </g>
  );
}

/* ---------- garments ---------- */




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
  colorway: c,
  annotations,
  ...rest
}: { colorway: Ink } & Omit<ComponentProps<typeof PoloShirt>, "body">) {
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
      {...rest}
      annotations={
        <>
          {wideCollar && <NeckLabel color={c.body === K.white ? K.deep : K.white} size={size} />}
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
  if (preview === "detail-3") return <Front colorway={colorway} size={size} crop={large ? { x: 442, y: 57, w: 116, h: 50 } : { x: 450, y: 70, w: 100, h: 40 }} style={detailStyle} title="Nhãn cổ FIT-HPUni" />;
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
          <div><p className="eyebrow">FIT-HPUni · Đồng Điệu</p><h2 id="preview-dialog-title">{title}</h2><p id="preview-dialog-description">{description}</p></div>
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
          <div><p className="eyebrow">Khoa Công nghệ Thông tin · Đại học Hải Phòng</p><h1 className="brand-title">Áo polo Đồng Điệu</h1></div>
        </div>
        <div className="masthead-actions">
          <button className="print-button" type="button" onClick={() => window.print()} data-testid="button-print">
            <svg className="print-icon" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M7 8V3h10v5M7 17H5a2 2 0 0 1-2-2v-4a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2h-2M7 14h10v7H7z" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/></svg>
            In bảng thiết kế
          </button>
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
          <DetailCard number="03" kicker="Tem nhãn trong cổ" title={`FIT - HPUni · Size ${size}`} note={`Tem cổ ba dòng: FIT - HPUni, INFORMATION TECHNOLOGY và SIZE ${size} được nhấn lớn bên dưới.`} onClick={detailTrigger("detail-3")} testId="card-detail-3">
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
