import React, { Fragment, Component } from 'react'

import Header from '../../components/Header'
import PreferencesList from '../../components/PreferencesList'

import {
  Container, Button, Text, TextField,
} from './styles'

class NewMeetup extends Component {
  state = {}

  render() {
    return (
      <Fragment>
        <Header />
        <Container>
          <form>
            <Text>Título</Text>
            <TextField placeholder="Digite o título do meetup" />
            <Text>Descrição</Text>
            <TextField placeholder="Descreva seu meetup" />
            <Text>Imagem</Text>
            <p>aqui será um upload</p>
            <Text>Localizaçã</Text>
            <TextField placeholder="Onde seu meetup irá acontecer?" />
            <Text>Preferências</Text>
            <PreferencesList />
            <Button onClick={() => {}}>Salvar</Button>
          </form>
        </Container>
      </Fragment>
    )
  }
}

export default NewMeetup
