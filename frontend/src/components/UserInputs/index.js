import React, { Fragment } from 'react'

// import { Container } from './styles';

const UserInputs = () => (
  <Fragment>
    <div>Profile</div>
    <input placeholder="Digite seu nome" />
    <input placeholder="Sua senha secreta" />
    <input placeholder="Confirmação de senha secreta" />
    <p>aqui será um upload</p>
    <input placeholder="Onde seu meetup irá acontecer?" />
  </Fragment>
)

export default UserInputs
