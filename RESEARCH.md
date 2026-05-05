# Research Background

This document outlines the academic research and design rationale behind FocusBuddy.

---

## Problem Statement

People with ADHD lose productive work time because distractions derail sustained focus and time-awareness. FocusBuddy addresses this by combining externally-timed work sprints, mood self-monitoring, and AI-generated reinforcement into a single lightweight tool.

---

## User Stories

| Feature | Story |
|---|---|
| Sprint timer | As a user, I want a single tap to start a 25-min sprint so I don't waste willpower on setup. |
| Break cue | As a user, I want a gentle prompt to stand up after a sprint so I can reset my attention. |
| Progress log | As a user, I want a daily streak view so I can see tangible evidence of consistency. |
| Mood check-in | As a user, I want an emoji mood selector before and after each sprint so I can notice patterns. |
| Accountability nudge | As a user, I want an optional SMS to a study buddy when I finish a sprint so I feel socially reinforced. |

---

## Literature Review

People with attention-deficit/hyperactivity disorder (ADHD) consistently report lapses of sustained focus, time-blindness, and procrastination, all of which translate into lower grade-point averages and higher dropout risk compared with neurotypical peers. Digital self-management tools are attractive in this context because they can sit in the same device that so often becomes the distraction, turning a liability into a just-in-time scaffold for executive-function support. ([PubMed](https://pubmed.ncbi.nlm.nih.gov/36562860/))

### Time-boxing as a behavioral scaffold

The 25-minute "Pomodoro" cycle (work sprint + short break) externalizes time and punctuates long tasks into psychologically safer chunks. In a field study with 87 undergraduates, systematic Pomodoro breaks preserved mental effort and increased task completion relative to self-regulated, unstructured breaks, suggesting that externally timed cycles can off-load the continuous self-monitoring that taxes ADHD working memory. ([British Journal of Educational Psychology](https://bpspsychub.onlinelibrary.wiley.com/doi/10.1111/bjep.12593))

### CBT-derived self-monitoring and reflection

Cognitive-behavioral therapy (CBT) for adults with ADHD emphasizes breaking tasks into concrete steps, tracking mood, and rewarding incremental progress. A 2022 meta-analysis of 28 CBT trials reported medium-size reductions in both inattention and emotional symptoms, with gains in self-esteem and quality of life. Embedding micro-CBT elements — such as a pre/post emoji mood check-in, aligns FocusBuddy with this evidence base while keeping the intervention firmly non-clinical. ([PubMed](https://pubmed.ncbi.nlm.nih.gov/36794797/))

### Ethical and UX considerations

Digital mental-health tools face recurring critiques around efficacy claims, privacy, and scope-of-practice. A 2020 review in *Current Opinion in Psychology* highlights informed consent, data minimization, and transparent algorithms as baseline safeguards. ([Evidence Based Mentoring](https://www.evidencebasedmentoring.org/the-ethics-of-digital-mental-health-applications/))

---

## Design Rationale

The decision to build FocusBuddy grew out of two overlapping motivations: personal reliance on short, externally-timed work bursts to curb distraction, and the evidence that such micro-structures measurably help university students with ADHD stay on task.

Beyond timing, FocusBuddy promotes reflection rather than just mechanical productivity. Meta-analyses of CBT for adult ADHD emphasize breaking tasks into concrete steps, tracking mood, and rewarding incremental progress, elements that improve both attention and emotional well-being. The emoji mood check-in before and after each sprint mirrors those CBT components while keeping the product non-clinical: the app nudges self-awareness without claiming therapeutic authority.

### Key ethical design choices

- **Local-first storage** — sprint logs and mood data stay on the user's device by default
- **Data minimization** — no account required, no tracking, no analytics
- **Informed consent flow** — explicit privacy screen before any data is collected
- **One-tap data purge** — users can delete all history instantly from Settings
- **No diagnostic language** — all copy avoids clinical framing; the app states clearly throughout: *"Study aid — not medical advice"*

---

## Limitations

Timer apps cannot rewrite deep executive-function patterns, and novelty effects often fade after a few weeks. Even the strongest digital interventions for ADHD show only small-to-moderate effect sizes and rarely track long-term adherence. Future iterations may benefit from adaptive sprint lengths, social study rooms, or integration with campus learning-management systems to remain engaging over time.

---

## References

1. Insights into ADHD digital interventions — [PubMed 36562860](https://pubmed.ncbi.nlm.nih.gov/36562860/)
2. Pomodoro breaks and mental effort — [British Journal of Educational Psychology](https://bpspsychub.onlinelibrary.wiley.com/doi/10.1111/bjep.12593)
3. CBT meta-analysis for adult ADHD — [PubMed 36794797](https://pubmed.ncbi.nlm.nih.gov/36794797/)
4. Ethics of digital mental health applications — [Evidence Based Mentoring](https://www.evidencebasedmentoring.org/the-ethics-of-digital-mental-health-applications/)
