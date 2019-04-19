import { call, put } from 'redux-saga/effects'
import { push } from 'connected-react-router'
import api from '../../services/api'
import { Creators as MeetupActions } from '../ducks/meetup'

export function* addMeetup(action) {
  try {
    const { payload: meetup } = action
    const { data } = yield call(api.post, `/meetups/`, meetup)
    yield put(MeetupActions.meetupSuccess(data))
    yield put(push('/dashboard'))
  } catch (error) {
    const erroMsg = 'Erro ao adicionar meetup!'
    yield put(MeetupActions.meetupFailure(erroMsg + error))
  }
}

export function* changeStateMeetup(action) {
  try {
    console.log(action)
    const { payload: meetup } = action
    yield put(MeetupActions.meetupStateSuccess(meetup))
  } catch (error) {
    const erroMsg = 'Erro ao atualizar o state do redux para meetup'
    yield put(MeetupActions.meetupFailure(erroMsg + error))
  }
}
