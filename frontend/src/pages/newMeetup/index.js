import React, { Fragment, Component } from 'react'

import Header from '../../components/Header'
import PreferencesList from '../../components/PreferencesList'

import {
  Container, Button, Text, TextField, Img, TextArea,
} from './styles'

class NewMeetup extends Component {
  state = {}

  handleUpload = () => {}

  render() {
    return (
      <Fragment>
        <Header />
        <Container>
          <form>
            <Text>Título</Text>
            <TextField placeholder="Digite o título do meetup" />
            <Text>Descrição</Text>
            <TextArea placeholder="Descreva seu meetup" rows="100" cols="100" />
            <Text>Imagem</Text>
            <Img onClick={this.handleUpload}>
              <i className="fa fa-camera" />
            </Img>
            <Text>Localização</Text>
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
