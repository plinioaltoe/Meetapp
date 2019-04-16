/**
 * Types
 */

export const Types = {
  UPDATE_REQUEST: 'meetup/UPDATE_REQUEST',
  ADD_REQUEST: 'meetup/ADD_REQUEST',
  ADD_OR_UPDATE_SUCESS: 'meetup/ADD_OR_UPDATE_SUCESS',
  ADD_OR_UPDATE_FAILURE: 'meetup/ADD_OR_UPDATE_FAILURE',
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
    case Types.ADD_REQUEST:
      return { ...state, loading: true, error: '' }
    case Types.UPDATE_REQUEST:
      return { ...state, loading: true, error: '' }
    case Types.ADD_OR_UPDATE_SUCESS:
      return {
        ...state,
        loading: false,
        error: '',
        data: action.payload.data,
      }
    case Types.ADD_OR_UPDATE_FAILURE:
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
      fileId,
      eventDate,
      preferences,
    },
  }),

  updateMeetupRequest: ({
    id,
    meetupname,
    password,
    passwordConfirmation,
    preferences,
  }) => ({
    type: Types.UPDATE_REQUEST,
    payload: {
      id,
      meetupname,
      password,
      passwordConfirmation,
      preferences,
    },
  }),

  addOrUpdateMeetupSuccess: data => ({
    type: Types.ADD_OR_UPDATE_SUCESS,
    payload: { data },
  }),

  addOrUpdateMeetupFailure: error => ({
    type: Types.ADD_OR_UPDATE_FAILURE,
    payload: { error },
  }),
}
