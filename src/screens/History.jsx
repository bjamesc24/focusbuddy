import { useState } from "react";
import { CSS_ANIMATIONS, COLORS, MOODS, LABELS, styles } from "../constants";
import MoodChart from "../components/MoodChart";

function exportCSV(logs) {
  const headers = ["Date", "Task", "Duration (min)", "Pre Mood", "Post Mood"];
  const rows    = logs.map((l) => [
    new Date(l.start).toLocaleDateString(),
    `"${(l.task || "—").replace(/"/g, '""')}"`,
    Math.round((new Date(l.end) - new Date(l.start)) / 60000),
    LABELS[l.preMood],
    LABELS[l.postMood],
  ]);
  const csv  = [headers, ...rows].map((r) => r.join(",")).join("\n");
  const blob = new Blob([csv], { type: "text/csv" });
  const url  = URL.createObjectURL(blob);
  const a    = document.createElement("a");
  a.href     = url;
  a.download = "focusbuddy-sprints.csv";
  a.click();
  URL.revokeObjectURL(url);
}

function totalFocusHours(logs) {
  const mins = logs.length * 25;
  return mins >= 60
    ? `${(mins / 60).toFixed(1)}h`
    : `${mins}m`;
}

function avgMoodImprovement(logs) {
  if (!logs.length) return 0;
  const total = logs.reduce((sum, l) => sum + (l.postMood - l.preMood), 0);
  return (total / logs.length).toFixed(1);
}

export default function History({ logs, onBack }) {
  const [tab, setTab] = useState("chart");

  const improvement = avgMoodImprovement(logs);
  const improved    = Number(improvement) >= 0;

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

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 16 }}>
          <h1 style={{ ...styles.h1, margin: 0 }}>History</h1>
          <span style={{ color: COLORS.MUTED, fontSize: 12 }}>{logs.length} sprints total</span>
        </div>

        {/* Lifetime stats row */}
        {logs.length > 0 && (
          <div style={{ display: "flex", gap: 8, marginBottom: 12 }}>
            {[
              ["Focus time", totalFocusHours(logs)],
              ["Avg mood shift", `${improved ? "+" : ""}${improvement}`],
              ["Sessions", String(logs.length)],
            ].map(([label, val]) => (
              <div key={label} style={{
                flex: 1,
                background: COLORS.SURF,
                border: "1px solid var(--app-bord)",
                borderRadius: 16,
                padding: "12px 10px",
                textAlign: "center",
              }}>
                <div style={{ color: COLORS.TEAL, fontSize: 18, fontWeight: 800, lineHeight: 1 }}>{val}</div>
                <div style={{ color: COLORS.MUTED, fontSize: 10, marginTop: 4 }}>{label}</div>
              </div>
            ))}
          </div>
        )}

        {/* Tab switcher */}
        <div style={{ display: "flex", background: COLORS.SURF2, borderRadius: 12, padding: 4, marginBottom: 12 }}>
          {[["chart", "Mood Trends"], ["log", "Sprint Log"]].map(([key, label]) => (
            <button
              key={key}
              onClick={() => setTab(key)}
              style={{
                flex: 1, padding: "8px 0", borderRadius: 9,
                border: "none", cursor: "pointer",
                background: tab === key ? COLORS.SURF : "transparent",
                color:      tab === key ? COLORS.LITE : COLORS.MUTED2,
                fontSize: 13, fontWeight: tab === key ? 700 : 400,
                transition: "all 0.2s",
              }}
            >
              {label}
            </button>
          ))}
        </div>

        <div style={styles.card}>

          {/* ── Mood Trends tab ── */}
          {tab === "chart" && (
            <>
              <span style={styles.label}>Pre & post mood per sprint (last 20)</span>
              <MoodChart logs={logs} height={150} />
            </>
          )}

          {/* ── Sprint Log tab ── */}
          {tab === "log" && (
            <>
              {logs.length === 0 ? (
                <div style={{ textAlign: "center", padding: "24px 0", color: COLORS.MUTED2, fontSize: 13 }}>
                  No sprints logged yet.
                </div>
              ) : (
                <>
                  {[...logs].reverse().map((l, i) => (
                    <div
                      key={i}
                      style={{
                        display: "flex", alignItems: "center", gap: 12,
                        padding: "10px 0",
                        borderBottom: i < logs.length - 1 ? "1px solid var(--app-bord)" : "none",
                      }}
                    >
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{
                          color: COLORS.LITE, fontSize: 13, fontWeight: 600, marginBottom: 2,
                          whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis",
                        }}>
                          {l.task || "Untitled sprint"}
                        </div>
                        <div style={{ color: COLORS.MUTED, fontSize: 11 }}>
                          {new Date(l.start).toLocaleDateString("en", { month: "short", day: "numeric", year: "numeric" })}
                          {" · "}
                          {Math.round((new Date(l.end) - new Date(l.start)) / 60000)}m
                        </div>
                      </div>
                      <div style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 18, flexShrink: 0 }}>
                        <span>{MOODS[l.preMood]}</span>
                        <span style={{ color: COLORS.MUTED, fontSize: 10 }}>→</span>
                        <span>{MOODS[l.postMood]}</span>
                      </div>
                    </div>
                  ))}

                  <div style={{ borderTop: "1px solid var(--app-bord)", paddingTop: 16, marginTop: 8 }}>
                    <button
                      onClick={() => exportCSV(logs)}
                      style={{
                        display: "block", width: "100%", padding: "12px",
                        borderRadius: 12, fontSize: 13, fontWeight: 600,
                        cursor: "pointer", border: "1px solid var(--app-bord)",
                        background: "transparent", color: COLORS.MUTED2,
                      }}
                    >
                      ↓ Export to CSV
                    </button>
                  </div>
                </>
              )}
            </>
          )}

        </div>
      </div>
    </div>
  );
}
