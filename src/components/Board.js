import { useState, useEffect } from "react";

import BoardWrapper from "./BoardWrapper";
import Box from "./Box";

const Board = (props) => {
  const [lockedBoard, setLockedBoard] = useState(
    Array(9)
      .fill()
      .map(() => Array(9).fill(false))
  );
  const [playingBoard, setPlayingBoard] = useState(
    Array(9)
      .fill()
      .map(() => Array(9).fill(""))
  );
  const [disabledGrids, setDisabledGrids] = useState(
    Array(9)
      .fill()
      .map(() => [])
  );
  const [answerBoard, setAnswerBoard] = useState(null);
  const [solved, setSolved] = useState(false);

  useEffect(() => {
    if (props.start) {
      lockBoard();
    } else {
      clearBoard();
    }
  }, [props.start]);

  useEffect(() => {
    disableGrids();
  }, [lockedBoard]);

  useEffect(() => {
    if (props.answered) {
      solve();
    } else {
      unsolve();
    }
  }, [props.answered]);

  const lockBoard = () => {
    const newLockedBoard = [...lockedBoard];
    for (let i = 0; i < playingBoard.length; i++) {
      for (let j = 0; j < playingBoard[0].length; j++) {
        newLockedBoard[i][j] = !!playingBoard[i][j];
      }
    }
    setLockedBoard(newLockedBoard);
  };

  const clearBoard = () => {
    const emptyLockBoard = Array(9)
      .fill()
      .map(() => Array(9).fill(false));
    const emptyPlayboard = Array(9)
      .fill()
      .map(() => Array(9).fill(""));
    setLockedBoard(emptyLockBoard);
    setPlayingBoard(emptyPlayboard);
    setAnswerBoard(null);
    setSolved(false);
  };

  const disableGrids = () => {
    const newDisabledGrids = Array(9)
      .fill()
      .map(() => []);
    for (let i = 0; i < disabledGrids.length; i++) {
      const startRow = Math.floor(i / 3) * 3;
      const startCol = (i % 3) * 3;
      for (let j = startRow; j < startRow + 3; j++) {
        for (let k = startCol; k < startCol + 3; k++) {
          newDisabledGrids[i].push(lockedBoard[j][k]);
        }
      }
    }
    setDisabledGrids(newDisabledGrids);
  };

  const isValid = (board, i, j, l) => {
    for (let p = 0; p < board.length; p++) {
      if (board[i][p] === l) return false;
      if (board[p][j] === l) return false;

      let gridVal =
        board[3 * Math.floor(i / 3) + Math.floor(p / 3)][
          3 * Math.floor(j / 3) + (p % 3)
        ];
      if (gridVal === l) return false;
    }

    return true;
  };

  const solveHelper = (board) => {
    for (let i = 0; i < board.length; i++) {
      for (let j = 0; j < board.length; j++) {
        if (board[i][j] === "") {
          for (let l = 1; l < 10; l++) {
            if (isValid(board, i, j, l.toString())) {
              board[i][j] = l.toString();
              let solved = solveHelper(board);
              if (solved !== false) return solved;
              board[i][j] = "";
            }
          }
          return false;
        }
      }
    }
    return board;
  };

  const isPlayingBoardValid = () => {
    let row, col;
    for (let i = 0; i < playingBoard.length; i++) {
      row = new Set();
      col = new Set();
      for (let j = 0; j < playingBoard[0].length; j++) {
        if (!playingBoard[i][j]) continue;
        if (row.has(playingBoard[i][j])) return false;
        if (col.has(playingBoard[j][i])) return false;
        if (playingBoard[i][j]) row.add(playingBoard[i][j]);
        if (playingBoard[j][i]) col.add(playingBoard[j][i]);
      }
    }
    let box;
    for (let i = 0; i < 9; i++) {
      box = new Set();
      const startRow = Math.floor(i / 3) * 3;
      const startCol = (i % 3) * 3;
      for (let j = startRow; j < startRow + 3; j++) {
        for (let k = startCol; k < startCol + 3; k++) {
          if (box.has(playingBoard[j][k])) return false;
          if (playingBoard[j][k]) box.add(playingBoard[j][k]);
        }
      }
    }
    return true;
  };
  const solve = () => {
    if (!isPlayingBoardValid()) {
      const warning = "Check your board again... Don't try to be funny ok...";
      props.onInvalid(warning);
      return;
    }
    let answer = [...playingBoard].map((_, i) => [...playingBoard[i]]);
    answer = solveHelper(answer);
    if (!answer) {
      props.onInvalid("Oh no! No possible answer with this board...");
      return;
    }
    setAnswerBoard(answer);
    setSolved(true);
  };

  const unsolve = () => {
    setAnswerBoard(null);
    setSolved(false);
  };

  const boxChangeHandler = (boxIndex, gridIndex, val) => {
    const row = Math.floor(boxIndex / 3) * 3 + Math.floor(gridIndex / 3);
    const col = Math.floor(boxIndex % 3) * 3 + (gridIndex % 3);
    setPlayingBoard((prevState) => {
      const newState = [...prevState];
      newState[row][col] = val;
      return newState;
    });
  };

  let answerGrids = null;
  if (solved) {
    console.log(answerBoard);
    answerGrids = Array(9)
      .fill()
      .map(() => []);
    for (let i = 0; i < answerGrids.length; i++) {
      const startRow = Math.floor(i / 3) * 3;
      const startCol = (i % 3) * 3;
      for (let j = startRow; j < startRow + 3; j++) {
        for (let k = startCol; k < startCol + 3; k++) {
          answerGrids[i].push(answerBoard[j][k]);
        }
      }
    }
  }

  return (
    <BoardWrapper className="sudoku-board">
      <div className="sudoku-board__play-area">
        {Array(3)
          .fill()
          .map((_, i) => (
            <div key={i} className="sudoku-board__box-rows">
              <Box
                boxId={i * 3}
                onChange={boxChangeHandler}
                disabledGrids={disabledGrids[i * 3]}
                clear={props.clear}
                solved={solved}
                answer={answerGrids && answerGrids[i * 3]}
                start={props.start}
                sample={props.sample}
              />
              <Box
                boxId={i * 3 + 1}
                onChange={boxChangeHandler}
                disabledGrids={disabledGrids[i * 3 + 1]}
                clear={props.clear}
                solved={solved}
                answer={answerGrids && answerGrids[i * 3 + 1]}
                start={props.start}
                sample={props.sample}
              />
              <Box
                boxId={i * 3 + 2}
                onChange={boxChangeHandler}
                disabledGrids={disabledGrids[i * 3 + 2]}
                clear={props.clear}
                solved={solved}
                answer={answerGrids && answerGrids[i * 3 + 2]}
                start={props.start}
                sample={props.sample}
              />
            </div>
          ))}
      </div>
    </BoardWrapper>
  );
};

export default Board;
