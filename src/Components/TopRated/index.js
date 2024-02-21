import {Component} from 'react'
import Loader from 'react-loader-spinner'
import PopularMovieCard from '../PopularMovieCard'
import Navbar from '../Navbar'
import './index.css'

class TopRated extends Component {
  state = {
    topRatedList: [],
    isLoading: false,
    currentPage: 1,
    totalPages: 0,
  }

  componentDidMount() {
    this.getTopRatedMovies()
  }

  getTopRatedMovies = async () => {
    const {currentPage} = this.state
    this.setState({isLoading: true})

    // const response = await fetch(
    //   `https://api.themoviedb.org/3/movie/top_rated?api_key=a161340537ea02f8e85dcffdbe07e10a&language=en-US&page=${currentPage}`,
    // )

    // if (response.ok) {
    //   const {results, total_pages: totalPages} = await response.json()
    //   this.setState({
    //     topRatedList: results.map(movie => ({
    //       id: movie.id,
    //       imageUrl: movie.poster_path,
    //       rating: movie.vote_average,
    //       title: movie.title,
    //     })),
    //     totalPages,
    //     currentPage,
    //   })
    // } else {
    //   this.setState({isLoading: false})
    // }

    const apiUrl = `https://api.themoviedb.org/3/movie/top_rated?api_key=a161340537ea02f8e85dcffdbe07e10a&language=en-US&page=${currentPage}`
    // const apiUrl1 = `https://api.themoviedb.org/3/movie/popular?language=en-US&page=${currentPage}`
    console.log('Popular list')
    console.log(apiUrl)
    const options = {
      method: 'GET',
    }

    const response = await fetch(apiUrl, options)
    console.log(response)
    if (response.ok) {
      const data = await response.json()
      console.log(data)
      const updatedData = data.results.map(eachMovie => ({
        id: eachMovie.id,
        imageUrl: eachMovie.poster_path,
        rating: eachMovie.vote_average,
        title: eachMovie.title,
      }))
      const totalCount = data.total_pages
      // const totalPagesCount = [data].map(eachMovie => ({
      //   totalPages: eachMovie.total_pages,
      // }))
      this.setState({
        topRatedList: updatedData,
        isLoading: false,
        totalPages: totalCount,
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
        this.getTopRatedMovies,
      )
    }
  }

  handleNextClick = () => {
    this.setState(
      prevState => ({
        currentPage: prevState.currentPage + 1,
      }),
      this.getTopRatedMovies,
    )
  }

  // handlePrevClick = () => {
  //   const {currentPage} = this.state
  //   if (currentPage > 1) {
  //     this.getTopRatedMovies(currentPage - 1)
  //   }
  // }

  // handleNextClick = () => {
  //   const {currentPage, totalPages} = this.state
  //   if (currentPage < totalPages) {
  //     this.getTopRatedMovies(currentPage + 1)
  //   }
  // }

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

  renderTopRatedMovies = () => {
    const {topRatedList, isLoading} = this.state
    return (
      <>
        <h1>Top Rated Movies</h1>
        {isLoading ? (
          <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
        ) : (
          <ul className="top-ul-list">
            {topRatedList.map(movie => (
              <PopularMovieCard popularCard={movie} key={movie.id} />
            ))}
          </ul>
        )}
        {this.renderPagination()}
      </>
    )
  }

  render() {
    return (
      <>
        <Navbar />
        {this.renderTopRatedMovies()}
      </>
    )
  }
}

export default TopRated
