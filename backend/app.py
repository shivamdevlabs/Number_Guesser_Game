import random
from flask import Flask, jsonify, request, session
from flask_cors import CORS

app = Flask(__name__)
app.secret_key = "guessing_game_secret_key_2024"
app.config["SESSION_COOKIE_SAMESITE"] = "Lax"
app.config["SESSION_COOKIE_SECURE"] = False
CORS(app, origins=["http://localhost:5173"], supports_credentials=True)


@app.route("/api/new-game", methods=["POST"])
def new_game():
    """Start a new game: generate a secret number and reset attempts."""
    session["number"] = random.randint(1, 1000)
    session["attempts"] = 0
    session["game_over"] = False
    return jsonify({"message": "Game started! Guess a number between 1 and 1000."})


@app.route("/api/guess", methods=["POST"])
def guess():
    """Accept a player guess and return feedback."""
    if "number" not in session or session.get("game_over"):
        return jsonify({"error": "No active game. Start a new game first."}), 400

    data = request.get_json()
    if not data or "guess" not in data:
        return jsonify({"error": "Please provide a guess."}), 400

    try:
        player_guess = int(data["guess"])
    except (ValueError, TypeError):
        return jsonify({"error": "Guess must be an integer."}), 400

    if player_guess < 1 or player_guess > 1000:
        return jsonify({"error": "Guess must be between 1 and 1000."}), 400

    session["attempts"] += 1
    attempts = session["attempts"]
    secret = session["number"]

    if player_guess < secret:
        return jsonify({"result": "low", "attempts": attempts, "guess": player_guess})
    elif player_guess > secret:
        return jsonify({"result": "high", "attempts": attempts, "guess": player_guess})
    else:
        session["game_over"] = True
        return jsonify({"result": "correct", "attempts": attempts, "guess": player_guess})


@app.route("/api/status", methods=["GET"])
def status():
    """Return whether a game is currently active."""
    active = "number" in session and not session.get("game_over", True)
    return jsonify({"active": active, "attempts": session.get("attempts", 0)})


if __name__ == "__main__":
    app.run(debug=True, port=5000)
