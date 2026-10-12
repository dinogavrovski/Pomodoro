import { useEffect } from "react";
function Timer({ remainingTimeSeconds, setRemainingTimeSeconds }) {
  useEffect(() => {
    const timer = setInterval(() => {
      setRemainingTimeSeconds((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [setRemainingTimeSeconds]);
  return <h1>{remainingTimeSeconds}</h1>;
}

export default Timer;
