import React from 'react';
import Cell from './Cell';

import './Board.css';

interface BoardProps {
  board: number[][];
  fixedBoard: number[][];
  onPlay: (value: number, r: number, c: number) => void;
}

const Board = (props: BoardProps) => {
  const { board, fixedBoard, onPlay } = props;

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
        onSetValue={onPlay}
        disabled={fixedBoard[rowIdx][colIdx] !== 0}
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
