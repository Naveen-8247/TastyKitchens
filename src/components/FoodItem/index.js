import {useContext} from 'react'
import {AiFillStar} from 'react-icons/ai'
import CartContext from '../Context/CartContext'
import Counter from '../Counter'

import './index.css'

const FoodItem = props => {
  const {foodItem} = props
  const {id, name, cost, imageUrl, rating} = foodItem

  const {
    cartList,
    addCartItem,
    incrementCartItemQuantity,
    decrementCartItemQuantity,
  } = useContext(CartContext)

  const cartItem = cartList.find(item => item.id === id)

  const onAddToCart = () => {
    addCartItem(foodItem)
  }

  const onIncrement = () => {
    incrementCartItemQuantity(id)
  }

  const onDecrement = () => {
    decrementCartItemQuantity(id)
  }

  return (
    <li className="food-item" data-testid="foodItem">
      <img src={imageUrl} alt={name} className="food-item-img" />
      <div className="food-item-info">
        <h1 className="food-item-name">{name}</h1>
        <div className="food-item-details-row">
          <p className="food-item-cost">₹{cost}</p>
          <div className="food-item-rating">
            <AiFillStar className="star-icon" color="#FFCC00" size={14} />
            <span className="rating-text">{rating}</span>
          </div>
        </div>

        {cartItem ? (
          <Counter
            quantity={cartItem.quantity}
            onIncrement={onIncrement}
            onDecrement={onDecrement}
            testidPrefix={`foodItem-${id}`}
          />
        ) : (
          <button
            type="button"
            className="add-to-cart-btn"
            onClick={onAddToCart}
          >
            ADD TO CART
          </button>
        )}
      </div>
    </li>
  )
}

export default FoodItem
