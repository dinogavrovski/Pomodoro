function SessionHistory({ history }) {
  return (
    <aside className="card history-panel">
      <h2 className="panel-title">
        {history.length === 0 ? `No sessions yet` : `Session History`}
      </h2>
      <ul className="history-list">
        {history.map((item) => (
          <li key={item}>
            <span>
              {new Date(item).toLocaleDateString(undefined, {
                month: "short",
                day: "numeric",
              })}
            </span>
            <span className="history-time">
              {new Date(item).toLocaleTimeString(undefined, {
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
