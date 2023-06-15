import React from "react";
import { useEffect, useRef, useState } from "react";
import TextLineComponent from './TextLineComponent';
import TimerComponent from "./TimerComponent";

import words from '../assets/lipsum.json';

export default function App() {
  // Typing progress state
  const [currentWord, setCurrentWord] = useState(0);
  const [currentLetter, setCurrentLetter] = useState(0);
  const [isSpace, setIsSpace] = useState(false);
  const [badKey, setBadKey] = useState('');
  const [score, setScore] = useState(0);
  // Timer state
  const [timer, setTimer] = useState(false);
  const [seconds, setSeconds] = useState(0);

  const container = useRef<HTMLDivElement>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const timeLimit = 60; // in seconds

  function calculateScore() {
    setScore(currentWord / (timeLimit / 60)); // get words per minute
    if (dialogRef.current != null) {
      dialogRef.current.showModal();
    }
  }

  useEffect(() => {
    // Automatically set focus on App so we can listen for keystrokes
    if (container.current != null) {
      container.current.focus();
    }
  }, [])

  function handleKeyDown(event: any) {
    let nextLetterIndex = currentLetter + 1;

    // if it's our first keypress, start timer
    if (currentWord == 0 && currentLetter == 0) {
      if (dialogRef.current != undefined && dialogRef.current.open) {
        // Dialog is open cause they've already completed a round.
        // Don't let them start a new round.
        return;
      };
      setTimer(true);
    }

    setBadKey('');

    // If they hit the right key, check if next char is space
    // and then advance
    console.log(words.words);
    if (event.key == words.words[currentWord][currentLetter]) {
      if (nextLetterIndex > (words.words[currentWord].length - 1)) {
        setIsSpace(true);
        // TODO: set word to a green so we know it was typed
        setCurrentLetter(nextLetterIndex)
      } else {
        setCurrentLetter(nextLetterIndex);
      }
    } else if (event.key == ' ' && isSpace) {
      setIsSpace(false);
      setCurrentLetter(0);
      setCurrentWord(currentWord + 1);
    } else {
      // If they press a wrong key, display (unless it's a modifier key)
      if (['Meta', 'Shift', 'Tab', 'CapsLock', ' ', 'Backspace', 'Control',
        'ArrowLeft', 'ArrowUp', 'ArrowDown', 'ArrowRight', 'Alt', 'Enter'].indexOf(event.key) < 0) {
        setBadKey(event.key);
      }
    }
  }

  return (
    <div className="App w-[100vw] h-[100vh]" ref={container} tabIndex={0} autoFocus onKeyDown={handleKeyDown}>
      <TextLineComponent
        currentWord={currentWord}
        currentLetter={currentLetter}
        words={words.words}
        isSpace={isSpace}>
      </TextLineComponent>

      {/* Display wrong keypresses here */}
      <div className='absolute top-[57%] left-[calc(50%-25px)] w-[50px] h-[50px]'>
        {(badKey != '' ?
          <div className='text-center text-white text-2xl rounded p-[10px] bg-zinc-800'>
            {badKey}
          </div>
          : '')}
      </div>

      <div className='flex justify-between align-center content-center 
        absolute bottom-[15px] w-[calc(100%-30px)] mx-[15px]'>

        <TimerComponent
          isActive={timer}
          setTimer={setTimer}
          seconds={seconds}
          setSeconds={setSeconds}
          calculateScore={calculateScore}
          timeLimit={timeLimit}>
        </TimerComponent>

        {/* TODO: add HTML dialog when round is over/display the score */}
        <dialog ref={dialogRef} className='rounded max-w-1/2 w-[400px] text-center text-zinc-400'>
          <h2 className='text-xl text-zinc-500 font-bold'>Finished.</h2>
          <p>You typed {score} WPM</p>

          {/* Stupid hack. Having an empty button here prevents the "ok" 
          button from being default selected and subsequently automatically
          dismissed if the user is still typing when the modal pops up and hits 
          the spacebar. */}
          <button></button>

          <form method='dialog' className='flex justify-end'>
            <button onClick={() => window.location.reload()}
              className='text-white rounded bg-blue-400 shadow-lg shadow-blue-500/50 px-[13px] py-[4px]'>Ok</button>
          </form>
        </dialog>

        <p className='text-zinc-600'>Words Completed: {currentWord}</p>
      </div>
    </div>
  );
}
