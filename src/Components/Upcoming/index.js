import {Component} from 'react'
import Loader from 'react-loader-spinner'
import PopularMovieCard from '../PopularMovieCard'
import Navbar from '../Navbar'
import './index.css'

class Upcoming extends Component {
  state = {
    upcomingMoviesList: [],
    isLoading: false,
    currentPage: 1,
    totalPages: 0,
  }

  componentDidMount() {
    this.getUpcomingMovies()
  }

  getUpcomingMovies = async () => {
    this.setState({
      isLoading: true,
    })
    const {currentPage} = this.state
    const apiUrl = `https://api.themoviedb.org/3/movie/upcoming?api_key=a161340537ea02f8e85dcffdbe07e10a&language=en-US&page=${currentPage}`
    const options = {
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)

    if (response.ok) {
      const fetchedData = await response.json()
      const updatedData = fetchedData.results.map(eachMovie => ({
        id: eachMovie.id,
        imageUrl: eachMovie.poster_path,
        rating: eachMovie.vote_average,
        title: eachMovie.title,
      }))

      this.setState({
        upcomingMoviesList: updatedData,
        isLoading: false,
        totalPages: fetchedData.total_pages,
      })
    } else {
      this.setState({isLoading: false})
    }
  }

  handlePrevClick = () => {
    const {currentPage} = this.state

    if (currentPage > 1) {
      this.setState(
        prevState => ({
          currentPage: prevState.currentPage - 1,
        }),
        this.getUpcomingMovies,
      )
    }
  }

  handleNextClick = () => {
    this.setState(
      prevState => ({
        currentPage: prevState.currentPage + 1,
      }),
      this.getUpcomingMovies,
    )
  }

  renderPagination = () => {
    const {currentPage, totalPages} = this.state
    return (
      <div className="pagination-container">
        <button
          type="button"
          onClick={this.handlePrevClick}
          disabled={currentPage === 1}
        >
          Prev
        </button>
        <p>Page {currentPage}</p>
        <button
          type="button"
          onClick={this.handleNextClick}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    )
  }

  renderUpcomingMovies = () => {
    const {upcomingMoviesList, isLoading} = this.state
    return (
      <>
        <h1>Upcoming Movies</h1>
        {isLoading ? (
          <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
        ) : (
          <ul className="up-ul-list">
            {upcomingMoviesList.map(eachMovie => (
              <PopularMovieCard popularCard={eachMovie} key={eachMovie.id} />
            ))}
          </ul>
        )}
        { this.renderPagination()}
      </>
    )
  }

  render() {
    return (
      <>
        <Navbar />
        {this.renderUpcomingMovies()}
      </>
    )
  }
}

export default Upcoming
