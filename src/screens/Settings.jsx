import { CSS_ANIMATIONS, COLORS, SPRINT_OPTIONS, BREAK_OPTIONS, styles } from "../constants";
import Toggle from "../components/Toggle";

export default function Settings({
  goal, setGoal,
  sprintMins, setSprintMins,
  breakMins, setBreakMins,
  smsEnabled, setSmsEnabled,
  theme, setTheme,
  onPurge, onBack,
}) {
  return (
    <div style={styles.page}>
      <style>{CSS_ANIMATIONS}</style>
      <div style={styles.box} className="fade">

        <button
          onClick={onBack}
          style={{ background: "none", border: "none", color: COLORS.MUTED2, cursor: "pointer", fontSize: 14, marginBottom: 20, padding: 0, display: "flex", alignItems: "center", gap: 6 }}
        >
          ← Back
        </button>

        <h1 style={{ ...styles.h1, marginBottom: 4 }}>Settings</h1>
        <p style={styles.sub}>Customize your focus experience.</p>

        <div style={styles.card}>

          {/* Daily goal */}
          <div style={{ marginBottom: 26 }}>
            <span style={styles.label}>Daily sprint goal</span>
            <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 6 }}>
              <input
                type="range" min={1} max={12} step={1} value={goal}
                onChange={(e) => setGoal(Number(e.target.value))}
                style={{ flex: 1, accentColor: COLORS.TEAL }}
              />
              <div style={{ color: COLORS.TEAL, fontWeight: 800, fontSize: 22, minWidth: 28, textAlign: "right" }}>
                {goal}
              </div>
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
                    border:      `1.5px solid ${m === sprintMins ? COLORS.TEAL : COLORS.MUTED}`,
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

          {/* Break duration */}
          <div style={{ marginBottom: 26 }}>
            <span style={styles.label}>Break duration</span>
            <div style={{ display: "flex", gap: 8 }}>
              {BREAK_OPTIONS.map((m) => (
                <button
                  key={m}
                  onClick={() => setBreakMins(m)}
                  style={{
                    flex: 1, padding: "9px 0", borderRadius: 10, cursor: "pointer",
                    border:     `1.5px solid ${m === breakMins ? COLORS.TEAL : COLORS.MUTED}`,
                    background:  m === breakMins ? "var(--app-teal-a14)" : "transparent",
                    color:       m === breakMins ? COLORS.TEAL : COLORS.MUTED2,
                    fontSize: 13, fontWeight: m === breakMins ? 700 : 400,
                  }}
                >
                  {m}m
                </button>
              ))}
            </div>
          </div>

          {/* Theme */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 22 }}>
            <div>
              <div style={{ color: COLORS.LITE, fontWeight: 600, fontSize: 14, marginBottom: 3 }}>Light mode</div>
              <div style={{ color: COLORS.MUTED, fontSize: 12 }}>Switch to a lighter colour scheme</div>
            </div>
            <Toggle on={theme === "light"} onToggle={() => setTheme((t) => (t === "dark" ? "light" : "dark"))} />
          </div>

          {/* SMS */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
            <div>
              <div style={{ color: COLORS.LITE, fontWeight: 600, fontSize: 14, marginBottom: 3 }}>SMS nudges</div>
              <div style={{ color: COLORS.MUTED, fontSize: 12 }}>Get a ping after each sprint</div>
            </div>
            <Toggle on={smsEnabled} onToggle={() => setSmsEnabled((v) => !v)} />
          </div>

          {/* Danger zone */}
          <div style={{ borderTop: "1px solid var(--app-bord)", paddingTop: 20 }}>
            <span style={styles.label}>Danger zone</span>
            <button
              onClick={() => { if (window.confirm("Delete all sprint data? This cannot be undone.")) onPurge(); }}
              style={{
                display: "block", width: "100%", padding: "13px",
                borderRadius: 14, fontSize: 14, fontWeight: 700, cursor: "pointer",
                border: "1px solid rgba(239,68,68,0.4)",
                background: "rgba(239,68,68,0.08)", color: "#F87171",
              }}
            >
              Purge all sprint data
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}
