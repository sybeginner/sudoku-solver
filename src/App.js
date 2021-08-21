import { useState } from "react";

import Board from "./components/Board";
import "./App.css";

function App() {
  const [theme, setTheme] = useState('dark-theme');
  const [started, setStarted] = useState(false);
  const [clear, setClear] = useState(true);
  const [answered, setAnswered] = useState(false);
  const [invalid, setInvalid] = useState('');
  const [sample, setSample] = useState(false);

  const themeHandler = (theme) => {
    setTheme(theme);
  }

  const answerHandler = () => {
    setAnswered((prevState) => !prevState);
  };

  const startHandler = () => {
    setStarted(true);
  };

  const clearHandler = () => {
    setClear(true);
    setTimeout(() => setClear(false), 0);
  };

  const resetHandler = () => {
    setStarted(false);
  };

  const invalidHandler = (message) => {
    setInvalid(message);
    setAnswered(false);
    setTimeout(() => setInvalid(''), 3000);
  };

  const sampleHandler = () => {
    setSample(true);
    setTimeout(() => setSample(false), 0);
  }

  const startButton = (
    <button className="buttons__start" onClick={startHandler}>
      Start
    </button>
  );
  const clearButton = (
    <button className="buttons__clear" onClick={clearHandler}>
      Clear
    </button>
  );
  const answerButton = (
    <button className="buttons__answer" onClick={answerHandler}>
      {answered ? "Remove Answer" : "Answer"}
    </button>
  );

  const resetButton = (
    <button className="buttons__reset" onClick={resetHandler}>
      Reset
    </button>
  );

  const sampleButton = (
    <button className="buttons__reset" onClick={sampleHandler}>
      Fill Sample
    </button>
  );

  const buttons = started ? (
    <div className="buttons">
      {answerButton}
      {clearButton}
      {resetButton}
    </div>
  ) : (
    <div className="buttons">
      {startButton}
      {clearButton}
      {sampleButton}
    </div>
  );

  const pageClasses = 'homepage ' + theme;
  const title = "Solve Sudoku!";
  const warningClasses =
    "homepage__warning " + (invalid ? " homepage__warning--active" : null);

  return (
    <div className={pageClasses}>
      <div className='theme-buttons'>
        <button className='theme-buttons--light' onClick={() => themeHandler('light-theme')}>Light Mode</button>
        <button className='theme-buttons--dark' onClick={() => themeHandler('dark-theme')}>Dark Mode</button>
      </div>
      <header className="homepage__header">{title}</header>
      <p className={warningClasses}>{invalid}</p>
      <Board
        start={started}
        clear={clear}
        answered={answered}
        onInvalid={invalidHandler}
        sample={sample}
      />
      {buttons}
    </div>
  );
}

export default App;
