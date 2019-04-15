import React from 'react'
import PropTypes from 'prop-types'

import { Container, TextField, Text } from './styles'

const UserInputs = ({ display, handleChange, user }) => (
  <Container>
    {display !== 'signin' && <Text>Nome</Text>}
    {display !== 'signin' && (
      <TextField
        type="text"
        placeholder="Digite seu nome"
        onChange={e => handleChange(e, 'username')}
        value={user.username}
      />
    )}
    {display !== 'profile' && <Text>E-mail</Text>}
    {display !== 'profile' && (
      <TextField
        type="email"
        placeholder="Digite seu e-mail"
        onChange={e => handleChange(e, 'email')}
        value={user.email}
      />
    )}
    <Text>Senha</Text>
    <TextField
      placeholder="Sua senha secreta"
      type="password"
      onChange={e => handleChange(e, 'password')}
      value={user.password}
    />
    {display !== 'signin' && <Text>Confirmação de senha</Text>}
    {display !== 'signin' && (
      <TextField
        placeholder="Confirmação de senha secreta"
        type="password"
        onChange={e => handleChange(e, 'passwordConfirmation')}
        value={user.passwordConfirmation}
      />
    )}
  </Container>
)

UserInputs.propTypes = {
  display: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
  user: PropTypes.shape({
    username: PropTypes.string,
    email: PropTypes.string,
    password: PropTypes.string,
    passwordConfirmation: PropTypes.string,
  }).isRequired,
}

export default UserInputs
