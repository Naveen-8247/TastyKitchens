import {createContext} from 'react'

const CartContext = createContext({
  cartList: [],
  addCartItem: () => {},
  incrementCartItemQuantity: () => {},
  decrementCartItemQuantity: () => {},
  removeCartItem: () => {},
  clearCart: () => {},
})

export default CartContext
