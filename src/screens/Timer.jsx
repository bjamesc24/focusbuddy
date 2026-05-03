import { CSS_ANIMATIONS, COLORS, TIPS, styles, SPRINT_SECS } from "../constants";
import TimerRing from "../components/TimerRing";

export default function Timer({ timeLeft, paused, tipIdx, onTogglePause, onCancel }) {
  const mm = String(Math.floor(timeLeft / 60)).padStart(2, "0");
  const ss = String(timeLeft % 60).padStart(2, "0");

  return (
    <div style={styles.page}>
      <style>{CSS_ANIMATIONS}</style>
      <div style={{ ...styles.box, textAlign: "center" }} className="fade">

        {/* Status badge */}
        <div style={{
          display: "inline-flex", alignItems: "center", gap: 7,
          background: paused ? COLORS.SURF2 : "rgba(45,212,191,0.1)",
          border: `1px solid ${paused ? "rgba(71,85,105,0.3)" : "rgba(45,212,191,0.3)"}`,
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

        <TimerRing
          timeLeft={timeLeft}
          totalSecs={SPRINT_SECS}
          paused={paused}
          mm={mm}
          ss={ss}
        />

        {/* Controls */}
        <div style={{ display: "flex", gap: 10, justifyContent: "center", marginBottom: 28 }}>
          <button onClick={onTogglePause} style={{ ...styles.primaryBtn, width: "auto", padding: "13px 32px" }}>
            {paused ? "▶ Resume" : "⏸ Pause"}
          </button>
          <button onClick={onCancel} style={styles.ghostBtn}>Cancel</button>
        </div>

        {/* Rotating tip */}
        <div style={{ maxWidth: 280, margin: "0 auto", color: COLORS.MUTED2, fontSize: 13, lineHeight: 1.6, minHeight: 40 }}>
          {TIPS[tipIdx]}
        </div>

      </div>
    </div>
  );
}
