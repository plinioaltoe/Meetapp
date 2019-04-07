import React, { Fragment } from 'react'
import Header from '../../components/Header'
import MeetupList from '../../components/MeetupList'

// import { Container } from './styles';

const Search = () => (
  <Fragment>
    <div>Search</div>
    <Header />
    <input placeholder="Buscar meetups" />
    <MeetupList />
  </Fragment>
)

export default Search
