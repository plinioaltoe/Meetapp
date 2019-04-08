import React, { Component, Fragment } from 'react'
import Header from '../Header'
import MeetupList from '../MeetupList'

import { Container, Content } from './styles'

class MeetupsCompleteLists extends Component {
  state = {}

  render() {
    return (
      <Fragment>
        <Header />
        <Container>
          <Content>
            Inscrições
            <MeetupList />
          </Content>
          <Content>
            Próximos Meetups
            <MeetupList />
          </Content>
          <Content>
            Recomendados
            <MeetupList />
          </Content>
        </Container>
      </Fragment>
    )
  }
}

export default MeetupsCompleteLists
