import { CSS_ANIMATIONS, COLORS, MOODS, styles } from "../constants";
import GoalRing from "../components/GoalRing";
import MoodChart from "../components/MoodChart";

function calcStreak(logs, goal) {
  if (!logs.length) return 0;
  const counts = {};
  logs.forEach((l) => {
    const d = new Date(l.end).toDateString();
    counts[d] = (counts[d] || 0) + 1;
  });
  const start = new Date();
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
  return {
    label: d.toLocaleDateString("en", { weekday: "short", month: "short", day: "numeric" }),
    count,
  };
}

function avgMoodShift(logs) {
  if (!logs.length) return null;
  const total = logs.reduce((s, l) => s + (l.postMood - l.preMood), 0);
  const avg   = total / logs.length;
  return (avg >= 0 ? "+" : "") + avg.toFixed(1);
}

function totalFocusTime(logs, sprintMins) {
  const mins = logs.length * sprintMins;
  return mins >= 60 ? `${(mins / 60).toFixed(1)}h` : `${mins}m`;
}

export default function Dashboard({ todayLogs, logs, goal, sprintMins, onStartSprint, onHistory, onSettings }) {
  const streak   = calcStreak(logs, goal);
  const bestDay  = calcBestDay(logs);
  const moodAvg  = avgMoodShift(logs);
  const focusAll = totalFocusTime(logs, sprintMins);

  return (
    <div style={{ ...styles.page, alignItems: "flex-start", justifyContent: "center", padding: "24px 20px" }}>
      <style>{CSS_ANIMATIONS}</style>
      <div style={{ width: "100%", maxWidth: 780 }} className="fade">

        {/* Header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 18 }}>
          <div style={{ color: COLORS.TEAL, fontSize: 17, fontWeight: 800 }}>⏱ FocusBuddy</div>
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <div style={{ color: COLORS.MUTED, fontSize: 12 }}>
              {new Date().toLocaleDateString("en", { weekday: "long", month: "short", day: "numeric" })}
            </div>
            <button
              onClick={onSettings}
              style={{ background: "none", border: "none", cursor: "pointer", fontSize: 18, lineHeight: 1, color: COLORS.MUTED2 }}
              title="Settings"
            >⚙️</button>
          </div>
        </div>

        {/* Two-column grid — stretch makes both columns the same height */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, alignItems: "stretch" }}>

          {/* ── LEFT COLUMN — single card, flex column, button pinned to bottom ── */}
          <div style={{
            ...styles.card,
            display: "flex",
            flexDirection: "column",
            border: todayLogs.length >= goal ? "1px solid var(--app-teal-a50)" : "1px solid var(--app-bord)",
            marginBottom: 0,
          }}>

            {/* Goal ring + today stats */}
            <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 24 }}>
              <GoalRing completed={todayLogs.length} goal={goal} />
              <div>
                <div style={{ marginBottom: 14 }}>
                  <div style={styles.label}>Focus today</div>
                  <div style={{ color: COLORS.LITE, fontSize: 24, fontWeight: 700, lineHeight: 1 }}>
                    {todayLogs.length * sprintMins}m
                  </div>
                </div>
                {streak > 0 && (
                  <div style={{ marginBottom: 12 }}>
                    <div style={styles.label}>Streak</div>
                    <div style={{ color: COLORS.LITE, fontSize: 15, fontWeight: 600 }}>
                      🔥 {streak} day{streak !== 1 ? "s" : ""}
                    </div>
                  </div>
                )}
                {bestDay && (
                  <div>
                    <div style={styles.label}>Best day</div>
                    <div style={{ color: COLORS.MUTED2, fontSize: 12, lineHeight: 1.5 }}>
                      {bestDay.label}<br />{bestDay.count} sprints
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* All-time stats — inside the card with a divider */}
            {logs.length > 0 && (
              <>
                <div style={{ borderTop: "1px solid var(--app-bord)", marginBottom: 20 }} />
                <div style={{ display: "flex", gap: 8, marginBottom: 24 }}>
                  {[
                    [focusAll,            "Total focus"],
                    [moodAvg ?? "—",      "Avg mood shift"],
                    [String(logs.length), "All sprints"],
                  ].map(([val, label]) => (
                    <div key={label} style={{
                      flex: 1,
                      background: COLORS.SURF2,
                      borderRadius: 14,
                      padding: "12px 8px",
                      textAlign: "center",
                    }}>
                      <div style={{ color: COLORS.TEAL, fontSize: 18, fontWeight: 800, lineHeight: 1 }}>{val}</div>
                      <div style={{ color: COLORS.MUTED, fontSize: 10, marginTop: 5 }}>{label}</div>
                    </div>
                  ))}
                </div>
              </>
            )}

            {/* Spacer pushes button to the bottom */}
            <div style={{ flex: 1 }} />

            <button style={styles.primaryBtn} onClick={onStartSprint}>
              ▶ &nbsp;Start Focus Sprint
            </button>
          </div>

          {/* ── RIGHT COLUMN — mood journey + chart, fills naturally ── */}
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>

            {/* Today's mood journey */}
            <div style={{ ...styles.card, marginBottom: 0 }}>
              <div style={styles.label}>Today's mood journey</div>
              {todayLogs.length === 0 ? (
                <div style={{ color: COLORS.MUTED2, fontSize: 13, padding: "10px 0" }}>
                  No sprints yet — you've got this! 💪
                </div>
              ) : (
                <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                  {todayLogs.map((l, i) => (
                    <div key={i} style={{
                      background: COLORS.SURF2, borderRadius: 12,
                      padding: "8px 12px",
                      display: "flex", alignItems: "center", gap: 6,
                    }}>
                      {l.task && (
                        <span style={{
                          color: COLORS.MUTED, fontSize: 10,
                          maxWidth: 60, overflow: "hidden",
                          textOverflow: "ellipsis", whiteSpace: "nowrap",
                        }}>
                          {l.task}
                        </span>
                      )}
                      <span style={{ fontSize: 18 }}>{MOODS[l.preMood]}</span>
                      <span style={{ color: COLORS.MUTED, fontSize: 10 }}>→</span>
                      <span style={{ fontSize: 18 }}>{MOODS[l.postMood]}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Mood chart card — flex: 1 so it stretches to fill remaining height */}
            <div style={{
              ...styles.card,
              marginBottom: 0,
              flex: 1,
              display: "flex",
              flexDirection: "column",
            }}>
              <div style={styles.label}>Recent mood trends</div>
              {logs.length > 0 ? (
                <>
                  <div style={{ flex: 1 }}>
                    <MoodChart logs={logs.slice(-10)} height={130} />
                  </div>
                  <button
                    onClick={onHistory}
                    style={{
                      display: "block", width: "100%", marginTop: 16,
                      padding: "10px", borderRadius: 12,
                      fontSize: 12, fontWeight: 600, cursor: "pointer",
                      background: "transparent", color: COLORS.MUTED2,
                      border: "1px solid var(--app-bord)",
                    }}
                  >
                    View full history →
                  </button>
                </>
              ) : (
                <div style={{ color: COLORS.MUTED, fontSize: 12, flex: 1, display: "flex", alignItems: "center" }}>
                  Your mood trends appear here after your first sprint.
                </div>
              )}
            </div>

          </div>
        </div>

        <p style={{ color: COLORS.MUTED, fontSize: 11, textAlign: "center", marginTop: 16 }}>
          Study aid · not medical advice · all data stored locally
        </p>
      </div>
    </div>
  );
}
