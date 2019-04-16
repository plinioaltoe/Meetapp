import { call, put } from 'redux-saga/effects'
import { push } from 'connected-react-router'
import api from '../../services/api'
import { Creators as UserActions } from '../ducks/user'
import { Creators as AuthActions } from '../ducks/auth'

export function* addUser(action) {
  const { payload } = action
  const {
    username, email, password, passwordConfirmation,
  } = payload

  if (password !== passwordConfirmation) {
    const erroMsg = 'Passwords não conferem!'
    yield put(UserActions.addOrUpdateUserFailure(erroMsg))
  } else if (username === '') {
    const erroMsg = 'Nome de usuário inválido!'
    yield put(UserActions.addOrUpdateUserFailure(erroMsg))
  } else {
    try {
      const { data } = yield call(api.post, `/users/`, {
        username,
        email,
        password,
        password_confirmation: passwordConfirmation,
      })
      const userData = {
        id: data.id,
        username: data.username,
        email: data.email,
      }
      yield put(UserActions.addOrUpdateUserSuccess(userData))
      const route = '/preferences'
      yield put(AuthActions.authRequest({ email, password, route }))
    } catch (error) {
      const erroMsg = 'Erro ao adicionar usuário!'
      yield put(UserActions.addOrUpdateUserFailure(erroMsg))
    }
  }
}

export function* updateUser(action) {
  const { payload } = action
  const {
    id, username, password, passwordConfirmation, preferences,
  } = payload
  if (password !== passwordConfirmation) {
    const erroMsg = 'Passwords não conferem!'
    yield put(UserActions.addOrUpdateUserFailure(erroMsg))
  } else {
    const userToUpdate = {}
    if (username) userToUpdate.username = username
    if (password) userToUpdate.password = password
    if (passwordConfirmation) userToUpdate.password_confirmation = passwordConfirmation
    if (preferences) userToUpdate.preferences = preferences
    try {
      const { data } = yield call(api.put, `/users/${id}`, userToUpdate)
      const userData = {
        id: data.id,
        username: data.username,
        email: data.email,
        preferences: data.preferences,
      }
      yield put(UserActions.addOrUpdateUserSuccess(userData))
      yield put(push('/dashboard'))
    } catch (error) {
      const erroMsg = 'Erro ao atualizar usuário'
      yield put(UserActions.addOrUpdateUserFailure(erroMsg + error + userToUpdate))
    }
  }
}
