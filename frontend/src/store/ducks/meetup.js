/**
 * Types
 */

export const Types = {
  ADD_REQUEST: 'meetup/ADD_REQUEST',
  GET_REQUEST: 'meetup/GET_REQUEST',
  SIGNUP_REQUEST: 'meetup/SIGNUP_REQUEST',
  SIGNOFF_REQUEST: 'meetup/SIGNOFF_REQUEST',
  SUCCESS: 'meetup/SUCCESS',
  FAILURE: 'meetup/FAILURE',
}

/**
 * Reducers
 */
const INITIAL_STATE = {
  loading: false,
  data: {},
  error: '',
}

export default function meetup(state = INITIAL_STATE, action) {
  switch (action.type) {
    case Types.ADD_REQUEST || Types.SIGNUP_REQUEST || Types.SIGNOFF_REQUEST:
      return { ...state, loading: true, error: '' }
    case Types.SUCCESS:
      return {
        ...state,
        loading: false,
        error: '',
        data: action.payload.data,
      }
    case Types.FAILURE:
      return { ...state, loading: false, error: action.payload.error }
    default:
      return state
  }
}

/**
 * Actions
 */
export const Creators = {
  addMeetupRequest: ({
    title,
    description,
    location,
    fileId,
    eventDate,
    preferences,
  }) => ({
    type: Types.ADD_REQUEST,
    payload: {
      title,
      description,
      location,
      file_id: fileId,
      event_date: eventDate[0],
      preferences,
    },
  }),

  getMeetupRequest: id => ({
    type: Types.GET_REQUEST,
    payload: {
      id,
    },
  }),

  signUpMeetupRequest: id => ({
    type: Types.SIGNUP_REQUEST,
    payload: {
      id,
    },
  }),

  signOffMeetupRequest: id => ({
    type: Types.SIGNOFF_REQUEST,
    payload: {
      id,
    },
  }),

  meetupSuccess: data => ({
    type: Types.SUCCESS,
    payload: { data },
  }),

  meetupFailure: error => ({
    type: Types.FAILURE,
    payload: { error },
  }),
}
