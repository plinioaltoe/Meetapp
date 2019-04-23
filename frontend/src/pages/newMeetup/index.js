import React, { Fragment, Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import PropTypes from 'prop-types'
import Flatpickr from 'react-flatpickr'
import { Portuguese } from 'flatpickr/dist/l10n/pt'
import PreferencesList from '../../components/PreferencesList'
import Header from '../../components/Header'
import Upload from '../../components/Upload'
import { Creators as MeetupActions } from '../../store/ducks/meetup'

import 'flatpickr/dist/themes/dark.css'

import {
  Container, Button, Text, TextField, TextArea, Flat,
} from './styles'

class NewMeetup extends Component {
  static propTypes = {
    addMeetupRequest: PropTypes.func.isRequired,
    error: PropTypes.string.isRequired,
    loading: PropTypes.bool.isRequired,
  }

  constructor(props) {
    super(props)

    this.state = {
      errorLocalMessage: '',
      title: '',
      description: '',
      fileUrl: '',
      location: '',
      eventDate: '',
      preferences: [],
      fileId: 0,
    }
  }

  handleChange = (e, campo) => {
    this.setState({ [campo]: e.target.value })
  }

  handleChangeFile = ({ fileId, fileUrl }) => {
    this.setState({ fileId, fileUrl })
  }

  checkFields = () => {
    const {
      title, description, location, eventDate, preferences, fileId,
    } = this.state

    const preferencesIds = []

    preferences.map(p => preferencesIds.push(p.id))

    const data = {
      meetup: {
        preferences: preferencesIds,
        title,
        description,
        location,
        eventDate,
      },
      hasEmptyFields: false,
    }

    if (fileId > 0) data.meetup.fileId = fileId

    if (!title) {
      this.setState({ errorLocalMessage: 'Título obrigatório.' })
      data.hasEmptyFields = true
      return data
    }

    if (!description) {
      this.setState({ errorLocalMessage: 'Descrição obrigatória.' })
      data.hasEmptyFields = true
      return data
    }

    if (!location) {
      this.setState({ errorLocalMessage: 'Localização obrigatória.' })
      data.hasEmptyFields = true
      return data
    }

    if (!eventDate) {
      this.setState({ errorLocalMessage: 'Data do evento obrigatória.' })
      data.hasEmptyFields = true
      return data
    }

    return data
  }

  handleAddMeetup = (e) => {
    e.preventDefault()
    const { addMeetupRequest } = this.props
    const data = this.checkFields()
    if (!data.hasEmptyFields) {
      addMeetupRequest(data.meetup)
    }
  }

  handleChangePreferences = (preferences) => {
    const meetupPreferences = []
    preferences.map((pref) => {
      if (pref.isChecked) meetupPreferences.push(pref)
      return true
    })
    this.setState({ preferences: meetupPreferences })
  }

  render() {
    const {
      errorLocalMessage,
      eventDate,
      title,
      description,
      location,
      preferences,
      fileUrl,
    } = this.state
    const { error, loading } = this.props

    return (
      <Fragment>
        <Header />
        <Container>
          <form onSubmit={this.handleAddMeetup}>
            {error && <p>{error}</p>}
            {errorLocalMessage && <p>{errorLocalMessage}</p>}
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
            <Upload handleChangeFile={this.handleChangeFile} fileUrl={fileUrl} />
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
                options={{
                  locale: Portuguese,
                  time_24hr: true,
                  dateFormat: 'D, d \\de M \\de Y à\\s H:i',
                }}
                onChange={(date) => {
                  this.setState({ eventDate: date })
                }}
              />
            </Flat>
            <Text>Preferências</Text>
            <PreferencesList
              handleChangePreferences={this.handleChangePreferences}
              sentPreferences={preferences}
            />
            <Button type="submit">
              {loading ? <i className="fa fa-spinner fa-pulse" /> : 'Salvar'}
            </Button>
          </form>
        </Container>
      </Fragment>
    )
  }
}

const mapStateToProps = (state) => {
  console.log('meetupstate->', state)
  return {
    meetup: state.meetup.data,
    loading: state.meetup.loading,
    error: state.meetup.error,
  }
}

const mapDispatchToProps = dispatch => bindActionCreators(MeetupActions, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(NewMeetup)
