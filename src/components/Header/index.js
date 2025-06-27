import {Link, withRouter} from 'react-router-dom'
import {useContext, useState} from 'react'
import Cookies from 'js-cookie'
import {GiHamburgerMenu} from 'react-icons/gi'
import {IoMdClose} from 'react-icons/io'
import CartContext from '../Context/CartContext'
import './index.css'

const Header = props => {
  const {cartList} = useContext(CartContext)
  const [activeTab, setActiveTab] = useState('HOME')
  const [showMenu, setShowMenu] = useState(false)

  const onLogout = () => {
    Cookies.remove('jwt_token')
    const {history} = props
    history.replace('/login')
  }

  const setActive = tab => {
    setActiveTab(tab)
    setShowMenu(false)
  }

  const toggleMenu = () => {
    setShowMenu(prev => !prev)
  }

  return (
    <nav className="header-container">
      <div className="logo-section">
        <Link to="/" className="logo-link" onClick={() => setActive('HOME')}>
          <p className="logo-text">Tasty Kitchen</p>
          <img
            src="//res.cloudinary.com/dcy78sibl/image/upload/v1750014966/Frame_274_mve4xt.png"
            className="header-logo"
            alt="website logo"
          />
        </Link>
        <button type="button" className="hamburger-button" onClick={toggleMenu}>
          {showMenu ? <IoMdClose size={24} /> : <GiHamburgerMenu size={24} />}
        </button>
      </div>

      <ul className={`nav-links ${showMenu ? 'show-menu' : ''}`}>
        <li>
          <Link
            to="/"
            onClick={() => setActive('HOME')}
            className={
              activeTab === 'HOME' ? 'nav-link active-link' : 'nav-link'
            }
          >
            Home
          </Link>
        </li>
        <li>
          <Link
            to="/cart"
            onClick={() => setActive('CART')}
            className={
              activeTab === 'CART' ? 'nav-link active-link' : 'nav-link'
            }
          >
            <span className="cart-link-wrapper">
              Cart
              {cartList.length > 0 && (
                <span className="cart-count">({cartList.length})</span>
              )}
            </span>
          </Link>
        </li>
        <li>
          <button type="button" onClick={onLogout} className="logout-button">
            Logout
          </button>
        </li>
      </ul>
    </nav>
  )
}

export default withRouter(Header)
