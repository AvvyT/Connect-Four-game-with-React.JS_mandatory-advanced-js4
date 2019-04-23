import React, { useReducer } from 'react';
import { Helmet } from 'react-helmet';
import './ConnectFour.css';

const allCells = 42;
const cells = new Array(allCells).fill('white');

function dropDisc(grid, column, color) {

    return null;
}

function calculateWinner(grid) {
    return null;
}

function reducer(state, action) {

    switch (action.type) {
        case 'fill_cell':
            const newCells = [...state.cells];
            newCells[action.id] = state.color;
            const column = action.id % 7;
            console.log(column);

            //const newCells = dropDisc(state.cells, column, state.color);

            return {
                ...state,
                cells: newCells,
                color: state.color === "chartreuse" ? "pink" : "chartreuse",
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
    return {
        type: "clear_game"
    };
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
