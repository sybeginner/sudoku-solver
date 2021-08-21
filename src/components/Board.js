import './Board.css'

const Board = props => {
    const classes = 'board ' + props.className;
    return (
        <div className={classes}>{props.children}</div>
    )
}

export default Board;