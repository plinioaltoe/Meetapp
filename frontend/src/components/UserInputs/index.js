import React from 'react'
import PropTypes from 'prop-types'

import { Container, TextField, Text } from './styles'

const UserInputs = ({ display }) => (
  <Container>
    {display !== 'login' && <Text>Nome</Text>}
    {display !== 'login' && <TextField placeholder="Digite seu nome" />}
    {display !== 'profile' && <Text>E-mail</Text>}
    {display !== 'profile' && <TextField placeholder="Digite seu e-mail" />}
    <Text>Senha</Text>
    <TextField placeholder="Sua senha secreta" />
    {display !== 'login' && <Text>Confirmação de senha</Text>}
    {display !== 'login' && <TextField placeholder="Confirmação de senha secreta" />}
  </Container>
)

UserInputs.propTypes = {
  display: PropTypes.string.isRequired,
}

export default UserInputs
