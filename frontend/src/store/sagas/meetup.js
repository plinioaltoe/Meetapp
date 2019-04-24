import { call, put } from 'redux-saga/effects'
import { push } from 'connected-react-router'
import { toast } from 'react-toastify'
import api from '../../services/api'
import { Creators as MeetupActions } from '../ducks/meetup'

export function* addMeetup(action) {
  try {
    const { payload: meetup } = action
    const { data } = yield call(api.post, `/meetups/`, meetup)
    yield put(MeetupActions.meetupSuccess(data))
    toast('Meetup adicionado com sucesso!')
    yield put(push('/dashboard'))
  } catch (error) {
    const erroMsg = 'Erro ao adicionar meetup!'
    yield put(MeetupActions.meetupFailure(erroMsg + error))
  }
}

export function* getMeetup(action) {
  try {
    const { payload: meetup } = action
    const { data } = yield call(api.get, `/meetups/${meetup.id}`)
    yield put(MeetupActions.meetupSuccess(data))
  } catch (error) {
    const erroMsg = 'Erro ao buscar meetup!'
    yield put(MeetupActions.meetupFailure(erroMsg + error))
  }
}

export function* signUpMeetup(action) {
  try {
    const { payload: meetup } = action
    const { data } = yield call(api.put, `/attach/${meetup.id}`)
    yield put(MeetupActions.meetupSuccess(data))
    toast('Usuário inscrito com sucesso!')
    yield put(push('/dashboard'))
  } catch (error) {
    const erroMsg = 'Erro ao se inscrever no meetup!'
    yield put(MeetupActions.meetupFailure(erroMsg + error))
  }
}

export function* signOffMeetup(action) {
  try {
    const { payload: meetup } = action
    const { data } = yield call(api.put, `/detach/${meetup.id}`)
    yield put(MeetupActions.meetupSuccess(data))
    toast('Inscrição cancelada!')
    yield put(push('/dashboard'))
  } catch (error) {
    const erroMsg = 'Erro ao se desisncrever no meetup!'
    yield put(MeetupActions.meetupFailure(erroMsg + error))
  }
}
