import Board from "./components/Board";
import Box from "./components/Box";
import "./App.css";

function App() {
  return (
    <div className="homepage">
      <header className="homepage__header">Solve Sudoku!</header>
      <Board className="sudoku-board">
        <div className="sudoku-board__play-area">
          {Array(3)
            .fill()
            .map(() => (
              <div className="sudoku-board__box-rows">
                <Box />
                <Box />
                <Box />
              </div>
            ))}
        </div>
      </Board>
    </div>
  );
}

export default App;
