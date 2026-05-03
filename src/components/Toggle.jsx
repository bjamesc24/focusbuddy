import { COLORS } from "../constants";

export default function Toggle({ on, onToggle }) {
  return (
    <div
      onClick={onToggle}
      style={{
        width: 48,
        height: 28,
        borderRadius: 14,
        background: on ? COLORS.TEAL : COLORS.SURF2,
        border: `1px solid ${on ? COLORS.TEAL : "rgba(71,85,105,0.4)"}`,
        cursor: "pointer",
        position: "relative",
        transition: "all 0.25s ease",
        flexShrink: 0,
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 3,
          left: on ? 23 : 3,
          width: 20,
          height: 20,
          borderRadius: 10,
          background: on ? "#060C19" : COLORS.MUTED,
          transition: "left 0.25s ease",
        }}
      />
    </div>
  );
}
