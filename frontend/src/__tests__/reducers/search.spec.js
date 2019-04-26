import searchReducer, { Creators as SearchActions } from '../../store/ducks/search'

describe('Search Reducer', () => {
  test('should be able to call get request', () => {
    const data = {
      data: 'some data',
    }
    const state = searchReducer({ data: {} }, SearchActions.searchRequest(data))
    expect(state.data).toEqual({})
    expect(state.loading).toBeTruthy()
    expect(state.error).toBe('')
  })

  test('should be able to get failure', () => {
    const error = 'deu erro'
    const state = searchReducer({ data: {} }, SearchActions.searchFailure(error))
    expect(state.data).toEqual({})
    expect(state.loading).toBeFalsy()
    expect(state.error).toBe(error)
  })

  test('should be able to search success', () => {
    const data = {
      data: 'some data',
    }
    const state = searchReducer({ data: {} }, SearchActions.searchSuccess(data))
    expect(state.data).toEqual(data)
    expect(state.loading).toBeFalsy()
    expect(state.error).toBe('')
  })
})
