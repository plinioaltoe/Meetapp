import { call, put } from 'redux-saga/effects'
import api from '../../services/api'
import { Creators as PreferenceActions } from '../ducks/preference'

export function* getPreferences() {
  try {
    const { data } = yield call(api.get, '/preferences')
    yield put(PreferenceActions.getPreferenceSucess(data))
  } catch (error) {
    const erroMsg = 'Houve um problema com a lista de preferêncais.'
    yield put(PreferenceActions.getPreferenceFailure(erroMsg))
  }
}
