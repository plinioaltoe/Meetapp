import React, { Component, Fragment } from 'react'
import { Redirect } from 'react-router-dom'
import UserInputs from '../../components/UserInputs'
import logo from '../../assets/logo.svg'

import {
  Container, Button, Text, Img,
} from './styles'

export default class Signup extends Component {
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
        <Container>
          <form>
            <Img src={logo} alt="logo" />
            <UserInputs display="signup" />
            <Button onClick={() => this.goTo('/preferences')}>Criar conta</Button>
            <Text onClick={() => this.goTo('/login')}>Já tenho conta</Text>
          </form>
        </Container>
      </Fragment>
    )
  }
}
