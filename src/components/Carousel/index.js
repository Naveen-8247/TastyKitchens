import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import Loader from 'react-loader-spinner'
import {Component} from 'react'
import Cookies from 'js-cookie'
import './index.css'

class Carousel extends Component {
  state = {
    offersList: [],
    isLoading: true,
  }

  componentDidMount() {
    this.getOffers()
  }

  getOffers = async () => {
    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = 'https://apis.ccbp.in/restaurants-list/offers'
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }

    const response = await fetch(apiUrl, options)
    if (response.ok) {
      const data = await response.json()
      const updatedOffers = data.offers.map(each => ({
        id: each.id,
        imageUrl: each.image_url,
      }))
      this.setState({offersList: updatedOffers, isLoading: false})
    }
  }

  renderLoader = () => (
    <div className="loader-container" data-testid="restaurants-offers-loader">
      <Loader type="ThreeDots" color="#F7931E" height={50} width={50} />
    </div>
  )

  renderCarousel = () => {
    const {offersList} = this.state
    const settings = {
      dots: false,
      infinite: true,
      speed: 1500,
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: true,
    }

    return (
      <Slider {...settings}>
        {offersList.map(offer => (
          <div key={offer.id} className="carousel-slide">
            <img src={offer.imageUrl} alt="offer" className="offer-image" />
          </div>
        ))}
      </Slider>
    )
  }

  render() {
    const {isLoading} = this.state
    return (
      <div className="carousel-container">
        {isLoading ? this.renderLoader() : this.renderCarousel()}
      </div>
    )
  }
}

export default Carousel
