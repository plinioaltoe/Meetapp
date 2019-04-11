import React, { Component, Fragment } from 'react'
import Header from '../../components/Header'

import card from '../../assets/card.png'

import {
  Container, Button, Titulo, Descricao, Detalhes, Endereco, Content,
} from './styles'

export default class meetupDetail extends Component {
  state = {}

  render() {
    const descricao = 'O meetup de React Native é um espaço para discutir sobre tecnologias por volta do desenvolvimento web utilizando a biblioteca do Facebook para criação de interfaces móveis multiplataforma com Javascript.'
    return (
      <Fragment>
        <Header />
        <Container>
          <img src={card} alt="Meetup" />
          <Content>
            <Titulo>Meetup React Native</Titulo>
            <Detalhes>120 membros</Detalhes>
            <Descricao>{descricao}</Descricao>
            <Detalhes>Realizado em:</Detalhes>
            <Endereco>Rua Guilherme Gembala, 260, Rio do Sul - SC</Endereco>
            <Button onClick={() => {}}>Inscreva-se</Button>
          </Content>
        </Container>
      </Fragment>
    )
  }
}
