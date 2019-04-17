import React, { Fragment, Component } from 'react'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import PropTypes from 'prop-types'
import Flatpickr from 'react-flatpickr'
import PreferencesList from '../../components/PreferencesList'
import Header from '../../components/Header'
import { Creators as MeetupActions } from '../../store/ducks/meetup'
import { Creators as FileActions } from '../../store/ducks/file'

import 'flatpickr/dist/themes/dark.css'

import {
  Container, Button, Text, TextField, Img, TextArea, Flat,
} from './styles'

class NewMeetup extends Component {
  static defaultProps = {
    error: '',
    errorFile: '',
  }

  static propTypes = {
    addMeetupRequest: PropTypes.func.isRequired,
    addFileRequest: PropTypes.func.isRequired,

    error: PropTypes.string,
    errorFile: PropTypes.string,
    file: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number,
        file: PropTypes.string,
        name: PropTypes.string,
        type: PropTypes.string,
        subtype: PropTypes.string,
        url: PropTypes.string,
        createdAt: PropTypes.string,
        updatedAt: PropTypes.string,
      }),
    ).isRequired,
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

  handleClickUpload = () => {
    this.fileInputRef.click()
    this.fileInputRef.addEventListener('change', (file) => {
      const { addFileRequest } = this.props

      // const fileToUpload = this.fileInputRef.value
      console.log('file->', file)
      addFileRequest({
        fileToUpload: file,
      })
    })
  }

  fileInputRef

  render() {
    const {
      eventDate, title, description, location, meetupPreferences,
    } = this.state
    const { error, errorFile, file } = this.props
    console.log(file)
    return (
      <Fragment>
        <Header />
        <Container>
          <form onSubmit={this.handleAddMeetup}>
            {error && <p>{error}</p>}
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
            {errorFile && <p>{errorFile}</p>}
            <Text>Imagem</Text>
            <Img onClick={this.handleClickUpload} htmlFor="file">
              {file.url ? (
                <img src={file.url} alt="file" />
              ) : (
                <i className="fa fa-camera" />
              )}
              <input
                id="file"
                type="file"
                name="file"
                ref={(input) => {
                  this.fileInputRef = input
                }}
              />
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
  file: state.file.data,
  loadingFile: state.file.loading,
  errorFile: state.file.error,
})
const binders = { ...MeetupActions, ...FileActions }
const mapDispatchToProps = dispatch => bindActionCreators(binders, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(NewMeetup)
