import { React, useRef, useEffect } from "react";

export default function TextLineComponent(props) {
  /**
   * PROPS:
   * - words [<string>]      : a list of words
   * - currentWord <number>  : index of current word
   * - currentLetter <number>: index of current letter
  */

  // Used to scroll the current word to center of screen
  const scrollRef = useRef();

  // Wrap all words in <p> and all letters in <span> so we can
  // automatically color them based on context
  const wordList = props.words.map((word, wIndex) => {
    return (
      <p ref={(wIndex == props.currentWord ? scrollRef : undefined)}
        className={
          (wIndex == props.currentWord ?
            'text-white rounded bg-blue-400 shadow-lg shadow-blue-500/50 text-4xl \
            flex items-center justify-center pb-[5px] px-[5px]' :
            (wIndex < props.currentWord ? 'text-zinc-400' : 'text-zinc-600')
          ) + ' flex flex-row px-[2px] pl-[4px]'} key={`${wIndex}`}>

        {[...word].map((letter, lIndex) => {
          return (<span key={`${lIndex}`} className={
            (lIndex == props.currentLetter && wIndex == props.currentWord ?
              '' :
              (lIndex < props.currentLetter && wIndex == props.currentWord ?
                'text-zinc-700' : ''))
            + ' flex flex-row'
          }>{letter}</span>)
        })}
      </p>
    )
  });

  useEffect(() => {
    scrollRef.current.scrollIntoView({
      behavior: 'auto',
      block: 'center',
      inline: 'center'
    })
  }, [props.currentWord]);

  return (
    <div className="w-full h-full bg-zinc-200 flex max-w-full overflow-auto 
    pointer-events-none">
      <div className='pl-[47vw] flex flex-row items-center'>
        {wordList}
      </div>
    </div>
  );
}
