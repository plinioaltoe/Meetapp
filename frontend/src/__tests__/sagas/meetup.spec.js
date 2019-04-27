import { runSaga } from 'redux-saga'
import MockAdapter from 'axios-mock-adapter'
import * as m from 'react-toastify'
import { push } from 'connected-react-router'
import api from '../../services/api'
import {
  addMeetup,
  getMeetup,
  signUpMeetup,
  signOffMeetup,
} from '../../store/sagas/meetup'
import { Creators as MeetupActions } from '../../store/ducks/meetup'

const apiMock = new MockAdapter(api)
m.toast = jest.fn()

describe('Meetup Saga', () => {
  test('should be able to add Meetup', async () => {
    const dispatched = []

    const initialAction = { payload: { title: 'anything' } }
    const response = { meetup: 'success' }
    apiMock.onPost('/meetups/').reply(200, response)
    await runSaga(
      {
        dispatch: (action) => {
          dispatched.push(action)
        },
      },
      addMeetup,
      initialAction,
    ).toPromise()
    expect(dispatched).toContainEqual(MeetupActions.meetupSuccess(response))
    expect(m.toast).toHaveBeenCalled()
    expect(dispatched).toContainEqual(push('/dashboard'))
  })

  test('should failure to add Meetup', async () => {
    const dispatched = []

    const initialAction = { payload: { title: 'anything' } }
    const response = 'Erro ao adicionar meetup!Error: Request failed with status code 500'

    apiMock.onPost('/meetups/').reply(500)
    await runSaga(
      {
        dispatch: (action) => {
          dispatched.push(action)
        },
      },
      addMeetup,
      initialAction,
    ).toPromise()
    expect(dispatched).toContainEqual(MeetupActions.meetupFailure(response))
  })

  test('should be able to get Meetup', async () => {
    const dispatched = []

    const initialAction = { payload: { id: '1' } }
    const response = { meetup: 'success' }
    apiMock.onGet(`/meetups/${initialAction.payload.id}`).reply(200, response)
    await runSaga(
      {
        dispatch: (action) => {
          dispatched.push(action)
        },
      },
      getMeetup,
      initialAction,
    ).toPromise()
    expect(dispatched).toContainEqual(MeetupActions.meetupSuccess(response))
  })

  test('should failure to get Meetup', async () => {
    const dispatched = []

    const initialAction = { payload: { id: '1' } }
    apiMock.onGet(`/meetups/${initialAction.payload.id}`).reply(500)
    const response = 'Erro ao buscar meetup!Error: Request failed with status code 500'
    await runSaga(
      {
        dispatch: (action) => {
          dispatched.push(action)
        },
      },
      getMeetup,
      initialAction,
    ).toPromise()
    expect(dispatched).toContainEqual(MeetupActions.meetupFailure(response))
  })

  test('should be able to signUp on Meetup', async () => {
    const dispatched = []

    const initialAction = { payload: { id: '1' } }
    const response = { meetup: 'success' }
    apiMock.onPut(`/attach/${initialAction.payload.id}`).reply(200, response)
    await runSaga(
      {
        dispatch: (action) => {
          dispatched.push(action)
        },
      },
      signUpMeetup,
      initialAction,
    ).toPromise()
    expect(dispatched).toContainEqual(MeetupActions.meetupSuccess(response))
    expect(dispatched).toContainEqual(push('/dashboard'))
    expect(m.toast).toHaveBeenCalled()
  })

  test('should failure to signUp on Meetup', async () => {
    const dispatched = []

    const initialAction = { payload: { id: '1' } }
    apiMock.onPut(`/attach/${initialAction.payload.id}`).reply(500)
    const response = 'Erro ao se inscrever no meetup!Error: Request failed with status code 500'
    await runSaga(
      {
        dispatch: (action) => {
          dispatched.push(action)
        },
      },
      signUpMeetup,
      initialAction,
    ).toPromise()
    expect(dispatched).toContainEqual(MeetupActions.meetupFailure(response))
  })

  test('should be able to signoff from Meetup', async () => {
    const dispatched = []

    const initialAction = { payload: { id: '1' } }
    const response = { meetup: 'success' }
    apiMock.onPut(`/detach/${initialAction.payload.id}`).reply(200, response)
    await runSaga(
      {
        dispatch: (action) => {
          dispatched.push(action)
        },
      },
      signOffMeetup,
      initialAction,
    ).toPromise()
    expect(dispatched).toContainEqual(MeetupActions.meetupSuccess(response))
    expect(dispatched).toContainEqual(push('/dashboard'))
    expect(m.toast).toHaveBeenCalled()
  })

  test('should failure to signoff from Meetup', async () => {
    const dispatched = []

    const initialAction = { payload: { id: '1' } }
    apiMock.onPut(`/detach/${initialAction.payload.id}`).reply(500)
    const response = 'Erro ao se desisncrever no meetup!Error: Request failed with status code 500'
    await runSaga(
      {
        dispatch: (action) => {
          dispatched.push(action)
        },
      },
      signOffMeetup,
      initialAction,
    ).toPromise()
    expect(dispatched).toContainEqual(MeetupActions.meetupFailure(response))
  })
})
