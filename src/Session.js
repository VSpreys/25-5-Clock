const Session = ({ state, setState }) => {
  const handleChange = (type) => {
    if (state.pause) {
      let newTime = state.session;
      if (type && newTime < 60) {
        newTime += 1;
      }
      else if (!type && newTime > 1) {
        newTime -= 1;
      }
      setState({
        ...state,
        session: newTime,
        minutesLeft:
          state.currentType === "Session" ? newTime : state.minutesLeft,
        secondsLeft: state.currentType === "Session" ? 0 : state.secondsLeft,
        time: state.currentType === "Session" ? `${newTime}:00` : state.time,
      });
    }
  };
  return (
    <div className="length-control">
      <div id="session-label">Session Length</div>
      <button
        id="session-decrement"
        className="btn-level"
        onClick={() => handleChange(false)}
      >
        <i className="fa fa-arrow-down fa-2x"></i>
      </button>
      <div id="session-length" className="btn-level">
        {state.session}
      </div>
      <button
        id="session-increment"
        className="btn-level"
        onClick={() => handleChange(true)}
      >
        <i className="fa fa-arrow-up fa-2x"></i>
      </button>
    </div>
  );
};

export default Session;
