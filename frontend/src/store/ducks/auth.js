/**
 * Types
 */

export const Types = {
  SIGNIN_REQUEST: 'auth/SIGNIN_REQUEST',
  SIGNIN_FAILURE: 'auth/SIGNIN_FAILURE',
}

/**
 * Reducers
 */
const INITIAL_STATE = {
  loading: false,
  error: '',
}

export default function auth(state = INITIAL_STATE, action) {
  switch (action.type) {
    case Types.SIGNIN_REQUEST:
      return { ...state, loading: true, error: '' }
    case Types.SIGNIN_FAILURE:
      return { ...state, loading: false, error: action.payload.error }
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
    type: Types.SIGNIN_FAILURE,
    payload: { error },
  }),
}
