import { React } from "react";

export default function TextLineComponent(props) {
  // PROPS: 
  // - words: a list of words
  // - currentWord: index of current word
  // - currentLetter: index of current letter
  const wordList = props.words.map((word, wIndex) => {
    return (<p className={
      (wIndex == props.currentWord ? 'text-red-500' : 'text-zinc-600')
      + ' flex flex-row'} key={`${wIndex}`}>

      {[...word].map((letter, lIndex) => {
        return (<span key={`${lIndex}`} className={
          (lIndex == props.currentLetter && wIndex == props.currentWord ? 'text-black' : 'text-zinc-600')
          + ' flex flex-row'
        }>{letter}</span>)
      })}

      <span>&nbsp;</span>
    </p>
    )
  });

  return (
    <div className="w-full h-[100px] bg-zinc-200 flex">
      <div className='flex flex-row items-center'>
        {wordList}
      </div>
    </div>
  );
}
