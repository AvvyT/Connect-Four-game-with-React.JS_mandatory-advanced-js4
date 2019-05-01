import React, { useReducer } from 'react';
import { Helmet } from 'react-helmet';
import './ConnectFour.css';

const allCells = 42;
const cells = new Array(allCells).fill('white');
//let count = 0;


function dropDisc(grid, clickedCell, color) {
    const column = clickedCell % 7;
    let fillCell = 35 + column;
    // console.log(column, fillCell);

    while (grid[fillCell] !== 'white' && fillCell > 0) {
        fillCell -= 7;
        if (fillCell < 7 && grid[fillCell] !== 'white') return [false, grid];
    }
    grid[fillCell] = color;

    return [true, grid];
}


function checkRestrictions(a, b, c, d, checkHorizontal, checkVertical) {
    console.log('cell-num ' + a, b, c, d);

    if (checkHorizontal) {
        let colA = a % 7;
        let colB = b % 7;
        let colC = c % 7;
        let colD = d % 7;
        console.log('column-num ' + colA, colB, colC, colD);

        if (colD - colC !== 1 || colC - colB !== 1 || colB - colA !== 1) return false;
    }
    if (checkVertical) {
        // The Math.floor() function returns the largest integer less than or equal to a given number.
        // ((41 - a) / 7) => ex: 41 - a(40) = 1, 1/7=0,14 sen math-metod => 0
        let rowA = Math.floor((41 - a) / 7);
        let rowB = Math.floor((41 - b) / 7);
        let rowC = Math.floor((41 - c) / 7);
        let rowD = Math.floor((41 - d) / 7);
        console.log('rad-num ' + rowD, rowC, rowB, rowA);

        if ((rowA - rowB !== 1 || rowB - rowC !== 1 || rowC - rowD !== 1) &&
            (rowD - rowC !== 1 || rowC - rowB !== 1 || rowB - rowA !== 1)) return false;
    }
    return true;
}


function calculateWinner(grid, interval, checkHorizontal, checkVertical) {
    // console.log(grid);

    for (let cell = 0; cell < grid.length; cell++) {
        let streak = 0;
        let player = null;

        if (grid[cell] !== 'white') {
            let cellPos1 = cell;
            let cellPos2 = cell + interval;
            let cellPos3 = cell + (interval * 2);
            let cellPos4 = cell + (interval * 3);
            player = grid[cellPos1];
            //console.log(player);

            streak = 1;
            // console.log('test ' + player + grid[cell]);

            if (grid[cellPos2] === player) streak++; else continue;
            if (grid[cellPos3] === player) streak++; else continue;
            if (grid[cellPos4] === player) streak++; else continue;

            let check =
                checkRestrictions(cellPos1, cellPos2, cellPos3, cellPos4, checkHorizontal, checkVertical);
            console.log('hitat 4 i rad ' + check);
            if (!check) continue;
        } else { continue; }

        if (streak === 4) {
            console.log('!!The winner are ' + player);
            return player;
        }
    }
    return false;
}


function checkForWinner(grid) {

    const directions = [
        { dir: 1, checkHorizontal: true, checkVertical: false },
        { dir: 7, checkHorizontal: false, checkVertical: true },
        { dir: 8, checkHorizontal: true, checkVertical: true },
        { dir: -6, checkHorizontal: true, checkVertical: true },
    ];

    for (let i = 0; i < directions.length; i++) {
        let winner =
            calculateWinner(grid, directions[i].dir, directions[i].checkHorizontal, directions[i].checkVertical);
        console.log(winner);

        if (winner) return winner;
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

            return {
                ...state,
                cells: columnCells,
                color: gridChanged ? newColor : state.color,
                winner: checkForWinner(newCells)
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
                        background: color, cursor: "pointer",
                        color: "purple"
                    }}
                        onClick={() => { props.onClickCell(idx); }} >
                    </div>))}
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
    //console.log(state)

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
