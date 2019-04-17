import React, { useState } from 'react';
import ChooseNames from './components/Home';
import Board from './components/ConnectFour';
import './App.css';


function App() {
  // Deklarera flera tillståndsvariabler
  const [inlogad, updateInlogad] = useState(false);
  const [first, updateFirst] = useState('Player1');
  const [second, updateSecond] = useState('Player2');

  const onChangeOne = (e) => updateFirst(e.target.value);
  const onChangeTwo = (e) => updateSecond(e.target.value);

  function handleLogin(status) {
    updateInlogad(!status.inlogad);
  }


  return (
    inlogad ? <Board first={first} second={second} /> :
      <ChooseNames onChangeOne={onChangeOne} onChangeTwo={onChangeTwo} login={handleLogin} />
  );
}

export default App;
