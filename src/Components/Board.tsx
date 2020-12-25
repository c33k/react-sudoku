import React from 'react';
import Cell from './Cell';
import { generateSudoku, LEVEL } from '../Helpers/Sudoku';

import './Board.css';

const Board = () => {
  const [board, setBoard] = React.useState<number[][]>([]);

  // on the first time we open the game, we want to fill the board
  React.useEffect(() => {
    const newBoard = generateSudoku(LEVEL.MEDIUM);
    setBoard(newBoard);
  }, []);

  const onPlayNumberInCell = React.useCallback(
    (value: number, row: number, col: number) => {
      if (board[row][col] === value) return;

      const newBoard = [...board];
      newBoard[row][col] = value;
      setBoard(newBoard);
    },
    [setBoard, board],
  );

  const _renderRow = (row: number[], rowIdx: number) => {
    return (
      <div className="row" key={rowIdx}>
        {row.map((value, colIdx) => _renderCel(value, rowIdx, colIdx))}
      </div>
    );
  };

  const _renderCel = (value: number, rowIdx: number, colIdx: number) => {
    return (
      <Cell
        key={colIdx}
        className="Cell"
        value={value}
        row={rowIdx}
        col={colIdx}
        onSetValue={onPlayNumberInCell}
      />
    );
  };

  return (
    <section className="Board">
      {board.map((row, rowIdx) => _renderRow(row, rowIdx))}
    </section>
  );
};

export default Board;
