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
    recommended: {
      page: 1,
      data: [],
    },
    signed: {
      page: 1,
      data: [],
    },
    notSigned: {
      page: 1,
      data: [],
    },
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
        data: { ...state.data, ...action.data.payload },
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
  searchRequest: ({
    title,
    page,
    shouldSearchSigned,
    shouldSearchNotSigned,
    shouldSearchRecommended,
  }) => ({
    type: Types.REQUEST,
    payload: {
      title: !title ? '' : title,
      page,
      shouldSearchSigned,
      shouldSearchNotSigned,
      shouldSearchRecommended,
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
