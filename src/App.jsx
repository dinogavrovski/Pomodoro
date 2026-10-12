import "./App.css";
import Timer from "./components/Timer.jsx";
import Button from "./components/Button.jsx";
import { useState } from "react";

function App() {
  const [remainingTimeSeconds, setRemainingTimeSeconds] = useState(25 * 60);
  return (
    <>
      <Timer
        remainingTimeSeconds={remainingTimeSeconds}
        setRemainingTimeSeconds={setRemainingTimeSeconds}
      />
      <Button name="start" />
      <Button name="pause" />
      <Button name="reset" />
    </>
  );
}

export default App;
