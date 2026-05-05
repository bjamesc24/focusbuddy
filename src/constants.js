// ── Timing ────────────────────────────────────────────────────────────────
export const DEFAULT_SPRINT_MINS = 25;
export const DEFAULT_BREAK_MINS  = 5;
export const SPRINT_OPTIONS      = [15, 25, 45, 52];
export const BREAK_OPTIONS       = [5, 10];

// ── Mood & content ────────────────────────────────────────────────────────
export const MOODS  = ["😫", "😕", "😐", "🙂", "😃"];
export const LABELS = ["Exhausted", "Struggling", "Neutral", "Good", "Great"];
export const TIPS   = [
  "One minute at a time. You're building real momentum. 🎯",
  "Deep work compounds. Each sprint makes the next one easier. ✨",
  "Your brain is doing heavy lifting right now. Stay with it. 💡",
  "Distractions will wait. This focus window is yours. 🌊",
];

// ── Theme CSS — injected into :root so ALL inline styles pick them up ─────
export const DARK_THEME = `
  :root {
    --app-bg:    #060C19;
    --app-surf:  #0C1529;
    --app-surf2: #122040;
    --app-teal:  #2DD4BF;
    --app-blue:  #38BDF8;
    --app-lite:  #CBD5E1;
    --app-muted: #475569;
    --app-muted2:#64748B;
    --app-bord:          rgba(45,212,191,0.18);
    --app-teal-a08:      rgba(45,212,191,0.08);
    --app-teal-a10:      rgba(45,212,191,0.10);
    --app-teal-a14:      rgba(45,212,191,0.14);
    --app-teal-a15:      rgba(45,212,191,0.15);
    --app-teal-a20:      rgba(45,212,191,0.20);
    --app-teal-a25:      rgba(45,212,191,0.25);
    --app-teal-a30:      rgba(45,212,191,0.30);
    --app-teal-a35:      rgba(45,212,191,0.35);
    --app-teal-a40:      rgba(45,212,191,0.40);
    --app-teal-a50:      rgba(45,212,191,0.50);
    --app-primary-btn:   linear-gradient(135deg, #2DD4BF, #38BDF8);
    --app-btn-color:     #060C19;
    --app-btn-shadow:    0 8px 24px rgba(45,212,191,0.25);
  }
`;

export const LIGHT_THEME = `
  :root {
    --app-bg:    #F0F4F8;
    --app-surf:  #FFFFFF;
    --app-surf2: #E8EDF2;
    --app-teal:  #0D9488;
    --app-blue:  #0284C7;
    --app-lite:  #0F172A;
    --app-muted: #64748B;
    --app-muted2:#94A3B8;
    --app-bord:          rgba(13,148,136,0.18);
    --app-teal-a08:      rgba(13,148,136,0.08);
    --app-teal-a10:      rgba(13,148,136,0.10);
    --app-teal-a14:      rgba(13,148,136,0.14);
    --app-teal-a15:      rgba(13,148,136,0.15);
    --app-teal-a20:      rgba(13,148,136,0.20);
    --app-teal-a25:      rgba(13,148,136,0.25);
    --app-teal-a30:      rgba(13,148,136,0.30);
    --app-teal-a35:      rgba(13,148,136,0.35);
    --app-teal-a40:      rgba(13,148,136,0.40);
    --app-teal-a50:      rgba(13,148,136,0.50);
    --app-primary-btn:   linear-gradient(135deg, #0D9488, #0284C7);
    --app-btn-color:     #FFFFFF;
    --app-btn-shadow:    0 8px 24px rgba(13,148,136,0.25);
  }
`;

// ── Colors — reference CSS variables so theme switching is automatic ───────
export const COLORS = {
  BG:    "var(--app-bg)",
  SURF:  "var(--app-surf)",
  SURF2: "var(--app-surf2)",
  TEAL:  "var(--app-teal)",
  BLUE:  "var(--app-blue)",
  LITE:  "var(--app-lite)",
  MUTED: "var(--app-muted)",
  MUTED2:"var(--app-muted2)",
  BORD:  "var(--app-bord)",
};

// ── Shared style factories ────────────────────────────────────────────────
export const styles = {
  page: {
    background: "var(--app-bg)",
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "24px 16px",
    fontFamily: '"SF Pro Display",-apple-system,BlinkMacSystemFont,sans-serif',
    boxSizing: "border-box",
  },
  box:  { width: "100%", maxWidth: 400 },
  card: {
    background: "var(--app-surf)",
    border: "1px solid var(--app-bord)",
    borderRadius: 24,
    padding: "28px 24px",
    marginBottom: 12,
  },
  h1: {
    color: "var(--app-lite)",
    fontSize: 26,
    fontWeight: 700,
    margin: "0 0 8px",
    letterSpacing: -0.5,
  },
  sub: {
    color: "var(--app-muted2)",
    fontSize: 14,
    margin: "0 0 24px",
    lineHeight: 1.6,
  },
  label: {
    color: "var(--app-muted)",
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
    background: "var(--app-primary-btn)",
    color: "var(--app-btn-color)",
    boxShadow: "var(--app-btn-shadow)",
  },
  ghostBtn: {
    display: "block",
    padding: "12px 22px",
    borderRadius: 12,
    fontSize: 14,
    cursor: "pointer",
    background: "transparent",
    color: "var(--app-muted2)",
    border: "1px solid rgba(71,85,105,0.35)",
  },
};

export const CSS_ANIMATIONS = `
  @keyframes fadeUp {
    from { opacity:0; transform:translateY(18px); }
    to   { opacity:1; transform:translateY(0);    }
  }
  @keyframes shimmer {
    0%,100% { opacity:0.4; }
    50%      { opacity:1;   }
  }
  @keyframes pop {
    0%   { transform:scale(0.85); opacity:0; }
    60%  { transform:scale(1.05); }
    100% { transform:scale(1);    opacity:1; }
  }
  .fade  { animation: fadeUp 0.38s cubic-bezier(.22,.68,0,1.2) forwards; }
  .pop   { animation: pop   0.45s cubic-bezier(.22,.68,0,1.2) forwards; }
  .pulse { animation: shimmer 1.8s ease-in-out infinite; }
`;
