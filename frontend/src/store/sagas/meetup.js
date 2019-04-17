import { call, put } from 'redux-saga/effects'
import { push } from 'connected-react-router'
import api from '../../services/api'
import { Creators as MeetupActions } from '../ducks/meetup'

export function* addMeetup(action) {
  const { payload } = action
  const {
    title, description, location, fileId, eventDate, preferences,
  } = payload

  if (title === '') {
    const erroMsg = 'Titulo inválido!'
    yield put(MeetupActions.addOrUpdateMeetupFailure(erroMsg))
  } else if (description === '') {
    const erroMsg = 'Descrição inválida!'
    yield put(MeetupActions.addOrUpdateMeetupFailure(erroMsg))
  } else if (location === '') {
    const erroMsg = 'Localização inválida!'
    yield put(MeetupActions.addOrUpdateMeetupFailure(erroMsg))
  } else if (eventDate === '') {
    const erroMsg = 'Data inválida!'
    yield put(MeetupActions.addOrUpdateMeetupFailure(erroMsg))
  } else {
    const meetupAttibutes = {
      title,
      description,
      location,
      file_id: fileId,
      event_date: eventDate[0],
      preferences,
    }
    try {
      const { data } = yield call(api.post, `/meetups/`, meetupAttibutes)
      yield put(MeetupActions.addOrUpdateMeetupSuccess(data))
      yield put(push('/dashboard'))
    } catch (error) {
      const erroMsg = 'Erro ao adicionar meetup!'
      yield put(MeetupActions.addOrUpdateMeetupFailure(erroMsg + error + meetupAttibutes))
    }
  }
}
