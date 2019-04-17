import React, { useState, useReducer } from 'react';
import { Helmet } from 'react-helmet';
import './ConnectFour.css';

let allCells = 42;
let cells = new Array(allCells).fill('white');

function reset() {
    return {
        type: "clear_game"
    };
}

function reducer(state, action) {
    let newGrid = [...state];

    switch (action.type) {
        case 'fill_cell':
            newGrid[action.id] = action.cells;
            return newGrid;
        case 'clear_game':
            return cells;
        default:
            return state;
    }
}

function action(id) {
    return { type: "fill_cell", id, cells }
}


function Grid(props) {
    return (

        <div className='grid'>{
            props.cells.map((cell, idx) => (
                <div
                    className='cell'
                    key={idx} style={{ backgroundColor: cell, border: '1px solid black' }}
                    onClick={() => props.onClickCell(idx)}
                />))}
        </div>

    );
}


function Board(props) {
    const [state, dispatch] = useReducer(reducer, cells);

    return (
        <div className='App'>
            <Helmet>
                <title>Game page</title>
            </Helmet>
            <header className='style-header'>
                <h1>Connect Four</h1>

                <h2>{props.first} & {props.second}</h2>
                <p>the Board side....</p>
            </header>
            <Grid cells={state} onClickCell={(idx) => {
                console.log(idx);
                dispatch(action(idx));
            }} />

            <button className='clear' onClick={() => dispatch(reset())}>Reset</button>
        </div>
    );
}
export default Board;
