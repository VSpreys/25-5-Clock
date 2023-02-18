const Break = ({ state, setState }) => {
  const handleChange = (type) => {
    if (state.pause) {
      let newTime = state.break;
      if (type && newTime < 30) {
        newTime += 1;
      }
      else if (!type && newTime > 1) {
        newTime -= 1;
      }
      setState({
        ...state,
        break: newTime,
        minutesLeft:
          state.currentType === "Session" ? state.minutesLeft : newTime,
        secondsLeft: state.currentType === "Session" ? state.secondsLeft : 0,
        time: state.currentType === "Session" ? state.time : `${newTime}:00`,
      });
    }
  };
  return (
    <div className="length-control">
      <div id="break-label">Break Length</div>
      <button
        id="break-decrement"
        className="btn-level"
        onClick={() => handleChange(false)}
      >
        <i className="fa fa-arrow-down fa-2x"></i>
      </button>
      <div id="break-length" className="btn-level">
        {state.break}
      </div>
      <button
        id="break-increment"
        className="btn-level"
        onClick={() => handleChange(true)}
      >
        <i className="fa fa-arrow-up fa-2x"></i>
      </button>
    </div>
  );
};

export default Break;
