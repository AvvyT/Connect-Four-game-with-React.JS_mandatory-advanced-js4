import React, { useReducer } from 'react';
import { Helmet } from 'react-helmet';
import './ConnectFour.css';

const allCells = 42;
const cells = new Array(allCells).fill('white');

function dropDisc(grid, clickedCell, color) {

    const column = clickedCell % 7;
    console.log(column);

    let fillCell = 35 + column;
    // console.log(fillCell);

    while (grid[fillCell] !== 'white' && fillCell > 0) {
        fillCell -= 7;
        if (fillCell < 7 && grid[fillCell] !== 'white') {
            // om columnen är full- false
            return [false, grid];
        }
    }
    grid[fillCell] = color;

    return [true, grid];
}

function calculateWinner(grid) {
    return null;
}

function reducer(state, action) {

    switch (action.type) {
        case 'fill_cell':
            const newCells = [...state.cells];
            const [gridChanged, columnCells] = dropDisc(newCells, action.id, state.color);
            // console.log(gridChanged);

            const newColor = state.color === "chartreuse" ? "pink" : "chartreuse";

            return {
                ...state,
                cells: columnCells,
                color: gridChanged ? newColor : state.color,
            }

        case 'clear_game':
            return {
                ...state,
                color: "chartreuse",
                cells: [...cells],
            };
        default:
            return state;
    }
}

function action(id) {
    return { type: "fill_cell", id, color: 'chartreuse' }
}

function reset() {
    return { type: "clear_game" };
}

function Grid(props) {
    const { color } = props;

    return (
        <>
            <h2>Is the <span style={{ color: color }}>{color === "chartreuse" ? props.first : props.second}</span> tuns!</h2>
            <div className='grid'>

                {props.cells.map((cell, idx, color) => (
                    <div className='cell' key={idx} style={{
                        backgroundColor: cell,
                        border: '2px solid green',
                        background: color, cursor: "pointer"
                    }}
                        onClick={() => { props.onClickCell(idx); }}
                    />))}

            </div>
        </>
    );
}


function Board(props) {
    const [state, dispatch] = useReducer(reducer, {
        color: 'chartreuse',
        cells,
    });

    return (
        <div className='App'>
            <Helmet>
                <title>Game page</title>
            </Helmet>
            <header className='style-header'>
                <h1>Connect Four</h1>

                <h2>{props.first}: <span>{0}</span> & {props.second}: <span>{0}</span></h2>
                <p>the Board side....</p>
            </header>

            <Grid color={state.color} cells={state.cells} first={props.first} second={props.second}
                onClickCell={(idx) => {
                    // console.log(idx);
                    dispatch(action(idx));
                }}
            />

            <button className='clear' onClick={() => dispatch(reset())}>Reset</button>
        </div>
    );
}
export default Board;
