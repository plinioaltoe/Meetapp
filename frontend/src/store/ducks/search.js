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
        // data: {
        //   recommended: [...state.data.recommended, action.payload.data.recommended].sort(
        //     (a, b) => a.event_date - b.event_date,
        //   ),
        //   signed: [...state.data.signed, action.payload.data.signed].sort(
        //     (a, b) => a.event_date - b.event_date,
        //   ),
        //   notSigned: [...state.data.notSigned, action.payload.data.notSigned].sort(
        //     (a, b) => a.event_date - b.event_date,
        //   ),
        // },
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
  searchRequest: ({ title }) => ({
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
