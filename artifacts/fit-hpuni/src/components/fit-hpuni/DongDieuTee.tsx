import { useEffect, useId, useRef, useState, type ComponentProps, type MouseEvent, type ReactNode } from "react";
import { BRAND, PALETTE } from "./_shared/brand";
import { FitLogo, PoloShirt } from "./_shared/garments";
import { DesignCredits } from "./DesignCredits";

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
  const trimId = `collar-trim-${useId().replace(/:/g, "")}`;
  const leftLeaf = "M122,92 L215.18,28 C216.07,125 239.29,240 300,309 L188,348 Q160,225 122,92 Z";
  const rightLeaf = "M610,92 L515.32,28 C512.64,128 485.86,240 418,301 L575,344 Q595,225 610,92 Z";
  const backBand = "M412,22 L588,22 L608,42 L604,84 L576,90 L424,90 L396,84 L392,42 Z";
  const collarColor = body === K.white ? K.deep : body;
  const edge = "#142638";
  const opening = body === K.white ? "#d8dce0" : "#162638";
  const placket = body === K.white ? K.deep : "#162638";
  const bandRib = "#2a425c";
  return (
    <g pointerEvents="none" strokeLinejoin="round">
      {side === "back" ? (
        <g>
          {/* Match the front's stiff folded leaves with flat planes and angular ends. */}
          <defs>
            <clipPath id={`${trimId}-back`}><path d={backBand} /></clipPath>
          </defs>
          <path d={backBand} fill={collarColor} />
          <path d="M412,22 L402,44 L406,86 L396,84 L392,42 Z M588,22 L598,44 L594,86 L604,84 L608,42 Z" fill={edge} fillOpacity="0.32" />
          {/* White / navy / white trim centered within the back collar band. */}
          <g clipPath={`url(#${trimId}-back)`} fill="none" strokeLinecap="butt">
            <path d="M378.8,49.26 Q500,73.74 621.2,49.26" stroke={K.deep} strokeWidth="10" />
            <path d="M380,44.26 Q500,68.74 620,44.26" stroke={stripe} strokeWidth="4.8" />
            <path d="M377.6,54.26 Q500,78.74 622.4,54.26" stroke={stripe} strokeWidth="4.8" />
          </g>
        </g>
      ) : (
        /* Traced in the 661×627 reference image space, then mapped uniformly:
           garment = translate(335.75, 24.6) · scale(0.45) · reference. */
        (<g transform="translate(335.75 24.6) scale(0.45)">
          {/* Long dark placket base. */}
          <path d="M330,300 L408,300 L408,598 L330,598 Z" fill={placket} stroke={edge} strokeWidth="3.5" />
          {/* Rounded upper back band and its interior rib strip. */}
          <path d="M200,98 L200,42 Q200,14 230,13 L500,13 Q530,14 530,42 L530,98 Z" fill={collarColor} stroke={edge} strokeWidth="4" />
          <path d="M212,90 Q365,99 518,90 L518,104 Q365,114 212,104 Z" fill={bandRib} stroke={edge} strokeWidth="3" />
          {/* Deep U interior opening. */}
          <path d="M212,104 Q365,114 518,104 C510,185 470,262 418,302 L300,309 C252,258 216,180 212,104 Z" fill={opening} stroke={edge} strokeWidth="3.5" />
          {/* Broaden each leaf outward, keeping its placket attachment fixed. */}
          <g transform="translate(300 0) scale(1.12 1) translate(-300 0)">
            <defs>
              <clipPath id={`${trimId}-left`}><path d={leftLeaf} /></clipPath>
            </defs>
            <path d={leftLeaf} fill={collarColor} stroke={edge} strokeWidth="4" />
            {/* Extend the same curves beyond both edges; clip flush to the leaf. */}
            <g clipPath={`url(#${trimId}-left)`}>
              <path d="M162.250,1.688 Q192.350,200.137 253.810,365.267" fill="none" stroke={K.deep} strokeWidth="14" strokeLinecap="butt" />
              <g fill="none" stroke={stripe} strokeWidth="10.8" strokeLinecap="butt">
                <path d="M152.000,11.731 Q182.800,202.236 244.960,368.633" />
                <path d="M172.500,-8.350 Q201.900,198.010 262.660,362.034" />
              </g>
            </g>
          </g>
          <g transform="translate(418 0) scale(1.12 1) translate(-418 0)">
            <defs>
              <clipPath id={`${trimId}-right`}><path d={rightLeaf} /></clipPath>
            </defs>
            <path d={rightLeaf} fill={collarColor} stroke={edge} strokeWidth="4" />
            <g clipPath={`url(#${trimId}-right)`}>
              <path d="M567.844,1.206 Q545.619,202.351 479.294,355.084" fill="none" stroke={K.deep} strokeWidth="14" strokeLinecap="butt" />
              <g fill="none" stroke={stripe} strokeWidth="10.8" strokeLinecap="butt">
                <path d="M577.625,11.188 Q554.525,204.737 488.305,357.127" />
                <path d="M558.062,-8.775 Q536.712,199.965 470.283,353.041" />
              </g>
            </g>
          </g>
          {/* Cream underlap, top X button, and the diagonal dark overlap flap. */}
          <path d="M300,309 L356,305 L362,330 Q340,382 333,470 Q316,425 305,392 Z" fill={stripe} stroke={edge} strokeWidth="3" />
          <circle cx="338" cy="332" r="12" fill={stripe} stroke={edge} strokeWidth="3" />
          <path d="M332,326 L344,338 M344,326 L332,338" stroke={edge} strokeWidth="2.6" strokeLinecap="round" />
          <path d="M418,301 Q394,322 362,342 Q340,382 333,470 L333,598 L408,598 L408,330 Q410,313 418,301 Z" fill={placket} stroke={edge} strokeWidth="3.5" />
          <path d="M398,338 L398,582 M343,474 L343,582" fill="none" stroke={stripe} strokeOpacity="0.35" strokeWidth="2" strokeDasharray="8 6" />
          {/* Lower four-hole button and ivory end bar. */}
          <circle cx="366" cy="462" r="11.5" fill={stripe} stroke={edge} strokeWidth="2.5" />
          <g fill={placket}>
            <circle cx="362" cy="458" r="1.8" />
            <circle cx="370" cy="458" r="1.8" />
            <circle cx="362" cy="466" r="1.8" />
            <circle cx="370" cy="466" r="1.8" />
          </g>
          <path d="M330,584 L408,584 L408,598 L330,598 Z" fill={stripe} stroke={edge} strokeWidth="2.5" />
        </g>)
      )}
    </g>
  );
}

/* ---------- garments ---------- */




/** Equal outer/middle bands widened 20%; the inner band's width stays unchanged. */
function SleeveCuffTrim({ body }: { body: string }) {
  const clipId = `cuff-edge-${useId().replace(/:/g, "")}`;
  const outer = body === K.white ? K.deep : K.white;
  const middle = body === K.white ? K.white : K.deep;
  return (
    <g pointerEvents="none" stroke="none">
      <defs>
        <clipPath id={clipId}>
          <path d="M262,100 Q165,138 72,189 L131,359 Q180,331 230,300 L770,300 Q820,331 869,359 L928,189 Q835,138 738,100 Z" />
        </clipPath>
      </defs>
      {/* Overshoot the curved sleeve edge, then clip flush to it without a dark gap. */}
      <g clipPath={`url(#${clipId})`}>
        <path d="M68.53,179 L131,359 L155.2,345.8 L93.87,166.9 Z M931.47,179 L869,359 L844.8,345.8 L906.13,166.9 Z" fill={outer} />
        <path d="M75.44,175.7 L137.6,355.4 L144.2,351.8 L82.35,172.4 Z M924.56,175.7 L862.4,355.4 L855.8,351.8 L917.65,172.4 Z" fill={middle} />
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
      cuffOverlay={<SleeveCuffTrim body={c.body} />}
      {...rest}
      annotations={annotations}
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
      cuffOverlay={<SleeveCuffTrim body={c.body} />}
      {...rest}
      annotations={
        <>
          {wideCollar && <NeckLabel color={c.body === K.white ? K.deep : K.white} size={size} />}
          {annotations}
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
    "detail-1": ["Chữ\u00a0\u00a0“IT”\u00a0lặng đầy bản lĩnh", "Nằm trong vế đầu slogan “You can do IT”, chữ “IT” được nhóm ITogether xử lý để trống lộ nền vải trên khối mực đặc — tạo tâm điểm thị giác mạnh mẽ nhất."],
    "detail-2": ["Bạn tự tin, Khoa tiếp bước", "“You can do IT, we are ready to accompany” đối lập giữa nét in đậm và sắc xám bạc, điểm xuyết con trỏ lệnh nhấp nháy sau chữ “accompany” — biểu tượng cho sự đồng hành luôn tiếp diễn."],
    "detail-3": ["Niềm tự hào ở bên trong", "Nhãn cổ viền chữ nhật chia ngăn hiện đại, tích hợp chuẩn xác nhận diện Khoa Công nghệ thông tin (FIT-HPUni) và thông số cỡ áo."],
    "detail-4": ["Bộ đôi Polo Xanh than & Trắng", "Bộ đôi Polo xanh than và trắng với viền cổ, bo tay phối màu tương phản — tác phẩm từ nhóm ITogether mang thông điệp gắn kết mọi thế hệ sinh viên trong Khoa."],
  };
  const [title, description] = labels[preview];
  return (
    <div className="dialog-backdrop" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose(); }}>
      <div className="detail-dialog" role="dialog" aria-modal="true" aria-labelledby="preview-dialog-title" aria-describedby="preview-dialog-description" ref={dialogRef} data-testid="dialog-preview">
        <div className="dialog-head">
          <div className="font-bold"><p className="eyebrow">FIT-HPUni — ITogether</p><h2 id="preview-dialog-title">{title}</h2><p id="preview-dialog-description">{description}</p></div>
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
          <div><p className="eyebrow">Khoa Công nghệ Thông tin - Trường Đại học Hải Phòng</p><h1 className="brand-title">CUỘC THI SÁNG TẠO DẤU ẤN RIÊNG KHOA CÔNG NGHỆ THÔNG TIN </h1></div>
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
        <span className="state-note" aria-live="polite" data-testid="text-current-selection">Đang xem: {color === "navy" ? "Xanh than" : "Trắng"} · size {size}</span>
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
          <span className="section-slogan">{BRAND.short} — {BRAND.slogan}</span>
        </div>
        <div className="detail-grid">
          <DetailCard number="01" dark kicker="ĐIỂM NHẤN SLOGAN" title="Chữ     “IT”  lặng đầy bản lĩnh" note="Nằm trong vế đầu slogan “You can do IT”, chữ IT được nhóm ITogether xử lý để trống lộ nền vải trên khối mực đặc — tạo tâm điểm thị giác mạnh mẽ nhất." onClick={detailTrigger("detail-1")} testId="card-detail-1">
            <PreviewArt preview="detail-1" colorway={colorway} size={size} />
          </DetailCard>
          <DetailCard number="02" kicker="THÔNG ĐIỆP ĐỒNG HÀNH" title="Bạn tự tin, Khoa tiếp bước" note="“You can do IT, we are ready to accompany” đối lập giữa nét in đậm và sắc xám bạc, điểm xuyết con trỏ lệnh nhấp nháy sau chữ “accompany” — biểu tượng cho sự đồng hành luôn tiếp diễn." onClick={detailTrigger("detail-2")} testId="card-detail-2">
            <PreviewArt preview="detail-2" colorway={colorway} size={size} />
          </DetailCard>
          <DetailCard number="03" kicker="NHẬN DIỆN THƯƠNG HIỆU" title={`Niềm tự hào ở bên trong`} note={`Nhãn cổ viền chữ nhật chia ngăn hiện đại, tích hợp chuẩn xác nhận diện Khoa Công nghệ thông tin (FIT-HPUni) và thông số cỡ áo.`} onClick={detailTrigger("detail-3")} testId="card-detail-3">
            <PreviewArt preview="detail-3" colorway={colorway} size={size} />
          </DetailCard>
          <DetailCard number="04" kicker="PHIÊN BẢN MÀU SẮC" title="Bộ đôi Polo Xanh than & Trắng" note="Bộ đôi Polo xanh than và trắng với viền cổ, bo tay phối màu tương phản — tác phẩm từ nhóm ITogether mang thông điệp gắn kết mọi thế hệ sinh viên trong Khoa." onClick={detailTrigger("detail-4")} testId="card-detail-4">
            <div style={{ display: "flex", width: "100%", height: "100%", gap: 4 }}><Front colorway={COLORWAYS.navy} size={size} pad={PAD} style={{width:"50%",height:"100%"}} /><Front colorway={COLORWAYS.white} size={size} pad={PAD} style={{width:"50%",height:"100%"}} /></div>
          </DetailCard>
        </div>
      </section>
      <DesignCredits />
      {preview && <PreviewDialog preview={preview} colorway={colorway} size={size} onClose={closePreview} />}
    </main>
  );
}
