import React from "react";
import { useEffect, useRef, useState } from "react";
import Header from './components/HeaderComponent';
import TextLineComponent from './components/TextLineComponent';

import words from './assets/lipsum.json';

function App() {
  const [currentWord, setCurrentWord] = useState(0);
  const [currentLetter, setCurrentLetter] = useState(0);
  const [isSpace, setIsSpace] = useState(false);
  const [badKey, setBadKey] = useState('');

  const container = useRef();

  useEffect(() => {
    // Automatically set focus on App so we can listen for keystrokes
    container.current.focus();
  }, [])

  function getWordBoundary() {
    return words.words[currentWord].length - 1;
  }

  function handleKeyDown(event) {
    // TODO: handle backspace?
    let nextLetterIndex = currentLetter + 1;

    setBadKey('');

    // If they hit the right key, check if next char is space
    // and then advance
    if (event.key == words.words[currentWord][currentLetter]) {
      if (nextLetterIndex > getWordBoundary()) {
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
        'ArrowLeft', 'ArrowUp', 'ArrowDown', 'ArrowRight', 'Alt'].indexOf(event.key) < 0) {
        setBadKey(event.key);
      }
    }
  }

  return (
    <div className="App w-[100vw] h-[100vh]" ref={container} tabIndex={0} autoFocus onKeyDown={handleKeyDown}>
      {/* TODO: typing test parent component? */}
      {/* TODO: Come up with an interseting animated way fro text to be delivered */}
      <TextLineComponent
        currentWord={currentWord}
        currentLetter={currentLetter}
        words={words.words}
        isSpace={isSpace}>
      </TextLineComponent>

      <h1 className='absolute bottom-[15px] right-[15px] text-zinc-600 font-bold'>Words Completed: {currentWord}</h1>

      {/* if user presses a key that's not the current letter, tell them */}
      <div className='absolute top-[57%] left-[calc(50%-25px)] w-[50px] h-[50px]'>
        {(badKey != '' ?
          <div className='text-center text-white text-2xl rounded p-[10px] bg-zinc-800'>
            {badKey}
          </div>
          : '')}
      </div>

    </div>
  );
}

export default App;
