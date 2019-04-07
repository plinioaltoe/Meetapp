import React, { Fragment } from 'react'

import Header from '../../components/Header'
import UserInputs from '../../components/UserInputs'
import PreferencesList from '../../components/PreferencesList'

// import { Container } from './styles';

const Profile = () => (
  <Fragment>
    <div>Profile</div>
    <Header />
    <form>
      <UserInputs />
    </form>
    <PreferencesList />
  </Fragment>
)

export default Profile
