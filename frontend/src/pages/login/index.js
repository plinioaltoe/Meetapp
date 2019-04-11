import React, { Component, Fragment } from 'react'
import { Redirect } from 'react-router-dom'
import UserInputs from '../../components/UserInputs'
import logo from '../../assets/logo.svg'

import {
  Container, Button, Text, Img,
} from './styles'

export default class Login extends Component {
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
            <UserInputs display="login" />
            <Button onClick={() => this.goTo('/dashboard')}>Entrar</Button>
            <Text onClick={() => this.goTo('/signup')}>Criar conta grátis</Text>
          </form>
        </Container>
      </Fragment>
    )
  }
}
