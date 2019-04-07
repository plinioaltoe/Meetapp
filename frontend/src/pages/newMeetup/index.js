import React, { Fragment } from 'react'

import Header from '../../components/Header'
import PreferencesList from '../../components/PreferencesList'
// import { Container } from './styles';

const NewMeetup = () => (
  <Fragment>
    <div>NewMeetup</div>
    <Header />
    <input placeholder="Digite o título do meetup" />
    <input placeholder="Descreva seu meetup" />
    <p>aqui será um upload</p>
    <input placeholder="Onde seu meetup irá acontecer?" />
    <PreferencesList />
  </Fragment>
)

export default NewMeetup
