import {Link} from 'react-router-dom'
import './index.css'

const Navbar = () => (
  <nav className="nav-div">
    <h1 className="title">MovieDB</h1>
    <ul className="nav-list">
      <Link to="/" className="link-element">
        <li className="list-item">Popular</li>
      </Link>
      <Link to="/top-rated" className="link-element">
        <li className="list-item">Top Rated</li>
      </Link>
      <Link to="/upcoming" className="link-element">
        <li className="list-item">Upcoming</li>
      </Link>
      <li>
        <input type="search" placeholder="Search" id="search" />
        <button type="button">Search</button>
      </li>
    </ul>
  </nav>
)
export default Navbar
