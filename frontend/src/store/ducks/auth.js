/**
 * Types
 */

export const Types = {
  REQUEST: 'auth/REQUEST',
  FAILURE: 'auth/FAILURE',
  SUCCESS: 'auth/SUCCESS',
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
    case Types.REQUEST:
      return { ...state, loading: true, error: '' }
    case Types.FAILURE:
      return { ...state, loading: false, error: action.payload.error }
    case Types.SUCCESS:
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
  authRequest: ({ email, password }) => ({
    type: Types.REQUEST,
    payload: { email, password },
  }),

  authFailure: error => ({
    type: Types.FAILURE,
    payload: { error },
  }),

  authSuccess: data => ({
    type: Types.SUCCESS,
    payload: { data },
  }),
}
