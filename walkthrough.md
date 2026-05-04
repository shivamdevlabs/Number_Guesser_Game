# Number Guesser — Web App Walkthrough

## What Was Built

The CLI Python guessing game was converted into a full-stack web application:

| Layer | Technology | Port |
|---|---|---|
| Frontend | React + Vite | 5173 |
| Backend | Python Flask | 5000 |

---

## Screenshots

### Initial State (Game Ready)
![Initial state of the app](file:///C:/Users/shiva/.gemini/antigravity/brain/bd0822e3-e1a7-424b-87aa-40fd21d7caaa/initial_state_refresh_1777922009980.png)

### After a Guess (Feedback + History)
![After guessing 400 — Too Low feedback and history panel](file:///C:/Users/shiva/.gemini/antigravity/brain/bd0822e3-e1a7-424b-87aa-40fd21d7caaa/after_guess_400_1777921980130.png)

---

## File Structure

```
guessing_game/
├── main.py                        ← Original CLI game (untouched)
├── backend/
│   ├── app.py                     ← Flask REST API
│   └── requirements.txt
└── frontend/
    ├── index.html                 ← Google Fonts + SEO meta
    ├── vite.config.js             ← Proxy /api → Flask 127.0.0.1:5000
    └── src/
        ├── main.jsx
        ├── App.jsx                ← Game state management
        ├── App.css                ← Glassmorphism dark theme
        └── components/
            ├── GameBoard.jsx      ← Input, feedback, play-again
            └── GuessHistory.jsx   ← Color-coded guess log
```

---

## How to Run

**Terminal 1 — Flask Backend:**
```powershell
cd d:\My-Codebase\guessing_game\backend
C:/Users/shiva/AppData/Local/Python/bin/python.exe app.py
```

**Terminal 2 — React Frontend:**
```powershell
cd d:\My-Codebase\guessing_game\frontend
npm run dev
```

Then open: **http://localhost:5173**

---

## Features Implemented

- ✅ Game auto-starts on page load
- ✅ Input validation with shake animation on invalid entry
- ✅ Real-time feedback: 😁 Too low / 🤨 Too high / 👍 Correct
- ✅ Attempt counter
- ✅ Range hint bar updates with each guess direction
- ✅ Color-coded Guess History panel (blue=low, orange=high, green=correct)
- ✅ "Play Again" button resets game state (new random number from Flask)
- ✅ Total wins badge accumulates across rounds
- ✅ Secret number **never sent to the browser** — stored in Flask session
- ✅ Dark glassmorphism UI with animated background orbs, gradient text, smooth transitions
