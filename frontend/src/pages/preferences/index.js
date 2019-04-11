import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import PreferencesList from '../../components/PreferencesList'
import {
  Titulo, Descricao, Content, Container, Text, Button,
} from './styles'

export default class preferences extends Component {
  state = {
    redirect: false,
  }

  goTo = () => this.setState({ redirect: true })

  render() {
    const { redirect } = this.state
    const texto = 'Parece que é seu primeiro acesso por aqui, comece escolhendo algumas preferências para selecionarmos os melhores meetups pra você:'
    return (
      <Container>
        {redirect && <Redirect push to="/dashboard" />}
        <Content>
          <Titulo>Olá fulano</Titulo>
          <Descricao>{texto}</Descricao>
          <Text>Preferências</Text>
          <PreferencesList />
          <Button onClick={() => this.goTo()}>Continuar</Button>
        </Content>
      </Container>
    )
  }
}
