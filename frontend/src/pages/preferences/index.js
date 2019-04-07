import React, { Fragment } from 'react'

import PreferencesList from '../../components/PreferencesList'
// import { Container } from './styles';

const Preferences = () => {
  const texto = 'Parece que é seu primeiro acesso por aqui, comece escolhendo algumas preferências para selecionarmos os melhores meetups pra você:'
  return (
    <Fragment>
      <div>Preferences</div>
      <h1>Olá fulano</h1>
      <h2>{texto}</h2>
      <PreferencesList />
    </Fragment>
  )
}
export default Preferences
