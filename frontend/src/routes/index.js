import React, { Fragment } from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import Dashboard from '../pages/dashboard'
import Login from '../pages/login'
import MeetupDetail from '../pages/meetupDetail'
import NewMeetup from '../pages/newMeetup'
import Preferences from '../pages/preferences'
import Profile from '../pages/profile'
import Search from '../pages/search'
import Signup from '../pages/signup'

const Routes = () => (
  <BrowserRouter>
    <Fragment>
      <Switch>
        <Route exact path="/login" component={Login} />
        <Route exact path="/dashboard" component={Dashboard} />
        <Route exact path="/meetupDetail" component={MeetupDetail} />
        <Route exact path="/newMeetup" component={NewMeetup} />
        <Route exact path="/preferences" component={Preferences} />
        <Route exact path="/profile" component={Profile} />
        <Route exact path="/search" component={Search} />
        <Route exact path="/signup" component={Signup} />
        <Route path="/" component={Dashboard} />
      </Switch>
    </Fragment>
  </BrowserRouter>
)

export default Routes
