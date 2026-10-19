import "./App.css";
import Timer from "./components/Timer.jsx";
import Button from "./components/Button.jsx";
import { useEffect, useState } from "react";
import { BREAKTIME_VALUE, DEFAULT_WORK_MINUTES } from "./constants.js";
import AmbientSound from "./components/AmbientSound.jsx";
import SessionHistory from "./components/SessionHistory.jsx";
import IdleCharacter from "./components/IdleCharacter.jsx";

function App() {
  const [timer, setTimer] = useState(() => {
    const result = JSON.parse(localStorage.getItem("sessionHistory"));
    return {
      workMinutes: DEFAULT_WORK_MINUTES,
      isWorkTime: true,
      isRunning: false,
      history: result ? result : [],
      remainingTimeSeconds: DEFAULT_WORK_MINUTES * 60,
    };
  });
  function handleReset() {
    setTimer({
      ...timer,
      isRunning: false,
      remainingTimeSeconds: timer.isWorkTime
        ? timer.workMinutes * 60
        : BREAKTIME_VALUE,
    });
  }
  function handleDurationClick(minutes) {
    setTimer((prev) => ({
      ...prev,
      isRunning: false,
      isWorkTime: true,
      workMinutes: minutes,
      remainingTimeSeconds: minutes * 60,
    }));
  }
  useEffect(() => {
    localStorage.setItem("sessionHistory", JSON.stringify(timer.history));
  }, [timer.history]);

  // Phones only: the history lives in a slide-up panel that can be opened and closed
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);

  // Close the panel with the Escape key (syncing with the browser's keyboard events)
  useEffect(() => {
    if (!isHistoryOpen) {
      return;
    }
    function handleKeyDown(e) {
      if (e.key === "Escape") {
        setIsHistoryOpen(false);
      }
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isHistoryOpen]);

  return (
    <div className="app" data-mode={timer.isWorkTime ? "work" : "break"}>
      {/* Not shown on screen, but screen readers and search engines still get a page title */}
      <h1 className="visually-hidden">Focus Room</h1>
      <Button
        className="btn history-toggle"
        name={`History (${timer.history.length})`}
        onClick={() => setIsHistoryOpen(true)}
      />
      {isHistoryOpen && (
        <div
          className="history-backdrop"
          onClick={() => setIsHistoryOpen(false)}
        />
      )}
      <main className="layout">
        <SessionHistory
          history={timer.history}
          isOpen={isHistoryOpen}
          onClose={() => setIsHistoryOpen(false)}
        />
        <section className="stage">
          <IdleCharacter
            isRunning={timer.isRunning}
            isWorkTime={timer.isWorkTime}
          />
          <AmbientSound />
        </section>
        <section className="card control-column">
          <Timer timer={timer} setTimer={setTimer} />
          <div className="duration-controls">
            <Button
              className={timer.workMinutes === 10 ? "btn btn-primary" : "btn"}
              name="10"
              onClick={() => handleDurationClick(10)}
            />
            <Button
              className={timer.workMinutes === 15 ? "btn btn-primary" : "btn"}
              name="15"
              onClick={() => handleDurationClick(15)}
            />
            <Button
              className={timer.workMinutes === 25 ? "btn btn-primary" : "btn"}
              name="25"
              onClick={() => handleDurationClick(25)}
            />
          </div>
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
