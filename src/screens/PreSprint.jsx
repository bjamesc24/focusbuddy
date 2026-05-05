import { CSS_ANIMATIONS, COLORS, MOODS, LABELS, styles } from "../constants";
import MoodPicker from "../components/MoodPicker";

export default function PreSprint({ preMood, setPreMood, task, setTask, onStart, onBack }) {
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

        <div style={styles.card}>
          <div style={{ textAlign: "center", marginBottom: 24 }}>
            <div style={{ fontSize: 44, marginBottom: 12 }}>🧠</div>
            <h2 style={{ ...styles.h1, textAlign: "center" }}>Quick check-in</h2>
            <p style={{ ...styles.sub, textAlign: "center" }}>Before you dive in.</p>
          </div>

          {/* Task label */}
          <span style={styles.label}>What are you working on?</span>
          <input
            type="text"
            value={task}
            onChange={(e) => setTask(e.target.value)}
            placeholder="e.g. Chapter 5 reading, Math homework…"
            maxLength={60}
            style={{
              display: "block", width: "100%", marginBottom: 22,
              padding: "12px 14px", borderRadius: 12, fontSize: 14,
              background: COLORS.SURF2, border: "1px solid var(--app-bord)",
              color: COLORS.LITE, outline: "none",
              boxSizing: "border-box",
            }}
          />

          <span style={styles.label}>Current mood</span>
          <MoodPicker value={preMood} onChange={setPreMood} />

          <div style={{ textAlign: "center", color: COLORS.TEAL, fontWeight: 600, marginBottom: 24, fontSize: 15 }}>
            {MOODS[preMood]} &nbsp;{LABELS[preMood]}
          </div>

          <button style={styles.primaryBtn} onClick={onStart}>
            ▶ &nbsp;Start {"\u202F"}Sprint
          </button>
        </div>

      </div>
    </div>
  );
}
