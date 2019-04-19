import { all, takeLatest } from 'redux-saga/effects'
import { Types as AuthTypes } from '../ducks/auth'
import { Types as UserTypes } from '../ducks/user'
import { Types as PreferenceTypes } from '../ducks/preference'
import { Types as MeetupTypes } from '../ducks/meetup'

import { signin } from './auth'
import {
  addUser, updateUser, getUser, changeStateUser,
} from './user'
import { getPreferences } from './preference'
import { addMeetup, changeStateMeetup } from './meetup'

export default function* rootSaga() {
  // User
  const userSignIn = takeLatest(AuthTypes.REQUEST, signin)
  const userAdd = takeLatest(UserTypes.ADD_REQUEST, addUser)
  const userUpdate = takeLatest(UserTypes.UPDATE_REQUEST, updateUser)
  const userGet = takeLatest(UserTypes.GET_REQUEST, getUser)
  const userChangeState = takeLatest(UserTypes.SET_STATE_REQUEST, changeStateUser)
  // Preferences
  const preferencesGet = takeLatest(PreferenceTypes.GET_REQUEST, getPreferences)
  // Meetups
  const meetupAdd = takeLatest(MeetupTypes.ADD_REQUEST, addMeetup)
  const meetupChangeState = takeLatest(MeetupTypes.SET_STATE_REQUEST, changeStateMeetup)

  yield all([
    userSignIn,
    userAdd,
    userUpdate,
    userGet,
    userChangeState,
    preferencesGet,
    meetupAdd,
    meetupChangeState,
  ])
}
