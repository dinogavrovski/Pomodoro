import { useRef, useState, useEffect } from "react";
import Button from "./Button.jsx";

function AmbientSound({ src }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);
  const [volumeLevel, setVolumeLevel] = useState(0.5);

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

  useEffect(() => {
    audioRef.current.volume = volumeLevel;
  }, [volumeLevel]);

  return (
    <div>
      <Button name={isPlaying ? "Pause" : "Play"} onClick={handleClick} />
      <h3>Now Playing: {nowPlaying}</h3>
      <input
        type="range"
        min="0"
        max="1"
        step="0.01"
        value={volumeLevel}
        onChange={(e) => {
          setVolumeLevel(Number(e.target.value));
        }}
      />
      <audio loop ref={audioRef} src={src} />
    </div>
  );
}

export default AmbientSound;
