import { all, takeLatest } from 'redux-saga/effects'
import { Types as RepositoryTypes } from '../ducks/repository'
import { addRepository } from './repository'

export default function* rootSaga() {
  yield all([takeLatest(RepositoryTypes.ADD_REQUEST, addRepository)])
}
