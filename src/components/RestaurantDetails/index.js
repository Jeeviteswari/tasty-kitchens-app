import Component from 'react'

import Loader from 'react-loader-spinner'
import {FaStar, FaRupeeSign} from 'react-icons/fa'
import Cookies from 'js-cookie'

import Navbar from '../Navbar'
import Footer from '../Footer'
import SimilarRestaurant from '../SimilarRestaurant'

import './index.css'

class RestaurantDetails extends Component {
  state = {restaurantData: {}, isLoading: false, similarRestaurantsData: []}

  componentDidMount() {
    this.getRestaurantDetails()
  }

  getRestaurantDetails = async () => {
    this.setState({isLoading: true})

    const {match} = this.props
    const {params} = match
    const {id} = params

    const apiUrl = `https://apis.ccbp.in/restaurants-list/${id}`
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(apiUrl, options)
    const fetchedData = response.json()
    console.log(fetchedData)

    const updatedData = {
      costForTwo: fetchedData.cost_for_two,
      cuisine: fetchedData.cuisine,
      foodItems: fetchedData.food_items,
      id: fetchedData.id,
      imageUrl: fetchedData.image_url,
      itemsCount: fetchedData.items_count,
      location: fetchedData.location,
      name: fetchedData.name,
      opensAt: fetchedData.opens_at,
      rating: fetchedData.rating,
      reviewsCount: fetchedData.reviews_count,
    }

    const updatedSimilarRestaurantsData = fetchedData.food_items.map(
      eachFoodItem => ({
        cost: eachFoodItem.cost,
        foodType: eachFoodItem.food_type,
        id: eachFoodItem.id,
        imageUrl: eachFoodItem.image_url,
        name: eachFoodItem.name,
        rating: eachFoodItem.rating,
      }),
    )

    this.setState({
      restaurantData: updatedData,
      similarRestaurantsData: updatedSimilarRestaurantsData,
      isLoading: false,
    })
  }

  renderLoaderView = () => (
    <div className="carousel-loader" testid="restaurants-list-loader">
      <Loader type="ThreeDots" color="#F7931E" height={50} width={50} />
    </div>
  )

  renderRestaurantDetails = () => {
    const {restaurantData, similarRestaurantsData} = this.state
    const {
      name,
      imageUrl,
      cuisine,
      location,
      rating,
      costForTwo,
      reviewsCount,
    } = restaurantData
    return (
      <>
        <div className="banner-bg">
          <div className="banner-container">
            <img src={imageUrl} alt="restaurant" className="res-image" />
            <div className="res-info">
              <h1 className="res-name">{name}</h1>
              <p className="res-cuisine">{cuisine}</p>
              <p className="res-location">{location}</p>
              <div className="rating-rate-container">
                <div className="rating-container">
                  <p className="rating">
                    <FaStar />
                    {rating}
                  </p>
                  <p className="sub-text">{reviewsCount}+ Ratings</p>
                </div>
                <hr className="separation-line" />
                <div className="rating-container">
                  <p className="rating">
                    <FaRupeeSign />
                    {costForTwo}
                  </p>
                  <p className="sub-text">Cost for two</p>
                </div>
              </div>
            </div>
          </div>

          <ul className="similar-restaurants-container">
            {similarRestaurantsData.map(eachFoodItem => (
              <SimilarRestaurant
                similarDetails={eachFoodItem}
                key={eachFoodItem.id}
              />
            ))}
          </ul>
        </div>
      </>
    )
  }

  render() {
    const {isLoading} = this.state
    return (
      <>
        <Navbar />
        {isLoading ? this.renderLoaderView() : this.renderRestaurantDetails()}
        <Footer />
      </>
    )
  }
}

export default RestaurantDetails
