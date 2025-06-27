import {useContext} from 'react'
import {Link} from 'react-router-dom'
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
  } = useContext(CartContext)

  const getTotalPrice = () =>
    cartList.reduce((total, item) => total + item.cost * item.quantity, 0)

  return (
    <div className="cart-page">
      <Header />
      <div className="cart-container">
        {cartList.length === 0 ? (
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
        ) : (
          <>
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
              >
                Place Order
              </button>
            </div>
          </>
        )}
      </div>
      <Footer />
    </div>
  )
}

export default Cart
