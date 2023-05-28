import React from "react";
import { useEffect, useRef, useState } from "react";
import Header from './components/HeaderComponent';
import TextLineComponent from './components/TextLineComponent';

import words from './assets/lipsum.json';

function App() {
  const [currentWord, setCurrentWord] = useState(0);
  const [currentLetter, setCurrentLetter] = useState(0);
  const [isSpace, setIsSpace] = useState(false);

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
    }

    if (event.key == ' ' && isSpace) {
      setIsSpace(false);
      setCurrentLetter(0);
      setCurrentWord(currentWord + 1);
    }
  }

  return (
    <div className="App" ref={container} tabIndex={0} autoFocus onKeyDown={handleKeyDown}>
      {/* TODO: typing test parent component? */}
      {/* TODO: Come up with an interseting animated way fro text to be delivered */}
      <Header></Header>
      <TextLineComponent
        currentWord={currentWord}
        currentLetter={currentLetter}
        words={words.words}
        isSpace={isSpace}>
      </TextLineComponent>
      <h1>Words Completed: {currentWord}</h1>
    </div>
  );
}

export default App;
