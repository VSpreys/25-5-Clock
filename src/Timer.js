const Timer = ({ state }) => {
    const color = state.minutesLeft < 1 ? "rgb(227, 66, 52)" : "white";
    return (
      <div className="timer">
        <div className="timer-wrapper" style={{ color: color }}>
          <div id="timer-label">{state.currentType}</div>
          <div id="time-left">{state.time}</div>
        </div>
      </div>
    );
}

export default Timer;