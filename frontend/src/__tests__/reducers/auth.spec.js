import authReducer, { Creators as AuthActions } from '../../store/ducks/auth'

describe('Auth Reducer', () => {
  test('should be able to call get request', () => {
    const any = {
      email: 'any',
      password: 'any',
    }
    const state = authReducer({ data: {} }, AuthActions.authRequest(any))
    expect(state.data).toEqual({})
    expect(state.loading).toBeTruthy()
    expect(state.error).toBe('')
  })

  test('should be able to get failure', () => {
    const error = 'deu erro'
    const state = authReducer({ data: {} }, AuthActions.authFailure(error))
    expect(state.data).toEqual({})
    expect(state.loading).toBeFalsy()
    expect(state.error).toBe(error)
  })

  test('should be able to add user login', () => {
    const login = {
      email: 'plinioaltoe@yahoo.com.br',
      password: '123456',
    }
    const state = authReducer({ data: {} }, AuthActions.authSuccess(login))
    expect(state.data).toEqual(login)
    expect(state.loading).toBeFalsy()
    expect(state.error).toBe('')
  })
})
