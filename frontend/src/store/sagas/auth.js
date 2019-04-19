import { call, put } from 'redux-saga/effects'
import { push } from 'connected-react-router'
import api from '../../services/api'
import { login } from '../../services/auth'
import { Creators as AuthActions } from '../ducks/auth'

export function* signin({ payload }) {
  try {
    const { email, password } = payload
    const { data } = yield call(api.post, '/sessions', { email, password })
    const { user, token } = data
    login(token)
    yield put(AuthActions.authSuccess(user[0]))
    const { is_first_access: isFirstAccess } = user[0]
    const route = isFirstAccess ? '/preferences' : '/dashboard'
    yield put(push(route))
  } catch (error) {
    const erroMsg = 'Houve um problema com o login, verifique suas credenciais.'
    yield put(AuthActions.authFailure(erroMsg + error))
  }
}
