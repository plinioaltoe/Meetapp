import { call, put } from 'redux-saga/effects'
import { push } from 'connected-react-router'
import api from '../../services/api'
import { login } from '../../services/auth'
import { Creators as AuthActions } from '../ducks/auth'

export function* signin(action) {
  const { payload } = action
  const { email, password, route } = payload
  if (!email || !password) {
    const erroMsg = 'Preencha e-mail e senha para continuar!'
    yield put(AuthActions.authFailure(erroMsg))
  } else {
    try {
      const { data } = yield call(api.post, '/sessions', { email, password })
      login(data.token)
      const user = yield call(api.get, '/sessions')
      yield put(AuthActions.getLoggedSucess(user.data))
      yield put(push(route))
    } catch (error) {
      const erroMsg = 'Houve um problema com o login, verifique suas credenciais.'
      yield put(AuthActions.authFailure(erroMsg))
    }
  }
}
