import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import '../App.css';
import './SetName.css';

function ChooseNames(props) {
    const [first, updateFirst] = useState("Player1");
    const [second, updateSecond] = useState("Player2");

    const focus = (e) => e.target.select();

    return (
        <>
            <Helmet>
                <title>Home page</title>
            </Helmet>
            <h1>Connect Four</h1>

            <div>
                <h2>Choose a players name</h2>
                <form>
                    <input maxLength={11}
                        className='style-input'
                        placeholder=' Write players name..'
                        value={first}
                        onClick={focus}
                        onChange={e => {
                            updateFirst(e.target.value);
                            props.onChangeOne(e);
                        }}
                        type="text" />
                    <br></br>
                    <input maxLength={11}
                        className='style-input'
                        placeholder=' Write players name..'
                        value={second}
                        onClick={focus}
                        onChange={e => {
                            updateSecond(e.target.value);
                            props.onChangeTwo(e);
                        }}
                        type="text" /><br />

                    <button className='start'
                        type='submit'
                        onClick={props.login}
                    >Play</button>
                </form>
            </div>
        </>
    );
}
export default ChooseNames;