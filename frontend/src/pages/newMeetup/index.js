import React, { Fragment, Component } from 'react'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import PropTypes from 'prop-types'
import Flatpickr from 'react-flatpickr'
import PreferencesList from '../../components/PreferencesList'
import Header from '../../components/Header'
import { Creators as MeetupActions } from '../../store/ducks/meetup'

import 'flatpickr/dist/themes/dark.css'

import {
  Container, Button, Text, TextField, Img, TextArea, Flat,
} from './styles'

class NewMeetup extends Component {
  static propTypes = {
    addMeetupRequest: PropTypes.func.isRequired,
  }

  state = {
    title: '',
    description: '',
    location: '',
    fileId: '',
    meetupPreferences: [],
    eventDate: '',
  }

  handleChange = (e, campo) => {
    this.setState({ [campo]: e.target.value })
  }

  handleAddMeetup = (e) => {
    e.preventDefault()
    const { addMeetupRequest } = this.props
    const {
      title,
      description,
      location,
      fileId,
      eventDate,
      meetupPreferences,
    } = this.state
    addMeetupRequest({
      title,
      description,
      location,
      fileId,
      eventDate,
      preferences: meetupPreferences,
    })
  }

  handleChangePreferences = (preferences) => {
    const meetupPreferences = []
    preferences.map((pref) => {
      if (pref.isChecked) meetupPreferences.push(pref.id)
      return true
    })
    this.setState({ meetupPreferences })
  }

  handleUpload = () => {}

  render() {
    const {
      eventDate, title, description, location, meetupPreferences,
    } = this.state
    return (
      <Fragment>
        <Header />
        <Container>
          <form onSubmit={this.handleAddMeetup}>
            <Text>Título</Text>
            <TextField
              placeholder="Digite o título do meetup"
              value={title}
              onChange={e => this.handleChange(e, 'title')}
            />
            <Text>Descrição</Text>
            <TextArea
              placeholder="Descreva seu meetup"
              rows="100"
              cols="100"
              value={description}
              onChange={e => this.handleChange(e, 'description')}
            />
            <Text>Imagem</Text>
            <Img onClick={this.handleUpload}>
              <i className="fa fa-camera" />
            </Img>
            <Text>Localização</Text>
            <TextField
              placeholder="Onde seu meetup irá acontecer?"
              value={location}
              onChange={e => this.handleChange(e, 'location')}
            />
            <Text>Data</Text>
            <Flat>
              <Flatpickr
                placeholder="Quando seu meetup irá acontecer?"
                data-enable-time
                value={eventDate}
                onChange={(date) => {
                  this.setState({ eventDate: date })
                }}
              />
            </Flat>
            <Text>Preferências</Text>
            <PreferencesList
              handleChangePreferences={this.handleChangePreferences}
              sentPreferences={meetupPreferences}
            />
            <Button type="submit">Salvar</Button>
          </form>
        </Container>
      </Fragment>
    )
  }
}

const mapStateToProps = state => ({
  meetup: state.meetup.data,
  loading: state.meetup.loading,
  error: state.meetup.error,
})

const mapDispatchToProps = dispatch => bindActionCreators(MeetupActions, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(NewMeetup)
