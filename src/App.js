import {Switch, Route} from 'react-router-dom'

import LoginForm from './components/LoginForm'
import Home from './components/Home'
import Cart from './components/Cart'
import RestaurantDetails from './components/RestaurantDetails'

import ProtectedRoute from './components/ProtectedRoute'

import NotFound from './components/NotFound'

import './App.css'

const App = () => (
  <>
    <Switch>
      <Route exact path="/login" component={LoginForm} />
      <ProtectedRoute exact path="/" component={Home} />
      <ProtectedRoute exact path="/cart" component={Cart} />
      <ProtectedRoute
        exact
        path="/restaurant:id"
        component={RestaurantDetails}
      />

      <Route component={NotFound} />
    </Switch>
  </>
)

export default App
