import { call, put } from 'redux-saga/effects'
import api from '../../services/api'
import { Creators as SearchActions } from '../ducks/search'

export function* searchMeetups(action) {
  try {
    const { payload: meetup } = action
    const foundData = {}
    if (meetup.route === 'signed' || meetup.route === 'all') {
      const { data: signed } = yield call(
        api.get,
        `/search_signed?title=${meetup.title}&page=${meetup.page}`,
      )
      foundData.signed = signed
    }

    if (meetup.route === 'notSigned' || meetup.route === 'all') {
      const { data: notSigned } = yield call(
        api.get,
        `/search_not_signed?title=${meetup.title}&page=${meetup.page}`,
      )
      foundData.notSigned = notSigned
    }

    if (meetup.route === 'recommended' || meetup.route === 'all') {
      const { data: recommended } = yield call(
        api.get,
        `/search_recommended?title=${meetup.title}&page=${meetup.page}`,
      )
      foundData.recommended = recommended
    }

    yield put(SearchActions.searchSuccess(foundData))
  } catch (error) {
    const erroMsg = 'Erro ao buscar meetups!'
    yield put(SearchActions.searchFailure(erroMsg + error))
  }
}
