import { shuffle } from './ArrayUtils';

const BOARD_DIMENSION = 9;
const QUADRANT_DIMENSION = 3;
const LIMIT = BOARD_DIMENSION * BOARD_DIMENSION;

export enum LEVEL {
  EASY = 1,
  MEDIUM = 5,
  HARD = 10,
}

const generateRandomNumbers = () => shuffle([1, 2, 3, 4, 5, 6, 7, 8, 9]);

const rowHasNumber = (row: number[], number: number) =>
  row.some((rowNumber) => rowNumber === number);

const colHasNumber = (board: number[][], col: number, number: number) =>
  board.some((row) => row[col] === number);

const quadrantHasNumber = (
  board: number[][],
  row: number,
  col: number,
  value: number,
) => {
  const quadStartRow = row - (row % QUADRANT_DIMENSION);
  const quadStartCol = col - (col % QUADRANT_DIMENSION);

  let i = quadStartRow;
  let found = false;

  while (i < quadStartRow + QUADRANT_DIMENSION && !found) {
    for (let j = quadStartCol; j < quadStartCol + QUADRANT_DIMENSION; ++j) {
      found = board[i][j] === value && (i !== row || j !== col);
      if (found) break;
    }

    ++i;
  }

  return found;
};

export const isValidMove = (
  board: number[][],
  row: number,
  col: number,
  num: number,
) =>
  !rowHasNumber(board[row], num) &&
  !colHasNumber(board, col, num) &&
  !quadrantHasNumber(board, row, col, num);

export const isFilled = (board: number[][]) => {
  if (!board) return false;
  return !board.some((row) => row.some((col) => col === 0));
};

export const createBoard = (): number[][] =>
  new Array(BOARD_DIMENSION)
    .fill(null)
    .map((row) => new Array(BOARD_DIMENSION).fill(0));

export const fillBoard = (board: number[][]): boolean => {
  let row = 0;
  let col = 0;

  for (let i = 0; i < LIMIT; ++i) {
    row = Math.floor(i / BOARD_DIMENSION);
    col = i % BOARD_DIMENSION;

    // find next empty cell
    if (board[row][col] !== 0) continue;

    const numbers = generateRandomNumbers();

    for (let j = 0; j < numbers.length; ++j) {
      if (isValidMove(board, row, col, numbers[j])) {
        board[row][col] = numbers[j];

        if (isFilled(board) || fillBoard(board)) {
          return true;
        }
      }
    }

    // if we get to this point, it means that there was no valid number for this cell
    // OR that we were on a next cell and fillBoard for it returned false (no valid numbers for that cell)
    // In this case, we stop going forward and reset the value of the current cell, because it means we
    // need to back track until we find a valid number
    break;
  }

  board[row][col] = 0;
  return false;
};

// Try to fill the empty spaces of the board with valid numbers.
// after filling, we count how many solutions
export const solveBoard = (board: number[][]): number => {
  let count = 0;

  const solve = (board: number[][]): boolean => {
    let row = 0;
    let col = 0;

    for (let i = 0; i < LIMIT; ++i) {
      row = Math.floor(i / BOARD_DIMENSION);
      col = i % BOARD_DIMENSION;

      // we are interested on empty cells
      if (board[row][col] !== 0) continue;

      const numbers = generateRandomNumbers();

      for (let j = 0; j < numbers.length; ++j) {
        if (isValidMove(board, row, col, numbers[j])) {
          board[row][col] = numbers[j];

          if (isFilled(board)) {
            ++count;
            break;
          } else if (solve(board)) {
            return true;
          }
        }
      }

      break;
    }

    board[row][col] = 0;
    return false;
  };

  solve(board);
  return count;
};

export const generateSudoku = (level: LEVEL) => {
  const board = createBoard();
  fillBoard(board);

  // after filling a valid board, we do:
  // remove one random number from the board, until we have a case of two solutions.
  // Then, we re-add the last number we removed and try again by the amount of retries specified in LEVEL.
  let attempts = level;

  while (attempts > 0) {
    // choose one random non-empty cell to remove the value
    let row = Math.floor(Math.random() * BOARD_DIMENSION);
    let col = Math.floor(Math.random() * BOARD_DIMENSION);

    while (board[row][col] === 0) {
      row = Math.floor(Math.random() * BOARD_DIMENSION);
      col = Math.floor(Math.random() * BOARD_DIMENSION);
    }

    const bkp = board[row][col];
    board[row][col] = 0;

    const boardCopy = board.map((row) => [...row]);
    const count = solveBoard(boardCopy);

    if (count > 1) {
      board[row][col] = bkp;
      attempts--;
    }
  }

  return board;
};

export const isWin = (board: number[][]) => {
  return (
    isFilled(board) &&
    board.some((row, r) =>
      row.some((number, c) => !isValidMove(board, r, c, number)),
    )
  );
};
