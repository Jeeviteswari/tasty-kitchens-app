import Navbar from '../Navbar'
import Carousel from '../Carousel'
import PopularRestaurants from '../PopularRestaurants'
import Footer from '../Footer'

import './index.css'

const Home = () => (
  <>
    <Navbar />

    <div className="home-container">
      <Carousel />
      <PopularRestaurants />
    </div>

    <Footer />
  </>
)

export default Home
