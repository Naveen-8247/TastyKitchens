import {FaPlus, FaMinus} from 'react-icons/fa'
import './index.css'

const CartItem = ({
  item,
  incrementCartItemQuantity,
  decrementCartItemQuantity,
  removeCartItem,
}) => {
  const {id, name, cost, quantity, imageUrl} = item

  const onClickIncrement = () => incrementCartItemQuantity(id)
  const onClickDecrement = () => decrementCartItemQuantity(id)
  const onClickRemove = () => removeCartItem(id)

  return (
    <li className="cart-item" data-testid="cartItem">
      <img src={imageUrl} alt={name} className="cart-item-image" />
      <div className="cart-item-info">
        <h1 className="cart-item-name">{name}</h1>
        <div className="cart-quantity-controls">
          <button
            type="button"
            className="quantity-button"
            onClick={onClickDecrement}
            data-testid="decrement-quantity"
          >
            <FaMinus size={10} />
          </button>
          <p className="quantity" data-testid="item-quantity">
            {quantity}
          </p>
          <button
            type="button"
            className="quantity-button"
            onClick={onClickIncrement}
            data-testid="increment-quantity"
          >
            <FaPlus size={10} />
          </button>
        </div>
        <p className="cart-item-cost">Price: ₹ {cost * quantity}</p>
        <button type="button" className="remove-btn" onClick={onClickRemove}>
          Remove
        </button>
      </div>
    </li>
  )
}

export default CartItem
