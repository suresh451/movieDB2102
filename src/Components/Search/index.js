import {Component} from 'react'
import Loader from 'react-loader-spinner'
import PopularMovieCard from '../PopularMovieCard'
import Navbar from '../Navbar'
import './index.css'

class Search extends Component {
  state = {
    searchList: [],
    searchValue: '',
    isLoading: false,
  }

  getSearchMovies = async () => {
    this.setState({
      isLoading: true,
    })

    const {searchValue} = this.state
    const apiUrl = `https://api.themoviedb.org/3/search/movie?api_key=a161340537ea02f8e85dcffdbe07e10a&language=en-US&query=${searchValue}&page=1`
    const options = {
      method: 'GET',
    }
    console.log(apiUrl)
    const response = await fetch(apiUrl, options)
    if (response.ok) {
      const fetchedData = await response.json()
      console.log(fetchedData)
      const updatedData = fetchedData.results.map(eachMovie => ({
        id: eachMovie.id,
        imageUrl: eachMovie.backdrop_path,
        rating: eachMovie.vote_average,
        title: eachMovie.title,
      }))

      this.setState({
        searchList: updatedData,
        isLoading: false,
        searchValue,
      })
    }
  }

  renderSuccessView = () => {
    const {searchList} = this.state
    return searchList.length > 0 ? (
      <ul className="search-items">
        {searchList.map(eachMovie => (
          <PopularMovieCard popularCard={eachMovie} key={eachMovie.id} />
        ))}
      </ul>
    ) : (
      this.renderNoResultsView()
    )
  }

  renderNoResultsView = () => {
    const {searchValue} = this.state

    return (
      <div className="no-results-view">
        <img
          className="no-results-img"
          alt="no movies"
          src="https://res.cloudinary.com/dkbxi5qts/image/upload/v1660153718/movies%20prime%20app/No_Views_awtv8d.svg"
        />
        <p className="no-results-text">
          Your search for {searchValue} did not find any matches.
        </p>
      </div>
    )
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
        <Navbar getSearchMovies={this.getSearchMovies} />
        {isLoading ? this.renderLoadingView() : this.renderSuccessView()}
      </>
    )
  }
}

export default Search
