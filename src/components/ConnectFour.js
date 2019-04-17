import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import '../App.css';

function Board(props) {
    return (
        <>
            <Helmet>
                <title>Game page</title>
            </Helmet>
            <h1>Connect Four</h1>

            <h2>{props.first}</h2>
            <h2>{props.second}</h2>
            
            <p>the Board side....</p>
        </>
    );
}
export default Board;
