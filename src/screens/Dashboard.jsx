import { CSS_ANIMATIONS, COLORS, MOODS, styles } from "../constants";
import GoalRing from "../components/GoalRing";

// ── Helper functions ──────────────────────────────────────────────────────
function calcStreak(logs, goal) {
  if (!logs.length) return 0;
  const counts = {};
  logs.forEach((l) => {
    const d = new Date(l.end).toDateString();
    counts[d] = (counts[d] || 0) + 1;
  });
  const start = new Date();
  // if today not yet complete, start streak check from yesterday
  if (!counts[start.toDateString()] || counts[start.toDateString()] < goal) {
    start.setDate(start.getDate() - 1);
  }
  let streak = 0;
  const check = new Date(start);
  while (counts[check.toDateString()] >= goal) {
    streak++;
    check.setDate(check.getDate() - 1);
  }
  return streak;
}

function calcBestDay(logs) {
  if (!logs.length) return null;
  const counts = {};
  logs.forEach((l) => {
    const d = new Date(l.end).toDateString();
    counts[d] = (counts[d] || 0) + 1;
  });
  const [date, count] = Object.entries(counts).sort((a, b) => b[1] - a[1])[0];
  const d = new Date(date);
  return { label: d.toLocaleDateString("en", { weekday: "short", month: "short", day: "numeric" }), count };
}

export default function Dashboard({ todayLogs, logs, goal, sprintMins, onStartSprint, onHistory, onSettings }) {
  const streak  = calcStreak(logs, goal);
  const bestDay = calcBestDay(logs);

  return (
    <div style={styles.page}>
      <style>{CSS_ANIMATIONS}</style>
      <div style={styles.box} className="fade">

        {/* Header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
          <div style={{ color: COLORS.TEAL, fontSize: 16, fontWeight: 800 }}>⏱ FocusBuddy</div>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{ color: COLORS.MUTED, fontSize: 12 }}>
              {new Date().toLocaleDateString("en", { weekday: "short", month: "short", day: "numeric" })}
            </div>
            <button
              onClick={onSettings}
              style={{ background: "none", border: "none", cursor: "pointer", fontSize: 18, lineHeight: 1, color: COLORS.MUTED2 }}
              title="Settings"
            >
              ⚙️
            </button>
          </div>
        </div>

        {/* Main progress card */}
        <div style={{
          ...styles.card,
          border: todayLogs.length >= goal ? "1px solid var(--app-teal-a50)" : "1px solid var(--app-bord)",
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 20, marginBottom: 20 }}>

            {/* Goal ring */}
            <GoalRing completed={todayLogs.length} goal={goal} />

            {/* Stats */}
            <div style={{ flex: 1 }}>
              <div style={{ marginBottom: 14 }}>
                <div style={styles.label}>Focus time today</div>
                <div style={{ color: COLORS.LITE, fontSize: 22, fontWeight: 700, lineHeight: 1 }}>
                  {todayLogs.length * sprintMins}m
                </div>
              </div>

              {streak > 0 && (
                <div style={{ marginBottom: 14 }}>
                  <div style={styles.label}>Streak</div>
                  <div style={{ color: COLORS.LITE, fontSize: 15, fontWeight: 600 }}>
                    🔥 {streak} day{streak !== 1 ? "s" : ""}
                  </div>
                </div>
              )}

              {bestDay && (
                <div>
                  <div style={styles.label}>Best day</div>
                  <div style={{ color: COLORS.MUTED2, fontSize: 12 }}>
                    {bestDay.label} · {bestDay.count} sprints
                  </div>
                </div>
              )}
            </div>
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
                  {l.task && (
                    <span style={{ color: COLORS.MUTED, fontSize: 10, maxWidth: 80, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                      {l.task}
                    </span>
                  )}
                  <span style={{ fontSize: 18 }}>{MOODS[l.preMood]}</span>
                  <span style={{ color: COLORS.MUTED, fontSize: 10 }}>→</span>
                  <span style={{ fontSize: 18 }}>{MOODS[l.postMood]}</span>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div style={{ textAlign: "center", padding: "20px 0", color: COLORS.MUTED2, fontSize: 14 }}>
            No sprints yet today — you've got this! 💪
          </div>
        )}

        {/* History link */}
        <button
          onClick={onHistory}
          style={{
            display: "block", width: "100%", padding: "12px",
            borderRadius: 14, fontSize: 13, fontWeight: 600, cursor: "pointer",
            background: "transparent", color: COLORS.MUTED2,
            border: "1px solid var(--app-bord)", marginBottom: 8,
          }}
        >
          View full history →
        </button>

        <p style={{ color: COLORS.MUTED, fontSize: 11, textAlign: "center", marginTop: 4 }}>
          Study aid · not medical advice · all data stored locally
        </p>

      </div>
    </div>
  );
}
