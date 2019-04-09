import React, { Component, Fragment } from 'react'
import MeetupsCompleteLists from '../../components/MeetupsCompleteLists'
import Header from '../../components/Header'

class Dashboard extends Component {
  state = {}

  render() {
    return (
      <Fragment>
        <Header />
        <MeetupsCompleteLists />
      </Fragment>
    )
  }
}

export default Dashboard
