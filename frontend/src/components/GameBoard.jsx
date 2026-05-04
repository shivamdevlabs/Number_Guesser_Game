import { useState, useRef, useEffect } from 'react'

const FEEDBACK_CONFIG = {
  low: {
    emoji: '😁',
    message: 'Too low! Go higher.',
    className: 'feedback-low',
    barClass: 'bar-low',
  },
  high: {
    emoji: '🤨',
    message: 'Too high! Go lower.',
    className: 'feedback-high',
    barClass: 'bar-high',
  },
  correct: {
    emoji: '👍',
    message: "You got it!",
    className: 'feedback-correct',
    barClass: 'bar-correct',
  },
}

export default function GameBoard({ gameState, feedback, attempts, loading, error, onGuess, onPlayAgain }) {
  const [inputValue, setInputValue] = useState('')
  const [shake, setShake] = useState(false)
  const inputRef = useRef(null)

  useEffect(() => {
    if (gameState === 'playing' && !loading) {
      inputRef.current?.focus()
    }
  }, [gameState, loading, feedback])

  const handleSubmit = (e) => {
    e.preventDefault()
    const num = parseInt(inputValue, 10)
    if (isNaN(num) || num < 1 || num > 1000) {
      setShake(true)
      setTimeout(() => setShake(false), 500)
      return
    }
    onGuess(num)
    setInputValue('')
  }

  const fb = feedback ? FEEDBACK_CONFIG[feedback.result] : null

  return (
    <div className="game-card glass">
      {/* Attempts counter */}
      <div className="attempts-row">
        <div className="attempts-pill">
          <span className="attempts-icon">🎲</span>
          <span>{attempts} {attempts === 1 ? 'Attempt' : 'Attempts'}</span>
        </div>
      </div>

      {/* Feedback area */}
      <div className={`feedback-area ${fb ? fb.className : ''} ${feedback ? 'has-feedback' : ''}`}>
        {gameState === 'idle' && (
          <div className="feedback-idle">
            <span className="feedback-emoji">🎯</span>
            <p>Starting game…</p>
          </div>
        )}
        {gameState === 'playing' && !feedback && (
          <div className="feedback-idle">
            <span className="feedback-emoji">🤔</span>
            <p>Make your first guess!</p>
          </div>
        )}
        {gameState === 'playing' && fb && (
          <div className="feedback-content animate-pop">
            <span className="feedback-emoji">{fb.emoji}</span>
            <p className="feedback-msg">{fb.message}</p>
            <p className="feedback-sub">Your guess: <strong>{feedback.guess}</strong></p>
          </div>
        )}
        {gameState === 'won' && (
          <div className="feedback-content animate-pop">
            <span className="feedback-emoji win-emoji">🎉</span>
            <p className="feedback-msg win-msg">Congratulations!</p>
            <p className="feedback-sub">
              You guessed <strong>{feedback.guess}</strong> correctly in <strong>{attempts} {attempts === 1 ? 'attempt' : 'attempts'}</strong>!
            </p>
          </div>
        )}
      </div>

      {/* Guess input */}
      {gameState === 'playing' && (
        <form className="guess-form" onSubmit={handleSubmit}>
          <div className={`input-wrapper ${shake ? 'shake' : ''}`}>
            <input
              ref={inputRef}
              id="guess-input"
              type="number"
              className="guess-input"
              placeholder="Enter 1 – 1000"
              value={inputValue}
              min={1}
              max={1000}
              onChange={(e) => setInputValue(e.target.value)}
              disabled={loading}
              autoComplete="off"
            />
            <button
              id="submit-guess-btn"
              type="submit"
              className="guess-btn"
              disabled={loading || !inputValue}
            >
              {loading ? <span className="spinner" /> : 'Guess →'}
            </button>
          </div>
          {error && <p className="error-msg">⚠️ {error}</p>}
        </form>
      )}

      {/* Play again */}
      {gameState === 'won' && (
        <div className="won-actions">
          <button
            id="play-again-btn"
            className="play-again-btn"
            onClick={onPlayAgain}
            disabled={loading}
          >
            {loading ? <span className="spinner" /> : '🔄 Play Again'}
          </button>
        </div>
      )}

      {/* Range hint bar */}
      {gameState === 'playing' && (
        <div className="hint-bar-wrapper">
          <span className="hint-label">1</span>
          <div className="hint-track">
            <div className={`hint-fill ${fb ? fb.barClass : ''}`} />
          </div>
          <span className="hint-label">1000</span>
        </div>
      )}
    </div>
  )
}
