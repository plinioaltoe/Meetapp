import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators, compose } from 'redux'
import PropTypes from 'prop-types'
import { withRouter, Link } from 'react-router-dom'
import UserInputs from '../../components/UserInputs'
import logo from '../../assets/logo.svg'
import { Creators as UserActions } from '../../store/ducks/user'
import {
  Container, Button, Text, Img,
} from './styles'

class Signup extends Component {
  static defaultProps = {
    error: '',
  }

  static propTypes = {
    addUserRequest: PropTypes.func.isRequired,
    error: PropTypes.string,
  }

  state = {
    username: '',
    email: '',
    password: '',
    passwordConfirmation: '',
  }

  handleSignup = async (e) => {
    e.preventDefault()
    const { addUserRequest } = this.props
    const {
      username, email, password, passwordConfirmation,
    } = this.state

    addUserRequest({
      username,
      email,
      password,
      passwordConfirmation,
    })
  }

  handleChange = (e, campo) => {
    this.setState({ [campo]: e.target.value })
  }

  render() {
    const {
      username, email, password, passwordConfirmation,
    } = this.state
    const { error } = this.props
    const user = {
      username,
      email,
      password,
      passwordConfirmation,
    }
    return (
      <Fragment>
        <Container>
          <form onSubmit={this.handleSignup}>
            <Img src={logo} alt="logo" />
            {error && <p>{error}</p>}
            <UserInputs display="signup" user={user} handleChange={this.handleChange} />
            <Button type="submit">Criar conta</Button>
            <Link to="/">
              <Text>Já tenho conta</Text>
            </Link>
          </form>
        </Container>
      </Fragment>
    )
  }
}

const mapStateToProps = state => ({
  user: state.user.data,
  loading: state.user.loading,
  error: state.user.error,
})

const mapDispatchToProps = dispatch => bindActionCreators(UserActions, dispatch)

export default compose(
  withRouter,
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
)(Signup)
