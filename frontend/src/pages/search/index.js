import React, { Component, Fragment } from 'react'
import MeetupsCompleteLists from '../../components/MeetupsCompleteLists'

class Search extends Component {
  state = {}

  render() {
    return (
      <Fragment>
        <TextField />
        <MeetupsCompleteLists />
      </Fragment>
    )
  }
}

export default Search
