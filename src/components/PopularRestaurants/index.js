import Component from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'

import RestaurantCard from '../RestaurantCard'

import './index.css'

class PopularRestaurants extends Component {
  state = {restaurantsList: [], isLoading: false}

  componentDidMount() {
    this.getRestaurants()
  }

  getRestaurants = async () => {
    this.setState({isLoading: true})

    const apiUrl = `https://apis.ccbp.in/restaurants-list`
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

    if (response.fetchedData === true) {
      const updatedData = fetchedData.restaurants.map(eachRestaurant => ({
        id: eachRestaurant.id,
        cuisine: eachRestaurant.cuisine,
        imageUrl: eachRestaurant.image_url,
        name: eachRestaurant.name,
        rating: eachRestaurant.user_rating.rating,
        totalReviews: eachRestaurant.user_rating.total_reviews,
      }))
      this.setState({restaurantsList: updatedData, isLoading: false})
    }
  }

  renderLoaderView = () => (
    <div className="carousel-loader" testid="restaurants-list-loader">
      <Loader type="ThreeDots" color="#F7931E" height={50} width={50} />
    </div>
  )

  renderPopularRestaurants = () => {
    const {restaurantsList} = this.state
    return (
      <ul className="popular-restaurants-list-container">
        {restaurantsList.map(eachRestaurant => (
          <RestaurantCard restaurant={eachRestaurant} key={eachRestaurant.id} />
        ))}
      </ul>
    )
  }

  render() {
    const {isLoading} = this.state
    return isLoading ? this.renderLoaderView() : this.renderPopularRestaurants()
  }
}

export default PopularRestaurants
