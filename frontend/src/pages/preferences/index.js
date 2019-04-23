import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import PreferencesList from '../../components/PreferencesList'
import {
  Titulo, Descricao, Form, Container, Text, Button,
} from './styles'

import { Creators as UserActions } from '../../store/ducks/user'

class Preferences extends Component {
  static propTypes = {
    updateUserRequest: PropTypes.func.isRequired,
    loading: PropTypes.bool.isRequired,
    error: PropTypes.string.isRequired,
    user: PropTypes.shape({
      id: PropTypes.number,
      username: PropTypes.string,
      email: PropTypes.string,
      password: PropTypes.string,
      preferences: PropTypes.arrayOf(PropTypes.number),
    }).isRequired,
  }

  state = {
    userPreferences: [],
  }

  handleUpdatePreferences = async (e) => {
    e.preventDefault()
    const { updateUserRequest, user } = this.props
    const { userPreferences } = this.state
    updateUserRequest({
      id: user.id,
      preferences: userPreferences,
    })
  }

  handleChangePreferences = (preferences) => {
    const userPreferences = []
    preferences.map((pref) => {
      if (pref.isChecked) userPreferences.push(pref.id)
      return true
    })
    this.setState({ userPreferences })
  }

  render() {
    const { userPreferences } = this.state
    const { loading, error, user } = this.props
    const { handleChangePreferences } = this
    const texto = 'Parece que é seu primeiro acesso por aqui, comece escolhendo algumas preferências para selecionarmos os melhores meetups pra você:'
    return (
      <Container>
        <Form onSubmit={this.handleUpdatePreferences}>
          {error && <p>{error}</p>}
          <Titulo>Olá {user && user.username}</Titulo>
          <Descricao>{texto}</Descricao>
          <Text>Preferências</Text>
          <PreferencesList
            handleChangePreferences={handleChangePreferences}
            sentPreferences={userPreferences}
          />
          <Button type="submit">
            {loading ? <i className="fa fa-spinner fa-pulse" /> : 'Continuar'}
          </Button>
        </Form>
      </Container>
    )
  }
}
const mapStateToProps = (state) => {
  console.log('state preferences->', state)
  return {
    user: state.user.data,
    loading: state.user.loading,
    error: state.user.error,
  }
}

const mapDispatchToProps = dispatch => bindActionCreators(UserActions, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Preferences)
