import {Link} from 'react-router-dom'
import {ImStarFull} from 'react-icons/im'

import './index.css'

const RestaurantCard = props => {
  const {restaurant} = props
  const {id, cuisine, imageUrl, name, rating, totalReviews} = restaurant

  return (
    <Link to={`/restaurant/${id}`} className="link-item">
      <li className="restaurant-card">
        <img src={imageUrl} className="image-item" alt="" />
        <div className="image-details-container">
          <h1 className="image-name">{name}</h1>
          <p className="image-cuisine">{cuisine}</p>
          <div className="ratings-container">
            <ImStarFull className="star" />
            <p className="image-rating">{rating}</p>
            <p className="image-total-reviews">({totalReviews})</p>
          </div>
        </div>
      </li>
    </Link>
  )
}
export default RestaurantCard
