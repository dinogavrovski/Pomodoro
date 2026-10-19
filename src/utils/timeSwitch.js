import { BREAKTIME_VALUE } from "../constants.js";

function timeSwitch(prev) {
    if (prev.remainingTimeSeconds === 1) {
        return {
            isWorkTime: !prev.isWorkTime,
            isRunning: false,
            history: prev.isWorkTime ? [...prev.history, { finishedAt: Date.now(), minutes: prev.workMinutes }] : [...prev.history],
            workMinutes: prev.workMinutes,
            remainingTimeSeconds: prev.isWorkTime ? BREAKTIME_VALUE : prev.workMinutes * 60,
        }
    }
    return { ...prev, remainingTimeSeconds: prev.remainingTimeSeconds - 1 };
}

export default timeSwitch;