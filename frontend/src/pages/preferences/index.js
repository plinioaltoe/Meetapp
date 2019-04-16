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
  static defaultProps = {
    user: {},
  }

  static propTypes = {
    updateUserRequest: PropTypes.func.isRequired,
    user: PropTypes.shape({
      loading: PropTypes.bool,
      data: PropTypes.shape({
        id: PropTypes.number,
        username: PropTypes.string,
        email: PropTypes.string,
        password: PropTypes.string,
        preferences: PropTypes.arrayOf(PropTypes.number),
      }),
    }),
  }

  state = {
    userPreferences: [],
    id: 0,
    username: '',
  }

  componentDidMount = async () => {
    const { user } = this.props
    const { data: userLogged } = user
    this.setState({
      id: userLogged.id,
      username: userLogged.username,
    })
  }

  handleUpdatePreferences = async (e) => {
    e.preventDefault()
    const { updateUserRequest } = this.props
    const { userPreferences, id } = this.state
    updateUserRequest({
      id,
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
    const { username, userPreferences } = this.state
    const { handleChangePreferences } = this
    const texto = 'Parece que é seu primeiro acesso por aqui, comece escolhendo algumas preferências para selecionarmos os melhores meetups pra você:'
    return (
      <Container>
        <Form onSubmit={this.handleUpdatePreferences}>
          <Titulo>Olá {username}</Titulo>
          <Descricao>{texto}</Descricao>
          <Text>Preferências</Text>
          <PreferencesList
            handleChangePreferences={handleChangePreferences}
            sentPreferences={userPreferences}
          />
          <Button type="submit">Continuar</Button>
        </Form>
      </Container>
    )
  }
}

const mapStateToProps = state => ({
  user: state.user,
})

const mapDispatchToProps = dispatch => bindActionCreators(UserActions, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Preferences)
