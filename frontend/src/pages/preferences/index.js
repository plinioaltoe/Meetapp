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
    setStateUserRequest: PropTypes.func.isRequired,
    updateUserRequest: PropTypes.func.isRequired,
    loading: PropTypes.bool.isRequired,
    error: PropTypes.string.isRequired,
    user: PropTypes.shape({
      id: PropTypes.number,
      username: PropTypes.string,
      email: PropTypes.string,
      password: PropTypes.string,
      preferences: PropTypes.arrayOf(PropTypes.object),
    }).isRequired,
  }

  handleUpdatePreferences = async (e) => {
    e.preventDefault()
    const { updateUserRequest, user } = this.props
    const preferences = []
    user.preferences.map(p => preferences.push(p.id))
    updateUserRequest({
      id: user.id,
      preferences,
    })
  }

  handleChangePreferences = (preferences) => {
    const { setStateUserRequest } = this.props
    const userPreferences = []
    preferences.map((pref) => {
      if (pref.isChecked) userPreferences.push(pref)
      return true
    })
    setStateUserRequest({ preferences: userPreferences })
  }

  render() {
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
            sentPreferences={user.preferences}
          />
          <Button type="submit">
            {loading ? <i className="fa fa-spinner fa-pulse" /> : 'Continuar'}
          </Button>
        </Form>
      </Container>
    )
  }
}
const mapStateToProps = state => ({
  user: state.user.data,
  loading: state.user.loading,
  error: state.user.error,
})

const mapDispatchToProps = dispatch => bindActionCreators(UserActions, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Preferences)
