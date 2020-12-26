import React, { useEffect } from 'react';
import Board from './Components/Board';
import useTimer from './CustomHooks/UseTimer';
import { generateSudoku, isWin, LEVEL } from './Helpers/Sudoku';

import './App.css';

function App() {
  const [fixedBoard, setFixedBoard] = React.useState<number[][]>([]);
  const [board, setBoard] = React.useState<number[][]>([]);
  const [win, setWin] = React.useState(false);
  const [time, startTimer, stopTimer] = useTimer();

  const startNewGame = React.useCallback(() => {
    const newBoard = generateSudoku(LEVEL.MEDIUM);
    setFixedBoard(newBoard);
    setBoard(newBoard.map((row) => [...row]));
    setWin(false);
    startTimer();
  }, []);

  useEffect(() => startNewGame(), [startNewGame]);

  const onRestartGame = () => {
    setBoard(fixedBoard.map((row) => [...row]));
    setWin(false);
    startTimer();
  };

  const onPlayNumberInCell = React.useCallback(
    (value: number, row: number, col: number) => {
      if (board[row][col] === value || fixedBoard[row][col] !== 0) return;

      const newBoard = board.map((row) => [...row]);
      newBoard[row][col] = value;
      setBoard(newBoard);
    },
    [setBoard, board, fixedBoard],
  );

  const onCheckGame = () => {
    const won = isWin(board);

    if (won) {
      stopTimer();
    }

    setWin(won);
  };

  const formatTime = (timestamp: number) => {
    return Intl.DateTimeFormat('default', {
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
      timeZone: 'UTC',
    }).format(timestamp);
  };

  return (
    <div className="App">
      <Board
        board={board}
        fixedBoard={fixedBoard}
        onPlay={onPlayNumberInCell}
      />
      <section className="control-area">
        <button className="btn" onClick={startNewGame}>
          New game
        </button>
        <button className="btn" onClick={onCheckGame}>
          CHECK
        </button>
        <button className="btn" onClick={onRestartGame}>
          RESTART
        </button>
        <span className="timer">{formatTime(time)}</span>
        <h1 style={{ color: win ? 'green' : 'red', textAlign: 'center' }}>
          {win ? 'WIN!' : 'NOT YET!'}
        </h1>
      </section>
    </div>
  );
}

export default App;
