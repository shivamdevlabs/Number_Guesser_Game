import { useState, useEffect, useCallback } from 'react'
import GameBoard from './components/GameBoard'
import GuessHistory from './components/GuessHistory'

export default function App() {
  const [gameState, setGameState] = useState('idle') // idle | playing | won
  const [attempts, setAttempts] = useState(0)
  const [feedback, setFeedback] = useState(null) // { result, guess, attempts }
  const [history, setHistory] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [totalWins, setTotalWins] = useState(0)

  const startNewGame = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const res = await fetch('/api/new-game', { method: 'POST', credentials: 'include' })
      if (!res.ok) throw new Error('Failed to start game')
      setGameState('playing')
      setAttempts(0)
      setFeedback(null)
      setHistory([])
    } catch (err) {
      setError('Could not connect to the server. Make sure the backend is running.')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    startNewGame()
  }, [startNewGame])

  const submitGuess = async (guess) => {
    if (gameState !== 'playing' || loading) return
    setLoading(true)
    setError(null)
    try {
      const res = await fetch('/api/guess', {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ guess }),
      })
      const data = await res.json()
      if (!res.ok) {
        setError(data.error || 'Something went wrong.')
        return
      }

      const entry = { guess: data.guess, result: data.result, attempt: data.attempts }
      setHistory((prev) => [entry, ...prev])
      setAttempts(data.attempts)
      setFeedback(data)

      if (data.result === 'correct') {
        setGameState('won')
        setTotalWins((w) => w + 1)
      }
    } catch (err) {
      setError('Network error. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="app">
      {/* Animated background orbs */}
      <div className="bg-orb orb-1" />
      <div className="bg-orb orb-2" />
      <div className="bg-orb orb-3" />

      <div className="container">
        <header className="header">
          <div className="logo">🎯</div>
          <h1>Number Guesser</h1>
          <p className="subtitle">Crack the secret number between <strong>1</strong> and <strong>1000</strong></p>
          {totalWins > 0 && (
            <div className="wins-badge">🏆 {totalWins} {totalWins === 1 ? 'Win' : 'Wins'}</div>
          )}
        </header>

        <main className="main-layout">
          <GameBoard
            gameState={gameState}
            feedback={feedback}
            attempts={attempts}
            loading={loading}
            error={error}
            onGuess={submitGuess}
            onPlayAgain={startNewGame}
          />
          <GuessHistory history={history} />
        </main>

        <footer className="footer">
          <p>
            &copy; {new Date().getFullYear()}{' '}
            <a
              href="https://www.instagram.com/shivamsrivastava.dev"
              target="_blank"
              rel="noopener noreferrer"
              className="footer-link"
              id="instagram-link"
            >
              @shivamsrivastava.dev
            </a>
          </p>
        </footer>
      </div>
    </div>
  )
}
