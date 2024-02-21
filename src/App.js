import {Route, Switch} from 'react-router-dom'
import HomePage from './Components/HomePage'
import TopRated from './Components/TopRated'
import Upcoming from './Components/Upcoming'
import MovieDetails from './Components/MovieDetails'
import Search from './Components/Search'

import './App.css'

// write your code here
const App = () => (
  <>
    <Switch>
      <Route exact path="/" component={HomePage} />
      <Route exact path="/top-rated" component={TopRated} />
      <Route exact path="/upcoming" component={Upcoming} />
      <Route exact path="/movie/:id" component={MovieDetails} />
      <Route exact path="/search" component={Search} />
    </Switch>
  </>
)

export default App
