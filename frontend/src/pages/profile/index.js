import React, { Component, Fragment } from 'react'
import Header from '../../components/Header'
import UserInputs from '../../components/UserInputs'
import PreferencesList from '../../components/PreferencesList'

import { Container, Button, Text } from './styles'

export default class Profile extends Component {
  state = {}

  render() {
    return (
      <Fragment>
        <Header />
        <Container>
          <form>
            <UserInputs />
            <Text>Preferências</Text>
            <PreferencesList />
            <Button onClick={() => {}}>Salvar</Button>
          </form>
        </Container>
      </Fragment>
    )
  }
}
