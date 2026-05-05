import { useState, useEffect, useLayoutEffect, useRef } from "react";
import { TIPS, DARK_THEME, LIGHT_THEME } from "./constants";
import { useLocalStorage } from "./hooks/useLocalStorage";

import Welcome    from "./screens/Welcome";
import Consent    from "./screens/Consent";
import Setup      from "./screens/Setup";
import Dashboard  from "./screens/Dashboard";
import PreSprint  from "./screens/PreSprint";
import Timer      from "./screens/Timer";
import Break      from "./screens/Break";
import PostSprint from "./screens/PostSprint";
import Result     from "./screens/Result";
import History    from "./screens/History";
import Settings   from "./screens/Settings";

export default function App() {
  // ── Persisted state ───────────────────────────────────────────────────────
  const [introDone,   setIntroDone]   = useLocalStorage("fb_intro",   false);
  const [consentDone, setConsentDone] = useLocalStorage("fb_consent", false);
  const [setupDone,   setSetupDone]   = useLocalStorage("fb_setup",   false);
  const [goal,        setGoal]        = useLocalStorage("fb_goal",    4);
  const [sprintMins,  setSprintMins]  = useLocalStorage("fb_sprint",  25);
  const [breakMins,   setBreakMins]   = useLocalStorage("fb_break",   5);
  const [smsEnabled,  setSmsEnabled]  = useLocalStorage("fb_sms",     false);
  const [theme,       setTheme]       = useLocalStorage("fb_theme",   "dark");
  const [logs,        setLogs]        = useLocalStorage("fb_logs",    []);

  // ── Session state (not persisted) ─────────────────────────────────────────
  const [screen,    setScreen]    = useState("welcome");
  const [preMood,   setPreMood]   = useState(2);
  const [postMood,  setPostMood]  = useState(2);
  const [task,      setTask]      = useState("");
  const [timeLeft,  setTimeLeft]  = useState(sprintMins * 60);
  const [paused,    setPaused]    = useState(false);
  const [sprintStart, setSprintStart] = useState(null);
  const [aiMsg,     setAiMsg]     = useState("");
  const [aiLoading, setAiLoading] = useState(false);
  const [tipIdx,    setTipIdx]    = useState(0);
  const tickRef = useRef(null);
  const tipRef  = useRef(null);

  // ── Inject theme CSS variables into :root ─────────────────────────────────
  useLayoutEffect(() => {
    let style = document.getElementById("fb-theme");
    if (!style) {
      style    = document.createElement("style");
      style.id = "fb-theme";
      document.head.appendChild(style);
    }
    style.textContent = theme === "dark" ? DARK_THEME : LIGHT_THEME;
  }, [theme]);

  // ── Handle onboarding gate ────────────────────────────────────────────────
  useEffect(() => {
    if (!introDone)    { setScreen("welcome");   return; }
    if (!consentDone)  { setScreen("consent");   return; }
    if (!setupDone)    { setScreen("setup");     return; }
    if (screen === "welcome" || screen === "consent" || screen === "setup") {
      setScreen("dashboard");
    }
  }, [introDone, consentDone, setupDone]);

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

  // ── Rotating tips ─────────────────────────────────────────────────────────
  useEffect(() => {
    if (screen !== "timer") { clearInterval(tipRef.current); return; }
    tipRef.current = setInterval(() => setTipIdx((i) => (i + 1) % TIPS.length), 8000);
    return () => clearInterval(tipRef.current);
  }, [screen]);

  // ── Derived ───────────────────────────────────────────────────────────────
  const todayLogs = logs.filter(
    (l) => new Date(l.end).toDateString() === new Date().toDateString()
  );

  // ── Actions ───────────────────────────────────────────────────────────────
  const startSprint = () => {
    setTimeLeft(sprintMins * 60);
    setSprintStart(new Date().toISOString());
    setPaused(false);
    setAiMsg("");
    setScreen("timer");
  };

  const cancelSprint = () => {
    clearInterval(tickRef.current);
    setTimeLeft(sprintMins * 60);
    setScreen("dashboard");
  };

  const skipToEnd = () => {
    clearInterval(tickRef.current);
    setTimeLeft(0);
    setScreen("post");
  };

  const logSprint = async () => {
    const entry = {
      start:    sprintStart,
      end:      new Date().toISOString(),
      preMood,
      postMood,
      task,
    };
    setLogs((prev) => [...prev, entry]);
    setTask("");
    setScreen("result");
    setAiLoading(true);
    try {
      const r = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          preMood:      ["😫","😕","😐","🙂","😃"][preMood],
          preMoodLabel: ["Exhausted","Struggling","Neutral","Good","Great"][preMood],
          postMood:     ["😫","😕","😐","🙂","😃"][postMood],
          postMoodLabel:["Exhausted","Struggling","Neutral","Good","Great"][postMood],
        }),
      });
      const d = await r.json();
      setAiMsg(d.message);
    } catch {
      setAiMsg("You showed up and followed through — that's the hardest part, and you nailed it! 🌟");
    }
    setAiLoading(false);
  };

  const purgeData = () => {
    setLogs([]);
    setScreen("dashboard");
  };

  // ── Screen router ─────────────────────────────────────────────────────────
  if (screen === "welcome")
    return <Welcome onNext={() => { setIntroDone(true); setScreen("consent"); }} />;

  if (screen === "consent")
    return <Consent onNext={() => { setConsentDone(true); setScreen("setup"); }} />;

  if (screen === "setup")
    return (
      <Setup
        goal={goal} setGoal={setGoal}
        sprintMins={sprintMins} setSprintMins={setSprintMins}
        smsEnabled={smsEnabled} setSmsEnabled={setSmsEnabled}
        onNext={() => { setSetupDone(true); setScreen("dashboard"); }}
      />
    );

  if (screen === "dashboard")
    return (
      <Dashboard
        todayLogs={todayLogs} logs={logs} goal={goal} sprintMins={sprintMins}
        onStartSprint={() => setScreen("pre_sprint")}
        onHistory={()  => setScreen("history")}
        onSettings={()  => setScreen("settings")}
      />
    );

  if (screen === "pre_sprint")
    return (
      <PreSprint
        preMood={preMood} setPreMood={setPreMood}
        task={task} setTask={setTask}
        onStart={startSprint}
        onBack={() => setScreen("dashboard")}
      />
    );

  if (screen === "timer")
    return (
      <Timer
        timeLeft={timeLeft} totalSecs={sprintMins * 60}
        paused={paused} tipIdx={tipIdx}
        onTogglePause={() => setPaused((p) => !p)}
        onCancel={cancelSprint}
        onSkip={skipToEnd}
      />
    );

  if (screen === "post")
    return (
      <PostSprint
        preMood={preMood} postMood={postMood} setPostMood={setPostMood}
        breakSecs={breakMins * 60}
        onLog={logSprint}
      />
    );

  if (screen === "result")
    return (
      <Result
        preMood={preMood} postMood={postMood}
        aiMsg={aiMsg} aiLoading={aiLoading}
        todayCount={todayLogs.length}
        totalMins={logs.length * sprintMins}
        onDone={() => setScreen("dashboard")}
      />
    );

  if (screen === "history")
    return <History logs={logs} onBack={() => setScreen("dashboard")} />;

  if (screen === "settings")
    return (
      <Settings
        goal={goal} setGoal={setGoal}
        sprintMins={sprintMins} setSprintMins={setSprintMins}
        breakMins={breakMins} setBreakMins={setBreakMins}
        smsEnabled={smsEnabled} setSmsEnabled={setSmsEnabled}
        theme={theme} setTheme={setTheme}
        onPurge={purgeData}
        onBack={() => setScreen("dashboard")}
      />
    );

  return null;
}
