import {Switch, Route, Redirect} from 'react-router-dom'
import Home from './components/Home'
import LoginPage from './components/LoginPage'
import Jobs from './components/Jobs'
import JobSpecPage from './components/JobSpecPage'
import ProtectedRoute from './components/Protected'
import PageNotFound from './components/PageNotFound'
import './App.css'

// These are the lists used in the application. You can move them to any component needed.

// Replace your code here
const App = () => (
  <Switch>
    <Route exact path="/login" component={LoginPage} />
    <ProtectedRoute exact path="/" component={Home} />
    <ProtectedRoute exact path="/jobs" component={Jobs} />
    <ProtectedRoute exact path="/jobs/:id" component={JobSpecPage} />
    <Route path="/not-found" component={PageNotFound} />
    <Redirect to="not-found" />
  </Switch>
)
export default App
