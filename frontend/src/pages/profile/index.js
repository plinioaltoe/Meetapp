import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import PropTypes from 'prop-types'
import Header from '../../components/Header'
import UserInputs from '../../components/UserInputs'
import PreferencesList from '../../components/PreferencesList'
import { Creators as UserActions } from '../../store/ducks/user'
import { Container, Button, Text } from './styles'

class Profile extends Component {
  static propTypes = {
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

  constructor(props) {
    super(props)
    this.state = {
      errorLocalMessage: '',
      initialData: {
        username: '',
        password: '',
      },
    }
  }

  componentWillMount = () => {
    const { getUserRequest, userId } = this.props
    getUserRequest({
      id: userId,
    })
  }

  componentDidMount = () => {
    const { user } = this.props
    const { username, password } = user
    const initialData = { username, password }
    this.setState({
      initialData,
    })
  }

  handleChange = (e, campo) => {
    const { setStateUserRequest } = this.props
    setStateUserRequest({ [campo]: e.target.value })
  }

  checkFields = () => {
    const { user } = this.props
    const { initialData } = this.state
    const { username, password } = initialData
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
      this.setState({ errorLocalMessage: 'Nome obrigatório.' })
      data.hasEmptyFields = true
      return data
    }

    if (username !== user.username) data.user.username = user.username

    if (!user.password) {
      this.setState({ errorLocalMessage: 'Password obrigatório.' })
      data.hasEmptyFields = true
      return data
    }

    if (password !== user.password) {
      if (user.password !== user.passwordConfirmation) {
        this.setState({ errorLocalMessage: 'Passwords não conferem.' })
        data.hasEmptyFields = true
        return data
      }
      data.user.password = user.password
      data.user.passwordConfirmation = user.passwordConfirmation
    }

    return data
  }

  handleUpdate = (e) => {
    e.preventDefault()
    const { updateUserRequest } = this.props
    const data = this.checkFields()
    if (!data.hasEmptyFields) {
      updateUserRequest(data.user)
    }
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
    const { errorLocalMessage } = this.state
    const { error, loading, user } = this.props
    const { handleChangePreferences } = this

    return (
      <Fragment>
        <Header />
        <Container>
          <form onSubmit={this.handleUpdate}>
            {error && <p>{error}</p>}
            {errorLocalMessage && <p>{errorLocalMessage}</p>}
            <UserInputs display="profile" user={user} handleChange={this.handleChange} />
            <Text>Preferências</Text>
            <PreferencesList
              handleChangePreferences={handleChangePreferences}
              sentPreferences={user.preferences}
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
  console.log('state profile->', state)
  return {
    userId: state.auth.data.id,
    user: state.user.data,
    loading: state.user.loading,
    error: state.user.error,
  }
}

const mapDispatchToProps = dispatch => bindActionCreators(UserActions, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Profile)
