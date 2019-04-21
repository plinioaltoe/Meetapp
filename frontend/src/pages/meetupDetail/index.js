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
  }

  constructor(props) {
    super(props)
    this.state = {
      id: '',
      title: '',
      description: '',
      location: '',
      eventDate: '',
      fileUrl: '',
      numMembers: 0,
      users: [],
    }
  }

  componentDidMount = async () => {
    const { match, getMeetupRequest } = this.props
    const { id } = match.params
    await getMeetupRequest(id)
  }

  componentWillReceiveProps = (newProps) => {
    const { meetup } = newProps

    this.setState({
      id: meetup.id,
      title: meetup.title,
      description: meetup.description,
      location: meetup.location,
      eventDate: meetup.event_date,
      fileUrl: meetup.file && meetup.file.url,
      numMembers: meetup.users.length,
      users: meetup.users,
    })
  }

  numMembersString = (numMembers) => {
    if (numMembers === 0) return 'Nenhum membro'
    if (numMembers === 1) return '1 membro'
    return `${numMembers} membros`
  }

  isInMeetup = () => {
    const { users } = this.state
    const { userLoggedId } = this.props
    const index = users.findIndex(user => user.id === userLoggedId)
    if (index >= 0) return true
    return false
  }

  render() {
    const {
      id,
      title,
      description,
      location,
      eventDate,
      fileUrl,
      numMembers,
    } = this.state

    const { signUpMeetupRequest, signOffMeetupRequest } = this.props
    const handleClick = this.isInMeetup()
      ? { func: signOffMeetupRequest, text: 'Cancelar Inscrição' }
      : { func: signUpMeetupRequest, text: 'Inscreva-se' }
    moment.locale('pt-br')
    return (
      <Fragment>
        <Header />
        <Container>
          <img src={fileUrl} alt="Meetup" />
          <Content>
            <Titulo>{title}</Titulo>
            <Detalhes>{this.numMembersString(numMembers)} </Detalhes>
            <Descricao>{description}</Descricao>
            <Detalhes>Realizado em:</Detalhes>
            <Endereco>{location}</Endereco>
            <Detalhes>Quando:</Detalhes>
            <Endereco>{moment(eventDate).format('LLLL')}</Endereco>
            <Button onClick={() => handleClick.func(id)}>{handleClick.text}</Button>
          </Content>
        </Container>
      </Fragment>
    )
  }
}

const mapStateToProps = (state) => {
  console.log('detailstate->', state)
  return {
    userLoggedId: state.auth.data.id,
    meetup: state.meetup.data,
    loading: state.meetup.loading,
    error: state.meetup.error,
  }
}

const mapDispatchToProps = dispatch => bindActionCreators(MeetupActions, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(MeetupDetail)
