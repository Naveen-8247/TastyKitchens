import {useContext, useState} from 'react'
import {Link} from 'react-router-dom'
import {FaCheckCircle} from 'react-icons/fa'
import CartContext from '../Context/CartContext'
import CartItem from '../CartItem'
import Header from '../Header'
import Footer from '../Footer'
import './index.css'

const Cart = () => {
  const {
    cartList,
    incrementCartItemQuantity,
    decrementCartItemQuantity,
    removeCartItem,
    removeAllCartItems,
  } = useContext(CartContext)

  const [isOrderPlaced, setIsOrderPlaced] = useState(false)

  const getTotalPrice = () =>
    cartList.reduce((total, item) => total + item.cost * item.quantity, 0)

  const onClickRemoveAll = () => {
    removeAllCartItems()
  }

  const onClickPlaceOrder = () => {
    removeAllCartItems()
    setIsOrderPlaced(true)
  }

  const renderSuccessView = () => (
    <div className="order-success-view">
      <FaCheckCircle className="success-icon" />
      <h1 className="success-title">Payment Successful</h1>
      <p className="success-subtitle">Thank You for Ordering</p>
      <p className="success-message">Your payment is successfully completed</p>
      <Link to="/">
        <button className="go-home-button" type="button">
          Go to Home Page
        </button>
      </Link>
    </div>
  )

  const renderEmptyCart = () => (
    <div className="empty-cart">
      <img
        src="https://res.cloudinary.com/dcy78sibl/image/upload/v1750014057/cooking_1_tkm0vl.png"
        alt="empty cart"
        className="empty-cart-img"
      />
      <h1>No Order Yet!</h1>
      <p>Your cart is empty. Add something from the menu.</p>
      <Link to="/" className="order-now-link">
        <button type="button" className="order-now-button">
          Order Now
        </button>
      </Link>
    </div>
  )

  const renderCartItems = () => (
    <>
      <div className="cart-header">
        <h1 className="my-cart-heading">My Cart</h1>
        <button
          className="remove-all-button"
          type="button"
          onClick={onClickRemoveAll}
        >
          Remove All
        </button>
      </div>

      <div className="cart-container">
        <ul className="cart-items-list">
          {cartList.map(item => (
            <CartItem
              key={item.id}
              item={item}
              incrementCartItemQuantity={incrementCartItemQuantity}
              decrementCartItemQuantity={decrementCartItemQuantity}
              removeCartItem={removeCartItem}
            />
          ))}
        </ul>

        <div className="cart-summary">
          <h1 className="total-price-label">
            Order Total: ₹
            <span data-testid="total-price">{getTotalPrice()}</span>
          </h1>
          <button
            className="place-order-button"
            type="button"
            data-testid="place-order-button"
            onClick={onClickPlaceOrder}
          >
            Place Order
          </button>
        </div>
      </div>
    </>
  )

  const renderFinalCart = () => {
    if (isOrderPlaced) {
      return renderSuccessView()
    }
    if (cartList.length === 0) {
      return renderEmptyCart()
    }
    return renderCartItems()
  }

  return (
    <div className="cart-page">
      <Header />
      <div className="cart-content">{renderFinalCart()}</div>
      <Footer />
    </div>
  )
}

export default Cart
