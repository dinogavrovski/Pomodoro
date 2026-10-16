function SessionHistory({ history }) {
  return (
    <div>
      <h2>{history.length === 0 ? `No sessions yet` : `Session History`}</h2>
      <ul>
        {history.map((item) => (
          <li key={item}>{new Date(item).toLocaleString()}</li>
        ))}
      </ul>
    </div>
  );
}

export default SessionHistory;
