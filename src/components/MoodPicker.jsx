import { MOODS } from "../constants";

export default function MoodPicker({ value, onChange }) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", margin: "4px 0 20px" }}>
      {MOODS.map((m, i) => (
        <div
          key={i}
          onClick={() => onChange(i)}
          style={{
            fontSize: 30,
            cursor: "pointer",
            padding: "8px 10px",
            borderRadius: 14,
            transition: "all 0.2s ease",
            transform: value === i ? "scale(1.35)" : "scale(1)",
            background: value === i ? "rgba(45,212,191,0.14)" : "transparent",
            border: value === i
              ? "1.5px solid rgba(45,212,191,0.5)"
              : "1.5px solid transparent",
            userSelect: "none",
          }}
        >
          {m}
        </div>
      ))}
    </div>
  );
}
