import { React, useState, useEffect } from "react";

export default function TimerComponent(props) {
  useEffect(() => {
    let interval = null;
    if (props.isActive) {
      interval = setInterval(() => {
        props.setSeconds(props.seconds + 1);
      }, 1000);
    } else if (!props.isActive && props.seconds !== 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [props.isActive, props.seconds]);

  return (
    <div className='text-zinc-600'>
      {(props.isActive ?
        <p>Elapsed time: <span>{props.seconds}</span></p>
        : 'Timer not started.')}
    </div>
  );
}
