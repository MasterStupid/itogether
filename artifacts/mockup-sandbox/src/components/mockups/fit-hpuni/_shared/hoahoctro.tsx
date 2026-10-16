import type { ReactNode } from "react";
import { BoardShell } from "./BoardShell";
import { PALETTE } from "./brand";
import { Embroidery, shade } from "./garments";

/* ==================================================================
   Bản Sinh Viên · "Hoa Học Trò"
   Student edition grown from concept C (phượng) + B's "do IT" wordplay.
   Big idea: the letter I is the student; the letter T is the faculty's
   phượng tree whose canopy shelters it; the comma is a falling petal;
   the terminal prompt carries the student's own name.
   ================================================================== */

export const H = {
  deep: PALETTE.navyDeep.hex,
  navy: PALETTE.navy.hex,
  red: PALETTE.phuong.hex,
  yellow: PALETTE.nhuy.hex,
  white: PALETTE.white.hex,
  /** underbase white printed as a 40% halftone on navy deep */
  leaf: shade(PALETTE.navy.hex, 0.4),
  paper: "#F3F1EC",
  stage: "#E5E8EA",
  ink: "#16212C",
  muted: "#56616D",
};

export const MONO = "'JetBrains Mono', 'Roboto Mono', monospace";
export const SANS = "'Be Vietnam Pro', 'Inter', sans-serif";

/* ---------------- pixel renderer ---------------- */

export function Pix({
  rows,
  cell,
  x = 0,
  y = 0,
  map,
}: {
  rows: readonly string[];
  cell: number;
  x?: number;
  y?: number;
  map: Record<string, string>;
}) {
  const out: ReactNode[] = [];
  const o = cell * 0.06; // tiny overlap hides anti-alias seams between cells
  rows.forEach((row, r) => {
    let c = 0;
    while (c < row.length) {
      const ch = row[c];
      const fill = map[ch];
      if (!fill) {
        c++;
        continue;
      }
      let e = c + 1;
      while (e < row.length && row[e] === ch) e++;
      out.push(
        <rect
          key={`${r}.${c}`}
          x={x + c * cell}
          y={y + r * cell}
          width={(e - c) * cell + o}
          height={cell + o}
          fill={fill}
        />,
      );
      c = e;
    }
  });
  return <g>{out}</g>;
}

/* Delonix regia in pixels: 4 scarlet spreading petals, 1 upright white
   standard petal with red streak, yellow centre, long red stamens. */
export const F7 = [
  "..WWW..",
  "R.WRW.R",
  "RR.W.RR",
  ".RRYRR.",
  "RR.R.RR",
  "R.R.R.R",
  "..Y.Y..",
] as const;

export const F9 = [
  "...WWW...",
  "R..WRW..R",
  "RR..W..RR",
  "RRR.Y.RRR",
  ".RRRYRRR.",
  "RRR.R.RRR",
  "RR.R.R.RR",
  "R..R.R..R",
  "...Y.Y...",
] as const;

/** The comma of "IT," — a falling scarlet petal, blade up, claw as the tail. */
const COMMA = [".RR.", "RRRR", "RRRR", ".RRR", "..RR", "..R.", ".R.."];

const COLS = 37;
const ROWS = 39;

function buildHero() {
  const g: string[][] = Array.from({ length: ROWS }, () => Array<string>(COLS).fill("."));
  const set = (r: number, c: number, ch: string, force = false) => {
    if (r < 0 || c < 0 || r >= ROWS || c >= COLS) return;
    if (force || g[r][c] === ".") g[r][c] = ch;
  };
  const stamp = (pat: readonly string[], r0: number, c0: number) =>
    pat.forEach((row, r) =>
      row.split("").forEach((ch, c) => {
        if (ch !== ".") set(r0 + r, c0 + c, ch, true);
      }),
    );
  /* bipinnate frond: rachis + paired leaflets every other cell */
  const frond = (pts: [number, number][]) => {
    let k = 0;
    for (let i = 0; i < pts.length - 1; i++) {
      const [r0, c0] = pts[i];
      const [r1, c1] = pts[i + 1];
      const steps = Math.max(Math.abs(r1 - r0), Math.abs(c1 - c0));
      const dr = Math.sign(r1 - r0);
      const dc = Math.sign(c1 - c0);
      for (let s = 0; s < steps; s++) {
        const r = r0 + dr * s;
        const c = c0 + dc * s;
        set(r, c, "L");
        if (k % 2 === 0) {
          set(r + dc, c - dr, "L");
          set(r - dc, c + dr, "L");
        }
        k++;
      }
    }
    const [lr, lc] = pts[pts.length - 1];
    set(lr, lc, "L");
  };

  // canopy foliage — arches left over the "I" (the tree shelters the student)
  frond([
    [4, 10],
    [4, 6],
    [5, 5],
    [5, 1],
  ]);
  frond([
    [4, 29],
    [4, 32],
    [6, 34],
    [6, 36],
  ]);
  frond([
    [7, 9],
    [7, 30],
  ]);
  // blossoms crowning the T
  stamp(F7, 1, 9);
  stamp(F7, 0, 16);
  stamp(F7, 1, 23);
  // buds
  stamp(["RR", "R."], 2, 6);
  stamp([".R", "RR"], 2, 32);
  // petals drifting down to the comma
  stamp(["RR", "R."], 15, 26);
  stamp([".R", "RR"], 20, 29);
  stamp(["RR"], 25, 25);
  stamp(COMMA, 31, 30);

  const letters: string[][] = Array.from({ length: ROWS }, () => Array<string>(COLS).fill("."));
  const fill = (r0: number, r1: number, c0: number, c1: number) => {
    for (let r = r0; r <= r1; r++)
      for (let c = c0; c <= c1; c++) {
        letters[r][c] = "I";
        g[r][c] = ".";
      }
  };
  fill(8, 35, 0, 4); // I
  fill(8, 12, 9, 29); // T crossbar = the branch
  fill(13, 35, 17, 21); // T stem = the trunk

  return { canopy: g.map((r) => r.join("")), letters: letters.map((r) => r.join("")) };
}

const HERO = buildHero();

export type Ink = {
  letter: string;
  petal: string;
  red: string;
  yellow: string;
  leaf: string;
  text: string;
  prompt: string;
};

export const INK_DARK: Ink = {
  letter: H.white,
  petal: H.white,
  red: H.red,
  yellow: H.yellow,
  leaf: H.leaf,
  text: H.white,
  prompt: H.yellow,
};

/** Hero lockup width / height in cell units */
export const HERO_W = COLS;
export const HERO_H = 44.8;

/**
 * Back lockup. (x, y) = top-left in mm, s = pixel cell in mm.
 * Reads verbatim: "You can do" / "IT," / "we are ready to accompany".
 */
export function HeroLockup({
  x,
  y,
  s,
  user = "sinhvien",
  ink = INK_DARK,
  puff = false,
}: {
  x: number;
  y: number;
  s: number;
  user?: string;
  ink?: Ink;
  puff?: boolean;
}) {
  const gy = y + 4 * s;
  const base = gy + 40.6 * s;
  const letters = <Pix rows={HERO.letters} cell={s} x={x} y={gy} map={{ I: ink.letter }} />;
  return (
    <g>
      <text x={x} y={y + 2.4 * s} fontFamily={MONO} fontWeight={700}>
        <tspan fontSize={1.7 * s} fill={ink.prompt}>{`${user}@fit-hpuni:~$`}</tspan>
        <tspan fontSize={2.4 * s} fill={ink.text}>
          {" You can do"}
        </tspan>
      </text>
      <Pix
        rows={HERO.canopy}
        cell={s}
        x={x}
        y={gy}
        map={{ L: ink.leaf, R: ink.red, W: ink.petal, Y: ink.yellow }}
      />
      {puff ? <Embroidery relief={0.9}>{letters}</Embroidery> : letters}
      <text x={x} y={base} fontFamily={MONO} fontWeight={600} fontSize={2.2 * s} fill={ink.text}>
        we are ready to accompany
      </text>
      <rect x={x + 33.5 * s} y={base - 1.6 * s} width={1.1 * s} height={1.75 * s} fill={ink.yellow} />
    </g>
  );
}

/** Pixel phượng for the sleeve. rot = sleeve axisDeg + 90 so it stands upright when worn. */
export function SleeveBloom({
  cx,
  cy,
  cell,
  rot,
  embroidered = false,
}: {
  cx: number;
  cy: number;
  cell: number;
  rot: number;
  embroidered?: boolean;
}) {
  const w = 9 * cell;
  const art = (
    <g transform={`translate(${cx} ${cy}) rotate(${rot}) translate(${-w / 2} ${-w / 2})`}>
      <Pix rows={F9} cell={cell} map={{ R: H.red, W: H.white, Y: H.yellow }} />
    </g>
  );
  return embroidered ? <Embroidery relief={0.7}>{art}</Embroidery> : art;
}

/** Woven loop tab sewn into the side seam (drawn as an annotation, it sits outside the body). */
export function HemTab({ x, y }: { x: number; y: number }) {
  return (
    <g>
      <rect x={x} y={y} width={11} height={24} rx={1.6} fill={H.red} stroke={shade(H.red, -0.35)} strokeWidth={0.8} />
      <text
        x={x + 5.5}
        y={y + 12}
        transform={`rotate(90 ${x + 5.5} ${y + 12})`}
        textAnchor="middle"
        dominantBaseline="central"
        fontFamily={SANS}
        fontWeight={800}
        fontSize={6.4}
        letterSpacing={0.6}
        fill={H.white}
      >
        FIT
      </text>
    </g>
  );
}

/** Tagless neck print, visible inside the back neck in a tee front view. */
export function NeckPrint({ cx = 500, y = 76 }: { cx?: number; y?: number }) {
  return (
    <g>
      <Pix rows={F7} cell={1.55} x={cx - 28} y={y + 1} map={{ R: H.red, W: H.white, Y: H.yellow }} />
      <text x={cx - 14} y={y + 6.6} fontFamily={MONO} fontWeight={800} fontSize={6.2} fill={H.yellow}>
        FIT-HPUni
      </text>
      <text x={cx - 14} y={y + 13} fontFamily={MONO} fontWeight={600} fontSize={4} fill="#DCE3EA">
        L · 100% COTTON
      </text>
    </g>
  );
}

/** Numbered callout on a garment view (mm space). */
export function Marker({ x, y, n }: { x: number; y: number; n: number }) {
  return (
    <g>
      <circle cx={x} cy={y} r={21} fill={H.red} stroke={H.white} strokeWidth={4} />
      <text
        x={x}
        y={y + 1}
        textAnchor="middle"
        dominantBaseline="central"
        fontFamily={SANS}
        fontWeight={800}
        fontSize={24}
        fill={H.white}
      >
        {n}
      </text>
    </g>
  );
}

/* ---------------- board building blocks ---------------- */

export function Intro({
  eyebrow,
  title,
  sub,
  minis,
}: {
  eyebrow: string;
  title: string;
  sub: string;
  minis: { label: string; node: ReactNode }[];
}) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", height: 84, flexShrink: 0 }}>
      <div>
        <div style={{ color: H.red, fontSize: 11, fontWeight: 800, letterSpacing: "0.14em" }}>{eyebrow}</div>
        <h1 style={{ margin: "5px 0 4px", fontSize: 32, lineHeight: 1.1, fontWeight: 800, letterSpacing: "-0.02em", color: H.deep }}>
          {title}
        </h1>
        <div style={{ fontSize: 13, color: H.muted }}>{sub}</div>
      </div>
      <div style={{ display: "flex", alignItems: "flex-end", gap: 10 }}>
        <div style={{ fontSize: 11, color: H.muted, textAlign: "right", lineHeight: 1.45, paddingBottom: 18 }}>
          MÀU THÂN
          <br />
          KHÁC
        </div>
        {minis.map((m) => (
          <div key={m.label} style={{ textAlign: "center" }}>
            <div style={{ width: 76, height: 66, background: H.stage, display: "grid", placeItems: "center" }}>{m.node}</div>
            <div style={{ fontSize: 11, marginTop: 3, color: H.ink }}>{m.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function View({ label, note, children }: { label: string; note: string; children: ReactNode }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", minWidth: 0 }}>
      <div style={{ height: 428, display: "flex", alignItems: "center", justifyContent: "center" }}>{children}</div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          borderTop: "1px solid #1F334926",
          margin: "0 22px",
          padding: "8px 0 0",
          fontSize: 11,
        }}
      >
        <strong style={{ letterSpacing: "0.08em", color: H.deep }}>{label}</strong>
        <span style={{ color: H.muted }}>{note}</span>
      </div>
    </div>
  );
}

export function Stage({
  front,
  back,
  frontNote,
  backNote,
}: {
  front: ReactNode;
  back: ReactNode;
  frontNote: string;
  backNote: string;
}) {
  return (
    <div
      style={{
        position: "relative",
        marginTop: 10,
        height: 470,
        flexShrink: 0,
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        background: H.stage,
        backgroundImage:
          "linear-gradient(rgba(31,51,73,0.045) 1px, transparent 1px), linear-gradient(90deg, rgba(31,51,73,0.045) 1px, transparent 1px)",
        backgroundSize: "14px 14px",
      }}
    >
      <View label="01 / MẶT TRƯỚC" note={frontNote}>
        {front}
      </View>
      <View label="02 / MẶT SAU" note={backNote}>
        {back}
      </View>
      <div
        style={{
          position: "absolute",
          top: 14,
          left: 16,
          transform: "rotate(-4deg)",
          background: H.yellow,
          color: H.deep,
          padding: "7px 12px 8px",
          clipPath:
            "polygon(0 5px, 5px 5px, 5px 0, calc(100% - 5px) 0, calc(100% - 5px) 5px, 100% 5px, 100% calc(100% - 5px), calc(100% - 5px) calc(100% - 5px), calc(100% - 5px) 100%, 5px 100%, 5px calc(100% - 5px), 0 calc(100% - 5px))",
        }}
      >
        <div style={{ fontSize: 13, fontWeight: 800, letterSpacing: "0.06em" }}>BẢN SINH VIÊN</div>
        <div style={{ fontFamily: MONO, fontSize: 11, fontWeight: 600, marginTop: 1 }}>I = bạn · T = cây phượng</div>
      </div>
    </div>
  );
}

export function Loupe({ n, title, note, children }: { n: number; title: string; note: string; children: ReactNode }) {
  return (
    <div style={{ minWidth: 0 }}>
      <div style={{ height: 128, overflow: "hidden", background: H.stage, boxShadow: "inset 0 0 0 1px rgba(31,51,73,0.12)" }}>
        {children}
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 7, marginTop: 8 }}>
        <span
          style={{
            width: 19,
            height: 19,
            flexShrink: 0,
            display: "grid",
            placeItems: "center",
            background: H.red,
            color: H.white,
            fontFamily: "'VT323', monospace",
            fontSize: 19,
            lineHeight: 1,
          }}
        >
          {n}
        </span>
        <span style={{ fontSize: 12.5, fontWeight: 700, color: H.deep, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
          {title}
        </span>
      </div>
      <div style={{ fontSize: 11, lineHeight: 1.5, color: H.muted, marginTop: 3 }}>{note}</div>
    </div>
  );
}

export function Loupes({ children }: { children: ReactNode }) {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(4, minmax(0, 1fr))", gap: 12, marginTop: 14, flexShrink: 0 }}>
      {children}
    </div>
  );
}

export function Idea() {
  return (
    <div style={{ marginTop: "auto", borderLeft: `3px solid ${H.red}`, paddingLeft: 12, fontSize: 12, lineHeight: 1.6, color: H.ink }}>
      <strong style={{ color: H.deep }}>Ý tưởng · </strong>
      Chữ <strong>I</strong> là bạn. Chữ <strong>T</strong> là cây phượng của khoa, tán rộng che chở: “we are ready to accompany”.
      Dấu phẩy là cánh hoa rơi; dòng lệnh mang tên bạn.
    </div>
  );
}

const SWATCHES = [
  { hex: H.deep, name: "Xanh than" },
  { hex: H.red, name: "Đỏ phượng" },
  { hex: H.yellow, name: "Vàng nhụy" },
  { hex: H.white, name: "Trắng" },
];

export function Rail({
  heading,
  rows,
  tradeoff,
}: {
  heading: string;
  rows: [string, string][];
  tradeoff: string;
}) {
  return (
    <aside style={{ background: H.deep, color: H.white, padding: "18px 22px 18px", display: "flex", flexDirection: "column", minHeight: 0 }}>
      <div style={{ fontSize: 11, letterSpacing: "0.14em", color: "#C5D0DA" }}>THÔNG SỐ ĐỀ XUẤT · SIZE L</div>
      <h2 style={{ fontSize: 19, lineHeight: 1.3, fontWeight: 750, margin: "7px 0 9px" }}>{heading}</h2>
      {rows.map(([k, v]) => (
        <div key={k} style={{ padding: "8px 0", borderTop: "1px solid rgba(255,255,255,0.14)" }}>
          <div style={{ fontSize: 12, fontWeight: 700, marginBottom: 2 }}>{k}</div>
          <div style={{ fontSize: 11, lineHeight: 1.52, color: "#D3DCE4" }}>{v}</div>
        </div>
      ))}
      <div style={{ borderTop: "1px solid rgba(255,255,255,0.14)", paddingTop: 10 }}>
        <div style={{ display: "flex", gap: 8 }}>
          {SWATCHES.map((s) => (
            <div key={s.hex} style={{ flex: 1 }}>
              <div style={{ height: 16, background: s.hex, boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.3)" }} />
              <div style={{ fontSize: 11, marginTop: 4 }}>{s.hex}</div>
              <div style={{ fontSize: 11, color: "#AFBCC8" }}>{s.name}</div>
            </div>
          ))}
        </div>
        <div style={{ fontSize: 11, lineHeight: 1.5, color: "#AFBCC8", marginTop: 6 }}>
          Đỏ: PANTONE 17-1664 TCX Poppy Red (tham khảo). Chốt màu bằng lab dip.
        </div>
      </div>
      <div style={{ marginTop: "auto", display: "grid", gap: 8 }}>
        <div style={{ background: "rgba(255,255,255,0.06)", borderLeft: `3px solid ${H.red}`, padding: "8px 11px", fontSize: 11, lineHeight: 1.52 }}>
          <strong>Đánh đổi. </strong>
          {tradeoff}
        </div>
        <div style={{ background: "rgba(255,255,255,0.06)", borderLeft: `3px solid ${H.yellow}`, padding: "8px 11px", fontSize: 11, lineHeight: 1.52 }}>
          <strong>Kiểm chứng trước khi chốt. </strong>
          Đăng các phương án lên nhóm sinh viên của khoa để bình chọn; may 5 áo mẫu cho ban cán sự lớp mặc thử một tuần.
        </div>
      </div>
    </aside>
  );
}

export function SvBoard({
  garment,
  intro,
  stage,
  loupes,
  rail,
}: {
  garment: string;
  intro: ReactNode;
  stage: ReactNode;
  loupes: ReactNode;
  rail: ReactNode;
}) {
  return (
    <BoardShell code="SV" concept="Hoa Học Trò" garment={garment} accent={H.red}>
      <div
        style={{
          height: "100%",
          display: "grid",
          gridTemplateColumns: "minmax(0, 1fr) 352px",
          background: H.paper,
          color: H.ink,
          fontFamily: SANS,
        }}
      >
        <div style={{ padding: "14px 26px 14px 32px", display: "flex", flexDirection: "column", minHeight: 0, minWidth: 0 }}>
          {intro}
          {stage}
          {loupes}
          <Idea />
        </div>
        {rail}
      </div>
    </BoardShell>
  );
}
