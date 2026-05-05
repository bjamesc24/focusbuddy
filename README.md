# FocusBuddy ⏱

> Focus tools built for the ADHD brain.

**[Live Demo →](https://focusbuddy-phi.vercel.app)**

---

## Overview

FocusBuddy is a full-stack web application that helps people with ADHD build sustainable focus habits through 25-minute sprint sessions, mood tracking, and personalized AI feedback powered by Anthropic Claude. Users set a daily sprint goal, log what they're working on, track their mood before and after each session, and receive genuine AI-generated encouragement tailored to their experience.

Built as a final project for CS 401 at Bellevue College, grounded in peer-reviewed research on ADHD digital interventions, Pomodoro time-boxing, and CBT-derived self-monitoring principles.

---

## Features

- **25-minute sprint timer** — animated SVG countdown ring with pause, resume, and cancel
- **Task labeling** — users name what they're working on before each sprint, saved with the log
- **Pre & post mood check-in** — 5-point emoji scale before and after every session
- **AI coaching** — Claude generates a personalized response based on the user's mood shift after each sprint
- **Break timer** — automatic countdown between sprint end and mood check
- **Dashboard** — goal ring, streak counter, best day stat, all-time focus time, avg mood shift
- **Mood trend chart** — SVG bar chart showing before/after mood across recent sessions
- **Sprint log** — tabbed history with task, date, duration, and mood data
- **Settings** — configurable sprint duration (15/25/45/52 min), break duration, daily goal, light/dark theme
- **localStorage persistence** — all data survives page refresh, no account required
- **Ambient sound** — white noise, rain, and brown noise via Web Audio API
- **CSV export** — one-click download of full sprint history
- **Privacy-first** — all data stays local by default, one-tap purge

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 18, Vite |
| Backend | Vercel Serverless Functions (Node.js) |
| AI | Anthropic Claude API (`claude-sonnet-4-5`) |
| Styling | Inline styles with CSS custom properties for theming |
| Storage | Browser localStorage |
| Audio | Web Audio API |
| Deployment | Vercel |

---

## Architecture

```
focusbuddy/
├── api/
│   └── chat.js              # Serverless proxy — keeps API key off the client
├── src/
│   ├── App.jsx              # State management and screen router
│   ├── constants.js         # Design tokens, theme CSS, shared styles
│   ├── hooks/
│   │   ├── useLocalStorage.js   # Persistent state across sessions
│   │   └── useSound.js          # Web Audio API ambient sounds
│   ├── components/
│   │   ├── GoalRing.jsx         # Circular SVG progress indicator
│   │   ├── MoodChart.jsx        # SVG bar chart for mood trends
│   │   ├── MoodPicker.jsx       # Emoji mood selector
│   │   ├── TimerRing.jsx        # Animated SVG countdown ring
│   │   └── Toggle.jsx           # Toggle switch
│   └── screens/
│       ├── Welcome.jsx
│       ├── Consent.jsx
│       ├── Setup.jsx
│       ├── Dashboard.jsx
│       ├── PreSprint.jsx
│       ├── Timer.jsx
│       ├── PostSprint.jsx
│       ├── Result.jsx
│       ├── History.jsx
│       └── Settings.jsx
└── index.html
```

The API key never touches the browser. The React app calls `/api/chat` (our own backend), which attaches the key server-side and forwards the request to Anthropic. This is a standard production security pattern for AI-integrated web apps.

---

## Running Locally

```bash
git clone https://github.com/bjamesc24/focusbuddy.git
cd focusbuddy
npm install
cp .env.example .env
# Add your ANTHROPIC_API_KEY to .env
npm run dev
```

> The `/api/chat` route only works when deployed to Vercel. For local development the app falls back gracefully — all other features work fully offline.

---

## Research Background

This project draws on published research examining digital interventions for ADHD:

- **Pomodoro Technique** — structured time-boxing to reduce task initiation friction
- **CBT self-monitoring** — mood check-ins before and after tasks to build metacognitive awareness
- **Positive reinforcement loops** — immediate, specific feedback after task completion
- **Ethics of mental health apps** — privacy-first design, no diagnostic claims, clear data transparency

---

## Roadmap

- [ ] Screenshots and demo GIF in README
- [ ] Mobile responsive layout
- [ ] SMS study-buddy nudges via Twilio
- [ ] Weekly summary email digest
- [ ] Shareable streak cards

---

## License

MIT

---

*Study aid — not medical advice. Built at Bellevue College.*
