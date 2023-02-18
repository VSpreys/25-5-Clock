import "./App.css";
import Timer from "./Timer";
import Break from "./Break";
import Session from "./Session";
import { useState } from "react";
import TimerControl from "./TimerControl";

function App() {
  const [state, setState] = useState({
    time: "25:00",
    break: 5,
    session: 25,
    minutesLeft: 25,
    secondsLeft: 0,
    pause: true,
    currentType: "session",
  });
  return (
    <div id="app">
      <div className="main-title">25 + 5 Clock</div>
      <Break state={state} setState={setState} />
      <Session state={state} setState={setState} />
      <Timer state={state} />
      <TimerControl state={state} setState={setState} />
    </div>
  );
}

export default App;
