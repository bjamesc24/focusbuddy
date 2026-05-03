import { COLORS } from "../constants";

const R = 88;
const CIRC = 2 * Math.PI * R;

export default function TimerRing({ timeLeft, totalSecs, paused, mm, ss }) {
  const dashOffset = CIRC * (1 - timeLeft / totalSecs);
  const elapsed = Math.round((1 - timeLeft / totalSecs) * 100);

  return (
    <div style={{ position: "relative", display: "inline-block", marginBottom: 32 }}>
      <svg width={220} height={220} style={{ transform: "rotate(-90deg)", display: "block" }}>
        <defs>
          <linearGradient id="ringGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={COLORS.TEAL} />
            <stop offset="100%" stopColor={COLORS.BLUE} />
          </linearGradient>
        </defs>
        <circle cx={110} cy={110} r={R} fill="none" stroke={COLORS.SURF2} strokeWidth={9} />
        <circle
          cx={110} cy={110} r={R} fill="none"
          stroke={paused ? COLORS.MUTED : "url(#ringGrad)"}
          strokeWidth={9}
          strokeLinecap="round"
          strokeDasharray={CIRC}
          strokeDashoffset={dashOffset}
          style={{ transition: "stroke-dashoffset 0.9s ease, stroke 0.3s" }}
        />
      </svg>

      <div style={{
        position: "absolute", top: "50%", left: "50%",
        transform: "translate(-50%, -50%)", textAlign: "center",
      }}>
        <div style={{
          color: paused ? COLORS.MUTED2 : COLORS.LITE,
          fontSize: 44,
          fontWeight: 700,
          fontFamily: '"SF Mono","Fira Code","Consolas",monospace',
          letterSpacing: 2,
          lineHeight: 1,
          transition: "color 0.3s",
        }}>
          {mm}:{ss}
        </div>
        <div style={{ color: COLORS.MUTED, fontSize: 11, marginTop: 6 }}>
          {elapsed}% elapsed
        </div>
      </div>
    </div>
  );
}
