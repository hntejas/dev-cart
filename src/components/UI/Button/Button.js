import "./button.css";

export default function Button({ text, onClick, styleClass, disabled }) {
  return (
    <button disabled={disabled} className={styleClass || "btn"} onClick={onClick}>
      {text}
    </button>
  );
}
