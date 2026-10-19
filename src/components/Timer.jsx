import formatTime from "../utils/formatTime";
import timeSwitch from "../utils/timeSwitch";
import { BREAKTIME_VALUE } from "../constants.js";

import { useEffect } from "react";
function Timer({ timer, setTimer }) {
  useEffect(() => {
    if (!timer.isRunning) {
      return;
    }
    const intervalId = setInterval(() => {
      setTimer(timeSwitch);
    }, 1000);

    return () => clearInterval(intervalId);
  }, [setTimer, timer.isRunning]);

  // Derived values for the progress ring: 1 = full, 0 = empty
  const sessionDuration = timer.isWorkTime
    ? timer.workMinutes * 60
    : BREAKTIME_VALUE;
  const progress = timer.remainingTimeSeconds / sessionDuration;

  return (
    <div className="timer" style={{ "--progress": progress }}>
      <div className="timer-ring">
        <div className="timer-face">
          <p className="timer-mode">
            {timer.isWorkTime ? "Work Time" : "Break Time"}
          </p>
          <p className="timer-digits" role="timer">
            {formatTime(timer.remainingTimeSeconds)}
          </p>
        </div>
      </div>
    </div>
  );
}

export default Timer;
