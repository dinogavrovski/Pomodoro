import "./App.css";
import Timer from "./components/Timer.jsx";
import Button from "./components/Button.jsx";
import { useState } from "react";
import { COUNTDOWN_START_VALUE, BREAKTIME_VALUE } from "./constants.js";
import AmbientSound from "./components/AmbientSound.jsx";

function App() {
  const [timer, setTimer] = useState({
    remainingTimeSeconds: COUNTDOWN_START_VALUE,
    isWorkTime: true,
    isRunning: false,
  });
  function handleReset() {
    setTimer({
      remainingTimeSeconds: timer.isWorkTime
        ? COUNTDOWN_START_VALUE
        : BREAKTIME_VALUE,
      isWorkTime: timer.isWorkTime,
      isRunning: false,
    });
  }
  return (
    <>
      <AmbientSound src="/sounds/loop_1.mp3" />
      <Timer timer={timer} setTimer={setTimer} />
      <Button
        name="start"
        onClick={() => setTimer((prev) => ({ ...prev, isRunning: true }))}
      />
      <Button
        name="pause"
        onClick={() => setTimer((prev) => ({ ...prev, isRunning: false }))}
      />
      <Button name="reset" onClick={handleReset} />
    </>
  );
}

export default App;
