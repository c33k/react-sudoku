import React from "react";

import './Board.css';

interface BoardProps {
  dimension: number;
}

const createInitialBoard = (dimension: number) => (
  new Array(dimension).fill(null).map(row => new Array(dimension).fill(0))
);

const Board = (props: BoardProps) => {
  const [board] = React.useState(createInitialBoard(props.dimension));

  return (
    <section className='Board'>
      { board.map((row, rowIdx) => _renderRow(row, rowIdx)) }
    </section>
  );
};

function _renderRow(row: number[], rowIdx: number) {
  return (
    <div className='row' key={ rowIdx }>
      { row.map((value, colIdx) => _renderCol(value, rowIdx, colIdx)) }
    </div>
  );
}

function _renderCol(value: number, rowIdx: number, colIdx: number) {
  // TODO: when click, change from span to input
  return (
    <div className='col' key={ colIdx }>
      <span>{ value > 0 ? value : '' }</span>
    </div>    
  );
}

export default Board;
