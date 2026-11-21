# One Step

A small web app for people who get overwhelmed by big tasks. You type a task, One Step splits it into small steps, and shows **only one step at a time** with a gentle focus timer. Built for the Devpost **Taskforge** hackathon (accessible tools that help people focus, organize, and get more done).

## Run it

No install needed. Open `index.html` in a browser (Chrome or Edge works best for voice features).

Or run a local server:

```
python3 -m http.server 8000
```

then visit http://localhost:8000



## Features

- **Task breaker:** turns a task into 3–6 small steps (rule-based, works offline). Recognises study, assignment, coding, cleaning and email tasks, with a generic fallback.
- **One step at a time:** a single large card, a progress bar, and buttons for "I did this step", "Back", and "Do this later".
- **Gentle focus timer:** suggested time per step, start/pause/reset/+5 min, and a soft chime (no harsh alarm). Can be turned off.
- **Edit your steps:** add or remove steps in "See all steps".
- **English and Urdu**, including right-to-left layout.
- **Voice:** read each step aloud, and speak your task (where the browser supports it).
- **Remembers your progress** in the browser (localStorage). Nothing leaves your device.

## Accessibility

- Works fully with the keyboard; "Skip to main content" link; clear visible focus outline.
- Screen reader support: labelled controls, `aria-current` on the current step, a polite live region for announcements, focus moves to each new step.
- Settings: text size (up to 150%), easy-read font with wider spacing, extra line spacing, light / dark / high-contrast colours, reduce motion.
- Respects the system's dark mode, high contrast and reduced-motion preferences on first visit.
- Large touch targets (at least 48px) and no time pressure: the timer is optional and never blocks you.

## Files

| File | What it does |
| --- | --- |
| `index.html` | Page structure |
| `style.css` | Themes, text size, spacing, focus styles |
| `app.js` | Step templates, language text, timer, voice, saving |

## Ideas for later

- Connect an AI model to write steps for any kind of task.
- Install as a phone app (PWA) and work fully offline.
- More languages.
