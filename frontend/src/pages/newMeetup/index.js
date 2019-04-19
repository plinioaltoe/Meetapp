import React, { Fragment, Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import PropTypes from 'prop-types'
import Flatpickr from 'react-flatpickr'
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
    setStateMeetupRequest: PropTypes.func.isRequired,
    addMeetupRequest: PropTypes.func.isRequired,
    error: PropTypes.string.isRequired,
    loading: PropTypes.bool.isRequired,
    meetup: PropTypes.shape({
      title: PropTypes.string,
      description: PropTypes.string,
      fileUrl: PropTypes.string,
      location: PropTypes.string,
      eventDate: PropTypes.instanceOf(Date),
      preferences: PropTypes.arrayOf(PropTypes.object),
    }).isRequired,
  }

  constructor(props) {
    super(props)
    this.state = {
      errorLocalMessage: '',
    }
  }

  handleChange = (e, campo) => {
    const { setStateMeetupRequest } = this.props
    setStateMeetupRequest({ [campo]: e.target.value })
  }

  handleChangeFile = ({ fileId, fileUrl }) => {
    const { setStateMeetupRequest } = this.props
    setStateMeetupRequest({ fileId, fileUrl })
  }

  checkFields = () => {
    const { meetup } = this.props
    const preferences = []
    console.log(meetup)
    meetup.preferences.map(p => preferences.push(p.id))
    const data = {
      meetup: {
        preferences,
        fileId: meetup.fileId,
      },
      hasEmptyFields: false,
    }

    if (!meetup.title) {
      this.setState({ errorLocalMessage: 'Título obrigatório.' })
      data.hasEmptyFields = true
      return data
    }

    data.meetup.title = meetup.title

    if (!meetup.description) {
      this.setState({ errorLocalMessage: 'Descrição obrigatória.' })
      data.hasEmptyFields = true
      return data
    }

    data.meetup.description = meetup.description

    if (!meetup.location) {
      this.setState({ errorLocalMessage: 'Localização obrigatória.' })
      data.hasEmptyFields = true
      return data
    }

    data.meetup.location = meetup.location

    if (!meetup.eventDate) {
      this.setState({ errorLocalMessage: 'Data do evento obrigatória.' })
      data.hasEmptyFields = true
      return data
    }

    data.meetup.eventDate = meetup.eventDate

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
    const { setStateMeetupRequest } = this.props
    const meetupPreferences = []
    preferences.map((pref) => {
      if (pref.isChecked) meetupPreferences.push(pref)
      return true
    })
    setStateMeetupRequest({ preferences: meetupPreferences })
  }

  render() {
    const { errorLocalMessage } = this.state
    const {
      error, loading, meetup, setStateMeetupRequest,
    } = this.props
    const {
      eventDate, title, description, location, meetupPreferences, fileUrl,
    } = meetup

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
                onChange={(date) => {
                  setStateMeetupRequest({ eventDate: date })
                }}
              />
            </Flat>
            <Text>Preferências</Text>
            <PreferencesList
              handleChangePreferences={this.handleChangePreferences}
              sentPreferences={meetupPreferences}
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
