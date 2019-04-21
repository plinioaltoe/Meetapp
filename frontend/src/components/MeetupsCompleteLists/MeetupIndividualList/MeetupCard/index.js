import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

import {
  Container, Content, Title, InfoMembers,
} from './styles'

class MeetupCard extends Component {
  static propTypes = {
    id: PropTypes.number.isRequired,
    fileUrl: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    numMembers: PropTypes.number.isRequired,
  }

  numMembersString = (numMembers) => {
    if (numMembers === 0) return 'Nenhum membro'
    if (numMembers === 1) return '1 membro'
    return `${numMembers} membros`
  }

  render() {
    const {
      id, fileUrl, title, numMembers,
    } = this.props

    const linkTo = `/meetupDetail/${id}`
    return (
      <Fragment>
        <Container>
          <img src={fileUrl} alt="Meetup thumbnail" />
          <Content>
            <div>
              <Title>{title}</Title>
              <InfoMembers>{this.numMembersString(numMembers)} </InfoMembers>
            </div>
            <Link to={linkTo}>
              <button type="button">
                <i className="fa fa-chevron-right" />
              </button>
            </Link>
          </Content>
        </Container>
      </Fragment>
    )
  }
}

export default MeetupCard
