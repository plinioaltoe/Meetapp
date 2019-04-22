import { call, put } from 'redux-saga/effects'
import api from '../../services/api'
import { Creators as SearchActions } from '../ducks/search'

export function* searchMeetups(action) {
  try {
    const { payload: meetup } = action
    const { data: signed } = yield call(api.get, `/search_signed?title=${meetup.title}`)
    const { data: notSigned } = yield call(
      api.get,
      `/search_not_signed?title=${meetup.title}`,
    )
    const { data: recommended } = yield call(
      api.get,
      `/search_recommended?title=${meetup.title}`,
    )
    const foundData = { signed, notSigned, recommended }
    console.log(foundData)
    yield put(SearchActions.searchSuccess(foundData))
  } catch (error) {
    const erroMsg = 'Erro ao buscar meetups!'
    yield put(SearchActions.searchFailure(erroMsg + error))
  }
}
