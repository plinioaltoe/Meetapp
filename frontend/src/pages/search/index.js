import React, { Component, Fragment } from 'react'
import MeetupsCompleteLists from '../../components/MeetupsCompleteLists'
import Header from '../../components/Header'

import { TextField, Container } from './styles'

class Search extends Component {
  state = {}

  render() {
    return (
      <Fragment>
        <Header />
        <Container>
          <i className="fa fa-search" />
          <TextField />
        </Container>
        <MeetupsCompleteLists />
      </Fragment>
    )
  }
}

export default Search
