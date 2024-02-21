import {Component} from 'react'
import Loader from 'react-loader-spinner'
import PopularMovieCard from '../PopularMovieCard'
import Navbar from '../Navbar'
import './index.css'

class HomePage extends Component {
  state = {
    popularList: [],
    isLoading: false,
    currentPage: 1,
    totalPages: 0,
  }

  componentDidMount() {
    this.getPopularMovies()
  }

  getPopularMovies = async () => {
    this.setState({
      isLoading: true,
    })

    const {currentPage} = this.state

    const apiUrl = `https://api.themoviedb.org/3/movie/popular?api_key=a161340537ea02f8e85dcffdbe07e10a&language=en-US&page=${currentPage}`
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
        popularList: updatedData,
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
        this.getPopularMovies,
      )
    }
  }

  handleNextClick = () => {
    this.setState(
      prevState => ({
        currentPage: prevState.currentPage + 1,
      }),
      this.getPopularMovies,
    )
  }

  renderPagination = () => {
    const {currentPage, totalPages} = this.state
    console.log(currentPage)
    console.log(totalPages)

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

  renderPopularMovies = () => {
    const {popularList} = this.state
    return (
      <>
        <h1>Popular Movies</h1>
        <ul className="home-ul-list">
          {popularList.map(eachMovie => (
            <PopularMovieCard popularCard={eachMovie} key={eachMovie.id} />
          ))}
        </ul>
        {this.renderPagination()}
      </>
    )
  }

  renderLoadingView = () => (
    <div className="products-loader-container">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  render() {
    const {isLoading, totalPages} = this.state
    console.log(totalPages)
    return (
      <>
        <Navbar />
        {isLoading ? this.renderLoadingView() : this.renderPopularMovies()}
      </>
    )
  }
}

export default HomePage
