import React from 'react'
import { Link } from 'react-router-dom'
import personIcon from '../../assets/person_outline.png'
import logo from '../../assets/logo-white.svg'
import { logout } from '../../services/auth'
import { Container, Menu, MenuProfile } from './styles'

const Header = () => (
  <Container>
    <div id="img">
      <img src={logo} alt="logo" />
    </div>
    <Menu>
      <Link to="/dashboard">Inicio</Link>
      <Link to="/search">Buscar</Link>
      <Link to="/newMeetup">Novo meetup</Link>
    </Menu>
    <MenuProfile>
      <img src={personIcon} alt="profile" />
      <ul>
        <li>
          <Link to="/profile">Profile</Link>
        </li>
        <li>
          <Link onClick={() => logout()} to="/">
            Logout
          </Link>
        </li>
      </ul>
    </MenuProfile>
  </Container>
)

export default Header
