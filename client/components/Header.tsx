//Logo and navigation bar
//Includes the "Categories" information

import { Link } from 'react-router-dom'
import logo from '../assets/toolr_logo.png'
import Nav from './Nav'

function Header() {
  return (
    <header className="header">
      TOOLR
      <div className="logo">
        <Link to="/">
          <img src={logo} alt="TOOLR logo" />
        </Link>
      </div>
      <nav>
        <ul>
          <li>
            <Link to="/categories">Categories</Link>
          </li>
          <li>
            <Link to="/profile">View Profile</Link>
          </li>
          <li>
            <Link to="/about">About Toolr</Link>
          </li>
          <li>
            <Link to="/help">Help</Link>
          </li>
        </ul>
        <div>
          <Nav />
        </div>
      </nav>
    </header>
  )
}

export default Header
