import { COLORS } from "../constants";

const MAX = 20;
const VB_W = 200;
const VB_H = 80;
const AREA_H = VB_H - 14;

export default function MoodChart({ logs, height = 140 }) {
  if (!logs.length) return (
    <div style={{ textAlign: "center", padding: "28px 0", color: COLORS.MUTED2, fontSize: 13 }}>
      Complete sprints to see your mood trends.
    </div>
  );

  const display = logs.slice(-MAX);
  const count   = display.length;
  const bw      = VB_W / count;
  const mh      = (m) => (m / 4) * AREA_H;

  return (
    <div>
      <svg
        viewBox={`0 0 ${VB_W} ${VB_H}`}
        style={{ width: "100%", height, display: "block" }}
        preserveAspectRatio="none"
      >
        {/* guide lines */}
        {[1, 2, 3].map((m) => (
          <line
            key={m}
            x1={0} y1={AREA_H - mh(m)} x2={VB_W} y2={AREA_H - mh(m)}
            stroke={COLORS.MUTED} strokeWidth="0.3" opacity="0.25" strokeDasharray="2,2"
          />
        ))}

        {display.map((l, i) => {
          const x    = i * bw;
          const preH = mh(l.preMood);
          const posH = mh(l.postMood);
          return (
            <g key={i}>
              <rect
                x={x + bw * 0.08} y={AREA_H - preH}
                width={bw * 0.38} height={Math.max(preH, 1.5)}
                rx="1" fill={COLORS.MUTED} opacity="0.45"
              />
              <rect
                x={x + bw * 0.52} y={AREA_H - posH}
                width={bw * 0.38} height={Math.max(posH, 1.5)}
                rx="1" fill={COLORS.TEAL} opacity="0.85"
              />
              {count <= 12 && (
                <text
                  x={x + bw / 2} y={VB_H - 2}
                  textAnchor="middle" fontSize="5"
                  fill={COLORS.MUTED}
                >
                  {i + 1}
                </text>
              )}
            </g>
          );
        })}
      </svg>

      <div style={{ display: "flex", gap: 20, justifyContent: "center", marginTop: 10 }}>
        {[
          [COLORS.MUTED, "0.45", "Before"],
          [COLORS.TEAL,  "1",    "After"],
        ].map(([color, opacity, label]) => (
          <div key={label} style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <div style={{ width: 10, height: 10, background: color, borderRadius: 2, opacity }} />
            <span style={{ color: COLORS.MUTED2, fontSize: 11 }}>{label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
