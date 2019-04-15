/**
 * Types
 */

export const Types = {
  GET_REQUEST: 'preference/GET_REQUEST',
  GET_SUCESS: 'preference/GET_SUCESS',
  GET_FAILURE: 'preference/GET_FAILURE',
}

/**
 * Reducers
 */
const INITIAL_STATE = {
  loading: false,
  data: [],
  error: null,
}

export default function preference(state = INITIAL_STATE, action) {
  switch (action.type) {
    case Types.GET_REQUEST:
      return { ...state, loading: true }
    case Types.GET_SUCESS:
      return {
        ...state,
        loading: false,
        error: null,
        data: action.payload.data,
      }
    case Types.GET_FAILURE:
      return { ...state, loading: false, error: action.payload.error }
    default:
      return state
  }
}

/**
 * Actions
 */
export const Creators = {
  getPreferenceRequest: () => ({
    type: Types.GET_REQUEST,
    payload: {},
  }),

  getPreferenceSucess: data => ({
    type: Types.GET_SUCESS,
    payload: { data },
  }),

  getPreferenceFailure: error => ({
    type: Types.GET_FAILURE,
    payload: { error },
  }),
}
