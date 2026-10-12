import "./App.css";
import Timer from "./components/Timer.jsx";
import Button from "./components/Button.jsx";

function App() {
  return (
    <>
      <Timer />
      <Button name="start" />
      <Button name="pause" />
      <Button name="reset" />
    </>
  );
}

export default App;
