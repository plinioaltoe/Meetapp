import { call, put } from 'redux-saga/effects'
import { toast } from 'react-toastify'
import api from '../../services/api'
import { Creators as FileActions } from '../ducks/file'

export function* addFile(action) {
  try {
    const { payload } = action
    const { fileToUpload: file } = payload
    console.log(file)
    const dataFile = new FormData()
    dataFile.append('file', file, '')
    const config = {
      headers: {
        'content-type': 'multipart/form-data',
      },
    }
    const { data } = yield call(api.post, `/files/`, dataFile, config)

    const fileData = {
      id: data.id,
      file: data.file,
      name: data.name,
      type: data.type,
      subtype: data.subtype,
      url: data.url,
      createdAt: data.created_at,
      updatedAt: data.updated_at,
    }

    yield put(FileActions.addFileSuccess(fileData))
    toast('Arquivo adicionado com sucesso!')
  } catch (error) {
    const erroMsg = 'Erro ao adicionar arquivo'
    toast(erroMsg)
    yield put(FileActions.addFileFailure(erroMsg))
  }
}
