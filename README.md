# 🎯 Number Guesser — Web Application

A full-stack web application converted from a CLI Python guessing game. Built with **React.js** (frontend) and **Python Flask** (backend), featuring a dark glassmorphism UI with real-time feedback and guess history.

![License](https://img.shields.io/badge/license-MIT-blue)
![Python](https://img.shields.io/badge/Python-3.10%2B-blue?logo=python)
![React](https://img.shields.io/badge/React-19-61DAFB?logo=react)
![Flask](https://img.shields.io/badge/Flask-3.x-black?logo=flask)
![Vite](https://img.shields.io/badge/Vite-8.x-646CFF?logo=vite)

---

## 📌 About

Guess the secret number between **1 and 1000**. The secret number lives server-side in a Flask session — it is **never sent to the browser**, making the game cheat-proof.

**Key features:**
- 😁 / 🤨 / 👍 real-time feedback on every guess
- 📜 Color-coded guess history panel (blue = too low, orange = too high, green = correct)
- 🎲 Live attempt counter
- 📊 Range hint bar that updates with each guess direction
- 🔄 Play Again — starts a fresh game without reloading the page
- 🏆 Total wins badge accumulates across rounds
- ✨ Animated dark glassmorphism UI with floating orbs and smooth transitions

---

## 🗂️ Project Structure

```
guessing_game/
├── main.py                         ← Original CLI game (Python)
│
├── backend/                        ← Flask REST API
│   ├── app.py                      ← API routes & session management
│   └── requirements.txt            ← Python dependencies
│
└── frontend/                       ← React + Vite app
    ├── index.html                  ← Entry HTML (Google Fonts + SEO meta)
    ├── vite.config.js              ← Vite config + API proxy
    ├── package.json
    └── src/
        ├── main.jsx                ← React entry point
        ├── App.jsx                 ← Root component & game state
        ├── App.css                 ← Full dark glassmorphism theme
        └── components/
            ├── GameBoard.jsx       ← Input, feedback, play-again button
            └── GuessHistory.jsx    ← Scrollable color-coded guess log
```

---

## 🛠️ Tech Stack

| Layer     | Technology        | Version |
|-----------|-------------------|---------|
| Frontend  | React.js          | 19.x    |
| Bundler   | Vite              | 8.x     |
| Backend   | Python Flask      | 3.x     |
| CORS      | Flask-CORS        | 6.x     |
| Styling   | Vanilla CSS       | —       |
| Font      | Outfit (Google)   | —       |

---

## ⚙️ Getting Started

### Prerequisites

- **Python 3.10+** — [Download](https://python.org)
- **Node.js 18+** — [Download](https://nodejs.org)

---

### 1. Clone the Repository

```bash
git clone https://github.com/shivamdevlabs/Number_Guesser_Game.git
cd Number_Guesser_Game
```

---

### 2. Set Up the Backend

```bash
cd backend

# Install Python dependencies
pip install -r requirements.txt

# Start the Flask server (runs on port 5000)
python app.py
```

You should see:
```
* Running on http://127.0.0.1:5000
```

---

### 3. Set Up the Frontend

Open a **second terminal**:

```bash
cd frontend

# Install Node dependencies
npm install

# Start the Vite dev server (runs on port 5173)
npm run dev
```

You should see:
```
VITE ready in ...ms
➜  Local: http://localhost:5173/
```

---

### 4. Open the App

Navigate to **[http://localhost:5173](http://localhost:5173)** in your browser. The game will start automatically!

> **Note:** Both terminals must be running at the same time. The React frontend proxies `/api/*` requests to the Flask backend on port `5000` — no manual CORS setup needed.

---

## 🔌 API Reference

Base URL: `http://127.0.0.1:5000`

| Method | Endpoint        | Description                             | Body              |
|--------|-----------------|-----------------------------------------|-------------------|
| `POST` | `/api/new-game` | Starts a new game, sets secret number   | —                 |
| `POST` | `/api/guess`    | Submit a guess, returns feedback        | `{ "guess": 500 }` |
| `GET`  | `/api/status`   | Returns whether a game is active        | —                 |

### Example Response — `POST /api/guess`

```json
{
  "result": "low",
  "attempts": 3,
  "guess": 400
}
```

`result` is one of: `"low"` | `"high"` | `"correct"`

---

## 🎮 How to Play

1. The app automatically generates a secret number between **1 and 1000** when the page loads.
2. Type your guess into the input field and click **Guess →** (or press `Enter`).
3. Read the feedback:
   - 😁 **Too low!** — try a higher number
   - 🤨 **Too high!** — try a lower number
   - 👍 **Correct!** — you win!
4. All your guesses appear in the **Guess History** panel on the right.
5. Click **Play Again** to start a new round with a fresh secret number.

---

## 📁 Running the Original CLI Game

The original Python CLI game is still intact:

```bash
python main.py
```

---

## 👤 Author

**Shivam Srivastava**
- Instagram: [@shivamsrivastava.dev](https://www.instagram.com/shivamsrivastava.dev)
- GitHub: [shivamdevlabs](https://github.com/shivamdevlabs)

---

## 📄 License

This project is licensed under the **MIT License**.
