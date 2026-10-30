import { useId } from "react";

/**
 * Border of the welcome letter, shared by the sealed envelope and the opened letter so
 * both always show the same frame: an airmail band (navy and gold stripes) around the
 * edge plus a thin gold rule inside it. All sizes are in px (1 envelope unit = 1 px).
 */
const BAND = { width: 8, navy: "#1f3349", gold: "#c39a5f", gap: "#fbf8f2" };
const RULE = { inset: 14, color: "#c39a5f", width: 0.9 };
const STRIPE = { colour: 11, gap: 5 };
const PERIOD = (STRIPE.colour + STRIPE.gap) * 2;

function useSafeId(prefix: string) {
  return `${prefix}-${useId().replace(/[^a-zA-Z0-9_-]/g, "")}`;
}

function AirmailStripes({ id }: { id: string }) {
  return (
    <defs>
      <pattern id={id} width={PERIOD} height={PERIOD} patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
        <rect width={PERIOD} height={PERIOD} fill={BAND.gap} />
        <rect width={STRIPE.colour} height={PERIOD} fill={BAND.navy} />
        <rect x={STRIPE.colour + STRIPE.gap} width={STRIPE.colour} height={PERIOD} fill={BAND.gold} />
      </pattern>
    </defs>
  );
}

/** Border printed on the envelope face; render inside an SVG with viewBox "0 0 330 213". */
export function EnvelopeBorder() {
  const stripes = useSafeId("envelope-stripes");
  const face = { width: 330, height: 213 };
  return (
    <>
      <AirmailStripes id={stripes} />
      <rect
        x={BAND.width / 2}
        y={BAND.width / 2}
        width={face.width - BAND.width}
        height={face.height - BAND.width}
        stroke={`url(#${stripes})`}
        strokeWidth={BAND.width}
      />
      <rect
        x={RULE.inset}
        y={RULE.inset}
        width={face.width - RULE.inset * 2}
        height={face.height - RULE.inset * 2}
        rx="1.5"
        stroke={RULE.color}
        strokeWidth={RULE.width}
      />
    </>
  );
}

/** The same border on the opened letter, which can be any size. */
export function LetterBorder() {
  const stripes = useSafeId("letter-stripes");
  const inset = (amount: number) => ({
    left: amount,
    top: amount,
    width: `calc(100% - ${amount * 2}px)`,
    height: `calc(100% - ${amount * 2}px)`,
  });
  return (
    <div className="welcome-border" aria-hidden="true">
      <svg style={inset(BAND.width / 2)} fill="none">
        <AirmailStripes id={stripes} />
        <rect width="100%" height="100%" stroke={`url(#${stripes})`} strokeWidth={BAND.width} />
      </svg>
      <svg style={inset(RULE.inset)} fill="none">
        <rect width="100%" height="100%" rx="1.5" stroke={RULE.color} strokeWidth={RULE.width} />
      </svg>
    </div>
  );
}
