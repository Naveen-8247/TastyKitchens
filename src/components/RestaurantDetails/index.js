import {useEffect, useState} from 'react'
import {useParams} from 'react-router-dom'
import Loader from 'react-loader-spinner'
import {AiFillStar} from 'react-icons/ai'
import Cookies from 'js-cookie'

import Header from '../Header'
import Footer from '../Footer'
import FoodItem from '../FoodItem'

import './index.css'

const RestaurantDetails = () => {
  const {id} = useParams()
  const [restaurantDetails, setRestaurantDetails] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchRestaurantDetails = async () => {
      setIsLoading(true)
      const jwtToken = Cookies.get('jwt_token')
      const url = `https://apis.ccbp.in/restaurants-list/${id}`
      const options = {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
        method: 'GET',
      }
      const response = await fetch(url, options)
      if (response.ok) {
        const data = await response.json()
        const formattedData = {
          id: data.id,
          name: data.name,
          cuisine: data.cuisine,
          imageUrl: data.image_url,
          rating: data.rating,
          location: data.location,
          costForTwo: data.cost_for_two,
          foodItems: data.food_items.map(item => ({
            id: item.id,
            name: item.name,
            cost: item.cost,
            foodType: item.food_type,
            imageUrl: item.image_url,
            rating: item.rating ?? 'N/A',
          })),
        }
        setRestaurantDetails(formattedData)
      }
      setIsLoading(false)
    }

    fetchRestaurantDetails()
  }, [id])

  const renderLoader = () => (
    <div className="loader-container" data-testid="restaurant-details-loader">
      <Loader type="ThreeDots" color="#F7931E" height={50} width={50} />
    </div>
  )

  const renderRestaurantDetails = () => (
    <>
      <div className="restaurant-banner">
        <img
          src={restaurantDetails.imageUrl}
          alt="restaurant"
          className="restaurant-banner-img"
        />
        <div className="restaurant-info">
          <h1 className="restaurant-name">{restaurantDetails.name}</h1>
          <p className="restaurant-cuisine">{restaurantDetails.cuisine}</p>
          <p className="restaurant-location">{restaurantDetails.location}</p>
          <div className="restaurant-rating-cost">
            <div>
              <p className="rating">
                <AiFillStar color="#f59e0b" size={16} />{' '}
                {restaurantDetails.rating}
              </p>
              <p className="rating-caption">Rating</p>
            </div>
            <div>
              <p className="rating">₹{restaurantDetails.costForTwo}</p>
              <p className="rating-caption">Cost for two</p>
            </div>
          </div>
        </div>
      </div>
      <ul className="food-items-list">
        {restaurantDetails.foodItems.map(item => (
          <FoodItem key={item.id} foodItem={item} />
        ))}
      </ul>
    </>
  )

  return (
    <div className="restaurant-details-page">
      <Header />
      {isLoading || restaurantDetails === null
        ? renderLoader()
        : renderRestaurantDetails()}
      <Footer />
    </div>
  )
}

export default RestaurantDetails
