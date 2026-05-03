import { CSS_ANIMATIONS, COLORS, styles } from "../constants";

const ITEMS = [
  ["🔒", "Local-first storage", "Sprint logs and mood data stay on your device. Nothing is uploaded to any server."],
  ["📱", "Optional SMS nudges", "If you opt into buddy alerts, only an encrypted message is sent — no data stored remotely."],
  ["🗑️", "One-tap data purge", "Delete all history instantly from Settings, anytime, no questions asked."],
];

export default function Consent({ onNext }) {
  return (
    <div style={styles.page}>
      <style>{CSS_ANIMATIONS}</style>
      <div style={styles.box} className="fade">

        <div style={{ color: COLORS.TEAL, fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: 1.2, marginBottom: 8 }}>
          Step 1 of 2
        </div>
        <h1 style={{ ...styles.h1, marginBottom: 4 }}>Privacy & Consent</h1>
        <p style={styles.sub}>We believe in being upfront about your data.</p>

        <div style={styles.card}>
          {ITEMS.map(([icon, title, desc]) => (
            <div key={title} style={{ display: "flex", gap: 14, marginBottom: 22 }}>
              <div style={{
                width: 36, height: 36, borderRadius: 10,
                background: "rgba(45,212,191,0.1)",
                border: "1px solid rgba(45,212,191,0.2)",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 17, flexShrink: 0,
              }}>{icon}</div>
              <div>
                <div style={{ color: COLORS.LITE, fontWeight: 600, fontSize: 14, marginBottom: 3 }}>{title}</div>
                <div style={{ color: COLORS.MUTED2, fontSize: 12, lineHeight: 1.6 }}>{desc}</div>
              </div>
            </div>
          ))}
          <div style={{ borderTop: `1px solid ${COLORS.BORD}`, paddingTop: 20 }}>
            <button style={styles.primaryBtn} onClick={onNext}>I Agree & Continue</button>
          </div>
        </div>

      </div>
    </div>
  );
}
