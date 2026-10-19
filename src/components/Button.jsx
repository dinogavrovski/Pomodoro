// `label` is read out by screen readers. Needed when `name` is an icon instead of text.
function Button({ name, onClick, className = "btn", label }) {
  return (
    <button className={className} onClick={onClick} aria-label={label}>
      {name}
    </button>
  );
}

export default Button;
