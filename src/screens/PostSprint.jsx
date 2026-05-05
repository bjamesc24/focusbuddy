import { useState, useEffect, useRef } from "react";
import { CSS_ANIMATIONS, COLORS, MOODS, LABELS, styles } from "../constants";
import MoodPicker from "../components/MoodPicker";

export default function PostSprint({ preMood, postMood, setPostMood, breakSecs, onLog }) {
  const [timeLeft, setTimeLeft] = useState(breakSecs);
  const [breakDone, setBreakDone] = useState(false);
  const tickRef = useRef(null);

  useEffect(() => {
    tickRef.current = setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 1) {
          clearInterval(tickRef.current);
          setBreakDone(true);
          return 0;
        }
        return t - 1;
      });
    }, 1000);
    return () => clearInterval(tickRef.current);
  }, []);

  const skipBreak = () => {
    clearInterval(tickRef.current);
    setTimeLeft(0);
    setBreakDone(true);
  };

  const mm = String(Math.floor(timeLeft / 60)).padStart(2, "0");
  const ss = String(timeLeft % 60).padStart(2, "0");
  const pct = 1 - timeLeft / breakSecs;

  return (
    <div style={styles.page}>
      <style>{CSS_ANIMATIONS}</style>
      <div style={styles.box} className="pop">

        {/* Break timer card */}
        <div style={{
          ...styles.card,
          marginBottom: 12,
          border: breakDone ? "1px solid var(--app-teal-a35)" : "1px solid var(--app-bord)",
          textAlign: "center",
          transition: "border-color 0.4s ease",
        }}>
          <div style={{ fontSize: 44, marginBottom: 10 }}>
            {breakDone ? "🎉" : "☕"}
          </div>

          <h2 style={{ ...styles.h1, textAlign: "center", marginBottom: 6 }}>
            {breakDone ? "Sprint complete!" : "Take a break"}
          </h2>

          {!breakDone ? (
            <>
              {/* Progress bar */}
              <div style={{ height: 4, background: COLORS.SURF2, borderRadius: 2, margin: "14px 0 10px", overflow: "hidden" }}>
                <div style={{
                  height: "100%",
                  background: "linear-gradient(90deg, var(--app-teal), var(--app-blue))",
                  width: `${pct * 100}%`,
                  borderRadius: 2,
                  transition: "width 0.9s ease",
                }} />
              </div>

              <div style={{
                color: COLORS.TEAL,
                fontSize: 32,
                fontWeight: 700,
                fontFamily: '"SF Mono","Fira Code","Consolas",monospace',
                letterSpacing: 2,
                marginBottom: 6,
              }}>
                {mm}:{ss}
              </div>

              <p style={{ color: COLORS.MUTED2, fontSize: 13, margin: "0 0 16px" }}>
                Stand up, stretch, look away from the screen.
              </p>

              <button
                onClick={skipBreak}
                style={{
                  background: "none", border: "none",
                  color: COLORS.MUTED, fontSize: 12, cursor: "pointer",
                  textDecoration: "underline", textDecorationStyle: "dotted",
                }}
              >
                Skip break
              </button>
            </>
          ) : (
            <p style={{ ...styles.sub, textAlign: "center", marginBottom: 0 }}>
              How are you feeling now?
            </p>
          )}
        </div>

        {/* Mood check card */}
        <div style={{
          ...styles.card,
          opacity: breakDone ? 1 : 0.45,
          transition: "opacity 0.4s ease",
          pointerEvents: breakDone ? "auto" : "none",
        }}>
          <div style={{ textAlign: "center", marginBottom: 16 }}>
            <span style={styles.label}>Post-sprint mood</span>
            <div style={{ color: COLORS.MUTED2, fontSize: 13, marginTop: -6, marginBottom: 12 }}>
              You started at &nbsp;{MOODS[preMood]} {LABELS[preMood]}
            </div>
          </div>

          <MoodPicker value={postMood} onChange={setPostMood} />

          <div style={{ textAlign: "center", color: COLORS.TEAL, fontWeight: 600, marginBottom: 20, fontSize: 15 }}>
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
