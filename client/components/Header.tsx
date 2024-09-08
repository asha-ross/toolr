//Logo and navigation bar
//Includes the "Categories" information

import { Link } from 'react-router-dom'
import Nav from './Nav'


function Header() {


  return (
    <header className="header">
      <div className='upper-header'>

      <div className="logo">
        <Link to="/">
          <img src='/images/Toolr_Word_Logo.png' alt="TOOLR logo" />
        </Link>
      </div>
      <div className='button-container'>
        <div className='sign-in-button'>
          <Nav />
        </div>
        </div>
      </div>
      <nav className='nav-container'>
        <div className='nav-options'>
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
        </div>
      </nav>
    </header>
  )
}

export default Header
