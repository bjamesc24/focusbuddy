import { CSS_ANIMATIONS, COLORS, MOODS, LABELS, styles } from "../constants";
import MoodPicker from "../components/MoodPicker";

export default function PostSprint({ preMood, postMood, setPostMood, onLog }) {
  return (
    <div style={styles.page}>
      <style>{CSS_ANIMATIONS}</style>
      <div style={styles.box} className="pop">

        <div style={{ ...styles.card, textAlign: "center", marginBottom: 12, border: "1px solid var(--app-teal-a35)" }}>
          <div style={{ fontSize: 52, marginBottom: 10 }}>🎉</div>
          <h2 style={{ ...styles.h1, textAlign: "center" }}>Sprint complete!</h2>
          <p style={{ ...styles.sub, textAlign: "center" }}>
            Take a 5-minute break — stretch, breathe, look away from the screen.
          </p>
        </div>

        <div style={styles.card}>
          <div style={{ textAlign: "center", marginBottom: 20 }}>
            <span style={styles.label}>How do you feel now?</span>
            <div style={{ color: COLORS.MUTED2, fontSize: 13, marginTop: -8, marginBottom: 16 }}>
              You started at &nbsp;{MOODS[preMood]} {LABELS[preMood]}
            </div>
          </div>
          <MoodPicker value={postMood} onChange={setPostMood} />
          <div style={{ textAlign: "center", color: COLORS.TEAL, fontWeight: 600, marginBottom: 24, fontSize: 15 }}>
            {MOODS[postMood]} &nbsp;{LABELS[postMood]}
          </div>
          <button style={styles.primaryBtn} onClick={onLog}>
            Log Sprint &amp; Get AI Kudos →
          </button>
        </div>

      </div>
    </div>
  );
}
