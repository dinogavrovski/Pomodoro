import Button from "./Button.jsx";

// On desktop this is the left column. On phones it becomes a slide-up panel:
// `isOpen` adds the "is-open" class (CSS slides it in), `onClose` closes it.
function SessionHistory({ history, isOpen, onClose }) {
  return (
    <aside className={isOpen ? "card history-panel is-open" : "card history-panel"}>
      <div className="history-header">
        <h2 className="panel-title">
          {history.length === 0 ? `No sessions yet` : `Session History`}
        </h2>
        <Button
          className="btn btn-icon history-close"
          name="✕"
          label="Close history"
          onClick={onClose}
        />
      </div>
      <ul className="history-list">
        {history.map((item) => (
          <li key={item.finishedAt}>
            <span>
              {new Date(item.finishedAt).toLocaleDateString(undefined, {
                month: "short",
                day: "numeric",
              })}
            </span>
            <span>- {item.minutes} min</span>
            <span className="history-time">
              {new Date(item.finishedAt).toLocaleTimeString(undefined, {
                hour: "numeric",
                minute: "2-digit",
              })}
            </span>
          </li>
        ))}
      </ul>
    </aside>
  );
}

export default SessionHistory;
