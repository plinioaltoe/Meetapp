import React, { Component } from 'react'
import PropTypes from 'prop-types'
import MeetupCard from './MeetupCard'

import { Container, Content, ButtonPagination } from './styles'

export default class MeetupList extends Component {
  static propTypes = {
    // eslint-disable-next-line react/no-unused-prop-types
    list: PropTypes.shape({
      total: PropTypes.string.isRequired,
      perPage: PropTypes.number.isRequired,
      page: PropTypes.number.isRequired,
      lastPage: PropTypes.number.isRequired,
      data: PropTypes.arrayOf(
        PropTypes.shape({
          id: PropTypes.number,
          title: PropTypes.string,
          description: PropTypes.string,
          location: PropTypes.string,
          eventDate: PropTypes.instanceOf(Date),
          fileUrl: PropTypes.string,
          numMembers: PropTypes.number,
        }),
      ),
    }).isRequired,
  }

  state = {
    preparedList: [],
  }

  componentWillReceiveProps = newProps => this.prepareList(newProps)

  prepareList = (newProps) => {
    const { list } = newProps

    const preparedList = []
    list.data.map((meetup) => {
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
            <div key={meetup.id}>
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
