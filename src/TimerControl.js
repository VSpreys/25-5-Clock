import React, { useRef, useEffect } from "react";
import useSound from 'use-sound';
const TimerControl = ({ state, setState }) => {
  const intervalIdRef = useRef(null);
  const [playSound] = useSound(process.env.PUBLIC_URL + "/beep.wav");

  const handleStartStop = () => {
    if (state.pause) {
      setState({ ...state, pause: false });
    } else {
      clearInterval(intervalIdRef.current);
      setState({ ...state, pause: true });
    }
  };

  const handleReset = () => {
    setState({
      time: "25:00",
      break: 5,
      session: 25,
      minutesLeft: 25,
      secondsLeft: 0,
      pause: true,
      currentType: "Session",
    });
  }
  useEffect(() => {
      const setCurrentValues = ({ seconds, minutes }) => {
        minutes = seconds <= 0 ? state.minutesLeft - 1 : state.minutesLeft;
        seconds = seconds <= 0 ? 59 : state.secondsLeft - 1;
        let minutesString = minutes < 10 ? `0${minutes}` : `${minutes}`;
        let secondsString = seconds < 10 ? `0${seconds}` : `${seconds}`;
        let displayString = `${minutesString}:${secondsString}`;
        return { minutes, seconds, displayString };
      };
    if (!state.pause) {
      intervalIdRef.current = setInterval(() => {
        if (state.time === "00:00") {
          playSound();
          let newState = state.currentType === "Session" ? "Break" : "Session";
          let newTime = newState === "Session" ? state.session : state.break;
          let minutesString = newTime < 10 ? `0${newTime}` : `${newTime}`;
          let displayString = `${minutesString}:00`;
          setState({
            ...state,
            minutesLeft: newTime,
            secondsLeft: 0,
            time: displayString,
            currentType: newState,
          });
        } else {
          const { minutes, seconds, displayString } = setCurrentValues({
            seconds: state.secondsLeft,
            minutes: state.minutesLeft,
          });
          setState((prevState) => ({
            ...prevState,
            time: displayString,
            minutesLeft: minutes,
            secondsLeft: seconds,
          }));
        }
      }, 1000);
    } else {
      clearInterval(intervalIdRef.current);
    }
    return () => {
      clearInterval(intervalIdRef.current);
    };
  }, [state, setState, playSound]);

  return (
    <div className="timer-control">
      <button id="start_stop" onClick={handleStartStop}>
        <i className="fa fa-play fa-2x"></i>
        <i className="fa fa-pause fa-2x"></i>
      </button>
      <button id="reset" onClick={handleReset}>
        <i className="fa fa-refresh fa-2x"></i>
      </button>
    </div>
  );
};

export default TimerControl;