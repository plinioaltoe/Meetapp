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
      <Link to="/dashboard" id="link-dashboard">
        Inicio
      </Link>
      <Link to="/search" id="link-search">
        Buscar
      </Link>
      <Link to="/newMeetup" id="link-newMeetup">
        Novo meetup
      </Link>
    </Menu>
    <MenuProfile>
      <img src={personIcon} alt="profile" />
      <ul>
        <li>
          <Link to="/profile" id="link-profile">
            Profile
          </Link>
        </li>
        <li>
          <Link onClick={() => logout()} to="/" id="link-logout">
            Logout
          </Link>
        </li>
      </ul>
    </MenuProfile>
  </Container>
)

export default Header
