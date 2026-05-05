import { CSS_ANIMATIONS, COLORS, styles } from "../constants";

export default function Welcome({ onNext }) {
  return (
    <div style={styles.page}>
      <style>{CSS_ANIMATIONS}</style>
      <div style={styles.box} className="fade">

        <div style={{ textAlign: "center", marginBottom: 28 }}>
          <div style={{
            width: 80, height: 80,
            background: "var(--app-primary-btn)",
            borderRadius: 24,
            display: "inline-flex", alignItems: "center", justifyContent: "center",
            fontSize: 38, marginBottom: 14,
            boxShadow: "0 20px 48px var(--app-teal-a30)",
          }}>⏱</div>
          <div style={{ color: COLORS.TEAL, fontSize: 26, fontWeight: 800, letterSpacing: -0.5 }}>FocusBuddy</div>
          <div style={{ color: COLORS.MUTED2, fontSize: 13, marginTop: 3 }}>AI-powered focus sprints for ADHD students</div>
        </div>

        <div style={styles.card}>
          <h2 style={{ ...styles.h1, textAlign: "center", marginBottom: 10 }}>
            Turn scattered minutes<br />into focused wins ✨
          </h2>
          <p style={{ ...styles.sub, textAlign: "center" }}>
            25-minute sprints, mood tracking, and an AI companion that celebrates every win.
          </p>
          <button style={styles.primaryBtn} onClick={onNext}>Get Started</button>
        </div>

        <div style={{ display: "flex", justifyContent: "center", gap: 24, marginTop: 20 }}>
          {[["⏱", "25-min sprints"], ["🧠", "Mood tracking"], ["🤖", "AI kudos"]].map(([icon, label]) => (
            <div key={label} style={{ textAlign: "center" }}>
              <div style={{ fontSize: 20, marginBottom: 4 }}>{icon}</div>
              <div style={{ color: COLORS.MUTED, fontSize: 11 }}>{label}</div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
