import { useState, useEffect } from "react";
import "./Grid.css";

const Grid = (props) => {
  const [value, setValue] = useState("");
  const [answerValue, setAnswerValue] = useState(null);

  useEffect(() => {
    if (props.clear && !props.disabled && value !== "") {
      setValue("");
      props.onChange(props.gridId, '');
    }
  }, [props.clear]);

  useEffect(() => {
    if (!props.start) {
      setValue("");
      props.onChange(props.gridId, '');
    }
  }, [props.start]);

  useEffect(() => {
    if (props.solved) {
      setAnswerValue(props.answerValue);
    } else {
      setAnswerValue(null);
    }
  }, [props.solved]);

  useEffect(() => {
    if (props.sample) {
      const sampleBoard = [
        ["5", "3", "", "", "7", "", "", "", ""],
        ["6", "", "", "1", "9", "5", "", "", ""],
        ["", "9", "8", "", "", "", "", "6", ""],
        ["8", "", "", "", "6", "", "", "", "3"],
        ["4", "", "", "8", "", "3", "", "", "1"],
        ["7", "", "", "", "2", "", "", "", "6"],
        ["", "6", "", "", "", "", "2", "8", ""],
        ["", "", "", "4", "1", "9", "", "", "5"],
        ["", "", "", "", "8", "", "", "7", "9"],
      ];
      const row = Math.floor(props.boxId / 3) * 3 + (Math.floor(props.gridId / 3));
      const col = (props.boxId % 3) * 3 + (props.gridId % 3);
      setValue(sampleBoard[row][col]);
      props.onChange(props.gridId, sampleBoard[row][col]);
    }
  }, [props.sample]);

  const valueChangeHandler = (e) => {
    const val = e.target.value;
    const keyCode = val.charCodeAt(0);
    if (val.length > 1 || keyCode < 49 || keyCode > 57) return;
    setValue(val);
    props.onChange(props.gridId, val);
  };

  const inputClasses =
    "grid__input" +
    (props.solved && !props.disabled ? " grid__input--answer" : "");
  return (
    <div className="grid">
      <input
        className={inputClasses}
        type="text"
        value={answerValue || value}
        disabled={props.solved || props.disabled}
        onChange={valueChangeHandler}
      />
    </div>
  );
};

export default Grid;
