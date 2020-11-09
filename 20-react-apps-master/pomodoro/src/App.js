import React, { useState, useRef } from 'react';
import useSound from 'use-sound';

import './App.css';
import sound from './assets/hotel_california.mp3';
import { ReactComponent as SettingsIcon } from './assets/settings_icon.svg';
import playMusic from './utils/playSound';

const SOUND_DURATION = 30000;

function padTime(time) {
  return time.toString().padStart(2, '0');
}

export default function App() {
  // state
  const [title, setTitle] = useState('Let the countdown begin!!!');
  const [time, setTime] = useState(25);
  const [showSetTime, setShowSetTime] = useState(false);
  const [timeLeft, setTimeLeft] = useState(time * 60);
  const [isRunnning, setIsRunning] = useState(false);
  const [play, { stop }] = useSound(sound);
  const intervalRef = useRef(null);

  // functions
  function playSound() {
    play();
    setTimeout(() => {
      stop();
    }, SOUND_DURATION);
  }

  function startTimer() {
    if (intervalRef.current !== null) return;

    setTitle('You are doing great!');
    setIsRunning(true);

    intervalRef.current = setInterval(() => {
      setTimeLeft((timeLeft) => {
        if (timeLeft >= 1) return timeLeft - 1;
        playSound();
        resetTimer();
        return 0;
      });
    }, 1000);
  }

  function stopTimer() {
    if (intervalRef.current === null) return;

    clearInterval(intervalRef.current);
    intervalRef.current = null;
    setTitle('Keep it up!');
    setIsRunning(false);
  }

  function resetTimer() {
    clearInterval(intervalRef.current);
    intervalRef.current = null;
    setTitle('Ready to go another round?');
    setIsRunning(false);
    setTimeLeft(time * 60);
  }

  function handleTimeChange(e) {
    setTime(parseInt(e.target.value));
  }

  function handleSetTime(e) {
    e.preventDefault();
    setTimeLeft(time * 60);
    setShowSetTime(false);
  }

  // computed
  const minutes = padTime(Math.floor(timeLeft / 60));
  const seconds = padTime(timeLeft - minutes * 60);
  playMusic();
  return (
    <div className='app'>
      <h2>{title}</h2>

      <div className='timer'>
        <span>{minutes}</span>
        <span>:</span>
        <span>{seconds}</span>
      </div>

      <div className='buttons'>
        {!isRunnning && <button onClick={startTimer}>Start</button>}
        {isRunnning && <button onClick={stopTimer}>Stop</button>}
        {timeLeft < time * 60 && <button onClick={resetTimer}>Reset</button>}
      </div>

      <div className='settings-icon'>
        <SettingsIcon onClick={() => setShowSetTime(!showSetTime)} />
      </div>

      {showSetTime && (
        <div className='settings-container'>
          <form onSubmit={handleSetTime}>
            <h2>Pomodoro time</h2>
            <input type='number' value={time} onChange={handleTimeChange} />
            <button type='submit'>Set time</button>
          </form>
        </div>
      )}
    </div>
  );
}
