import { CSS_ANIMATIONS, COLORS, SPRINT_OPTIONS, styles } from "../constants";
import Toggle from "../components/Toggle";

export default function Setup({ goal, setGoal, sprintMins, setSprintMins, smsEnabled, setSmsEnabled, onNext }) {
  return (
    <div style={styles.page}>
      <style>{CSS_ANIMATIONS}</style>
      <div style={styles.box} className="fade">

        <div style={{ color: COLORS.TEAL, fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: 1.2, marginBottom: 8 }}>Step 2 of 2</div>
        <h1 style={{ ...styles.h1, marginBottom: 4 }}>Quick Setup</h1>
        <p style={styles.sub}>You can change these anytime in Settings.</p>

        <div style={styles.card}>
          {/* Daily goal */}
          <div style={{ marginBottom: 26 }}>
            <span style={styles.label}>Daily sprint goal</span>
            <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 6 }}>
              <input
                type="range" min={1} max={12} step={1} value={goal}
                onChange={(e) => setGoal(Number(e.target.value))}
                style={{ flex: 1, accentColor: COLORS.TEAL, height: 4 }}
              />
              <div style={{ color: COLORS.TEAL, fontWeight: 800, fontSize: 24, minWidth: 30, textAlign: "right" }}>{goal}</div>
            </div>
            <div style={{ color: COLORS.MUTED, fontSize: 12 }}>{goal * sprintMins} focused minutes per day</div>
          </div>

          {/* Sprint duration */}
          <div style={{ marginBottom: 26 }}>
            <span style={styles.label}>Sprint duration</span>
            <div style={{ display: "flex", gap: 8 }}>
              {SPRINT_OPTIONS.map((m) => (
                <button
                  key={m}
                  onClick={() => setSprintMins(m)}
                  style={{
                    flex: 1, padding: "9px 0", borderRadius: 10, cursor: "pointer",
                    border:     `1.5px solid ${m === sprintMins ? COLORS.TEAL : COLORS.MUTED}`,
                    background:  m === sprintMins ? "var(--app-teal-a14)" : "transparent",
                    color:       m === sprintMins ? COLORS.TEAL : COLORS.MUTED2,
                    fontSize: 13, fontWeight: m === sprintMins ? 700 : 400,
                  }}
                >
                  {m}m
                </button>
              ))}
            </div>
          </div>

          {/* SMS */}
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
