// src/components/Counter/index.js
import './index.css'

const Counter = ({quantity, onIncrement, onDecrement, testidPrefix}) => (
  <div className="counter-container">
    <button
      type="button"
      className="counter-button"
      onClick={onDecrement}
      data-testid={`${testidPrefix}-decrement`}
    >
      -
    </button>
    <span data-testid={`${testidPrefix}-quantity`} className="counter-quantity">
      {quantity}
    </span>
    <button
      type="button"
      className="counter-button"
      onClick={onIncrement}
      data-testid={`${testidPrefix}-increment`}
    >
      +
    </button>
  </div>
)

export default Counter
