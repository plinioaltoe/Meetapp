/**
 * Types
 */

export const Types = {
  UPDATE_REQUEST: 'meetup/UPDATE_REQUEST',
  ADD_REQUEST: 'meetup/ADD_REQUEST',
  SET_STATE_REQUEST: 'meetup/SET_STATE_REQUEST',
  STATE_SUCCESS: 'user/STATE_SUCCESS',
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
  console.log(state)
  switch (action.type) {
    case Types.ADD_REQUEST || Types.UPDATE_REQUEST || Types.SET_STATE_REQUEST:
      return { ...state, loading: true, error: '' }
    case Types.SUCCESS:
      return {
        ...state,
        loading: false,
        error: '',
        data: action.payload.data,
      }
    case Types.STATE_SUCCESS:
      return {
        ...state,
        loading: false,
        error: '',
        data: { ...state.data, ...action.payload.data },
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

  setStateMeetupRequest: data => ({
    type: Types.SET_STATE_REQUEST,
    payload: data,
  }),

  meetupSuccess: data => ({
    type: Types.SUCCESS,
    payload: { data },
  }),

  meetupStateSuccess: data => ({
    type: Types.STATE_SUCCESS,
    payload: { data },
  }),

  meetupFailure: error => ({
    type: Types.FAILURE,
    payload: { error },
  }),
}
