import { runSaga } from 'redux-saga'
import MockAdapter from 'axios-mock-adapter'
import api from '../../services/api'
import { searchMeetups } from '../../store/sagas/search'
import { Creators as SearchActions } from '../../store/ducks/search'

const apiMock = new MockAdapter(api)

describe('Search Saga', () => {
  test('should be able to Search meetups', async () => {
    const dispatched = []

    const initialAction = { payload: { route: 'all', title: 'anything', page: '1' } }
    const response = {
      search: 'success',
    }
    const responseSuccess = {
      notSigned: { search: 'success' },
      recommended: { search: 'success' },
      signed: { search: 'success' },
    }
    apiMock
      .onGet(`/search_signed?title=${initialAction.payload.title}&page=1`)
      .reply(200, response)
    apiMock
      .onGet(`/search_not_signed?title=${initialAction.payload.title}&page=1`)
      .reply(200, response)
    apiMock
      .onGet(`/search_recommended?title=${initialAction.payload.title}&page=1`)
      .reply(200, response)
    await runSaga(
      {
        dispatch: (action) => {
          dispatched.push(action)
        },
      },
      searchMeetups,
      initialAction,
    ).toPromise()
    expect(dispatched).toContainEqual(SearchActions.searchSuccess(responseSuccess))
  })

  test('should failure to Search meetup', async () => {
    const dispatched = []
    const initialAction = { payload: { route: 'all', title: 'anything', page: '1' } }
    const response = 'Erro ao buscar meetups!Error: Request failed with status code 500'
    apiMock.onGet(`/search_signed?title=${initialAction.payload.title}&page=1`).reply(500)
    apiMock
      .onGet(`/search_not_signed?title=${initialAction.payload.title}&page=1`)
      .reply(500)
    apiMock
      .onGet(`/search_recommended?title=${initialAction.payload.title}&page=1`)
      .reply(500)

    await runSaga(
      {
        dispatch: (action) => {
          dispatched.push(action)
        },
      },
      searchMeetups,
      initialAction,
    ).toPromise()
    expect(dispatched).toContainEqual(SearchActions.searchFailure(response))
  })
})
