import {BrowserRouter, Switch, Route, Redirect} from 'react-router-dom'
import {useState, useEffect} from 'react'

import Login from './components/Login'
import Home from './components/Home'
import RestaurantDetails from './components/RestaurantDetails'
import Cart from './components/Cart'
import NotFound from './components/NotFound'
import ProtectedRoute from './components/ProtectedRoute'
import CartContext from './components/Context/CartContext'

import './App.css'

const sortByOptions = [
  {id: 'Lowest', displayText: 'Lowest'},
  {id: 'Highest', displayText: 'Highest'},
]

const HomeWithSortByOptions = props => (
  <Home {...props} sortByOptions={sortByOptions} />
)

const App = () => {
  const [cartList, setCartList] = useState(() => {
    const stored = localStorage.getItem('cartData')
    return stored ? JSON.parse(stored) : []
  })

  useEffect(() => {
    localStorage.setItem('cartData', JSON.stringify(cartList))
  }, [cartList])

  // ✅ REMOVE ITEM
  const removeCartItem = id => {
    const updated = cartList.filter(each => each.id !== id)
    setCartList(updated)
  }

  // ✅ REMOVE ALL ITEMS
  const removeAllCartItems = () => {
    setCartList([])
  }

  // ✅ ADD TO CART
  const addCartItem = item => {
    const existing = cartList.find(each => each.id === item.id)
    if (existing) {
      const updated = cartList.map(each =>
        each.id === item.id ? {...each, quantity: each.quantity + 1} : each,
      )
      setCartList(updated)
    } else {
      setCartList([...cartList, {...item, quantity: 1}])
    }
  }

  // ✅ INCREMENT
  const incrementCartItemQuantity = id => {
    const updated = cartList.map(each =>
      each.id === id ? {...each, quantity: each.quantity + 1} : each,
    )
    setCartList(updated)
  }

  // ✅ DECREMENT
  const decrementCartItemQuantity = id => {
    const item = cartList.find(each => each.id === id)
    if (item.quantity === 1) {
      removeCartItem(id)
    } else {
      const updated = cartList.map(each =>
        each.id === id ? {...each, quantity: each.quantity - 1} : each,
      )
      setCartList(updated)
    }
  }

  return (
    <CartContext.Provider
      value={{
        cartList,
        addCartItem,
        incrementCartItemQuantity,
        decrementCartItemQuantity,
        removeCartItem,
        removeAllCartItems,
      }}
    >
      <BrowserRouter>
        <Switch>
          <Route exact path="/login" component={Login} />
          <ProtectedRoute exact path="/" component={HomeWithSortByOptions} />
          <ProtectedRoute
            exact
            path="/restaurant/:id"
            component={RestaurantDetails}
          />
          <ProtectedRoute exact path="/cart" component={Cart} />
          <Route exact path="/not-found" component={NotFound} />
          <Redirect to="/not-found" />
        </Switch>
      </BrowserRouter>
    </CartContext.Provider>
  )
}

export default App
