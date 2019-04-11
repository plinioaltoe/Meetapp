import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { Redirect } from 'react-router-dom'

import {
  Container, Content, Title, InfoMembers,
} from './styles'

class MeetupCard extends Component {
  static propTypes = {
    id: PropTypes.number.isRequired,
    url: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    numMembers: PropTypes.number.isRequired,
  }

  state = {
    redirect: false,
  }

  numMembersString = (numMembers) => {
    if (numMembers === 0) return 'Nenhum membro'
    if (numMembers === 1) return '1 membro'
    return `${numMembers} membros`
  }

  goToMeetupDetail = () => this.setState({ redirect: true })

  render() {
    const {
      id, url, title, numMembers,
    } = this.props
    const { redirect } = this.state
    const linkTo = `/meetupDetail/${id}`
    return (
      <Fragment>
        {redirect && <Redirect push to={linkTo} />}
        <Container>
          <img src={url} alt="Meetup thumbnail" />
          <Content>
            <div>
              <Title>{title}</Title>
              <InfoMembers>{this.numMembersString(numMembers)} </InfoMembers>
            </div>
            <button type="button" onClick={this.goToMeetupDetail}>
              <i className="fa fa-chevron-right" />
            </button>
          </Content>
        </Container>
      </Fragment>
    )
  }
}

export default MeetupCard
