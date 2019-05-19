/* eslint-disable import/no-unresolved */
import React, { useState, useEffect, Fragment } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import PropTypes from 'prop-types'
import { Form } from '@rocketseat/unform'
import * as Yup from 'yup'
import Header from '../../components/Header'
import UserInputs from '../../components/UserInputs'
import PreferencesList from '../../components/PreferencesList'
import { Creators as UserActions } from '../../store/ducks/user'
import { Container, Button, Text } from './styles'

const schema = Yup.object().shape({
  username: Yup.string().required('Campo obrigatório'),
  password: Yup.string()
    .min(6)
    .required(),
  password_confirmation: Yup.string().oneOf(
    [Yup.ref('password'), null],
    'Passwords devem ser iguais',
  ),
})

const Profile = ({ user, error, loading, setStateUserRequest, updateUserRequest }) => {
  const [errorLocalMessage, setErrorLocalMessage] = useState(false)
  const [username, setUsername] = useState(false)
  const [password, setPassword] = useState(false)

  // Similar to componentDidMount and componentDidUpdate:
  useEffect(() => {
    const { username, password } = user
    setUsername(username)
    setPassword(password)
  })

  function handleChange(e, campo) {
    setStateUserRequest({ [campo]: e.target.value })
  }

  function checkFields() {
    const preferences = []
    user.preferences.map(p => preferences.push(p.id))
    const data = {
      user: {
        id: user.id,
        preferences,
      },
      hasEmptyFields: false,
    }

    if (!user.username) {
      setErrorLocalMessage('Nome obrigatório.')
      data.hasEmptyFields = true
      return data
    }

    if (username !== user.username) data.user.username = user.username

    if (!user.password) {
      setErrorLocalMessage('Password obrigatório.')
      data.hasEmptyFields = true
      return data
    }

    if (user.password !== user.passwordConfirmation) {
      setErrorLocalMessage('Passwords não conferem.')
      data.hasEmptyFields = true
      return data
    }

    if (password !== user.password) {
      data.user.password = user.password
      data.user.passwordConfirmation = user.passwordConfirmation
    }

    return data
  }

  function handleUpdate(data) {
    const dataToSave = checkFields(data)
    if (!dataToSave.hasEmptyFields) {
      updateUserRequest(dataToSave.user)
    }
  }

  function handleChangePreferences(preferences) {
    const userPreferences = []
    preferences.map(pref => {
      if (pref.isChecked) userPreferences.push(pref)
      return true
    })
    setStateUserRequest({ preferences: userPreferences })
  }

  user.passwordConfirmation =
    typeof user.passwordConfirmation === typeof undefined
      ? user.password
      : user.passwordConfirmation

  user.password_confirmation = user.password

  return (
    <Fragment>
      <Header />
      <Container>
        <Form onSubmit={handleUpdate} initialData={user} schema={schema}>
          {error && <p>{error}</p>}
          {errorLocalMessage && <p>{errorLocalMessage}</p>}
          <UserInputs display="profile" user={user} handleChange={handleChange} />
          <Text>Preferências</Text>
          <PreferencesList
            handleChangePreferences={handleChangePreferences}
            sentPreferences={user.preferences}
          />
          <Button type="submit">
            {loading ? <i className="fa fa-spinner fa-pulse" /> : 'Salvar'}
          </Button>
        </Form>
      </Container>
    </Fragment>
  )
}

Profile.propTypes = {
  updateUserRequest: PropTypes.func.isRequired,
  setStateUserRequest: PropTypes.func.isRequired,
  getUserRequest: PropTypes.func.isRequired,
  userId: PropTypes.number.isRequired,
  loading: PropTypes.bool.isRequired,
  user: PropTypes.shape({
    id: PropTypes.number,
    username: PropTypes.string,
    email: PropTypes.string,
    password: PropTypes.string,
    preferences: PropTypes.arrayOf(PropTypes.object),
  }).isRequired,
  error: PropTypes.string.isRequired,
}

const mapStateToProps = state => ({
  userId: state.auth.data.id,
  user: state.user.data,
  loading: state.user.loading,
  error: state.user.error,
})

const mapDispatchToProps = dispatch => bindActionCreators(UserActions, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Profile)
