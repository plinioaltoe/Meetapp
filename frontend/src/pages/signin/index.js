import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { Link, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { bindActionCreators, compose } from 'redux'
import UserInputs from '../../components/UserInputs'
import logo from '../../assets/logo.svg'

import { Creators as AuthActions } from '../../store/ducks/auth'

import {
  Container, Button, Text, Img, Form,
} from './styles'

class Signin extends Component {
  static defaultProps = {
    error: '',
    // loading: false,
  }

  static propTypes = {
    authRequest: PropTypes.func.isRequired,
    error: PropTypes.string,
    // loading: PropTypes.bool,
  }

  state = {
    email: '',
    password: '',
  }

  handleSignIn = async (e) => {
    e.preventDefault()
    const { authRequest } = this.props
    const { email, password } = this.state
    const route = '/dashboard'
    await authRequest({ email, password, route })
  }

  handleChange = (e, campo) => {
    this.setState({ [campo]: e.target.value })
  }

  render() {
    const { email, password } = this.state
    const user = { email, password }
    const { error } = this.props
    return (
      <Fragment>
        <Container>
          <Form onSubmit={this.handleSignIn}>
            <Img src={logo} alt="logo" />
            {error && <p>{error}</p>}
            <UserInputs display="signin" user={user} handleChange={this.handleChange} />
            <Button type="submit">Entrar</Button>
            <Link to="/signup">
              <Text>Criar conta grátis</Text>
            </Link>
          </Form>
        </Container>
      </Fragment>
    )
  }
}

const mapStateToProps = state => ({
  loading: state.auth.loading,
  error: state.auth.error,
})

const mapDispatchToProps = dispatch => bindActionCreators(AuthActions, dispatch)

export default compose(
  withRouter,
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
)(Signin)
