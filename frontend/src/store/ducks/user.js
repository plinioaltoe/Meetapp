/**
 * Types
 */

export const Types = {
  UPDATE_REQUEST: 'user/UPDATE_REQUEST',
  ADD_REQUEST: 'user/ADD_REQUEST',
  ADD_OR_UPDATE_SUCESS: 'user/ADD_OR_UPDATE_SUCESS',
  ADD_OR_UPDATE_FAILURE: 'user/ADD_OR_UPDATE_FAILURE',
}

/**
 * Reducers
 */
const INITIAL_STATE = {
  loading: false,
  data: {},
  error: '',
}

export default function user(state = INITIAL_STATE, action) {
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
  addUserRequest: ({
    username, email, password, passwordConfirmation,
  }) => ({
    type: Types.ADD_REQUEST,
    payload: {
      username,
      email,
      password,
      passwordConfirmation,
    },
  }),

  updateUserRequest: ({
    id, username, password, passwordConfirmation, preferences,
  }) => ({
    type: Types.UPDATE_REQUEST,
    payload: {
      id,
      username,
      password,
      passwordConfirmation,
      preferences,
    },
  }),

  addOrUpdateUserSuccess: data => ({
    type: Types.ADD_OR_UPDATE_SUCESS,
    payload: { data },
  }),

  addOrUpdateUserFailure: error => ({
    type: Types.ADD_OR_UPDATE_FAILURE,
    payload: { error },
  }),
}
