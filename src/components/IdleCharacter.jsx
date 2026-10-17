import { useEffect, useState } from "react";

const ANIMATIONS = {
  idle: { folder: "idle", frameCount: 4 },
  run: { folder: "run", frameCount: 8 },
};
const FRAME_DURATION_MS = 180; // half the original speed (120ms per frame)

function IdleCharacter({ isRunning, isWorkTime }) {
  const [tick, setTick] = useState(0);

  // Same pattern as the timer: one interval, cleaned up on unmount
  useEffect(() => {
    const intervalId = setInterval(() => {
      setTick((prevTick) => prevTick + 1);
    }, FRAME_DURATION_MS);

    return () => clearInterval(intervalId);
  }, []);

  // Derived: run while a work session is counting down, idle otherwise
  const animation = isRunning && isWorkTime ? ANIMATIONS.run : ANIMATIONS.idle;
  const frame = (tick % animation.frameCount) + 1;

  let message = "zzz...";
  if (isRunning) {
    message = isWorkTime ? "focus time!" : "snack break!";
  }

  return (
    <div className="character">
      <p className="speech-bubble">{message}</p>
      <img
        className="character-sprite"
        src={`/sprites/${animation.folder}/${frame}.png`}
        alt="A frog with a backpack"
      />
      {/* Hidden copies so every frame is already loaded before it's needed */}
      <div hidden>
        {Object.values(ANIMATIONS).map((anim) =>
          Array.from({ length: anim.frameCount }, (_, i) => (
            <img
              key={`${anim.folder}-${i}`}
              src={`/sprites/${anim.folder}/${i + 1}.png`}
              alt=""
            />
          )),
        )}
      </div>
    </div>
  );
}

export default IdleCharacter;
