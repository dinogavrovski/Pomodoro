import formatTime from "../utils/formatTime";
import timeSwitch from "../utils/timeSwitch";

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
  return (
    <div>
      <h3>{timer.isWorkTime ? "Work Time" : "Break Time"}</h3>
      <h1>{formatTime(timer.remainingTimeSeconds)}</h1>
    </div>
  );
}

export default Timer;
