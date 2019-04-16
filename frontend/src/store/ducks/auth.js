/**
 * Types
 */

export const Types = {
  SIGNIN_REQUEST: 'auth/SIGNIN_REQUEST',
  FAILURE: 'auth/FAILURE',
  GET_LOGGED_REQUEST: 'auth/GET_LOGGED_REQUEST',
  GET_LOGGED_SUCESS: 'auth/GET_LOGGED_SUCESS',
}

/**
 * Reducers
 */
const INITIAL_STATE = {
  loading: false,
  error: '',
  data: {},
}

export default function auth(state = INITIAL_STATE, action) {
  switch (action.type) {
    case Types.SIGNIN_REQUEST:
      return { ...state, loading: true, error: '' }
    case Types.FAILURE:
      return { ...state, loading: false, error: action.payload.error }
    case Types.GET_LOGGED_REQUEST:
      return { ...state, loading: true, error: '' }
    case Types.GET_LOGGED_SUCESS:
      return {
        ...state,
        loading: false,
        error: '',
        data: action.payload.data,
      }
    default:
      return state
  }
}

/**
 * Actions
 */
export const Creators = {
  authRequest: ({ email, password, route }) => ({
    type: Types.SIGNIN_REQUEST,
    payload: { email, password, route },
  }),

  authFailure: error => ({
    type: Types.FAILURE,
    payload: { error },
  }),

  getLoggedRequest: ({ id, username, email }) => ({
    type: Types.GET_LOGGED_REQUEST,
    payload: { id, username, email },
  }),

  getLoggedSucess: data => ({
    type: Types.GET_LOGGED_SUCESS,
    payload: { data },
  }),
}
