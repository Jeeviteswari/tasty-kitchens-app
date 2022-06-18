import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'

import {GiHamburgerMenu} from 'react-icons/gi'

import './index.css'

const Navbar = props => {
  const onClickLogout = () => {
    const {history} = props
    Cookies.remove('jwtToken')
    history.replace('/login')
  }
  return (
    <>
      <nav className="navbar-container">
        <div className="navbar">
          <div className="logo-name-container">
            <Link to="/" className="nav-link">
              <img
                src="https://res.cloudinary.com/dkobk5oao/image/upload/v1633608363/Frame_274_mqin4h.png"
                className="website-logo"
                alt=""
              />
            </Link>
            <h1 className="heading">Tasty Kitchens</h1>
          </div>

          <ul className="nav-menu">
            <Link to="/" className="nav-link">
              <li className="link-item">Home</li>
            </Link>
            <Link to="/cart" className="nav-link">
              <li className="link-item">Cart</li>
            </Link>
            <li>
              <button type="button" className="logout-button">
                Logout
              </button>
            </li>
          </ul>
          <button
            type="button"
            className="hamburger-btn"
            onClick={onClickLogout}
          >
            <GiHamburgerMenu size={25} className="hamburger" />
          </button>
        </div>
      </nav>
    </>
  )
}

export default withRouter(Navbar)
