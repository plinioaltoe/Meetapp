import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import PropTypes from 'prop-types'
import { ConnectedRouter } from 'connected-react-router'
import Dashboard from '../pages/dashboard'
import Signin from '../pages/signin'
import MeetupDetail from '../pages/meetupDetail'
import NewMeetup from '../pages/newMeetup'
import Preferences from '../pages/preferences'
import Profile from '../pages/profile'
import Signup from '../pages/signup'
import history from './history'

import { isAuthenticated } from '../services/auth'

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props => (isAuthenticated() ? (
      <Component {...props} />
    ) : (
      <Redirect to={{ pathname: '/', state: { from: props.location } }} />
    ))
    }
  />
)

PrivateRoute.defaultProps = {
  component: () => {},
  location: {},
}

PrivateRoute.propTypes = {
  component: PropTypes.func,
  // eslint-disable-next-line react/forbid-prop-types
  location: PropTypes.object,
}

const Routes = () => (
  <ConnectedRouter history={history}>
    <Switch>
      <Route exact path="/" component={Signin} />
      <Route exact path="/signup" component={Signup} />
      <PrivateRoute exact path="/dashboard" component={Dashboard} />
      <PrivateRoute exact path="/meetupDetail/:id" component={MeetupDetail} />
      <PrivateRoute exact path="/newMeetup" component={NewMeetup} />
      <PrivateRoute exact path="/preferences" component={Preferences} />
      <PrivateRoute exact path="/profile" component={Profile} />
      <PrivateRoute exact path="/search" component={Dashboard} />
      <Route path="*" component={() => <h1>Page not found</h1>} />
    </Switch>
  </ConnectedRouter>
)

export default Routes
