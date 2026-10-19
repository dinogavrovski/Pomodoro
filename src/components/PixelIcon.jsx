// Tiny pixel-art icons drawn on a 7x7 grid: "X" = filled pixel, "." = empty.
// Each X becomes a 1x1 square in the SVG, so the icons match the pixel style.
const ICONS = {
  play: [
    "X......",
    "XXX....",
    "XXXXX..",
    "XXXXXXX",
    "XXXXX..",
    "XXX....",
    "X......",
  ],
  pause: [
    ".XX.XX.",
    ".XX.XX.",
    ".XX.XX.",
    ".XX.XX.",
    ".XX.XX.",
    ".XX.XX.",
    ".XX.XX.",
  ],
  next: [
    "X....XX",
    "XX...XX",
    "XXX..XX",
    "XXXX.XX",
    "XXX..XX",
    "XX...XX",
    "X....XX",
  ],
  prev: [
    "XX....X",
    "XX...XX",
    "XX..XXX",
    "XX.XXXX",
    "XX..XXX",
    "XX...XX",
    "XX....X",
  ],
};

function PixelIcon({ name }) {
  const rows = ICONS[name];

  return (
    <svg
      className="pixel-icon"
      viewBox="0 0 7 7"
      width="14"
      height="14"
      fill="currentColor"
      shapeRendering="crispEdges"
      aria-hidden="true"
    >
      {rows.map((row, y) =>
        [...row].map((cell, x) =>
          cell === "X" ? (
            <rect key={`${x}-${y}`} x={x} y={y} width="1" height="1" />
          ) : null,
        ),
      )}
    </svg>
  );
}

export default PixelIcon;
