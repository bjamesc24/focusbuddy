import { useState, useEffect, useRef } from "react";
import { SPRINT_SECS, TIPS } from "./constants";

import Welcome   from "./screens/Welcome";
import Consent   from "./screens/Consent";
import Setup     from "./screens/Setup";
import Dashboard from "./screens/Dashboard";
import PreSprint from "./screens/PreSprint";
import Timer     from "./screens/Timer";
import PostSprint from "./screens/PostSprint";
import Result    from "./screens/Result";

export default function App() {
  const [screen, setScreen]         = useState("welcome");
  const [goal, setGoal]             = useState(4);
  const [smsEnabled, setSmsEnabled] = useState(false);
  const [preMood, setPreMood]       = useState(2);
  const [postMood, setPostMood]     = useState(2);
  const [timeLeft, setTimeLeft]     = useState(SPRINT_SECS);
  const [paused, setPaused]         = useState(false);
  const [sprintStart, setSprintStart] = useState(null);
  const [logs, setLogs]             = useState([]);
  const [aiMsg, setAiMsg]           = useState("");
  const [aiLoading, setAiLoading]   = useState(false);
  const [tipIdx, setTipIdx]         = useState(0);
  const tickRef = useRef(null);
  const tipRef  = useRef(null);

  const todayLogs = logs.filter(
    (l) => new Date(l.end).toDateString() === new Date().toDateString()
  );

  // ── Timer tick ────────────────────────────────────────────────────────────
  useEffect(() => {
    if (screen !== "timer" || paused) { clearInterval(tickRef.current); return; }
    tickRef.current = setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 1) { clearInterval(tickRef.current); setScreen("post"); return 0; }
        return t - 1;
      });
    }, 1000);
    return () => clearInterval(tickRef.current);
  }, [screen, paused]);

  // ── Rotating tip ──────────────────────────────────────────────────────────
  useEffect(() => {
    if (screen !== "timer") { clearInterval(tipRef.current); return; }
    tipRef.current = setInterval(() => setTipIdx((i) => (i + 1) % TIPS.length), 8000);
    return () => clearInterval(tipRef.current);
  }, [screen]);

  // ── Actions ───────────────────────────────────────────────────────────────
  const startSprint = () => {
    setTimeLeft(SPRINT_SECS);
    setSprintStart(new Date());
    setPaused(false);
    setAiMsg("");
    setScreen("timer");
  };

  const cancelSprint = () => {
    clearInterval(tickRef.current);
    setTimeLeft(SPRINT_SECS);
    setScreen("dashboard");
  };

  const logSprint = async () => {
    setLogs((prev) => [...prev, { start: sprintStart, end: new Date(), preMood, postMood }]);
    setScreen("result");
    setAiLoading(true);
    try {
      const r = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          preMood: ["😫","😕","😐","🙂","😃"][preMood],
          preMoodLabel: ["Exhausted","Struggling","Neutral","Good","Great"][preMood],
          postMood: ["😫","😕","😐","🙂","😃"][postMood],
          postMoodLabel: ["Exhausted","Struggling","Neutral","Good","Great"][postMood],
        }),
      });
      const d = await r.json();
      setAiMsg(d.message);
    } catch {
      setAiMsg("You showed up and followed through — that's the hardest part, and you nailed it! 🌟");
    }
    setAiLoading(false);
  };

  // ── Screen router ─────────────────────────────────────────────────────────
  if (screen === "welcome")   return <Welcome onNext={() => setScreen("consent")} />;
  if (screen === "consent")   return <Consent onNext={() => setScreen("setup")} />;
  if (screen === "setup")     return <Setup goal={goal} setGoal={setGoal} smsEnabled={smsEnabled} setSmsEnabled={setSmsEnabled} onNext={() => setScreen("dashboard")} />;
  if (screen === "dashboard") return <Dashboard todayLogs={todayLogs} logs={logs} goal={goal} onStartSprint={() => setScreen("pre_sprint")} />;
  if (screen === "pre_sprint") return <PreSprint preMood={preMood} setPreMood={setPreMood} onStart={startSprint} onBack={() => setScreen("dashboard")} />;
  if (screen === "timer")     return <Timer timeLeft={timeLeft} paused={paused} tipIdx={tipIdx} onTogglePause={() => setPaused((p) => !p)} onCancel={cancelSprint} />;
  if (screen === "post")      return <PostSprint preMood={preMood} postMood={postMood} setPostMood={setPostMood} onLog={logSprint} />;
  if (screen === "result")    return <Result preMood={preMood} postMood={postMood} aiMsg={aiMsg} aiLoading={aiLoading} todayCount={todayLogs.length + 1} totalMins={(logs.length + 1) * 25} onDone={() => setScreen("dashboard")} />;

  return null;
}
