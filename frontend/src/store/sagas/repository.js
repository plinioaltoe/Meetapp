import { call, put } from 'redux-saga/effects'
import { toast } from 'react-toastify'
import api from '../../services/api'
import { Creators as RepositoryActions } from '../ducks/repository'

export function* addRepository(action) {
  try {
    const { payload } = action
    const { repository, latitude, longitude } = payload
    const { data } = yield call(api.get, `/users/${repository}`)

    const repositoryData = {
      id: data.id,
      name: data.name,
      signin: data.signin,
      avatar_url: data.avatar_url,
      repos_url: data.repos_url,
      latitude,
      longitude,
    }

    yield put(RepositoryActions.addRepositorySuccess(repositoryData))
    toast('Repositório adicionado com sucesso!')
  } catch (error) {
    const erroMsg = 'Erro ao adicionar repositório'
    toast(erroMsg)
    yield put(RepositoryActions.addRepositoryFailure(erroMsg))
  }
}
