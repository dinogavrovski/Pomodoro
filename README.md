# Focus Room 🐸

A cozy pixel-art Pomodoro timer with a lofi music player. A little frog keeps you company: it naps while the timer is stopped and runs alongside you during work sessions.

**Live demo:** _coming soon_ <!-- TODO: add the Vercel/Netlify link after deploying -->

<!-- TODO: add a screenshot, e.g. save one as docs/screenshot.png and uncomment the line below -->
<!-- ![Focus Room screenshot](docs/screenshot.png) -->

## Features

- **Pomodoro timer:** 25-minute work sessions and 5-minute breaks, with Start, Pause and Reset
- **Automatic mode switching:** when a session ends, the timer switches between work and break and waits for you to start the next one
- **Progress ring:** empties as the session counts down; green for work, orange for breaks
- **Lofi music player:** play/pause, previous/next track and a volume slider; loops keep playing while you work
- **Session history:** every finished work session is saved and survives a page refresh
- **Animated frog:** idle animation when stopped, running animation during work sessions
- **Responsive:** fits on one screen on desktop and stacks into a single column on phones

## Tech stack

- [React](https://react.dev/) 19 with hooks (`useState`, `useEffect`, `useRef`)
- [Vite](https://vite.dev/) for the dev server and build
- Plain CSS (CSS Grid, custom properties)
- `localStorage` for saving session history
- ESLint with the React Hooks plugin

## Running it locally

You'll need [Node.js](https://nodejs.org/) installed.

```bash
git clone https://github.com/dinogavrovski/Pomodoro.git
cd Pomodoro
npm install
npm run dev
```

Then open the URL that Vite prints (usually http://localhost:5173).

Other scripts:

- `npm run build` creates a production build in `dist/`
- `npm run preview` serves that production build locally
- `npm run lint` runs ESLint

## Project structure

```
src/
  App.jsx                  timer state, session history, layout
  constants.js             session durations and the track list
  components/
    Timer.jsx              countdown interval and progress ring
    AmbientSound.jsx       <audio> player: play/pause, tracks, volume
    SessionHistory.jsx     list of finished work sessions
    IdleCharacter.jsx      frog sprite animation
    Button.jsx             reusable button
  utils/
    formatTime.js          seconds → "mm:ss"
    timeSwitch.js          pure function that computes the next timer state each tick
public/
  sounds/                  lofi loops
  sprites/                 frog animation frames
```

## What I learned

I built this as a learning project while getting back into React, one feature at a time. Some of the things that took the most work to understand:

<!-- TODO: rewrite these in your own words -->

- **Effects and cleanup.** My first timer called `setInterval` directly in the component body, so every re-render created another interval and the countdown sped up exponentially. Moving it into `useEffect` with a cleanup function fixed it.
- **Stale closures.** An interval callback only "sees" the values from the render it was created in. Using updater functions (`setTime(prev => prev - 1)`) lets React supply the current value instead.
- **Grouping related state.** The remaining time, the work/break mode, the running flag and the history all change together when a session ends, so they live in one state object. A pure function, `timeSwitch`, returns the next state each tick, instead of chaining effects that set more state.
- **Refs vs. state.** The `<audio>` element is held in a ref because I call methods on it, while `isPlaying` and the volume are state because the screen has to show them. Small effects keep the audio element in sync with that state.
- **Persisting data.** Session history is read once with a lazy `useState` initializer and written back to `localStorage` with an effect whenever it changes. Values are stored as JSON, since `localStorage` only stores strings.

## Credits

<!-- TODO: fill in where the assets came from and their licenses -->

- Frog sprites: _source and license_
- Lofi music loops: _source and license_
- Fonts: [Press Start 2P](https://fonts.google.com/specimen/Press+Start+2P) and [VT323](https://fonts.google.com/specimen/VT323) from Google Fonts (SIL Open Font License)
