import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import PropTypes from 'prop-types'
import moment from 'moment'
import Header from '../../components/Header'
import { Creators as MeetupActions } from '../../store/ducks/meetup'
import 'moment/locale/pt-br'

import {
  Container,
  Button,
  Titulo,
  Descricao,
  Detalhes,
  Endereco,
  Content,
} from './styles'

class MeetupDetail extends Component {
  static propTypes = {
    meetup: PropTypes.shape({
      id: PropTypes.number,
      title: PropTypes.string,
      description: PropTypes.string,
      location: PropTypes.string,
      eventDate: PropTypes.instanceOf(Date),
      fileUrl: PropTypes.string,
      numMembers: PropTypes.number,
    }).isRequired,
    match: PropTypes.shape({
      params: PropTypes.shape({
        id: PropTypes.string,
      }),
    }).isRequired,
    userLoggedId: PropTypes.number.isRequired,
    getMeetupRequest: PropTypes.func.isRequired,
    signUpMeetupRequest: PropTypes.func.isRequired,
    signOffMeetupRequest: PropTypes.func.isRequired,
    error: PropTypes.string.isRequired,
    loading: PropTypes.bool.isRequired,
  }

  componentDidMount = async () => {
    const { match, getMeetupRequest } = this.props
    const { id } = match.params
    await getMeetupRequest(id)
  }

  numMembersString = (numMembers) => {
    if (numMembers === 0) return 'Nenhum membro'
    if (numMembers === 1) return '1 membro'
    return `${numMembers} membros`
  }

  isInMeetup = () => {
    const { userLoggedId, meetup } = this.props
    const index = meetup.users.findIndex(user => user.id === userLoggedId)
    if (index >= 0) return true
    return false
  }

  render() {
    const {
      signUpMeetupRequest,
      signOffMeetupRequest,
      meetup,
      error,
      loading,
    } = this.props

    const {
      id, title, description, location, event_date: eventDate, users,
    } = meetup
    const fileUrl = meetup.file && meetup.file.url
    const numMembers = users.length
    const handleClick = this.isInMeetup()
      ? { func: signOffMeetupRequest, text: 'Cancelar Inscrição' }
      : { func: signUpMeetupRequest, text: 'Inscreva-se' }
    moment.locale('pt-br')
    return (
      <Fragment>
        <Header />
        <Container>
          {error && <p>{error}</p>}
          <img src={fileUrl} alt="Meetup" />
          <Content>
            <Titulo>{title}</Titulo>
            <Detalhes>{this.numMembersString(numMembers)} </Detalhes>
            <Descricao>{description}</Descricao>
            <Detalhes>Realizado em:</Detalhes>
            <Endereco>{location}</Endereco>
            <Detalhes>Quando:</Detalhes>
            <Endereco>{moment(eventDate).format('LLLL')}</Endereco>
            <Button onClick={() => handleClick.func(id)}>
              {loading ? <i className="fa fa-spinner fa-pulse" /> : handleClick.text}
            </Button>
          </Content>
        </Container>
      </Fragment>
    )
  }
}

const mapStateToProps = state => ({
  userLoggedId: state.auth.data.id,
  meetup: state.meetup.data,
  loading: state.meetup.loading,
  error: state.meetup.error,
})

const mapDispatchToProps = dispatch => bindActionCreators(MeetupActions, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(MeetupDetail)
