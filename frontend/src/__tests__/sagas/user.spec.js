import { runSaga } from 'redux-saga'
import MockAdapter from 'axios-mock-adapter'
import { push } from 'connected-react-router'
import * as m from 'react-toastify'
import api from '../../services/api'
import {
  addUser, updateUser, getUser, changeStateUser,
} from '../../store/sagas/user'
import { Creators as UserActions } from '../../store/ducks/user'
import { Creators as AuthActions } from '../../store/ducks/auth'

const apiMock = new MockAdapter(api)
m.toast = jest.fn()

describe('User Saga', () => {
  test('should be able to add User', async () => {
    const dispatched = []

    const initialAction = { payload: { title: 'anything' } }
    const response = { user: 'success' }
    apiMock.onPost('/users/').reply(200, response)
    await runSaga(
      {
        dispatch: (action) => {
          dispatched.push(action)
        },
      },
      addUser,
      initialAction,
    ).toPromise()
    expect(dispatched).toContainEqual(UserActions.userSuccess(response))
    expect(dispatched).toContainEqual(AuthActions.authRequest(response))
    expect(m.toast).toHaveBeenCalled()
  })

  test('should failure to add User', async () => {
    const dispatched = []

    const initialAction = { payload: { title: 'anything' } }
    const response = 'Erro ao adicionar usuário! Error: Request failed with status code 500'

    apiMock.onPost('/users/').reply(500)
    await runSaga(
      {
        dispatch: (action) => {
          dispatched.push(action)
        },
      },
      addUser,
      initialAction,
    ).toPromise()
    expect(dispatched).toContainEqual(UserActions.userFailure(response))
  })

  test('should be able to update User', async () => {
    const dispatched = []

    const initialAction = { payload: { id: '1' } }
    const response = { user: 'success' }

    apiMock.onPut(`/users/${initialAction.payload.id}`).reply(200, response)
    await runSaga(
      {
        dispatch: (action) => {
          dispatched.push(action)
        },
      },
      updateUser,
      initialAction,
    ).toPromise()
    expect(dispatched).toContainEqual(UserActions.userSuccess(response))
    expect(m.toast).toHaveBeenCalled()
    expect(dispatched).toContainEqual(push('/dashboard'))
  })

  test('should failure to update User', async () => {
    const dispatched = []

    const initialAction = { payload: { id: '1' } }
    apiMock.onPut(`/users/${initialAction.payload.id}`).reply(500)
    const response = 'Erro ao atualizar usuário! Error: Request failed with status code 500'
    await runSaga(
      {
        dispatch: (action) => {
          dispatched.push(action)
        },
      },
      updateUser,
      initialAction,
    ).toPromise()
    expect(dispatched).toContainEqual(UserActions.userFailure(response))
  })

  test('should be able to get User', async () => {
    const dispatched = []

    const initialAction = { payload: { id: '1' } }
    const response = { user: 'success' }
    apiMock.onGet(`/users/${initialAction.payload.id}`).reply(200, response)
    await runSaga(
      {
        dispatch: (action) => {
          dispatched.push(action)
        },
      },
      getUser,
      initialAction,
    ).toPromise()
    expect(dispatched).toContainEqual(UserActions.userSuccess(response))
  })

  test('should failure to get User', async () => {
    const dispatched = []

    const initialAction = { payload: { id: '1' } }
    apiMock.onGet(`/users/${initialAction.payload.id}`).reply(500)
    const response = 'Erro ao buscar usuário! Error: Request failed with status code 500'
    await runSaga(
      {
        dispatch: (action) => {
          dispatched.push(action)
        },
      },
      getUser,
      initialAction,
    ).toPromise()
    expect(dispatched).toContainEqual(UserActions.userFailure(response))
  })

  test('should be able to change user state', async () => {
    const dispatched = []

    const initialAction = { payload: { id: '1' } }
    const response = { id: '1' }

    await runSaga(
      {
        dispatch: (action) => {
          dispatched.push(action)
        },
      },
      changeStateUser,
      initialAction,
    ).toPromise()
    expect(dispatched).toContainEqual(UserActions.userStateSuccess(response))
  })

  // test('should failure to signoff from User', async () => {
  //   const dispatched = []

  //   const initialAction = { payload: { id: '1' } }
  //   apiMock.onPut(`/detach/${initialAction.payload.id}`).reply(500)
  //   const response = 'Erro ao se desisncrever no user!Error: Request failed with status code 500'
  //   await runSaga(
  //     {
  //       dispatch: (action) => {
  //         dispatched.push(action)
  //       },
  //     },
  //     signOffUser,
  //     initialAction,
  //   ).toPromise()
  //   expect(dispatched).toContainEqual(UserActions.userFailure(response))
  // })
})
