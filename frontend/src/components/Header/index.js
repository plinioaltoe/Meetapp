import React from 'react'
import { Link } from 'react-router-dom'
import personIcon from '../../assets/person_outline.png'
import logo from '../../assets/logo-white.svg'

import { Container, Menu } from './styles'

const Header = () => (
  <Container>
    <div id="img">
      <img src={logo} alt="logo" />
      {/* <div id='logo' style='background:url(${logo})'></div> */}
    </div>
    <Menu>
      <Link to="/dashboard">Inicio</Link>
      <Link to="/search">Buscar</Link>
      <Link to="/newMeetup">Novo meetup</Link>
    </Menu>
    <Link to="/profile">
      <img src={personIcon} alt="profile" />
    </Link>
  </Container>
)

export default Header
