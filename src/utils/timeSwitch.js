import { COUNTDOWN_START_VALUE, BREAKTIME_VALUE } from "../constants.js";

function timeSwitch(prev) {
    if (prev.remainingTimeSeconds === 1) {
        return {
            remainingTimeSeconds: prev.isWorkTime ? BREAKTIME_VALUE : COUNTDOWN_START_VALUE,
            isWorkTime: !prev.isWorkTime,
            isRunning: false,
            history: prev.isWorkTime ? [...prev.history, Date.now()] : [...prev.history],
        }
    }
    return { ...prev, remainingTimeSeconds: prev.remainingTimeSeconds - 1 };
}

export default timeSwitch;