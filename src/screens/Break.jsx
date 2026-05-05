import { useState, useEffect, useRef } from "react";
import { CSS_ANIMATIONS, COLORS, styles } from "../constants";
import TimerRing from "../components/TimerRing";

export default function Break({ breakSecs, onDone }) {
  const [timeLeft, setTimeLeft] = useState(breakSecs);
  const tickRef = useRef(null);

  useEffect(() => {
    tickRef.current = setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 1) { clearInterval(tickRef.current); onDone(); return 0; }
        return t - 1;
      });
    }, 1000);
    return () => clearInterval(tickRef.current);
  }, []);

  const mm = String(Math.floor(timeLeft / 60)).padStart(2, "0");
  const ss = String(timeLeft % 60).padStart(2, "0");

  return (
    <div style={styles.page}>
      <style>{CSS_ANIMATIONS}</style>
      <div style={{ ...styles.box, textAlign: "center" }} className="pop">

        <div style={{ fontSize: 52, marginBottom: 12 }}>☕</div>
        <h2 style={{ ...styles.h1, textAlign: "center", marginBottom: 8 }}>Break time</h2>
        <p style={{ ...styles.sub, textAlign: "center", marginBottom: 28 }}>
          Stand up, stretch, and look away from the screen.
        </p>

        <TimerRing
          timeLeft={timeLeft}
          totalSecs={breakSecs}
          paused={false}
          mm={mm}
          ss={ss}
        />

        <div style={{ marginTop: 28 }}>
          <button
            onClick={onDone}
            style={{ ...styles.ghostBtn, display: "inline-block" }}
          >
            Skip break →
          </button>
        </div>

      </div>
    </div>
  );
}
