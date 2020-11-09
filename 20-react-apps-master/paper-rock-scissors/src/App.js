import React, { useState, useEffect } from 'react';
import Rock from './icons/Rock';
import Paper from './icons/Paper';
import Scissors from './icons/Scissors';
import './App.css';

import WinsLosses from './components/WinsLosses';
import Choices from './components/Choices';
import GameState from './components/GameState';

const choices = [
  { id: 1, name: 'rock', component: Rock, loosesTo: 2 },
  { id: 2, name: 'paper', component: Paper, loosesTo: 3 },
  { id: 3, name: 'scissors', component: Scissors, loosesTo: 1 },
];

export default function App() {
  const [userChoice, setUserChoice] = useState(null);
  const [computerChoice, setComputerChoice] = useState(null);
  const [wins, setWins] = useState(0);
  const [losses, setLosses] = useState(0);
  const [gameState, setGameState] = useState(null);

  useEffect(() => {
    restartGame();
  }, []);

  function handleUserChoice(choiceId) {
    const choosenChoice = choices.find((choice) => choice.id === choiceId);
    setUserChoice(choosenChoice);

    // check who wins
    if (choosenChoice.loosesTo === computerChoice.id) {
      setGameState('lose');
      setLosses((losses) => losses + 1);
    } else if (computerChoice.loosesTo === choosenChoice.id) {
      setGameState('win');
      setWins((wins) => wins + 1);
    } else if (computerChoice.id === choosenChoice.id) {
      setGameState('draw');
    }
  }

  function restartGame() {
    setGameState(null);
    setUserChoice(null);
    const randomChoice = choices[Math.floor(Math.random() * choices.length)];
    setComputerChoice(randomChoice);
  }

  return (
    <div className='app'>
      {/* information goes here */}
      <div className='info'>
        <h2>Rock. Paper. Scissors</h2>

        {/* wins vs losses stats */}
        <WinsLosses wins={wins} losses={losses} />
      </div>

      {/* the popup to show win/loss/draw */}
      <GameState
        gameState={gameState}
        userChoice={userChoice}
        computerChoice={computerChoice}
        restartGame={restartGame}
      />
      {/* select choice area */}
      <Choices handleUserChoice={handleUserChoice} />
    </div>
  );
}
