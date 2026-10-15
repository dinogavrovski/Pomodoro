import { useRef, useState } from "react";
import Button from "./Button.jsx";

function AmbientSound({ src }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  function handleClick() {
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play();
      setIsPlaying(true);
    }
  }
  const nowPlaying = String(src).split("/").at(-1);

  return (
    <div>
      <Button name={isPlaying ? "Pause" : "Play"} onClick={handleClick} />
      <h3>Now Playing: {nowPlaying}</h3>
      <audio ref={audioRef} src={src} />
    </div>
  );
}

export default AmbientSound;
