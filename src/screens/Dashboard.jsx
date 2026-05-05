import { useState } from "react";
import { CSS_ANIMATIONS, COLORS, MOODS, LABELS, styles } from "../constants";
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
  const avg = logs.reduce((s, l) => s + (l.postMood - l.preMood), 0) / logs.length;
  return (avg >= 0 ? "+" : "") + avg.toFixed(1);
}

function totalFocusTime(logs, sprintMins) {
  const mins = logs.length * sprintMins;
  return mins >= 60 ? `${(mins / 60).toFixed(1)}h` : `${mins}m`;
}

export default function Dashboard({ todayLogs, logs, goal, sprintMins, onStartSprint, onHistory, onSettings }) {
  const [tab, setTab] = useState("chart");

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
            <button onClick={onSettings} style={{ background: "none", border: "none", cursor: "pointer", fontSize: 18, lineHeight: 1, color: COLORS.MUTED2 }} title="Settings">
              ⚙️
            </button>
          </div>
        </div>

        {/* Two-column grid */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, alignItems: "stretch" }}>

          {/* ── LEFT — single card, flex column, button pinned to bottom ── */}
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

            {/* All-time stats */}
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
                      flex: 1, background: COLORS.SURF2,
                      borderRadius: 14, padding: "12px 8px", textAlign: "center",
                    }}>
                      <div style={{ color: COLORS.TEAL, fontSize: 18, fontWeight: 800, lineHeight: 1 }}>{val}</div>
                      <div style={{ color: COLORS.MUTED, fontSize: 10, marginTop: 5 }}>{label}</div>
                    </div>
                  ))}
                </div>
              </>
            )}

            <div style={{ flex: 1 }} />

            <button style={styles.primaryBtn} onClick={onStartSprint}>
              ▶ &nbsp;Start Focus Sprint
            </button>
          </div>

          {/* ── RIGHT — mood journey + tabbed chart/log ── */}
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>

            {/* Today's mood journey */}
            <div style={{ ...styles.card, marginBottom: 0 }}>
              <div style={styles.label}>Today's mood journey</div>
              {todayLogs.length === 0 ? (
                <div style={{ color: COLORS.MUTED2, fontSize: 13, padding: "10px 0" }}>
                  No sprints yet, you've got this! 💪
                </div>
              ) : (
                <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                  {todayLogs.map((l, i) => (
                    <div key={i} style={{
                      background: COLORS.SURF2, borderRadius: 12,
                      padding: "8px 12px", display: "flex", alignItems: "center", gap: 6,
                    }}>
                      {l.task && (
                        <span style={{ color: COLORS.MUTED, fontSize: 10, maxWidth: 60, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
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

            {/* Tabbed mood chart / sprint log */}
            <div style={{ ...styles.card, marginBottom: 0, flex: 1, display: "flex", flexDirection: "column" }}>

              {/* Tab switcher */}
              <div style={{ display: "flex", background: COLORS.SURF2, borderRadius: 12, padding: 4, marginBottom: 16 }}>
                {[["chart", "Mood Trends"], ["log", "Sprint Log"]].map(([key, label]) => (
                  <button
                    key={key}
                    onClick={() => setTab(key)}
                    style={{
                      flex: 1, padding: "7px 0", borderRadius: 9,
                      border: "none", cursor: "pointer",
                      background: tab === key ? COLORS.SURF : "transparent",
                      color:      tab === key ? COLORS.LITE  : COLORS.MUTED2,
                      fontSize: 13, fontWeight: tab === key ? 700 : 400,
                      transition: "all 0.2s",
                    }}
                  >
                    {label}
                  </button>
                ))}
              </div>

              {/* Mood Trends tab */}
              {tab === "chart" && (
                <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center" }}>
                  {logs.length > 0 ? (
                    <MoodChart logs={logs.slice(-10)} height={130} />
                  ) : (
                    <div style={{ color: COLORS.MUTED, fontSize: 12, textAlign: "center", padding: "20px 0" }}>
                      Your mood trends will appear here after your first sprint.
                    </div>
                  )}
                </div>
              )}

              {/* Sprint Log tab */}
              {tab === "log" && (
                <div style={{ flex: 1, overflowY: "auto", maxHeight: 220 }}>
                  {logs.length === 0 ? (
                    <div style={{ color: COLORS.MUTED, fontSize: 12, textAlign: "center", padding: "20px 0" }}>
                      No sprints logged yet.
                    </div>
                  ) : (
                    [...logs].reverse().map((l, i) => (
                      <div key={i} style={{
                        display: "flex", alignItems: "center", gap: 10,
                        padding: "9px 0",
                        borderBottom: i < logs.length - 1 ? "1px solid var(--app-bord)" : "none",
                      }}>
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <div style={{ color: COLORS.LITE, fontSize: 12, fontWeight: 600, marginBottom: 2, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                            {l.task || "Untitled sprint"}
                          </div>
                          <div style={{ color: COLORS.MUTED, fontSize: 11 }}>
                            {new Date(l.start).toLocaleDateString("en", { month: "short", day: "numeric" })}
                            {" · "}
                            {Math.round((new Date(l.end) - new Date(l.start)) / 60000)}m
                          </div>
                        </div>
                        <div style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 16, flexShrink: 0 }}>
                          <span>{MOODS[l.preMood]}</span>
                          <span style={{ color: COLORS.MUTED, fontSize: 9 }}>→</span>
                          <span>{MOODS[l.postMood]}</span>
                        </div>
                      </div>
                    ))
                  )}
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
