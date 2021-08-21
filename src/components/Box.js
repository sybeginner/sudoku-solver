import Grid from "./Grid";
import "./Box.css";

const Box = (props) => {
  const gridChangeHandler = (gridIndex, val) => {
    props.onChange(props.boxId, gridIndex, val);
  };

  const grids = Array(9)
    .fill()
    .map((_, i) => (
      <Grid
        key={i}
        gridId={i}
        onChange={gridChangeHandler}
        disabled={props.disabledGrids[i]}
        clear={props.clear}
        solved={props.solved}
        answerValue={props.answer && props.answer[i]}
        start={props.start}
        sample={props.sample}
        boxId={props.boxId}
      />
    ));
    
  return <div className="box">{grids}</div>;
};

export default Box;
