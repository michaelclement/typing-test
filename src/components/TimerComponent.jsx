import { React, useEffect } from "react";

export default function TimerComponent(props) {
  useEffect(() => {
    let interval = null;
    if (props.isActive) {
      interval = setInterval(() => {
        props.setSeconds(props.seconds + 1);
        if (props.seconds >= props.timeLimit) {
          props.setTimer(false);
          props.calculateScore();
        }
      }, 1000);
    } else if (!props.isActive && props.seconds !== 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [props.isActive, props.seconds]);

  return (
    <div className='text-zinc-600'>
      {(props.isActive ?
        <p>Elapsed time: <span>{props.seconds}s</span></p>
        : 'Type a key to begin.')}
    </div>
  );
}
