import meetupReducer, { Creators as MeetupActions } from '../../store/ducks/meetup'

describe('Meetup Reducer', () => {
  test('should be able to call get request', () => {
    const id = 0
    const state = meetupReducer({ data: {} }, MeetupActions.getMeetupRequest(id))
    expect(state.data).toEqual({})
    expect(state.loading).toBeTruthy()
    expect(state.error).toBe('')
  })
  test('should be able to call signup request', () => {
    const id = 0
    const state1 = meetupReducer({ data: {} }, MeetupActions.signUpMeetupRequest(id))
    expect(state1.data).toEqual({})
    expect(state1.loading).toBeTruthy()
    expect(state1.error).toBe('')
  })
  test('should be able to call signoff request', () => {
    const id = 0
    const state2 = meetupReducer({ data: {} }, MeetupActions.signOffMeetupRequest(id))
    expect(state2.data).toEqual({})
    expect(state2.loading).toBeTruthy()
    expect(state2.error).toBe('')
  })
  test('should be able to call add request', () => {
    const eventDate = [0, 1]
    const state3 = meetupReducer(
      { data: {} },
      MeetupActions.addMeetupRequest({ eventDate }),
    )
    expect(state3.data).toEqual({})
    expect(state3.loading).toBeTruthy()
    expect(state3.error).toBe('')
  })

  test('should be able to get failure', () => {
    const error = 'deu erro'
    const state = meetupReducer({ data: {} }, MeetupActions.meetupFailure(error))
    expect(state.data).toEqual({})
    expect(state.loading).toBeFalsy()
    expect(state.error).toBe(error)
  })

  test('should be able to add meetup', () => {
    const data = {
      data: 'some data',
    }
    const state = meetupReducer({ data: {} }, MeetupActions.meetupSuccess(data))
    expect(state.data).toEqual(data)
    expect(state.loading).toBeFalsy()
    expect(state.error).toBe('')
  })
})
