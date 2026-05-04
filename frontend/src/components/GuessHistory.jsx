const RESULT_META = {
  low:     { icon: '⬆️', label: 'Too Low',  cls: 'hist-low' },
  high:    { icon: '⬇️', label: 'Too High', cls: 'hist-high' },
  correct: { icon: '✅', label: 'Correct!', cls: 'hist-correct' },
}

export default function GuessHistory({ history }) {
  if (history.length === 0) {
    return (
      <div className="history-card glass">
        <h2 className="history-title">📜 Guess History</h2>
        <div className="history-empty">
          <span>No guesses yet. Start playing!</span>
        </div>
      </div>
    )
  }

  return (
    <div className="history-card glass">
      <h2 className="history-title">📜 Guess History</h2>
      <div className="history-list">
        {history.map((entry, idx) => {
          const meta = RESULT_META[entry.result]
          return (
            <div
              key={idx}
              className={`history-item ${meta.cls} animate-slide`}
              style={{ animationDelay: `${idx * 0.03}s` }}
            >
              <div className="hist-attempt">#{entry.attempt}</div>
              <div className="hist-guess">{entry.guess}</div>
              <div className="hist-result">
                <span className="hist-icon">{meta.icon}</span>
                <span className="hist-label">{meta.label}</span>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
