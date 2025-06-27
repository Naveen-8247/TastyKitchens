// components/Home/index.js
import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {BsChevronLeft, BsChevronRight, BsFilterLeft} from 'react-icons/bs'

import Header from '../Header'
import Footer from '../Footer'
import Carousel from '../Carousel'
import RestaurantItem from '../RestaurantItem'

import './index.css'

const sortByOptions = [
  {id: 0, displayText: 'Highest', value: 'Highest'},
  {id: 1, displayText: 'Lowest', value: 'Lowest'},
]

const LIMIT = 9

class Home extends Component {
  state = {
    restaurantsList: [],
    isLoading: true,
    activePage: 1,
    totalPages: 0,
    sortOption: sortByOptions[1].value,
    showCarouselLoader: true,
  }

  componentDidMount() {
    this.getRestaurants()
    setTimeout(() => {
      this.setState({showCarouselLoader: false})
    }, 1000)
  }

  getRestaurants = async () => {
    this.setState({isLoading: true})
    const {activePage, sortOption} = this.state
    const offset = (activePage - 1) * LIMIT
    const apiUrl = `https://apis.ccbp.in/restaurants-list?offset=${offset}&limit=${LIMIT}&sort_by_rating=${sortOption}`
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }

    const response = await fetch(apiUrl, options)
    if (response.ok) {
      const data = await response.json()
      const updatedList = data.restaurants.map(each => ({
        id: each.id,
        name: each.name,
        imageUrl: each.image_url,
        cuisine: each.cuisine,
        location: each.location,
        costForTwo: each.cost_for_two,
        userRating: {
          rating: each.user_rating.rating,
          ratingText: each.user_rating.rating_text,
          totalReviews: each.user_rating.total_reviews,
          ratingColor: each.user_rating.rating_color,
        },
      }))
      const totalPages = Math.ceil(data.total / LIMIT)
      this.setState({
        restaurantsList: updatedList,
        totalPages,
        isLoading: false,
      })
    }
  }

  changeSortOption = event => {
    this.setState(
      {sortOption: event.target.value, activePage: 1},
      this.getRestaurants,
    )
  }

  clickRight = () => {
    const {activePage, totalPages} = this.state
    if (activePage < totalPages) {
      this.setState(
        prev => ({activePage: prev.activePage + 1}),
        this.getRestaurants,
      )
    }
  }

  clickLeft = () => {
    const {activePage} = this.state
    if (activePage > 1) {
      this.setState(
        prev => ({activePage: prev.activePage - 1}),
        this.getRestaurants,
      )
    }
  }

  renderRestaurantsList = () => {
    const {restaurantsList, sortOption, activePage} = this.state

    return (
      <>
        <Carousel />
        <h1 className='restaurants-heading'>Popular Restaurants</h1>
        <div className='home-top-section'>
          <div className='sort-container'>
            <p className='restaurants-description'>
              Select Your favourite restaurant special dish and make your day
              happy...
            </p>
            <div className='select-container'>
              <p className='sort-by'>Sort By</p>
              <BsFilterLeft size={20} />
              <select
                value={sortOption}
                onChange={this.changeSortOption}
                data-testid='sort-by-select'
              >
                {sortByOptions.map(option => (
                  <option key={option.id} value={option.value}>
                    {option.displayText}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
        <ul className='restaurants-list'>
          {restaurantsList.map(item => (
            <RestaurantItem
              key={item.id}
              restaurant={item}
              testid='restaurant-item'
            />
          ))}
        </ul>
        <div className='pagination-container'>
          <button
            type='button'
            onClick={this.clickLeft}
            data-testid='pagination-left-button'
            className='pagination-button'
          >
            <BsChevronLeft />
          </button>
          <span data-testid='active-page-number'>{activePage}</span>
          <button
            type='button'
            onClick={this.clickRight}
            data-testid='pagination-right-button'
            className='pagination-button'
          >
            <BsChevronRight />
          </button>
        </div>
      </>
    )
  }

  render() {
    const {isLoading, showCarouselLoader} = this.state

    let content
    if (showCarouselLoader) {
      content = (
        <div
          className='loader-container'
          data-testid='restaurants-offers-loader'
        >
          <Loader type='ThreeDots' color='#F7931E' height={50} width={50} />
        </div>
      )
    } else if (isLoading) {
      content = (
        <div className='loader-container' data-testid='restaurants-list-loader'>
          <Loader type='ThreeDots' color='#F7931E' height={50} width={50} />
        </div>
      )
    } else {
      content = this.renderRestaurantsList()
    }

    return (
      <div className='home-container'>
        <Header />
        {content}
        <Footer />
      </div>
    )
  }
}

export default Home
