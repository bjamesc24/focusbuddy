# FocusBuddy ⏱

> AI-powered focus sprints for ADHD students.

**[Live Demo →](https://focusbuddy-phi.vercel.app)**

---

## What it does

FocusBuddy helps ADHD students stay on task with 25-minute focus sprints (Pomodoro technique), pre/post mood check-ins, and personalized AI encouragement powered by Anthropic Claude.

## Tech stack

- **Frontend** — React, Vite
- **Backend** — Vercel serverless functions
- **AI** — Anthropic Claude API

## Project structure

```
focusbuddy/
├── api/
│   └── chat.js       # Serverless proxy — keeps API key off the client
├── src/
│   ├── App.jsx       # Main React component
│   └── main.jsx      # React entry point
├── .env.example      # Required environment variables
└── index.html
```

## Running locally

```bash
npm install
cp .env.example .env
# Add your ANTHROPIC_API_KEY to .env
npm run dev
```

## Background

Built as a final project for CS 401. Research-backed: combines Pomodoro time-boxing with CBT-derived mood tracking. See the [project write-up](#) for the full literature review.

---

*Study aid — not medical advice.*
