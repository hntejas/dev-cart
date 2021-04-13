import "./counter.css";

export default function Counter({ value, onIncrement, onDecrement }) {
  return (
    <div className="counter">
      <button
        onClick={onDecrement}
        disabled={value <= 1}
        className="btn-counter"
      >
        -
      </button>
      <span className="counter-text">{value}</span>
      <button onClick={onIncrement} className="btn-counter">
        +
      </button>
    </div>
  );
}
