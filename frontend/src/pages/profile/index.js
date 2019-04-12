import React, { Component, Fragment } from 'react'
import { Redirect } from 'react-router-dom'
import Header from '../../components/Header'
import UserInputs from '../../components/UserInputs'
import PreferencesList from '../../components/PreferencesList'

import { Container, Button, Text } from './styles'

export default class Profile extends Component {
  state = {
    redirect: false,
    route: '',
  }

  goTo = route => this.setState({ redirect: true, route })

  render() {
    const { redirect, route } = this.state
    return (
      <Fragment>
        {redirect && <Redirect push to={route} />}
        <Header />
        <Container>
          <form>
            <UserInputs display="profile" />
            <Text>Preferências</Text>
            <PreferencesList />
            <Button onClick={() => this.goTo('/dashboard')}>Salvar</Button>
          </form>
        </Container>
      </Fragment>
    )
  }
}
