export const SPRINT_SECS = 25 * 60;
export const MOODS = ["😫", "😕", "😐", "🙂", "😃"];
export const LABELS = ["Exhausted", "Struggling", "Neutral", "Good", "Great"];
export const TIPS = [
  "One minute at a time. You're building real momentum. 🎯",
  "Deep work compounds. Each sprint makes the next one easier. ✨",
  "Your brain is doing heavy lifting right now. Stay with it. 💡",
  "Distractions will wait. This focus window is yours. 🌊",
];

// ── Design tokens ─────────────────────────────────────────────────────────
export const COLORS = {
  BG:    "#060C19",
  SURF:  "#0C1529",
  SURF2: "#122040",
  TEAL:  "#2DD4BF",
  BLUE:  "#38BDF8",
  LITE:  "#CBD5E1",
  MUTED: "#475569",
  MUTED2:"#64748B",
  BORD:  "rgba(45,212,191,0.18)",
};

// ── Shared style factories ────────────────────────────────────────────────
export const styles = {
  page: {
    background: COLORS.BG,
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "24px 16px",
    fontFamily: '"SF Pro Display",-apple-system,BlinkMacSystemFont,sans-serif',
    boxSizing: "border-box",
  },
  box: { width: "100%", maxWidth: 400 },
  card: {
    background: COLORS.SURF,
    border: `1px solid ${COLORS.BORD}`,
    borderRadius: 24,
    padding: "28px 24px",
    marginBottom: 12,
  },
  h1: {
    color: COLORS.LITE,
    fontSize: 26,
    fontWeight: 700,
    margin: "0 0 8px",
    letterSpacing: -0.5,
  },
  sub: {
    color: COLORS.MUTED2,
    fontSize: 14,
    margin: "0 0 24px",
    lineHeight: 1.6,
  },
  label: {
    color: COLORS.MUTED,
    fontSize: 11,
    fontWeight: 700,
    textTransform: "uppercase",
    letterSpacing: 1.2,
    marginBottom: 12,
    display: "block",
  },
  primaryBtn: {
    display: "block",
    width: "100%",
    padding: "15px",
    borderRadius: 14,
    fontSize: 15,
    fontWeight: 700,
    cursor: "pointer",
    border: "none",
    letterSpacing: 0.2,
    background: "linear-gradient(135deg, #2DD4BF, #38BDF8)",
    color: "#060C19",
    boxShadow: "0 8px 24px rgba(45,212,191,0.25)",
  },
  ghostBtn: {
    display: "block",
    padding: "12px 22px",
    borderRadius: 12,
    fontSize: 14,
    cursor: "pointer",
    background: "transparent",
    color: COLORS.MUTED2,
    border: "1px solid rgba(71,85,105,0.35)",
  },
};

export const CSS_ANIMATIONS = `
  @keyframes fadeUp {
    from { opacity:0; transform:translateY(18px); }
    to   { opacity:1; transform:translateY(0); }
  }
  @keyframes shimmer {
    0%,100% { opacity:0.4; }
    50%      { opacity:1; }
  }
  @keyframes pop {
    0%   { transform:scale(0.85); opacity:0; }
    60%  { transform:scale(1.05); }
    100% { transform:scale(1); opacity:1; }
  }
  .fade  { animation: fadeUp 0.38s cubic-bezier(.22,.68,0,1.2) forwards; }
  .pop   { animation: pop   0.45s cubic-bezier(.22,.68,0,1.2) forwards; }
  .pulse { animation: shimmer 1.8s ease-in-out infinite; }
`;
