import { COLORS } from "../constants";

const SIZE = 130;
const R    = 52;
const CIRC = 2 * Math.PI * R;

export default function GoalRing({ completed, goal }) {
  const pct    = Math.min(completed / Math.max(goal, 1), 1);
  const offset = CIRC * (1 - pct);

  return (
    <div style={{ position: "relative", display: "inline-flex", alignItems: "center", justifyContent: "center" }}>
      <svg width={SIZE} height={SIZE} style={{ transform: "rotate(-90deg)" }}>
        <defs>
          <linearGradient id="goalGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%"   stopColor={COLORS.TEAL} />
            <stop offset="100%" stopColor={COLORS.BLUE} />
          </linearGradient>
        </defs>
        <circle cx={SIZE / 2} cy={SIZE / 2} r={R} fill="none" stroke={COLORS.SURF2} strokeWidth={11} />
        <circle
          cx={SIZE / 2} cy={SIZE / 2} r={R} fill="none"
          stroke="url(#goalGrad)" strokeWidth={11}
          strokeLinecap="round"
          strokeDasharray={CIRC}
          strokeDashoffset={offset}
          style={{ transition: "stroke-dashoffset 0.6s ease" }}
        />
      </svg>

      <div style={{ position: "absolute", textAlign: "center", pointerEvents: "none" }}>
        <div style={{ color: COLORS.TEAL, fontSize: 30, fontWeight: 800, lineHeight: 1 }}>
          {completed}
        </div>
        <div style={{ color: COLORS.MUTED, fontSize: 11, marginTop: 3 }}>/ {goal}</div>
      </div>
    </div>
  );
}
