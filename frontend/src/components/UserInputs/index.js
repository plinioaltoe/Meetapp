import React from 'react'

import { Container, TextField, Text } from './styles'

const UserInputs = () => (
  <Container>
    <Text>Nome</Text>
    <TextField placeholder="Digite seu nome" />
    <Text>E-mail</Text>
    <TextField placeholder="Digite seu e-mail" />
    <Text>Senha</Text>
    <TextField placeholder="Sua senha secreta" />
    <Text>Confirmação de senha</Text>
    <TextField placeholder="Confirmação de senha secreta" />
  </Container>
)

export default UserInputs
