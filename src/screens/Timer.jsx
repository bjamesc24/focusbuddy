import { CSS_ANIMATIONS, COLORS, TIPS, styles } from "../constants";
import TimerRing from "../components/TimerRing";
import { useSound } from "../hooks/useSound";

const SOUND_OPTIONS = [
  { key: "off",   label: "Off",   icon: "🔇" },
  { key: "white", label: "White", icon: "📻" },
  { key: "rain",  label: "Rain",  icon: "🌧" },
  { key: "brown", label: "Brown", icon: "🌊" },
];

export default function Timer({ timeLeft, totalSecs, paused, tipIdx, onTogglePause, onCancel, onSkip }) {
  const [sound, setSound] = useSound();

  const mm = String(Math.floor(timeLeft / 60)).padStart(2, "0");
  const ss = String(timeLeft % 60).padStart(2, "0");

  return (
    <div style={styles.page}>
      <style>{CSS_ANIMATIONS}</style>
      <div style={{ ...styles.box, textAlign: "center" }} className="fade">

        {/* Status badge */}
        <div style={{
          display: "inline-flex", alignItems: "center", gap: 7,
          background: paused ? COLORS.SURF2 : "var(--app-teal-a10)",
          border:     `1px solid ${paused ? "rgba(71,85,105,0.3)" : "var(--app-teal-a30)"}`,
          borderRadius: 20, padding: "6px 16px", marginBottom: 28,
          color: paused ? COLORS.MUTED2 : COLORS.TEAL,
          fontSize: 12, fontWeight: 700, textTransform: "uppercase", letterSpacing: 1,
        }}>
          <div style={{
            width: 7, height: 7, borderRadius: "50%",
            background: paused ? COLORS.MUTED : COLORS.TEAL,
            animation: paused ? "none" : "shimmer 1.5s infinite",
          }} />
          {paused ? "Paused" : "Sprint active"}
        </div>

        <TimerRing timeLeft={timeLeft} totalSecs={totalSecs} paused={paused} mm={mm} ss={ss} />

        {/* Main controls */}
        <div style={{ display: "flex", gap: 10, justifyContent: "center", marginBottom: 16 }}>
          <button onClick={onTogglePause} style={{ ...styles.primaryBtn, width: "auto", padding: "13px 32px" }}>
            {paused ? "▶ Resume" : "⏸ Pause"}
          </button>
          <button onClick={onCancel} style={styles.ghostBtn}>Cancel</button>
        </div>

        {/* Skip to end */}
        <button
          onClick={onSkip}
          style={{
            background: "none", border: "none", color: COLORS.MUTED,
            fontSize: 12, cursor: "pointer", marginBottom: 24,
            textDecoration: "underline", textDecorationStyle: "dotted",
          }}
        >
          Skip to end (demo)
        </button>

        {/* Ambient sound */}
        <div style={{ marginBottom: 24 }}>
          <div style={{ color: COLORS.MUTED, fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: 1, marginBottom: 10 }}>
            Ambient sound
          </div>
          <div style={{ display: "flex", gap: 6, justifyContent: "center" }}>
            {SOUND_OPTIONS.map(({ key, label, icon }) => (
              <button
                key={key}
                onClick={() => setSound(key)}
                style={{
                  padding: "6px 12px", borderRadius: 20, fontSize: 12, cursor: "pointer",
                  border:     `1px solid ${key === sound ? COLORS.TEAL : "rgba(71,85,105,0.35)"}`,
                  background:  key === sound ? "var(--app-teal-a14)" : "transparent",
                  color:       key === sound ? COLORS.TEAL : COLORS.MUTED2,
                  fontWeight:  key === sound ? 700 : 400,
                }}
              >
                {icon} {label}
              </button>
            ))}
          </div>
        </div>

        {/* Rotating tip */}
        <div style={{ maxWidth: 280, margin: "0 auto", color: COLORS.MUTED2, fontSize: 13, lineHeight: 1.6, minHeight: 40 }}>
          {TIPS[tipIdx]}
        </div>

      </div>
    </div>
  );
}
