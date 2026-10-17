function Button({ name, onClick, className = "btn" }) {
  return (
    <button className={className} onClick={onClick}>
      {name}
    </button>
  );
}

export default Button;
