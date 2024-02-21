import {Link} from 'react-router-dom'
import './index.css'

const PopularMovieCard = props => {
  const {popularCard} = props
  const {title, rating, imageUrl, id} = popularCard

  return (
    <li className="list-item-home">
      <img
        src={`https://image.tmdb.org/t/p/w500${imageUrl}`}
        alt={title}
        className="popular-img"
      />
      <p className="home-title">{title}</p>
      <div className="star-rating">
        <img
          src="https://img.freepik.com/free-vector/start_53876-25533.jpg?size=338&ext=jpg&ga=GA1.1.1880011253.1698969600&semt=ais"
          alt="star"
          className="star"
        />
        <p className="rating">{rating}</p>
      </div>

      <Link to={`movie/${id}`} className="link-element">
        <button type="button" className="button">
          View Details
        </button>
      </Link>
    </li>
  )
}

export default PopularMovieCard
