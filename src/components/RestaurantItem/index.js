import {Link} from 'react-router-dom'
import {AiFillStar} from 'react-icons/ai'
import './index.css'

const RestaurantItem = props => {
  const {restaurant, testid} = props
  const {id, name, cuisine, imageUrl, userRating} = restaurant
  const {rating, totalReviews} = userRating

  return (
    <li className="restaurant-item" data-testid={testid}>
      <Link to={`/restaurant/${id}`} className="restaurant-link">
        <img src={imageUrl} alt={name} className="restaurant-img" />
        <div className="restaurant-details">
          <h1 className="restaurant-item-name">{name}</h1>
          <p className="restaurant-item-cuisine">{cuisine}</p>
          <div className="restaurant-item-rating">
            <AiFillStar className="star-icon" />
            <span className="rating-text">
              {rating} • {totalReviews}+ Ratings
            </span>
          </div>
        </div>
      </Link>
    </li>
  )
}

export default RestaurantItem
