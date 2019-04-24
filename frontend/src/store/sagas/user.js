import { call, put } from 'redux-saga/effects'
import { push } from 'connected-react-router'
import { toast } from 'react-toastify'
import api from '../../services/api'
import { Creators as UserActions } from '../ducks/user'
import { Creators as AuthActions } from '../ducks/auth'

export function* addUser(action) {
  try {
    const { payload: user } = action
    const { data } = yield call(api.post, `/users/`, user)
    yield put(UserActions.userSuccess(data))
    toast('Usuário adicionado com sucesso!')
    yield put(AuthActions.authRequest(user))
  } catch (error) {
    const erroMsg = 'Erro ao adicionar usuário! '
    yield put(UserActions.userFailure(erroMsg + error))
  }
}

export function* updateUser(action) {
  try {
    const { payload: user } = action
    const { data } = yield call(api.put, `/users/${user.id}`, user)
    yield put(UserActions.userSuccess(data))
    toast('Usuário alterado com sucesso!')
    yield put(push('/dashboard'))
  } catch (error) {
    const erroMsg = 'Erro ao atualizar usuário'
    yield put(UserActions.userFailure(erroMsg + error))
  }
}

export function* getUser(action) {
  try {
    const { payload: user } = action
    const { data } = yield call(api.get, `/users/${user.id}`)
    data.passwordConfirmation = data.password
    yield put(UserActions.userSuccess(data))
  } catch (error) {
    const erroMsg = 'Erro ao buscar usuário'
    yield put(UserActions.userFailure(erroMsg + error))
  }
}

export function* changeStateUser(action) {
  try {
    const { payload: user } = action
    yield put(UserActions.userStateSuccess(user))
  } catch (error) {
    const erroMsg = 'Erro ao atualizar o state do redux para usuário'
    yield put(UserActions.userFailure(erroMsg + error))
  }
}
