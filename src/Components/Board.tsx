import React, { FormEvent } from "react";
import Cell from './Cell';

import './Board.css';

interface BoardProps {
  dimension: number;
}

const createInitialBoard = (dimension: number) => (
  new Array(dimension).fill(null).map(row => new Array(dimension).fill(0))
);

const Board = ({ dimension }: BoardProps) => {
  const [board, setBoard] = React.useState(createInitialBoard(dimension));

  const onEditNumber = React.useCallback(
    (value: number, row: number, col: number) => {
      if (board[row][col] === value) return;

      const newBoard = [...board];
      newBoard[row][col] = value;
      setBoard(newBoard);
    }, [setBoard, board]);

  const _renderRow = (row: number[], rowIdx: number) => {
    return (
      <div className='row' key={ rowIdx }>
        { row.map((value, colIdx) => _renderCel(value, rowIdx, colIdx)) }
      </div>
    );
  }

  const _renderCel = (value: number, rowIdx: number, colIdx: number) => {
    return (
      <Cell key={ colIdx } 
        className='Cell'
        value={ value } 
        row={ rowIdx } 
        col={ colIdx } 
        onSetValue={ onEditNumber }/>
    );
  };

  return (
    <section className='Board'>
      { board.map((row, rowIdx) => _renderRow(row, rowIdx)) }
    </section>
  );
};

export default Board;
