import * as React from "react";
import { BRAND } from "./brand";

/* ==================================================================
   FIT-HPUni · scale-accurate garment flats (polo + crew-neck tee)
   ------------------------------------------------------------------
   Coordinate space: 1 unit = 1 mm on a size-L garment.
   Garment area x 0..1000, y 0..860. Centre front x = 500.
   High point shoulder (HPS) y = 60. Chest width 540 mm.
   Tee length 740 mm. Polo length 720 mm front / 750 mm back.

   children     → artwork ON the fabric (clipped to the silhouette,
                  then shaded together with the fabric)
   annotations  → unclipped overlay in the same mm space
                  (callouts, dimension lines)
   pad          → extra mm around the garment to make room for
                  annotations (expands the viewBox)

   In a FRONT view the wearer's LEFT chest is on the viewer's RIGHT.
   ================================================================== */

export type GarmentSide = "front" | "back";
export type Pad =
  | number
  | { top?: number; right?: number; bottom?: number; left?: number };

export const GARMENT_W = 1000;
export const GARMENT_H = 860;

/* ---------------- colour helpers (hex colours only) ---------------- */

const HEX = /^#?([0-9a-f]{3}|[0-9a-f]{6})$/i;

function hexToRgb(hex: string): [number, number, number] | null {
  const v = hex.trim();
  if (!HEX.test(v)) return null;
  let h = v.replace("#", "");
  if (h.length === 3)
    h = h
      .split("")
      .map((c) => c + c)
      .join("");
  const n = parseInt(h, 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}

function toHex(v: number) {
  return Math.max(0, Math.min(255, Math.round(v)))
    .toString(16)
    .padStart(2, "0");
}

/** amt -1..1 — negative mixes toward black, positive toward white. */
export function shade(hex: string, amt: number): string {
  const rgb = hexToRgb(hex);
  if (!rgb) return hex;
  const target = amt < 0 ? 0 : 255;
  const p = Math.min(1, Math.abs(amt));
  return `#${rgb.map((c) => toHex(c + (target - c) * p)).join("")}`;
}

export function luminance(hex: string): number {
  const rgb = hexToRgb(hex);
  if (!rgb) return 0.5;
  const [r, g, b] = rgb.map((v) => {
    const s = v / 255;
    return s <= 0.03928 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

export const isDark = (hex: string) => luminance(hex) < 0.18;

function useSvgId(prefix: string) {
  const raw = React.useId();
  return `${prefix}${raw.replace(/[^a-zA-Z0-9]/g, "")}`;
}

function padBox(pad?: Pad) {
  const p =
    typeof pad === "number"
      ? { top: pad, right: pad, bottom: pad, left: pad }
      : {
          top: pad?.top ?? 0,
          right: pad?.right ?? 0,
          bottom: pad?.bottom ?? 0,
          left: pad?.left ?? 0,
        };
  return {
    x: -p.left,
    y: -p.top,
    w: GARMENT_W + p.left + p.right,
    h: GARMENT_H + p.top + p.bottom,
  };
}

/* ---------------- standard placement anchors (mm) ---------------- */
/* axisDeg: rotate artwork by this angle to run it along the sleeve,
   reading left-to-right. */

export const ANCHORS = {
  tee: {
    front: {
      wearerLeftChest: { x: 598, y: 238 },
      wearerRightChest: { x: 402, y: 238 },
      /** top edge of a centre-chest graphic (≈ 8 cm under the rib) */
      centerChestTop: { x: 500, y: 215 },
      centerChest: { x: 500, y: 330 },
      wearerLeftSleeve: { x: 828, y: 241, axisDeg: 28.8 },
      wearerRightSleeve: { x: 172, y: 241, axisDeg: -28.8 },
      wearerLeftHem: { x: 690, y: 735 },
    },
    back: {
      /** 'gáy' — just under the back neck rib */
      backNeck: { x: 500, y: 140 },
      upperBack: { x: 500, y: 250 },
      /** centre of a full-back (A3) print */
      centerBack: { x: 500, y: 390 },
      lowerBack: { x: 500, y: 660 },
      wearerLeftSleeve: { x: 172, y: 241, axisDeg: -28.8 },
      wearerRightSleeve: { x: 828, y: 241, axisDeg: 28.8 },
    },
  },
  polo: {
    front: {
      wearerLeftChest: { x: 600, y: 250 },
      wearerRightChest: { x: 400, y: 250 },
      placket: { x: 500, y: 171 },
      wearerLeftSleeve: { x: 826, y: 237, axisDeg: 27.1 },
      wearerRightSleeve: { x: 174, y: 237, axisDeg: -27.1 },
      wearerLeftHem: { x: 690, y: 715 },
    },
    back: {
      /** just under the collar band */
      backNeck: { x: 500, y: 142 },
      upperBack: { x: 500, y: 255 },
      centerBack: { x: 500, y: 400 },
      lowerBack: { x: 500, y: 670 },
      wearerLeftSleeve: { x: 174, y: 237, axisDeg: -27.1 },
      wearerRightSleeve: { x: 826, y: 237, axisDeg: 27.1 },
    },
  },
} as const;

/** Production-safe artwork limits (mm) */
export const PRINT_LIMITS = {
  leftChestMin: 70,
  leftChestMax: 100,
  backNeckMax: 90,
  sleeveMax: 90,
  fullBackMaxW: 300,
  fullBackMaxH: 400,
  embroideryMinTextHeight: 5,
} as const;

/* ---------------- geometry ---------------- */

const ARMHOLE_L = "M262,100 C272,170 266,262 230,300";
const ARMHOLE_R = "M738,100 C728,170 734,262 770,300";

const FOLDS = [
  "M246,335 Q264,400 254,470",
  "M754,335 Q736,400 746,470",
  "M310,600 Q326,670 312,740",
  "M690,600 Q674,670 688,740",
  "M236,132 Q222,200 204,250",
  "M764,132 Q778,200 796,250",
];

function teeSilhouette(side: GarmentSide) {
  const neck = side === "front" ? "Q500,40 405,60" : "Q500,76 405,60";
  return `M405,60 Q330,74 262,100 Q160,140 63,193 L132,370 Q182,332 230,300 L236,800 Q500,812 764,800 L770,300 Q818,332 868,370 L937,193 Q840,140 738,100 Q670,74 595,60 ${neck} Z`;
}

const TEE_FRONT = {
  rib: "M405,60 C410,125 455,152 500,152 C545,152 590,125 595,60 L579,62 C574,113 538,132 500,132 C462,132 426,113 421,62 Z",
  ribEdge: "M421,62 C426,113 462,132 500,132 C538,132 574,113 579,62",
  ribBack: "M405,60 Q500,40 595,60 L579,62 Q500,70 421,62 Z",
  ribBackEdge: "M405,60 Q500,40 595,60",
  opening:
    "M421,62 Q500,70 579,62 C574,113 538,132 500,132 C462,132 426,113 421,62 Z",
  coverstitch: "M410,67 C415,128 457,157 500,157 C543,157 585,128 590,67",
};

const TEE_BACK = {
  rib: "M405,60 Q500,76 595,60 L593,80 Q500,96 407,80 Z",
  ribEdge: "M405,60 Q500,76 595,60",
  coverstitch: "M409,86 Q500,102 591,86",
};

function poloSilhouette(side: GarmentSide, closeNeck = true) {
  const perimeter = side === "front"
    ? "M410,60 Q332,74 262,100 Q165,138 72,189 L131,359 Q180,331 230,300 L234,780 Q500,792 766,780 L770,300 Q820,331 869,359 L928,189 Q835,138 738,100 Q668,74 590,60"
    : "M410,60 Q332,74 262,100 Q165,138 72,189 L131,359 Q180,331 230,300 L233,725 L236,800 Q500,822 764,800 L767,725 L770,300 Q820,331 869,359 L928,189 Q835,138 738,100 Q668,74 590,60";
  return closeNeck ? `${perimeter} Q500,${side === "front" ? 30 : 70} 410,60 Z` : perimeter;
}

const POLO = {
  cuffL: "M72,189 L131,359 L153,347 L95,178 Z",
  cuffR: "M928,189 L869,359 L847,347 L905,178 Z",
  cuffEdgeL: "M62,161 L141,387",
  cuffEdgeR: "M938,161 L859,387",
  placket: "M483,96 L517,96 L517,246 L483,246 Z",
  placketInner: "M483,96 L486,96 L486,246 L483,246 Z",
  placketStitch: "M487,100 L487,241 L513,241 L513,100",
  placketBox: "M487,233 L513,233",
  opening:
    "M430,66 Q500,44 570,66 C564,67 556,70 548,74 C534,80 524,90 516,104 L484,104 C476,90 466,80 452,74 C444,70 436,67 430,66 Z",
  backCollarFront: "M406,58 Q500,24 594,58 L570,66 Q500,44 430,66 Z",
  leafL:
    "M406,58 C390,68 380,86 386,104 L432,168 L484,104 C476,90 466,80 452,74 C444,70 436,67 430,66 Z",
  leafR:
    "M594,58 C610,68 620,86 614,104 L568,168 L516,104 C524,90 534,80 548,74 C556,70 564,67 570,66 Z",
  leafEdgeL: "M406,58 C390,68 380,86 386,104 L432,168 L446,187",
  leafEdgeR: "M594,58 C610,68 620,86 614,104 L568,168 L554,187",
  rollL: "M484,104 C476,90 466,80 452,74 C444,70 436,67 430,66",
  rollR: "M516,104 C524,90 534,80 548,74 C556,70 564,67 570,66",
  backBand: "M408,58 Q500,47 592,58 L612,104 Q500,120 388,104 Z",
  backBandEdge: "M388,104 Q500,120 612,104",
  backBandRoll: "M408,58 Q500,47 592,58",
  ventFront: [
    {
      tape: "M232,728 L241,728 L242,780 L234,780 Z",
      stitch: "M237.5,733 L238.3,776",
      tack: "M231,727 L242,727",
    },
    {
      tape: "M768,728 L759,728 L758,780 L766,780 Z",
      stitch: "M762.5,733 L761.7,776",
      tack: "M769,727 L758,727",
    },
  ],
  ventBack: [
    {
      tape: "M233,725 L242,725 L245,800 L236,800 Z",
      stitch: "M238.5,730 L240.8,796",
      tack: "M232,724 L243,724",
    },
    {
      tape: "M767,725 L758,725 L755,800 L764,800 Z",
      stitch: "M761.5,730 L759.2,796",
      tack: "M768,724 L757,724",
    },
  ],
  hemStitchFront: "M235,760 Q500,772 765,760",
  hemStitchBack: "M237,780 Q500,802 763,780",
};

/* ---------------- primitives ---------------- */

function Stitch({ d, color, w = 1.3 }: { d: string; color: string; w?: number }) {
  return (
    <path
      d={d}
      fill="none"
      stroke={color}
      strokeWidth={w}
      strokeDasharray="4.2 2.6"
      strokeLinecap="round"
    />
  );
}

function Seam({ d, color, w = 1.6 }: { d: string; color: string; w?: number }) {
  return <path d={d} fill="none" stroke={color} strokeWidth={w} strokeLinecap="round" />;
}

/**
 * Knit trim with tipping stripes running parallel to one edge.
 * stripes[0] is the stripe closest to that edge.
 */
function Tipped({
  shape,
  edge,
  base,
  stripes,
  outline,
  inset = 5,
  stripeW = 3.2,
  gap = 2.6,
}: {
  shape: string;
  edge: string;
  base: string;
  stripes?: readonly string[];
  outline: string;
  inset?: number;
  stripeW?: number;
  gap?: number;
}) {
  const id = useSvgId("tip");
  const layers: { w: number; c: string }[] = [];
  if (stripes && stripes.length) {
    let d = inset;
    const bands = stripes.map((c) => {
      const b = { from: d, to: d + stripeW, c };
      d += stripeW + gap;
      return b;
    });
    for (let i = bands.length - 1; i >= 0; i--) {
      layers.push({ w: bands[i].to * 2, c: bands[i].c });
      layers.push({ w: bands[i].from * 2, c: base });
    }
  }
  return (
    <g>
      <defs>
        <clipPath id={id}>
          <path d={shape} />
        </clipPath>
      </defs>
      <path d={shape} fill={base} />
      {layers.length > 0 && (
        <g clipPath={`url(#${id})`} fill="none" strokeLinecap="butt" strokeLinejoin="round">
          {layers.map((l, i) => (
            <path key={i} d={edge} stroke={l.c} strokeWidth={l.w} />
          ))}
        </g>
      )}
      <path d={shape} fill="none" stroke={outline} strokeWidth={1.5} strokeLinejoin="round" />
    </g>
  );
}

/* ---------------- shared garment frame ---------------- */

interface GarmentCommon {
  side?: GarmentSide;
  /** Fabric colour (hex) */
  body: string;
  /** Stitch thread colour; defaults to tone-on-tone */
  stitch?: string;
  /** Artwork on the fabric, in mm coordinates */
  children?: React.ReactNode;
  /** Unclipped overlay (callouts / dimensions), in mm coordinates */
  annotations?: React.ReactNode;
  pad?: Pad;
  /** Show only this window of the mm space (detail close-ups). Overrides pad. */
  crop?: { x: number; y: number; w: number; h: number };
  /** Fabric grain, drape shading and ground shadow. Default true. */
  realistic?: boolean;
  className?: string;
  style?: React.CSSProperties;
  title?: string;
}

function GarmentSvg({
  silhouette,
  outlinePath,
  outlineCutout,
  body,
  pad,
  crop,
  realistic,
  grain,
  className,
  style,
  title,
  children,
  construction,
  annotations,
}: {
  silhouette: string;
  outlinePath?: string;
  outlineCutout?: string;
  body: string;
  pad?: Pad;
  crop?: { x: number; y: number; w: number; h: number };
  realistic: boolean;
  grain: number;
  className?: string;
  style?: React.CSSProperties;
  title?: string;
  children?: React.ReactNode;
  construction: React.ReactNode;
  annotations?: React.ReactNode;
}) {
  const uid = useSvgId("g");
  const ids = {
    clip: `${uid}c`,
    grain: `${uid}n`,
    side: `${uid}s`,
    light: `${uid}l`,
    blur: `${uid}b`,
    ground: `${uid}g`,
  };
  const vb = crop ?? padBox(pad);
  const outline = shade(body, isDark(body) ? -0.5 : -0.42);
  return (
    <svg
      viewBox={`${vb.x} ${vb.y} ${vb.w} ${vb.h}`}
      className={className}
      style={{ display: "block", overflow: crop ? "hidden" : "visible", ...style }}
      role="img"
      aria-label={title}
    >
      <defs>
        {outlineCutout && (
          <mask id={`${uid}-outline`} maskUnits="userSpaceOnUse" x="0" y="0" width={GARMENT_W} height={GARMENT_H}>
            <rect width={GARMENT_W} height={GARMENT_H} fill="white" />
            <path d={outlineCutout} fill="black" stroke="black" strokeWidth="3" strokeLinejoin="round" />
          </mask>
        )}
        <clipPath id={ids.clip}>
          <path d={silhouette} />
        </clipPath>
        <filter
          id={ids.grain}
          x="0"
          y="0"
          width={GARMENT_W}
          height={GARMENT_H}
          filterUnits="userSpaceOnUse"
        >
          <feTurbulence
            type="fractalNoise"
            baseFrequency={grain}
            numOctaves={2}
            seed={11}
            stitchTiles="stitch"
            result="t"
          />
          {/* dark specks from the R channel, light specks from G */}
          <feColorMatrix
            in="t"
            type="matrix"
            values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  1.6 0 0 0 -0.75"
            result="dk"
          />
          <feColorMatrix
            in="t"
            type="matrix"
            values="0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0 1.6 0 0 -0.75"
            result="lt"
          />
          <feMerge>
            <feMergeNode in="dk" />
            <feMergeNode in="lt" />
          </feMerge>
        </filter>
        <linearGradient id={ids.side} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#000" stopOpacity="0.22" />
          <stop offset="0.24" stopColor="#000" stopOpacity="0.05" />
          <stop offset="0.5" stopColor="#000" stopOpacity="0" />
          <stop offset="0.76" stopColor="#000" stopOpacity="0.05" />
          <stop offset="1" stopColor="#000" stopOpacity="0.22" />
        </linearGradient>
        <radialGradient id={ids.light} cx="0.5" cy="0.3" r="0.55">
          <stop offset="0" stopColor="#fff" stopOpacity="0.12" />
          <stop offset="1" stopColor="#fff" stopOpacity="0" />
        </radialGradient>
        <filter id={ids.blur} x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="7" />
        </filter>
        <filter id={ids.ground} x="-10%" y="-10%" width="120%" height="130%">
          <feGaussianBlur stdDeviation="14" />
        </filter>
      </defs>

      {realistic && (
        <path
          d={silhouette}
          fill="#0B1620"
          opacity={0.16}
          transform="translate(0 14)"
          filter={`url(#${ids.ground})`}
        />
      )}
      <path d={silhouette} fill={body} />

      <g clipPath={`url(#${ids.clip})`}>
        {realistic && (
          <rect
            x={0}
            y={0}
            width={GARMENT_W}
            height={GARMENT_H}
            filter={`url(#${ids.grain})`}
            opacity={isDark(body) ? 0.16 : 0.14}
          />
        )}
        {children}
        {realistic && (
          <g pointerEvents="none">
            <rect x={40} y={0} width={920} height={GARMENT_H} fill={`url(#${ids.side})`} />
            <rect x={0} y={0} width={GARMENT_W} height={GARMENT_H} fill={`url(#${ids.light})`} />
            <g
              filter={`url(#${ids.blur})`}
              fill="none"
              stroke="#000"
              strokeOpacity={isDark(body) ? 0.15 : 0.06}
              strokeWidth={8}
              strokeLinecap="round"
            >
              {FOLDS.map((d, i) => (
                <path key={i} d={d} />
              ))}
            </g>
          </g>
        )}
      </g>

      {/* Custom collars also cover the shoulder outline at their outer edges. */}
      {outlinePath && <path d={outlinePath} fill="none" stroke={outline} strokeWidth={2.2} strokeLinejoin="round" mask={outlineCutout ? `url(#${uid}-outline)` : undefined} />}
      {construction}
      {!outlinePath && <path d={silhouette} fill="none" stroke={outline} strokeWidth={2.2} strokeLinejoin="round" />}
      {annotations}
    </svg>
  );
}

/* ---------------- crew-neck T-shirt ---------------- */

export interface TeeProps extends GarmentCommon {
  /** Neck rib colour (default = body) */
  rib?: string;
  /** Optional stripes on the neck rib, closest to the edge first */
  ribTipping?: readonly string[];
}

export function TeeShirt({
  side = "front",
  body,
  rib,
  ribTipping,
  stitch,
  children,
  annotations,
  pad,
  crop,
  realistic = true,
  className,
  style,
  title,
}: TeeProps) {
  const dark = isDark(body);
  const ribC = rib ?? body;
  const st = stitch ?? (dark ? shade(body, 0.28) : shade(body, -0.22));
  const seam = shade(body, dark ? -0.42 : -0.24);
  const inside = shade(body, dark ? -0.45 : -0.2);
  const ribOutline = shade(ribC, isDark(ribC) ? -0.5 : -0.42);

  const construction = (
    <g>
      <Seam d={ARMHOLE_L} color={seam} />
      <Seam d={ARMHOLE_R} color={seam} />
      <Stitch d="M83,184 L152,361" color={st} />
      <Stitch d="M917,184 L848,361" color={st} />
      <Stitch d="M237,781 Q500,792 763,781" color={st} />
      {side === "front" ? (
        <g>
          <path d={TEE_FRONT.opening} fill={inside} />
          <Tipped
            shape={TEE_FRONT.ribBack}
            edge={TEE_FRONT.ribBackEdge}
            base={shade(ribC, -0.12)}
            stripes={ribTipping}
            outline={ribOutline}
            inset={2.5}
            stripeW={2}
            gap={1.6}
          />
          <Tipped
            shape={TEE_FRONT.rib}
            edge={TEE_FRONT.ribEdge}
            base={ribC}
            stripes={ribTipping}
            outline={ribOutline}
            inset={3.5}
            stripeW={2.4}
            gap={2}
          />
          <Stitch d={TEE_FRONT.coverstitch} color={st} />
        </g>
      ) : (
        <g>
          <Tipped
            shape={TEE_BACK.rib}
            edge={TEE_BACK.ribEdge}
            base={ribC}
            stripes={ribTipping}
            outline={ribOutline}
            inset={3.5}
            stripeW={2.4}
            gap={2}
          />
          <Stitch d={TEE_BACK.coverstitch} color={st} />
        </g>
      )}
    </g>
  );

  return (
    <GarmentSvg
      silhouette={teeSilhouette(side)}
      body={body}
      pad={pad}
      crop={crop}
      realistic={realistic}
      grain={0.42}
      className={className}
      style={style}
      title={title ?? `T-shirt ${side}`}
      construction={construction}
      annotations={annotations}
    >
      {children}
    </GarmentSvg>
  );
}

/* ---------------- polo shirt ---------------- */

export interface PoloProps extends GarmentCommon {
  /** Flat-knit collar colour (default = body) */
  collar?: string;
  /** Sleeve rib band colour (default = collar) */
  cuff?: string;
  /** Tipping stripes on collar + cuffs, outermost first */
  tipping?: readonly string[];
  /** Placket colour (default = body) */
  placket?: string;
  /** Contrast inner-placket sliver */
  placketInner?: string;
  buttons?: string;
  buttonCount?: 2 | 3;
  /** Optional replacement for the standard collar/placket construction. */
  collarOverlay?: React.ReactNode;
  /** Optional edge-to-edge cuff construction, without the standard cuff borders. */
  cuffOverlay?: React.ReactNode;
}

export function PoloShirt({
  side = "front",
  body,
  collar,
  cuff,
  tipping,
  placket,
  placketInner,
  buttons,
  buttonCount = 3,
  collarOverlay,
  cuffOverlay,
  stitch,
  children,
  annotations,
  pad,
  crop,
  realistic = true,
  className,
  style,
  title,
}: PoloProps) {
  const shadowId = useSvgId("cs");
  const dark = isDark(body);
  const collarC = collar ?? body;
  const cuffC = cuff ?? collarC;
  const placketC = placket ?? body;
  const st = stitch ?? (dark ? shade(body, 0.28) : shade(body, -0.22));
  const seam = shade(body, dark ? -0.42 : -0.24);
  const inside = shade(body, dark ? -0.45 : -0.2);
  const collarOutline = shade(collarC, isDark(collarC) ? -0.5 : -0.42);
  const cuffOutline = shade(cuffC, isDark(cuffC) ? -0.5 : -0.42);
  const placketOutline = shade(placketC, isDark(placketC) ? -0.5 : -0.4);
  const btn = buttons ?? (isDark(placketC) ? shade(placketC, -0.25) : shade(placketC, -0.08));
  const btnRim = shade(btn, isDark(btn) ? 0.3 : -0.32);
  const ys = buttonCount === 2 ? [140, 196] : [126, 168, 210];
  const vents = side === "front" ? POLO.ventFront : POLO.ventBack;

  const construction = (
    <g>
      <defs>
        <filter id={shadowId} x="-20%" y="-20%" width="140%" height="160%">
          <feDropShadow dx="0" dy="2.6" stdDeviation="2.4" floodColor="#000" floodOpacity="0.3" />
        </filter>
      </defs>
      <Seam d={ARMHOLE_L} color={seam} />
      <Seam d={ARMHOLE_R} color={seam} />

      {vents.map((v, i) => (
        <g key={i}>
          <path d={v.tape} fill={shade(body, dark ? -0.12 : -0.06)} stroke={seam} strokeWidth={1} />
          <Stitch d={v.stitch} color={st} w={1.1} />
          <Seam d={v.tack} color={seam} w={3} />
        </g>
      ))}
      <Stitch d={side === "front" ? POLO.hemStitchFront : POLO.hemStitchBack} color={st} />

      {cuffOverlay ?? (
        <>
          <Tipped shape={POLO.cuffL} edge={POLO.cuffEdgeL} base={cuffC} stripes={tipping} outline={cuffOutline} />
          <Tipped shape={POLO.cuffR} edge={POLO.cuffEdgeR} base={cuffC} stripes={tipping} outline={cuffOutline} />
        </>
      )}

      {collarOverlay ? collarOverlay : side === "front" ? (
        <g>
          <path d={POLO.placket} fill={placketC} stroke={placketOutline} strokeWidth={1.4} />
          {placketInner && <path d={POLO.placketInner} fill={placketInner} />}
          <Stitch d={POLO.placketStitch} color={st} w={1.1} />
          <Stitch d={POLO.placketBox} color={st} w={1.1} />
          {ys.map((y) => (
            <path key={`h${y}`} d={`M500,${y - 8} L500,${y + 8}`} stroke={placketOutline} strokeWidth={2.2} strokeLinecap="round" />
          ))}
          {ys.map((y) => (
            <g key={`b${y}`}>
              <circle cx={500} cy={y} r={5.6} fill={btn} stroke={btnRim} strokeWidth={0.9} />
              <circle cx={498.2} cy={y} r={0.9} fill={btnRim} />
              <circle cx={501.8} cy={y} r={0.9} fill={btnRim} />
            </g>
          ))}

          <path d={POLO.opening} fill={inside} />
          <g filter={`url(#${shadowId})`}>
            <path d={POLO.backCollarFront} fill={shade(collarC, -0.14)} stroke={collarOutline} strokeWidth={1.4} />
            <Tipped shape={POLO.leafL} edge={POLO.leafEdgeL} base={collarC} stripes={tipping} outline={collarOutline} inset={5.5} />
            <Tipped shape={POLO.leafR} edge={POLO.leafEdgeR} base={collarC} stripes={tipping} outline={collarOutline} inset={5.5} />
          </g>
          <path d={POLO.rollL} fill="none" stroke="#000" strokeOpacity={0.28} strokeWidth={2.4} />
          <path d={POLO.rollR} fill="none" stroke="#000" strokeOpacity={0.28} strokeWidth={2.4} />
        </g>
      ) : (
        <g>
          <g filter={`url(#${shadowId})`}>
            <Tipped shape={POLO.backBand} edge={POLO.backBandEdge} base={collarC} stripes={tipping} outline={collarOutline} inset={5.5} />
          </g>
          <path
            d={POLO.backBandRoll}
            fill="none"
            stroke={shade(collarC, isDark(collarC) ? 0.2 : -0.14)}
            strokeWidth={1.6}
          />
        </g>
      )}
    </g>
  );

  let customOutline = poloSilhouette(side, false);
  if (cuffOverlay) {
    customOutline = customOutline.replace("L131,359", "M131,359").replace("L928,189", "M928,189");
  }
  if (!collarOverlay) {
    customOutline += ` M590,60 Q500,${side === "front" ? 30 : 70} 410,60`;
  }

  return (
    <GarmentSvg
      silhouette={poloSilhouette(side)}
      outlinePath={collarOverlay || cuffOverlay ? customOutline : undefined}
      outlineCutout={cuffOverlay ? "M72,189 L131,359 L155.2,345.8 L97.3,176.9 Z M928,189 L869,359 L844.8,345.8 L902.7,176.9 Z" : undefined}
      body={body}
      pad={pad}
      crop={crop}
      realistic={realistic}
      grain={0.55}
      className={className}
      style={style}
      title={title ?? `Polo ${side}`}
      construction={construction}
      annotations={annotations}
    >
      {children}
    </GarmentSvg>
  );
}

/* ---------------- logo + embroidery helpers ---------------- */

/** Raised-thread look for embroidered artwork (soft cast shadow). */
export function Embroidery({ children, relief = 1 }: { children: React.ReactNode; relief?: number }) {
  const id = useSvgId("emb");
  return (
    <g>
      <defs>
        <filter id={id} x="-15%" y="-15%" width="130%" height="130%">
          <feGaussianBlur in="SourceAlpha" stdDeviation={0.9 * relief} result="b" />
          <feOffset in="b" dx={0.5 * relief} dy={1.3 * relief} result="o" />
          <feFlood floodColor="#000" floodOpacity="0.5" result="f" />
          <feComposite in="f" in2="o" operator="in" result="s" />
          <feMerge>
            <feMergeNode in="s" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      <g filter={`url(#${id})`}>{children}</g>
    </g>
  );
}

/** The official FIT-HPUni logo placed by its centre, diameter in mm. */
export function FitLogo({
  cx,
  cy,
  d,
  embroidered = false,
  opacity = 1,
}: {
  cx: number;
  cy: number;
  d: number;
  embroidered?: boolean;
  opacity?: number;
}) {
  const img = (
    <image
      href={BRAND.logo}
      x={cx - d / 2}
      y={cy - d / 2}
      width={d}
      height={d}
      preserveAspectRatio="xMidYMid meet"
      opacity={opacity}
    />
  );
  return embroidered ? <Embroidery>{img}</Embroidery> : img;
}
