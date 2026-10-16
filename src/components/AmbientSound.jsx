import { useRef, useState, useEffect } from "react";
import Button from "./Button.jsx";
import { SOUND_FILES } from "../constants.js";

function AmbientSound() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);
  const [volumeLevel, setVolumeLevel] = useState(0.5);
  const [index, setIndex] = useState(0);

  function handleClick() {
    setIsPlaying((prevIsPlaying) => !prevIsPlaying);
  }
  function handlePrevious() {
    setIndex((prevIndex) =>
      prevIndex === 0 ? SOUND_FILES.length - 1 : prevIndex - 1,
    );
  }
  function handleNext() {
    setIndex((currentIndex) =>
      currentIndex === SOUND_FILES.length - 1 ? 0 : currentIndex + 1,
    );
  }
  const nowPlaying = String(SOUND_FILES.at(index)).split("/").at(-1);
  const sound = SOUND_FILES.at(index);

  useEffect(() => {
    audioRef.current.volume = volumeLevel;
  }, [volumeLevel]);

  useEffect(() => {
    if (isPlaying) {
      audioRef.current.play();
    } else if (!isPlaying) {
      audioRef.current.pause();
    }
  }, [index, isPlaying]);

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
      <Button name="Previous" onClick={handlePrevious} />
      <Button name="Next" onClick={handleNext} />
      <p>Volume: {Math.round(volumeLevel * 100)}%</p>
      <audio loop ref={audioRef} src={sound} />
    </div>
  );
}

export default AmbientSound;
