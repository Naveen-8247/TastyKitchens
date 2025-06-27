import {Link} from 'react-router-dom'
import './index.css'

const NotFound = () => (
  <div className="not-found-container">
    <img
      src="https://res.cloudinary.com/dcy78sibl/image/upload/v1750014822/erroring_1_ndaaxc.png"
      alt="not found"
      className="not-found-img"
    />
    <h1 className="not-found-title">Page Not Found</h1>
    <p className="not-found-desc">
      We are sorry, the page you requested could not be found. Please go back to
      the homepage
    </p>
    <Link to="/" className="home-button">
      Home Page
    </Link>
  </div>
)

export default NotFound
