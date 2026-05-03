import { useState, useEffect, useRef } from "react";

const SPRINT_SECS = 25 * 60;
const MOODS = ["😫", "😕", "😐", "🙂", "😃"];
const LABELS = ["Exhausted", "Struggling", "Neutral", "Good", "Great"];
const R = 88;
const CIRC = 2 * Math.PI * R;

const TIPS = [
  "One minute at a time. You're building real momentum. 🎯",
  "Deep work compounds. Each sprint makes the next one easier. ✨",
  "Your brain is doing heavy lifting right now. Stay with it. 💡",
  "Distractions will wait. This focus window is yours. 🌊",
];

export default function FocusBuddy() {
  const [screen, setScreen] = useState("welcome");
  const [goal, setGoal] = useState(4);
  const [smsEnabled, setSmsEnabled] = useState(false);
  const [preMood, setPreMood] = useState(2);
  const [postMood, setPostMood] = useState(2);
  const [timeLeft, setTimeLeft] = useState(SPRINT_SECS);
  const [paused, setPaused] = useState(false);
  const [sprintStart, setSprintStart] = useState(null);
  const [logs, setLogs] = useState([]);
  const [aiMsg, setAiMsg] = useState("");
  const [aiLoading, setAiLoading] = useState(false);
  const [tipIdx, setTipIdx] = useState(0);
  const tickRef = useRef(null);
  const tipRef = useRef(null);

  const todayLogs = logs.filter(
    (l) => new Date(l.end).toDateString() === new Date().toDateString()
  );

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

  useEffect(() => {
    if (screen !== "timer") { clearInterval(tipRef.current); return; }
    tipRef.current = setInterval(() => setTipIdx((i) => (i + 1) % TIPS.length), 8000);
    return () => clearInterval(tipRef.current);
  }, [screen]);

  const startSprint = () => {
    setTimeLeft(SPRINT_SECS); setSprintStart(new Date()); setPaused(false); setAiMsg(""); setScreen("timer");
  };
  const cancelSprint = () => { clearInterval(tickRef.current); setTimeLeft(SPRINT_SECS); setScreen("dashboard"); };

  const logSprint = async () => {
    setLogs((prev) => [...prev, { start: sprintStart, end: new Date(), preMood, postMood }]);
    setScreen("result");
    setAiLoading(true);
    try {
      const r = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          preMood: MOODS[preMood], preMoodLabel: LABELS[preMood],
          postMood: MOODS[postMood], postMoodLabel: LABELS[postMood],
        }),
      });
      const d = await r.json();
      setAiMsg(d.message);
    } catch {
      setAiMsg("You showed up and followed through — that's the hardest part, and you nailed it! 🌟");
    }
    setAiLoading(false);
  };

  const mm = String(Math.floor(timeLeft / 60)).padStart(2, "0");
  const ss = String(timeLeft % 60).padStart(2, "0");
  const dashOffset = CIRC * (1 - timeLeft / SPRINT_SECS);
  const elapsed = Math.round((1 - timeLeft / SPRINT_SECS) * 100);

  const BG="#060C19",SURF="#0C1529",SURF2="#122040",TEAL="#2DD4BF",BLUE="#38BDF8",LITE="#CBD5E1",MUTED="#475569",MUTED2="#64748B",BORD="rgba(45,212,191,0.18)";
  const pageStyle={background:BG,minHeight:"100vh",display:"flex",alignItems:"center",justifyContent:"center",padding:"24px 16px",fontFamily:'"SF Pro Display",-apple-system,BlinkMacSystemFont,sans-serif',boxSizing:"border-box"};
  const boxStyle={width:"100%",maxWidth:400};
  const cardStyle={background:SURF,border:`1px solid ${BORD}`,borderRadius:24,padding:"28px 24px",marginBottom:12};
  const h1Style={color:LITE,fontSize:26,fontWeight:700,margin:"0 0 8px",letterSpacing:-0.5};
  const subStyle={color:MUTED2,fontSize:14,margin:"0 0 24px",lineHeight:1.6};
  const labelStyle={color:MUTED,fontSize:11,fontWeight:700,textTransform:"uppercase",letterSpacing:1.2,marginBottom:12,display:"block"};
  const primaryBtn={display:"block",width:"100%",padding:"15px",borderRadius:14,fontSize:15,fontWeight:700,cursor:"pointer",border:"none",letterSpacing:0.2,background:`linear-gradient(135deg,${TEAL},${BLUE})`,color:"#060C19",boxShadow:`0 8px 24px rgba(45,212,191,0.25)`};
  const ghostBtn={display:"block",padding:"12px 22px",borderRadius:12,fontSize:14,cursor:"pointer",background:"transparent",color:MUTED2,border:`1px solid rgba(71,85,105,0.35)`};

  const MoodPicker = ({ value, onChange }) => (
    <div style={{ display:"flex", justifyContent:"space-between", margin:"4px 0 20px" }}>
      {MOODS.map((m, i) => (
        <div key={i} onClick={() => onChange(i)} style={{ fontSize:30, cursor:"pointer", padding:"8px 10px", borderRadius:14, transition:"all 0.2s ease", transform:value===i?"scale(1.35)":"scale(1)", background:value===i?"rgba(45,212,191,0.14)":"transparent", border:value===i?`1.5px solid rgba(45,212,191,0.5)`:"1.5px solid transparent", userSelect:"none" }}>
          {m}
        </div>
      ))}
    </div>
  );

  const Toggle = ({ on, onToggle }) => (
    <div onClick={onToggle} style={{ width:48, height:28, borderRadius:14, background:on?TEAL:SURF2, border:`1px solid ${on?TEAL:"rgba(71,85,105,0.4)"}`, cursor:"pointer", position:"relative", transition:"all 0.25s ease", flexShrink:0 }}>
      <div style={{ position:"absolute", top:3, left:on?23:3, width:20, height:20, borderRadius:10, background:on?"#060C19":MUTED, transition:"left 0.25s ease" }} />
    </div>
  );

  const css=`
    @keyframes fadeUp{from{opacity:0;transform:translateY(18px)}to{opacity:1;transform:translateY(0)}}
    @keyframes shimmer{0%,100%{opacity:0.4}50%{opacity:1}}
    @keyframes pop{0%{transform:scale(0.85);opacity:0}60%{transform:scale(1.05)}100%{transform:scale(1);opacity:1}}
    .fade{animation:fadeUp 0.38s cubic-bezier(.22,.68,0,1.2) forwards}
    .pop{animation:pop 0.45s cubic-bezier(.22,.68,0,1.2) forwards}
    .pulse{animation:shimmer 1.8s ease-in-out infinite}
  `;

  if (screen==="welcome") return (
    <div style={pageStyle}><style>{css}</style>
    <div style={boxStyle} className="fade">
      <div style={{textAlign:"center",marginBottom:28}}>
        <div style={{width:80,height:80,background:`linear-gradient(135deg,${TEAL},${BLUE})`,borderRadius:24,display:"inline-flex",alignItems:"center",justifyContent:"center",fontSize:38,marginBottom:14,boxShadow:`0 20px 48px rgba(45,212,191,0.3)`}}>⏱</div>
        <div style={{color:TEAL,fontSize:26,fontWeight:800,letterSpacing:-0.5}}>FocusBuddy</div>
        <div style={{color:MUTED2,fontSize:13,marginTop:3}}>AI-powered focus sprints for ADHD students</div>
      </div>
      <div style={cardStyle}>
        <h2 style={{...h1Style,textAlign:"center",marginBottom:10}}>Turn scattered minutes<br/>into focused wins ✨</h2>
        <p style={{...subStyle,textAlign:"center"}}>25-minute sprints, mood tracking, and an AI companion that celebrates every win.</p>
        <button style={primaryBtn} onClick={()=>setScreen("consent")}>Get Started</button>
      </div>
      <div style={{display:"flex",justifyContent:"center",gap:24,marginTop:20}}>
        {[["⏱","25-min sprints"],["🧠","Mood tracking"],["🤖","AI kudos"]].map(([icon,label])=>(
          <div key={label} style={{textAlign:"center"}}>
            <div style={{fontSize:20,marginBottom:4}}>{icon}</div>
            <div style={{color:MUTED,fontSize:11}}>{label}</div>
          </div>
        ))}
      </div>
    </div></div>
  );

  if (screen==="consent") return (
    <div style={pageStyle}><style>{css}</style>
    <div style={boxStyle} className="fade">
      <div style={{color:TEAL,fontSize:11,fontWeight:700,textTransform:"uppercase",letterSpacing:1.2,marginBottom:8}}>Step 1 of 2</div>
      <h1 style={{...h1Style,marginBottom:4}}>Privacy & Consent</h1>
      <p style={subStyle}>We believe in being upfront about your data.</p>
      <div style={cardStyle}>
        {[["🔒","Local-first storage","Sprint logs and mood data stay on your device. Nothing is uploaded to any server."],["📱","Optional SMS nudges","If you opt into buddy alerts, only an encrypted message is sent — no data stored remotely."],["🗑️","One-tap data purge","Delete all history instantly from Settings, anytime, no questions asked."]].map(([icon,title,desc])=>(
          <div key={title} style={{display:"flex",gap:14,marginBottom:22}}>
            <div style={{width:36,height:36,borderRadius:10,background:"rgba(45,212,191,0.1)",border:`1px solid rgba(45,212,191,0.2)`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:17,flexShrink:0}}>{icon}</div>
            <div>
              <div style={{color:LITE,fontWeight:600,fontSize:14,marginBottom:3}}>{title}</div>
              <div style={{color:MUTED2,fontSize:12,lineHeight:1.6}}>{desc}</div>
            </div>
          </div>
        ))}
        <div style={{borderTop:`1px solid ${BORD}`,paddingTop:20}}>
          <button style={primaryBtn} onClick={()=>setScreen("setup")}>I Agree & Continue</button>
        </div>
      </div>
    </div></div>
  );

  if (screen==="setup") return (
    <div style={pageStyle}><style>{css}</style>
    <div style={boxStyle} className="fade">
      <div style={{color:TEAL,fontSize:11,fontWeight:700,textTransform:"uppercase",letterSpacing:1.2,marginBottom:8}}>Step 2 of 2</div>
      <h1 style={{...h1Style,marginBottom:4}}>Quick Setup</h1>
      <p style={subStyle}>You can change these anytime from Settings.</p>
      <div style={cardStyle}>
        <div style={{marginBottom:28}}>
          <span style={labelStyle}>Daily sprint goal</span>
          <div style={{display:"flex",alignItems:"center",gap:16,marginBottom:8}}>
            <input type="range" min={1} max={12} step={1} value={goal} onChange={(e)=>setGoal(Number(e.target.value))} style={{flex:1,accentColor:TEAL,height:4}} />
            <div style={{color:TEAL,fontWeight:800,fontSize:24,minWidth:30,textAlign:"right"}}>{goal}</div>
          </div>
          <div style={{color:MUTED,fontSize:12}}>{goal*25} focused minutes per day</div>
        </div>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:28}}>
          <div>
            <div style={{color:LITE,fontWeight:600,fontSize:14,marginBottom:3}}>SMS study-buddy nudges</div>
            <div style={{color:MUTED,fontSize:12}}>Get a ping when you finish each sprint</div>
          </div>
          <Toggle on={smsEnabled} onToggle={()=>setSmsEnabled(v=>!v)} />
        </div>
        <button style={primaryBtn} onClick={()=>setScreen("dashboard")}>Start Focusing →</button>
      </div>
    </div></div>
  );

  if (screen==="dashboard") return (
    <div style={pageStyle}><style>{css}</style>
    <div style={boxStyle} className="fade">
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:20}}>
        <div style={{color:TEAL,fontSize:16,fontWeight:800}}>⏱ FocusBuddy</div>
        <div style={{color:MUTED,fontSize:12}}>{new Date().toLocaleDateString("en",{weekday:"short",month:"short",day:"numeric"})}</div>
      </div>
      <div style={{...cardStyle,border:todayLogs.length>=goal?`1px solid rgba(45,212,191,0.5)`:`1px solid ${BORD}`}}>
        <div style={{display:"flex",justifyContent:"space-between",marginBottom:16}}>
          <div>
            <div style={labelStyle}>Today's sprints</div>
            <div style={{display:"flex",alignItems:"baseline",gap:4}}>
              <span style={{color:TEAL,fontSize:42,fontWeight:800,lineHeight:1}}>{todayLogs.length}</span>
              <span style={{color:MUTED,fontSize:18}}>/ {goal}</span>
            </div>
          </div>
          <div style={{textAlign:"right"}}>
            <div style={labelStyle}>Focus time</div>
            <div style={{color:LITE,fontSize:20,fontWeight:700}}>{todayLogs.length*25}m</div>
          </div>
        </div>
        <div style={{height:5,background:SURF2,borderRadius:3,overflow:"hidden",marginBottom:20}}>
          <div style={{height:"100%",background:`linear-gradient(90deg,${TEAL},${BLUE})`,width:`${Math.min((todayLogs.length/goal)*100,100)}%`,borderRadius:3,transition:"width 0.6s ease"}} />
        </div>
        <button style={primaryBtn} onClick={()=>setScreen("pre_sprint")}>▶ &nbsp;Start Focus Sprint</button>
      </div>
      {todayLogs.length>0?(
        <div style={cardStyle}>
          <div style={labelStyle}>Today's mood journey</div>
          <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>
            {todayLogs.map((l,i)=>(
              <div key={i} style={{background:SURF2,borderRadius:12,padding:"8px 14px",display:"flex",alignItems:"center",gap:6}}>
                <span style={{fontSize:20}}>{MOODS[l.preMood]}</span>
                <span style={{color:MUTED,fontSize:11}}>→</span>
                <span style={{fontSize:20}}>{MOODS[l.postMood]}</span>
                <span style={{color:MUTED,fontSize:10,marginLeft:2}}>#{i+1}</span>
              </div>
            ))}
          </div>
        </div>
      ):(
        <div style={{textAlign:"center",padding:"28px 0",color:MUTED2,fontSize:14}}>No sprints yet today — you've got this! 💪</div>
      )}
      <p style={{color:MUTED,fontSize:11,textAlign:"center",marginTop:8}}>Study aid · not medical advice · all data stored locally</p>
    </div></div>
  );

  if (screen==="pre_sprint") return (
    <div style={pageStyle}><style>{css}</style>
    <div style={boxStyle} className="fade">
      <button onClick={()=>setScreen("dashboard")} style={{background:"none",border:"none",color:MUTED2,cursor:"pointer",fontSize:14,marginBottom:20,padding:0,display:"flex",alignItems:"center",gap:6}}>← Back</button>
      <div style={cardStyle}>
        <div style={{textAlign:"center",marginBottom:24}}>
          <div style={{fontSize:44,marginBottom:12}}>🧠</div>
          <h2 style={{...h1Style,textAlign:"center"}}>Quick check-in</h2>
          <p style={{...subStyle,textAlign:"center"}}>How are you feeling right now?</p>
        </div>
        <span style={labelStyle}>Current mood</span>
        <MoodPicker value={preMood} onChange={setPreMood} />
        <div style={{textAlign:"center",color:TEAL,fontWeight:600,marginBottom:24,fontSize:15}}>{MOODS[preMood]} &nbsp;{LABELS[preMood]}</div>
        <button style={primaryBtn} onClick={startSprint}>▶ &nbsp;Start 25-Minute Sprint</button>
      </div>
    </div></div>
  );

  if (screen==="timer") return (
    <div style={pageStyle}><style>{css}</style>
    <div style={{...boxStyle,textAlign:"center"}} className="fade">
      <div style={{display:"inline-flex",alignItems:"center",gap:7,background:paused?SURF2:"rgba(45,212,191,0.1)",border:`1px solid ${paused?"rgba(71,85,105,0.3)":"rgba(45,212,191,0.3)"}`,borderRadius:20,padding:"6px 16px",marginBottom:28,color:paused?MUTED2:TEAL,fontSize:12,fontWeight:700,textTransform:"uppercase",letterSpacing:1}}>
        <div style={{width:7,height:7,borderRadius:"50%",background:paused?MUTED:TEAL,animation:paused?"none":"shimmer 1.5s infinite"}} />
        {paused?"Paused":"Sprint active"}
      </div>
      <div style={{position:"relative",display:"inline-block",marginBottom:32}}>
        <svg width={220} height={220} style={{transform:"rotate(-90deg)",display:"block"}}>
          <defs>
            <linearGradient id="ringGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor={TEAL}/><stop offset="100%" stopColor={BLUE}/>
            </linearGradient>
          </defs>
          <circle cx={110} cy={110} r={R} fill="none" stroke={SURF2} strokeWidth={9}/>
          <circle cx={110} cy={110} r={R} fill="none" stroke={paused?MUTED:"url(#ringGrad)"} strokeWidth={9} strokeLinecap="round" strokeDasharray={CIRC} strokeDashoffset={dashOffset} style={{transition:"stroke-dashoffset 0.9s ease,stroke 0.3s"}}/>
        </svg>
        <div style={{position:"absolute",top:"50%",left:"50%",transform:"translate(-50%,-50%)",textAlign:"center"}}>
          <div style={{color:paused?MUTED2:LITE,fontSize:44,fontWeight:700,fontFamily:'"SF Mono","Fira Code","Consolas",monospace',letterSpacing:2,lineHeight:1,transition:"color 0.3s"}}>{mm}:{ss}</div>
          <div style={{color:MUTED,fontSize:11,marginTop:6}}>{elapsed}% elapsed</div>
        </div>
      </div>
      <div style={{display:"flex",gap:10,justifyContent:"center",marginBottom:28}}>
        <button onClick={()=>setPaused(p=>!p)} style={{...primaryBtn,width:"auto",padding:"13px 32px"}}>{paused?"▶ Resume":"⏸ Pause"}</button>
        <button onClick={cancelSprint} style={ghostBtn}>Cancel</button>
      </div>
      <div style={{maxWidth:280,margin:"0 auto",color:MUTED2,fontSize:13,lineHeight:1.6,minHeight:40}}>{TIPS[tipIdx]}</div>
    </div></div>
  );

  if (screen==="post") return (
    <div style={pageStyle}><style>{css}</style>
    <div style={boxStyle} className="pop">
      <div style={{...cardStyle,textAlign:"center",marginBottom:12,border:"1px solid rgba(45,212,191,0.35)"}}>
        <div style={{fontSize:52,marginBottom:10}}>🎉</div>
        <h2 style={{...h1Style,textAlign:"center"}}>Sprint complete!</h2>
        <p style={{...subStyle,textAlign:"center"}}>Take a 5-minute break — stretch, breathe, look away from the screen.</p>
      </div>
      <div style={cardStyle}>
        <div style={{textAlign:"center",marginBottom:20}}>
          <span style={labelStyle}>How do you feel now?</span>
          <div style={{color:MUTED2,fontSize:13,marginTop:-8,marginBottom:16}}>You started at &nbsp;{MOODS[preMood]} {LABELS[preMood]}</div>
        </div>
        <MoodPicker value={postMood} onChange={setPostMood} />
        <div style={{textAlign:"center",color:TEAL,fontWeight:600,marginBottom:24,fontSize:15}}>{MOODS[postMood]} &nbsp;{LABELS[postMood]}</div>
        <button style={primaryBtn} onClick={logSprint}>Log Sprint &amp; Get AI Kudos →</button>
      </div>
    </div></div>
  );

  if (screen==="result") return (
    <div style={pageStyle}><style>{css}</style>
    <div style={boxStyle} className="pop">
      <div style={{...cardStyle,textAlign:"center",border:"1px solid rgba(45,212,191,0.4)"}}>
        <div style={{fontSize:48,marginBottom:20}}>✨</div>
        <div style={{display:"flex",alignItems:"center",justifyContent:"center",gap:20,marginBottom:28}}>
          <div style={{textAlign:"center"}}><div style={{fontSize:36}}>{MOODS[preMood]}</div><div style={{color:MUTED,fontSize:11,marginTop:6}}>Before</div></div>
          <div style={{color:TEAL,fontSize:22}}>→</div>
          <div style={{textAlign:"center"}}><div style={{fontSize:36}}>{MOODS[postMood]}</div><div style={{color:MUTED,fontSize:11,marginTop:6}}>After</div></div>
        </div>
        <div style={{background:SURF2,border:`1px solid rgba(45,212,191,0.15)`,borderRadius:16,padding:"18px 20px",marginBottom:20,minHeight:72,display:"flex",alignItems:"center",justifyContent:"center"}}>
          {aiLoading
            ?<div style={{color:MUTED2,fontSize:13}} className="pulse">FocusBuddy is thinking...</div>
            :<div style={{color:LITE,fontSize:14,lineHeight:1.7,fontStyle:"italic"}}>"{aiMsg}"</div>
          }
        </div>
        <div style={{color:MUTED,fontSize:11,marginBottom:20}}>— FocusBuddy AI (powered by Claude)</div>
        <div style={{display:"flex",justifyContent:"center",gap:28,marginBottom:24}}>
          {[["Today",`${todayLogs.length+1}`,"sprints"],["Total",`${(logs.length+1)*25}`,"minutes"]].map(([label,val,unit])=>(
            <div key={label} style={{textAlign:"center"}}>
              <div style={{color:MUTED,fontSize:11,marginBottom:2}}>{label}</div>
              <div style={{color:TEAL,fontSize:24,fontWeight:800,lineHeight:1}}>{val}</div>
              <div style={{color:MUTED,fontSize:10,marginTop:2}}>{unit}</div>
            </div>
          ))}
        </div>
        <button style={primaryBtn} onClick={()=>setScreen("dashboard")}>Back to Dashboard</button>
      </div>
      <p style={{color:MUTED,fontSize:11,textAlign:"center",marginTop:10}}>AI responses generated by Anthropic Claude · not medical advice</p>
    </div></div>
  );

  return null;
}
