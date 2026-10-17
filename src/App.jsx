import "./App.css";
import Timer from "./components/Timer.jsx";
import Button from "./components/Button.jsx";
import { useEffect, useState } from "react";
import { COUNTDOWN_START_VALUE, BREAKTIME_VALUE } from "./constants.js";
import AmbientSound from "./components/AmbientSound.jsx";
import SessionHistory from "./components/SessionHistory.jsx";
import IdleCharacter from "./components/IdleCharacter.jsx";

function App() {
  const [timer, setTimer] = useState(() => {
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
    <div className="app" data-mode={timer.isWorkTime ? "work" : "break"}>
      <header className="app-header">
        <h1 className="logo">Focus Room</h1>
      </header>
      <main className="layout">
        <SessionHistory history={timer.history} />
        <section className="stage">
          <IdleCharacter
            isRunning={timer.isRunning}
            isWorkTime={timer.isWorkTime}
          />
        </section>
        <section className="card control-column">
          <AmbientSound />
          <Timer timer={timer} setTimer={setTimer} />
          <div className="timer-controls">
            <Button
              className="btn btn-primary"
              name="start"
              onClick={() => setTimer((prev) => ({ ...prev, isRunning: true }))}
            />
            <Button
              name="pause"
              onClick={() =>
                setTimer((prev) => ({ ...prev, isRunning: false }))
              }
            />
            <Button name="reset" onClick={handleReset} />
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;
