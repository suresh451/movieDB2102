import {Component} from 'react'
import Loader from 'react-loader-spinner'
import CastCard from '../CastCard'
import Navbar from '../Navbar'
import './index.css'

class MovieDetails extends Component {
  state = {
    movieData: [],
    castData: [],
    isLoading: false,
  }

  componentDidMount() {
    this.getMovieData()
  }

  getMovieData = async () => {
    this.setState({
      isLoading: true,
    })
    const {match} = this.props
    const {params} = match
    const {id} = params
    const apiUrl1 = `https://api.themoviedb.org/3/movie/${id}?api_key=a161340537ea02f8e85dcffdbe07e10a&language=en-US`
    const apiUrl2 = `https://api.themoviedb.org/3/movie/${id}/credits?api_key=a161340537ea02f8e85dcffdbe07e10a&language=en-US`
    console.log(apiUrl1)
    console.log(apiUrl2)
    const options = {
      method: 'GET',
    }

    const response1 = await fetch(apiUrl1, options)
    const response2 = await fetch(apiUrl2, options)

    if (response1.ok && response2.ok) {
      const fetchedData1 = await response1.json()
      console.log(fetchedData1)
      const updatedData1 = [fetchedData1].map(eachMovie => ({
        id: eachMovie.id,
        imageUrl: eachMovie.poster_path,
        rating: eachMovie.vote_average,
        title: eachMovie.title,
        releaseDate: eachMovie.release_date,
        duration: eachMovie.runtime,
        overview: eachMovie.overview,
        genres: eachMovie.genres.map(eachGenre => ({
          name: eachGenre.name,
        })),
      }))

      const fetchedData2 = await response2.json()
      const updatedData2 = fetchedData2.cast.map(eachMovie => ({
        id: eachMovie.id,
        profileImage: eachMovie.profile_path,
        originalName: eachMovie.original_name,
        characterName: eachMovie.character,
      }))

      this.setState({
        movieData: updatedData1,
        castData: updatedData2,
        isLoading: false,
      })
    }
  }

  renderMovieAndCastView = () => {
    const {movieData, castData} = this.state
    if (movieData.length >= 1) {
      const {imageUrl, rating, duration, releaseDate, overview, title, genres} =
        movieData[0]
      return (
        <>
          <h1>Movie Details</h1>
          <div className="colorall">
            <img
              src={`https://image.tmdb.org/t/p/w500${imageUrl}`}
              alt={title}
              className="main-img"
            />
            <p className="name">{title}</p>
            <div className="genres-div">
              <p>
                <span className="span">Genres:</span>
              </p>
              <ul className="ul-list-movie">
                {genres.map(eachGenre => (
                  <li key={eachGenre.id}>
                    <p className="genres-item">{eachGenre.name}</p>
                  </li>
                ))}
              </ul>
            </div>
            <p>
              <span className="span">Duration</span>: {duration}
            </p>
            <p>
              <span className="span">Rating</span>: {rating}
            </p>
            <p>
              <span className="span">ReleaseDate</span>: {releaseDate}
            </p>
            <p>
              <span className="span">Overview</span> : {overview}
            </p>
          </div>
          <h1>Cast Details</h1>
          <ul className="ul-list-movie">
            {castData.map(eachCast => (
              <CastCard castDetails={eachCast} key={eachCast.id} />
            ))}
          </ul>
        </>
      )
    }
    return null
  }

  renderLoadingView = () => (
    <div className="products-loader-container">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  render() {
    const {isLoading} = this.state
    return (
      <>
        <Navbar />
        {isLoading ? this.renderLoadingView() : this.renderMovieAndCastView()}
      </>
    )
  }
}

export default MovieDetails
