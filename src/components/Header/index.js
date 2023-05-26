import {AiFillHome} from 'react-icons/ai'
import {MdWork} from 'react-icons/md'
import {FiLogOut} from 'react-icons/fi'

import Cookies from 'js-cookie'
import {Link, withRouter} from 'react-router-dom'
import './index.css'

const Header = props => {
  const {history} = props
  const imgLogoUrl = 'https://assets.ccbp.in/frontend/react-js/logo-img.png '
  const onClickLogout = () => {
    Cookies.remove('jwt_token')
    history.replace('/login')
  }
  return (
    <nav className="container-header">
      <Link to="/">
        {' '}
        <img
          src={imgLogoUrl}
          alt="website logo"
          className="header-logo-img-sizing"
        />
      </Link>
      <ul className="ul-style-header">
        <Link to="/" className="link-style">
          {' '}
          <li className="list-style">Home</li>
        </Link>
        <Link to="/jobs" className="link-style">
          {' '}
          <li className="list-style">Jobs</li>
        </Link>
      </ul>
      <button
        className="button-style-header"
        type="button"
        onClick={onClickLogout}
      >
        Logout
      </button>

      <ul className="container-mobile">
        <Link to="/" className="link-style">
          {' '}
          <li>
            {' '}
            <AiFillHome className="color-icon-mobile-view" />
          </li>
        </Link>
        <Link to="/jobs" className="link-style">
          {' '}
          <li>
            <MdWork className="color-icon-mobile-view" />
          </li>
        </Link>
        <li onClick={onClickLogout}>
          {' '}
          <FiLogOut className="color-icon-mobile-view" />
        </li>
      </ul>
    </nav>
  )
}
export default withRouter(Header)
