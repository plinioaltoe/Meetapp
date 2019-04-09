import React, { Component, Fragment } from 'react'
import Header from '../../components/Header'
import UserInputs from '../../components/UserInputs'
import PreferencesList from '../../components/PreferencesList'

import { Container } from './styles'

export default class profile extends Component {
  state = {}

  render() {
    return (
      <Fragment>
        <Header />
        <Container>
          <form>
            <UserInputs />
          </form>
          Preferências
          <PreferencesList />
        </Container>
      </Fragment>
    )
  }
}
