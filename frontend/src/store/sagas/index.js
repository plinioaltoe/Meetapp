import { all, takeLatest } from 'redux-saga/effects'
import { Types as AuthTypes } from '../ducks/auth'
import { Types as UserTypes } from '../ducks/user'
import { Types as PreferenceTypes } from '../ducks/preference'
import { Types as MeetupTypes } from '../ducks/meetup'
import { Types as FileTypes } from '../ducks/file'

import { signin } from './auth'
import { addUser, updateUser } from './user'
import { addMeetup } from './meetup'
import { getPreferences } from './preference'
import { addFile } from './file'

export default function* rootSaga() {
  const signIn = takeLatest(AuthTypes.SIGNIN_REQUEST, signin)
  const userAdd = takeLatest(UserTypes.ADD_REQUEST, addUser)
  const userUpdate = takeLatest(UserTypes.UPDATE_REQUEST, updateUser)
  const preferencesGet = takeLatest(PreferenceTypes.GET_REQUEST, getPreferences)
  const meetupAdd = takeLatest(MeetupTypes.ADD_REQUEST, addMeetup)
  const fileAdd = takeLatest(FileTypes.ADD_REQUEST, addFile)
  yield all([signIn, userAdd, userUpdate, preferencesGet, meetupAdd, fileAdd])
}
