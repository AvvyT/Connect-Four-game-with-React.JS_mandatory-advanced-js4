import React, { useReducer } from 'react';
import { Helmet } from 'react-helmet';
import './ConnectFour.css';

const allCells = 42;
const cells = new Array(allCells).fill('white');
//let count = 0;

function dropDisc(grid, clickedCell, color) {

    const column = clickedCell % 7;
    // console.log(column);
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


function calculateWinner(grid, interval) {
    console.log(grid);

    for (let cell = 0; cell < grid.length; cell++) {
        let streak = 0;
        let player = null;

        if (grid[cell] !== 'white') {
            player = grid[cell];
            //console.log(player);

            streak = 1;
            console.log('test ' + player + grid[cell + interval]);

            if (grid[cell + interval] === player) streak++; else continue;
            if (grid[cell + (interval * 2)] === player) streak++; else continue;
            if (grid[cell + (interval * 3)] === player) streak++; else continue;
        } else { continue; }

        if (streak === 4) {
            console.log('!!The winner are ' + player);

            return player;
        }
    }
    return false;
}


function checkForWinner(grid) {

    const directions = [1, 7, 8, -6];
    for (let i = 0; i < directions.length; i++) {
        let winner = calculateWinner(grid, directions[i]);
        console.log(winner);

        if (winner) {
            return winner;
        }
    }
    return false;
}


function reducer(state, action) {

    switch (action.type) {
        case 'fill_cell':
            // om det finns vinnare då hoppar det ur dvs körs inte vidare!!!
            if (state.winner) {
                return state;
            }
            const newCells = [...state.cells];

            const [gridChanged, columnCells] = dropDisc(newCells, action.id, state.color);
            // console.log(gridChanged);
            const newColor = state.color === "chartreuse" ? "pink" : "chartreuse";
            const winner = checkForWinner(newCells);

            return {
                ...state,
                cells: columnCells,
                color: gridChanged ? newColor : state.color,
                winner: winner,
            }

        case 'clear_game':
            return {
                ...state,
                color: "chartreuse",
                cells: [...cells],
                winner: false,
            };
        default:
            return state;
    }
}

function action(id) {
    return { type: "fill_cell", id, color: 'chartreuse', winner: false }
}

function reset() {
    return { type: "clear_game" };
}


function Grid(props) {
    const { color, first, second } = props;

    return (
        <>
            <h2 className='player'><span style={{ color: color }}>{color === "chartreuse" ? first : second}</span>'s turn!</h2>
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

function RenderWinner(props) {
    const { first, second, winner } = props;

    if (winner)
        return (<p className='winner'> The winner is <span style={{ color: winner }}>
            {winner === "chartreuse" ? first : second}</span>!</p>);
    return null;
}

function Board(props) {

    const [state, dispatch] = useReducer(reducer,
        { color: 'chartreuse', cells, winner: false, });
    console.log(state)

    return (
        <div className='App'>
            <Helmet>
                <title>Game page</title>
            </Helmet>
            <header className='style-header'>
                <h1>Connect Four</h1>

                <h2>{props.first}: <span>{0}</span> & {props.second}: <span>{0}</span></h2>
                <RenderWinner winner={state.winner} first={props.first} second={props.second} />
                <button className='clear' onClick={() => dispatch(reset())}>Reset</button>
            </header>

            <Grid color={state.color} cells={state.cells} first={props.first} second={props.second}
                onClickCell={(idx) => {
                    //console.log(idx);
                    dispatch(action(idx));
                }}
            />
        </div>
    );
}
export default Board;
