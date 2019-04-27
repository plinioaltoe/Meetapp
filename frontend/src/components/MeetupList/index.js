import React, { Component } from 'react'
import PropTypes from 'prop-types'
import MeetupCard from './MeetupCard'

import {
  Container, Content, ButtonPagination, Text, HiddenDiv,
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
    handlePaginate: PropTypes.func.isRequired,
    route: PropTypes.string.isRequired,
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
    const { handlePaginate, list, route } = this.props
    const { page, lastPage } = list

    return (
      <Container>
        <Content>
          {preparedList.map(meetup => (
            <div key={meetup.id} id="card">
              <MeetupCard
                id={meetup.id}
                title={meetup.title}
                fileUrl={meetup.fileUrl}
                numMembers={meetup.numMembers}
              />
            </div>
          ))}
          {preparedList.length === 2 && <HiddenDiv />}
        </Content>
        <ButtonPagination>
          <button
            disabled={page === 1}
            type="button"
            id="first"
            onClick={() => handlePaginate({
              page: 1,
              route,
            })
            }
          >
            <i className="fa fa-angle-double-left" />
          </button>
          <button
            disabled={page === 1}
            type="button"
            id="prev"
            onClick={() => handlePaginate({
              page: page - 1,
              route,
            })
            }
          >
            <i className="fa fa-angle-left" />
          </button>
          <Text>Página: {page}</Text>
          <button
            disabled={page === lastPage}
            type="button"
            id="next"
            onClick={() => handlePaginate({
              page: page + 1,
              route,
            })
            }
          >
            <i className="fa fa-angle-right" />
          </button>
          <button
            disabled={page === lastPage}
            type="button"
            id="last"
            onClick={() => handlePaginate({
              page: lastPage,
              route,
            })
            }
          >
            <i className="fa fa-angle-double-right" />
          </button>
        </ButtonPagination>
      </Container>
    )
  }
}
