import React from 'react'
import PropTypes from 'prop-types'

import {
  Container, Content, Title, InfoMembers,
} from './styles'

const numMembersString = (numMembers) => {
  if (numMembers === 0) return 'Nenhum membro'
  if (numMembers === 1) return '1 membro'
  return `${numMembers} membros`
}

const MeetupCard = ({
  id, url, title, numMembers, goToMeetupDetail,
}) => (
  <Container>
    <img src={url} alt="Meetup thumbnail" />
    <Content>
      <div>
        <Title>{title}</Title>
        <InfoMembers>{numMembersString(numMembers)} </InfoMembers>
      </div>
      <button type="button" onClick={() => goToMeetupDetail(id)}>
        <i className="fa fa-chevron-right" />
      </button>
    </Content>
  </Container>
)

MeetupCard.propTypes = {
  id: PropTypes.number.isRequired,
  url: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  numMembers: PropTypes.number.isRequired,
  goToMeetupDetail: PropTypes.func.isRequired,
}

export default MeetupCard
