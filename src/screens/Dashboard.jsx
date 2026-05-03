import { CSS_ANIMATIONS, COLORS, MOODS, styles } from "../constants";

export default function Dashboard({ todayLogs, logs, goal, onStartSprint }) {
  return (
    <div style={styles.page}>
      <style>{CSS_ANIMATIONS}</style>
      <div style={styles.box} className="fade">

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
          <div style={{ color: COLORS.TEAL, fontSize: 16, fontWeight: 800 }}>⏱ FocusBuddy</div>
          <div style={{ color: COLORS.MUTED, fontSize: 12 }}>
            {new Date().toLocaleDateString("en", { weekday: "short", month: "short", day: "numeric" })}
          </div>
        </div>

        {/* Progress card */}
        <div style={{
          ...styles.card,
          border: todayLogs.length >= goal
            ? "1px solid rgba(45,212,191,0.5)"
            : `1px solid ${COLORS.BORD}`,
        }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 16 }}>
            <div>
              <div style={styles.label}>Today's sprints</div>
              <div style={{ display: "flex", alignItems: "baseline", gap: 4 }}>
                <span style={{ color: COLORS.TEAL, fontSize: 42, fontWeight: 800, lineHeight: 1 }}>
                  {todayLogs.length}
                </span>
                <span style={{ color: COLORS.MUTED, fontSize: 18 }}>/ {goal}</span>
              </div>
            </div>
            <div style={{ textAlign: "right" }}>
              <div style={styles.label}>Focus time</div>
              <div style={{ color: COLORS.LITE, fontSize: 20, fontWeight: 700 }}>
                {todayLogs.length * 25}m
              </div>
            </div>
          </div>

          {/* Progress bar */}
          <div style={{ height: 5, background: COLORS.SURF2, borderRadius: 3, overflow: "hidden", marginBottom: 20 }}>
            <div style={{
              height: "100%",
              background: "linear-gradient(90deg, #2DD4BF, #38BDF8)",
              width: `${Math.min((todayLogs.length / goal) * 100, 100)}%`,
              borderRadius: 3,
              transition: "width 0.6s ease",
            }} />
          </div>

          <button style={styles.primaryBtn} onClick={onStartSprint}>
            ▶ &nbsp;Start Focus Sprint
          </button>
        </div>

        {/* Mood history */}
        {todayLogs.length > 0 ? (
          <div style={styles.card}>
            <div style={styles.label}>Today's mood journey</div>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              {todayLogs.map((l, i) => (
                <div key={i} style={{
                  background: COLORS.SURF2, borderRadius: 12, padding: "8px 14px",
                  display: "flex", alignItems: "center", gap: 6,
                }}>
                  <span style={{ fontSize: 20 }}>{MOODS[l.preMood]}</span>
                  <span style={{ color: COLORS.MUTED, fontSize: 11 }}>→</span>
                  <span style={{ fontSize: 20 }}>{MOODS[l.postMood]}</span>
                  <span style={{ color: COLORS.MUTED, fontSize: 10, marginLeft: 2 }}>#{i + 1}</span>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div style={{ textAlign: "center", padding: "28px 0", color: COLORS.MUTED2, fontSize: 14 }}>
            No sprints yet today — you've got this! 💪
          </div>
        )}

        <p style={{ color: COLORS.MUTED, fontSize: 11, textAlign: "center", marginTop: 8 }}>
          Study aid · not medical advice · all data stored locally
        </p>

      </div>
    </div>
  );
}
