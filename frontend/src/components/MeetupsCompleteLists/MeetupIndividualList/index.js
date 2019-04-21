import React, { Component } from 'react'
import PropTypes from 'prop-types'
import MeetupCard from './MeetupCard'

import { Container, Content, ButtonPagination } from './styles'

export default class MeetupIndividualList extends Component {
  static propTypes = {
    list: PropTypes.shape({
      id: PropTypes.number,
      title: PropTypes.string,
      description: PropTypes.string,
      location: PropTypes.string,
      eventDate: PropTypes.instanceOf(Date),
      fileUrl: PropTypes.string,
      numMembers: PropTypes.number,
    }).isRequired,
  }

  state = {
    preparedList: [],
  }

  componentDidMount = () => this.prepareList()

  prepareList = () => {
    const { list } = this.props

    const preparedList = []
    list.map((meetup) => {
      const {
        id, file, title, users,
      } = meetup

      return preparedList.push({
        id,
        title,
        numMembers: users.length,
        fileUrl: file && file.url,
      })
    })

    this.setState({ preparedList })
  }

  render() {
    const { preparedList } = this.state

    return (
      <Container>
        <Content>
          {preparedList.map(meetup => (
            <div>
              <MeetupCard
                id={meetup.id}
                title={meetup.title}
                fileUrl={meetup.fileUrl}
                numMembers={meetup.numMembers}
              />
            </div>
          ))}
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
