import "./App.css";
import Timer from "./components/Timer.jsx";
import Button from "./components/Button.jsx";
import { useEffect, useState } from "react";
import { COUNTDOWN_START_VALUE, BREAKTIME_VALUE } from "./constants.js";
import AmbientSound from "./components/AmbientSound.jsx";
import SessionHistory from "./components/SessionHistory.jsx";

function App() {
  const [timer, setTimer] = useState(() => {
    console.log("reading storage");
    const result = JSON.parse(localStorage.getItem("sessionHistory"));
    return {
      remainingTimeSeconds: COUNTDOWN_START_VALUE,
      isWorkTime: true,
      isRunning: false,
      history: result ? result : [],
    };
  });
  function handleReset() {
    setTimer({
      ...timer,
      isRunning: false,
      remainingTimeSeconds: timer.isWorkTime
        ? COUNTDOWN_START_VALUE
        : BREAKTIME_VALUE,
    });
  }
  useEffect(() => {
    localStorage.setItem("sessionHistory", JSON.stringify(timer.history));
  }, [timer.history]);
  return (
    <>
      <AmbientSound />
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
      <SessionHistory history={timer.history} />
    </>
  );
}

export default App;
