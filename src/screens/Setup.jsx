import { CSS_ANIMATIONS, COLORS, styles } from "../constants";
import Toggle from "../components/Toggle";

export default function Setup({ goal, setGoal, smsEnabled, setSmsEnabled, onNext }) {
  return (
    <div style={styles.page}>
      <style>{CSS_ANIMATIONS}</style>
      <div style={styles.box} className="fade">

        <div style={{ color: COLORS.TEAL, fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: 1.2, marginBottom: 8 }}>
          Step 2 of 2
        </div>
        <h1 style={{ ...styles.h1, marginBottom: 4 }}>Quick Setup</h1>
        <p style={styles.sub}>You can change these anytime from Settings.</p>

        <div style={styles.card}>
          <div style={{ marginBottom: 28 }}>
            <span style={styles.label}>Daily sprint goal</span>
            <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 8 }}>
              <input
                type="range" min={1} max={12} step={1} value={goal}
                onChange={(e) => setGoal(Number(e.target.value))}
                style={{ flex: 1, accentColor: COLORS.TEAL, height: 4 }}
              />
              <div style={{ color: COLORS.TEAL, fontWeight: 800, fontSize: 24, minWidth: 30, textAlign: "right" }}>
                {goal}
              </div>
            </div>
            <div style={{ color: COLORS.MUTED, fontSize: 12 }}>{goal * 25} focused minutes per day</div>
          </div>

          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 28 }}>
            <div>
              <div style={{ color: COLORS.LITE, fontWeight: 600, fontSize: 14, marginBottom: 3 }}>SMS study-buddy nudges</div>
              <div style={{ color: COLORS.MUTED, fontSize: 12 }}>Get a ping when you finish each sprint</div>
            </div>
            <Toggle on={smsEnabled} onToggle={() => setSmsEnabled((v) => !v)} />
          </div>

          <button style={styles.primaryBtn} onClick={onNext}>Start Focusing →</button>
        </div>

      </div>
    </div>
  );
}
