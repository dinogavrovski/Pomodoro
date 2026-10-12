import "./App.css";
import Timer from "./components/Timer.jsx";
import Button from "./components/Button.jsx";
import { useState } from "react";

const COUNTDOWN_START_VALUE = 25 * 60;

function App() {
  const [remainingTimeSeconds, setRemainingTimeSeconds] = useState(
    COUNTDOWN_START_VALUE,
  );
  const [isRunning, setIsRunning] = useState(false);
  function handleResetClick() {
    setIsRunning(false);
    setRemainingTimeSeconds(COUNTDOWN_START_VALUE);
  }
  return (
    <>
      <Timer
        remainingTimeSeconds={remainingTimeSeconds}
        setRemainingTimeSeconds={setRemainingTimeSeconds}
        isRunning={isRunning}
      />
      <Button name="start" onClick={() => setIsRunning(true)} />
      <Button name="pause" onClick={() => setIsRunning(false)} />
      <Button name="reset" onClick={handleResetClick} />
    </>
  );
}

export default App;
