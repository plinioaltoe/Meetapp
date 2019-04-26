import { all, takeLatest } from 'redux-saga/effects'
import { Types as AuthTypes } from '../ducks/auth'
import { Types as UserTypes } from '../ducks/user'
// import { Types as PreferenceTypes } from '../ducks/preference'
import { Types as MeetupTypes } from '../ducks/meetup'
import { Types as SearchTypes } from '../ducks/search'

import { signin } from './auth'
import {
  addUser, updateUser, getUser, changeStateUser,
} from './user'
// import { getPreferences } from './preference'
import {
  addMeetup, getMeetup, signUpMeetup, signOffMeetup,
} from './meetup'
import { searchMeetups } from './search'

export default function* rootSaga() {
  // User
  const userSignIn = takeLatest(AuthTypes.REQUEST, signin)
  const userAdd = takeLatest(UserTypes.ADD_REQUEST, addUser)
  const userUpdate = takeLatest(UserTypes.UPDATE_REQUEST, updateUser)
  const userGet = takeLatest(UserTypes.GET_REQUEST, getUser)
  const userChangeState = takeLatest(UserTypes.SET_STATE_REQUEST, changeStateUser)

  // Meetups
  const meetupAdd = takeLatest(MeetupTypes.ADD_REQUEST, addMeetup)
  const meetupSearch = takeLatest(SearchTypes.REQUEST, searchMeetups)
  const meetupGet = takeLatest(MeetupTypes.GET_REQUEST, getMeetup)
  const meetupSignUp = takeLatest(MeetupTypes.SIGNUP_REQUEST, signUpMeetup)
  const meetupSignOff = takeLatest(MeetupTypes.SIGNOFF_REQUEST, signOffMeetup)

  yield all([
    userSignIn,
    userAdd,
    userUpdate,
    userGet,
    userChangeState,
    meetupAdd,
    meetupSearch,
    meetupGet,
    meetupSignUp,
    meetupSignOff,
  ])
}
