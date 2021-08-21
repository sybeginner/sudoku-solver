import './BoardWrapper.css'

const BoardWrapper = props => {
    const classes = 'board ' + props.className;
    return (
        <div className={classes}>{props.children}</div>
    )
}

export default BoardWrapper;