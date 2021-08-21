import Grid from './Grid';
import './Box.css';

const Box = () => {
    const grids = Array(9).fill().map(() => <Grid />);
    return (
        <div className='box'>  
            {grids}              
        </div>
    )
}

export default Box;