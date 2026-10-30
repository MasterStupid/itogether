/**
 * Border of the welcome letter, shared by the sealed envelope and the opened letter so
 * both always show the same frame line and corner ornaments.
 * Coordinates are on the envelope face (330 × 213); 1 unit = 1 px at full size.
 */
const FACE = { width: 330, height: 213 };
const FRAME = { inset: 9, radius: 2, color: "#c8b59f", width: 0.8 };
const ORNAMENT_COLOR = "#b99d80";

function CornerOrnaments() {
  return (
    <>
      <path d="M18 25h24M18 29h15M288 25h24M297 29h15M18 184h34M278 184h34" stroke={ORNAMENT_COLOR} strokeWidth="1" />
      <path d="M19 176c7-8 15-8 22-2m-22 6c8-7 15-7 22-1m238-3c7-8 15-8 22-2m-22 6c8-7 15-7 22-1" stroke={ORNAMENT_COLOR} strokeWidth=".7" />
    </>
  );
}

/** Border printed on the envelope face; render inside an SVG with viewBox "0 0 330 213". */
export function EnvelopeBorder() {
  return (
    <>
      <rect
        x={FRAME.inset}
        y={FRAME.inset}
        width={FACE.width - FRAME.inset * 2}
        height={FACE.height - FRAME.inset * 2}
        rx={FRAME.radius}
        stroke={FRAME.color}
        strokeWidth={FRAME.width}
      />
      <CornerOrnaments />
    </>
  );
}

/* Each corner of the letter shows the matching corner of the envelope face at 1:1 scale. */
const CORNER_WIDTH = 60;
const TOP_HEIGHT = 40;
const BOTTOM_HEIGHT = 50;
const CORNERS = [
  { position: "tl", x: 0, y: 0, height: TOP_HEIGHT },
  { position: "tr", x: FACE.width - CORNER_WIDTH, y: 0, height: TOP_HEIGHT },
  { position: "bl", x: 0, y: FACE.height - BOTTOM_HEIGHT, height: BOTTOM_HEIGHT },
  { position: "br", x: FACE.width - CORNER_WIDTH, y: FACE.height - BOTTOM_HEIGHT, height: BOTTOM_HEIGHT },
] as const;

/** The same border on the opened letter, which can be any size. */
export function LetterBorder() {
  const span = `calc(100% - ${FRAME.inset * 2}px)`;
  return (
    <div className="welcome-border" aria-hidden="true">
      <svg
        className="welcome-border__frame"
        style={{ left: FRAME.inset, top: FRAME.inset, width: span, height: span }}
        fill="none"
      >
        <rect width="100%" height="100%" rx={FRAME.radius} stroke={FRAME.color} strokeWidth={FRAME.width} />
      </svg>
      {CORNERS.map(({ position, x, y, height }) => (
        <svg
          key={position}
          className={`welcome-border__corner welcome-border__corner--${position}`}
          width={CORNER_WIDTH}
          height={height}
          viewBox={`${x} ${y} ${CORNER_WIDTH} ${height}`}
          fill="none"
        >
          <CornerOrnaments />
        </svg>
      ))}
    </div>
  );
}
