import React from 'react'
import PropTypes from 'prop-types'
import { Input } from '@rocketseat/unform'
import { Container, Text } from './styles'

const UserInputs = ({ display }) => (
  <Container>
    {display !== 'signin' && <Text>Nome</Text>}
    {display !== 'signin' && (
      <Input name="username" type="text" placeholder="Digite seu nome" />
    )}
    {display !== 'profile' && <Text>E-mail</Text>}
    {display !== 'profile' && (
      <Input name="email" type="email" placeholder="Digite seu e-mail" />
    )}
    <Text>Senha</Text>
    <Input name="password" placeholder="Sua senha secreta" type="password" />
    {display !== 'signin' && <Text>Confirmação de senha</Text>}
    {display !== 'signin' && (
      <Input
        name="password_confirmation"
        placeholder="Confirmação de senha secreta"
        type="password"
      />
    )}
  </Container>
)

UserInputs.propTypes = {
  display: PropTypes.string.isRequired,
}

export default UserInputs
