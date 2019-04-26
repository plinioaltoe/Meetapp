import { runSaga } from 'redux-saga'
import MockAdapter from 'axios-mock-adapter'
import api from '../../services/api'
import { signin } from '../../store/sagas/auth'
import { Creators as AuthActions } from '../../store/ducks/auth'

const apiMock = new MockAdapter(api)

describe('Auth Saga', () => {
  test('should be able to signin', async () => {
    const dispatched = []

    const response = { email: 'teste@teste.com', password: '1234567' }

    apiMock.onPost('/sessions').reply(200, response)
    await runSaga(
      {
        dispatch: (payload) => {
          dispatched.push({ payload })
        },
      },
      signin,
    ).toPromise()
    expect(dispatched).toContainEqual(AuthActions.authSuccess(response))
  })
})
