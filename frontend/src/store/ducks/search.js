/**
 * Types
 */

export const Types = {
  REQUEST: 'search/REQUEST',
  SUCCESS: 'search/SUCCESS',
  FAILURE: 'search/FAILURE',
}

/**
 * Reducers
 */
const INITIAL_STATE = {
  loading: false,
  data: {
    recommended: [],
    signed: [],
    notSigned: [],
  },
  error: '',
}

export default function search(state = INITIAL_STATE, action) {
  switch (action.type) {
    case Types.REQUEST:
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
  searchRequest: title => ({
    type: Types.REQUEST,
    payload: {
      title: !title ? '' : title,
    },
  }),

  searchSuccess: data => ({
    type: Types.SUCCESS,
    payload: { data },
  }),

  searchFailure: error => ({
    type: Types.FAILURE,
    payload: { error },
  }),
}
