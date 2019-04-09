import React from 'react'

import { Container, TextField } from './styles'

const UserInputs = () => (
  <Container>
    Nome
    <div>
      <TextField placeholder="Digite seu nome" />
    </div>
    E-mail
    <div>
      <TextField placeholder="Digite seu e-mail" />
    </div>
    Senha
    <div>
      <TextField placeholder="Sua senha secreta" />
    </div>
    Confirmação de senha
    <div>
      <TextField placeholder="Confirmação de senha secreta" />
    </div>
  </Container>
)

export default UserInputs
