import React, { useEffect } from 'react';
import Board from './Components/Board';
import useTimer from './CustomHooks/UseTimer';
import { generateSudoku, isWin, LEVEL } from './Helpers/Sudoku';

import './App.css';

function App() {
  const [fixedBoard, setFixedBoard] = React.useState<number[][]>([]);
  const [board, setBoard] = React.useState<number[][]>([]);
  const [win, setWin] = React.useState(false);
  const [currentLevel, setCurrentLevel] = React.useState<number>(LEVEL.EASY);
  const [level, setLevel] = React.useState<number>(currentLevel);
  const [time, startTimer, stopTimer] = useTimer();

  const startNewGame = React.useCallback(() => {
    const newBoard = generateSudoku(level);
    setCurrentLevel(level);
    setFixedBoard(newBoard);
    setBoard(newBoard.map((row) => [...row]));
    setWin(false);
    startTimer();
  }, [level, startTimer]);

  useEffect(() => startNewGame(), []);

  const onRestartGame = () => {
    setBoard(fixedBoard.map((row) => [...row]));
    setWin(false);
    startTimer();
    setCurrentLevel(level);
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

  const onChangeLevel = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLevel(Number(event.target.value));
  };

  const formatTime = (timestamp: number) => {
    return Intl.DateTimeFormat('default', {
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
      timeZone: 'UTC',
    }).format(timestamp);
  };

  const getLevelName = (level: LEVEL) => {
    if (level === LEVEL.EASY) {
      return 'EASY';
    }

    return level === LEVEL.MEDIUM ? 'MEDIUM' : 'HARD';
  };

  return (
    <div className="App">
      <Board
        board={board}
        fixedBoard={fixedBoard}
        onPlay={onPlayNumberInCell}
      />
      <section className="control-area">
        <h2>Current level: {getLevelName(currentLevel)}</h2>
        <h3>Level: {getLevelName(level)}</h3>
        <input
          type="range"
          list="tickmarks"
          name="levels"
          min={LEVEL.EASY}
          max={LEVEL.HARD}
          step="5"
          className="levelslider"
          value={level}
          onChange={onChangeLevel}
        />
        <datalist id="tickmarks">
          <option value={LEVEL.EASY} label="EASY"></option>
          <option value={LEVEL.MEDIUM} label="MEDIUM"></option>
          <option value={LEVEL.HARD} label="HARD"></option>
        </datalist>
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
          {win ? 'WIN!' : ''}
        </h1>
      </section>
    </div>
  );
}

export default App;
