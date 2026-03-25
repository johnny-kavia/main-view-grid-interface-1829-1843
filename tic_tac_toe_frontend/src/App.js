import React, { useMemo, useState } from "react";

const PLAYER_X = "X";
const PLAYER_O = "O";

const WINNING_LINES = [
  // rows
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  // cols
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  // diagonals
  [0, 4, 8],
  [2, 4, 6],
];

function calculateWinner(squares) {
  for (const [a, b, c] of WINNING_LINES) {
    const v = squares[a];
    if (v && v === squares[b] && v === squares[c]) {
      return { winner: v, line: [a, b, c] };
    }
  }
  return { winner: null, line: null };
}

function isDraw(squares) {
  return squares.every(Boolean);
}

function getNextPlayer(current) {
  return current === PLAYER_X ? PLAYER_O : PLAYER_X;
}

function Square({ value, onClick, disabled, highlight }) {
  return (
    <button
      type="button"
      className={[
        "ttt-square",
        disabled ? "ttt-square--disabled" : "",
        highlight ? "ttt-square--highlight" : "",
        value === PLAYER_X ? "ttt-square--x" : "",
        value === PLAYER_O ? "ttt-square--o" : "",
      ]
        .filter(Boolean)
        .join(" ")}
      onClick={onClick}
      disabled={disabled}
      aria-label={value ? `Square: ${value}` : "Empty square"}
    >
      <span className="ttt-square__value" aria-hidden="true">
        {value}
      </span>
    </button>
  );
}

export default function App() {
  const [squares, setSquares] = useState(() => Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);

  const nextPlayer = xIsNext ? PLAYER_X : PLAYER_O;

  const { winner, line } = useMemo(
    () => calculateWinner(squares),
    [squares],
  );

  const draw = useMemo(() => !winner && isDraw(squares), [winner, squares]);
  const gameOver = Boolean(winner) || draw;

  const statusText = useMemo(() => {
    if (winner) return `${winner} wins`;
    if (draw) return "Draw";
    return `${nextPlayer}'s turn`;
  }, [winner, draw, nextPlayer]);

  function handleSquareClick(index) {
    if (gameOver) return;
    if (squares[index]) return;

    setSquares((prev) => {
      const copy = [...prev];
      copy[index] = nextPlayer;
      return copy;
    });
    setXIsNext((prev) => !prev);
  }

  function restartGame() {
    setSquares(Array(9).fill(null));
    setXIsNext(true);
  }

  return (
    <div className="ttt-page">
      <main className="ttt-shell" aria-label="Tic Tac Toe">
        <header className="ttt-header">
          <h1 className="ttt-title">Tic Tac Toe</h1>
          <p className="ttt-subtitle">Local two-player</p>
        </header>

        <section className="ttt-card" aria-label="Game">
          <div className="ttt-status" role="status" aria-live="polite">
            <span className="ttt-status__label">Status</span>
            <span className="ttt-status__value">{statusText}</span>
          </div>

          <div className="ttt-grid" role="grid" aria-label="3 by 3 board">
            {squares.map((value, idx) => (
              <Square
                key={idx}
                value={value}
                onClick={() => handleSquareClick(idx)}
                disabled={Boolean(value) || gameOver}
                highlight={Boolean(line && line.includes(idx))}
              />
            ))}
          </div>

          <div className="ttt-actions">
            <button
              type="button"
              className="ttt-restart"
              onClick={restartGame}
            >
              Restart
            </button>
            <div className="ttt-hint" aria-hidden="true">
              First move: <strong>X</strong>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
