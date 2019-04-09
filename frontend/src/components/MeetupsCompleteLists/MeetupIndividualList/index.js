import React, { Component } from 'react'

import MeetupCard from './MeetupCard'
import card from '../../../assets/card.png'

import { Container, Content, ButtonPagination } from './styles'

export default class MeetupIndividualList extends Component {
  state = {}

  render() {
    return (
      <Container>
        <Content>
          <div>
            <MeetupCard id={1} url={card} title="Meetup React Native" numMembers="153" goToMeetupDetail={() => {}} />
          </div>
          <div>
            <MeetupCard id={1} url={card} title="Meetup React Native" numMembers="153" goToMeetupDetail={() => {}} />
          </div>
          <div>
            <MeetupCard id={1} url={card} title="Meetup React Native" numMembers="153" goToMeetupDetail={() => {}} />
          </div>
        </Content>
        <ButtonPagination>
          <button type="button" onClick={() => {}}>
            <i className="fa fa-chevron-left" />
          </button>
          <div>4</div>
          <div>5</div>
          <div>6</div>
          <button type="button" onClick={() => {}}>
            <i className="fa fa-chevron-right" />
          </button>
        </ButtonPagination>
      </Container>
    )
  }
}
