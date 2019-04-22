import React, { Component } from 'react'
import PropTypes from 'prop-types'
import MeetupCard from './MeetupCard'

import {
  Container, Content, ButtonPagination, Text,
} from './styles'

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
    const page = 0
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
            <i className="fa fa-angle-double-left" />
          </button>
          <button type="button" onClick={() => {}}>
            <i className="fa fa-angle-left" />
          </button>
          <Text>Página: {page}</Text>
          <button type="button" onClick={() => {}}>
            <i className="fa fa-angle-right" />
          </button>
          <button type="button" onClick={() => {}}>
            <i className="fa fa-angle-double-right" />
          </button>
        </ButtonPagination>
      </Container>
    )
  }
}
