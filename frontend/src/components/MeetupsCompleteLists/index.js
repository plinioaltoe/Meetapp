import React, { Component } from 'react'
import MeetupIndividualList from './MeetupIndividualList'

import { Container, Content } from './styles'

class MeetupsCompleteLists extends Component {
  state = {}

  render() {
    return (
      <Container>
        <Content>
          Inscrições
          <MeetupIndividualList />
        </Content>
        <Content>
          Próximos Meetups
          <MeetupIndividualList />
        </Content>
        <Content>
          Recomendados
          <MeetupIndividualList />
        </Content>
      </Container>
    )
  }
}

export default MeetupsCompleteLists
