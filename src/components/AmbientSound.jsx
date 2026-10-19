import { useRef, useState, useEffect } from "react";
import Button from "./Button.jsx";
import PixelIcon from "./PixelIcon.jsx";
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

  // A fragment, so the player and the volume bar become separate grid items
  // in the right column (CSS places one above the timer, one below)
  return (
    <>
      <div className="music-player">
        <p className="now-playing">
          <span className="now-playing-label">Now Playing:</span>
          <span className="now-playing-track">♪ {nowPlaying}</span>
        </p>
        <div className="music-buttons">
          <Button
            className="btn btn-icon"
            name={<PixelIcon name="prev" />}
            label="Previous track"
            onClick={handlePrevious}
          />
          <Button
            className="btn btn-icon btn-primary"
            name={<PixelIcon name={isPlaying ? "pause" : "play"} />}
            label={isPlaying ? "Pause music" : "Play music"}
            onClick={handleClick}
          />
          <Button
            className="btn btn-icon"
            name={<PixelIcon name="next" />}
            label="Next track"
            onClick={handleNext}
          />
        </div>
      </div>
      <div className="volume">
        <label htmlFor="volume">VOL</label>
        <input
          id="volume"
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={volumeLevel}
          onChange={(e) => {
            setVolumeLevel(Number(e.target.value));
          }}
        />
        <span className="volume-value">{Math.round(volumeLevel * 100)}%</span>
      </div>
      <audio loop ref={audioRef} src={sound} />
    </>
  );
}

export default AmbientSound;
