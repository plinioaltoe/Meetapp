/**
 * Types
 */

export const Types = {
  ADD_REQUEST: 'file/ADD_REQUEST',
  ADD_SUCESS: 'file/ADD_SUCESS',
  ADD_FAILURE: 'file/ADD_FAILURE',
  RM_SUCESS: 'file/RM_SUCESS',
}

/**
 * Reducers
 */
const INITIAL_STATE = {
  loading: false,
  data: [],
  error: null,
}

export default function file(state = INITIAL_STATE, action) {
  switch (action.type) {
    case Types.ADD_REQUEST:
      return { ...state, loading: true }
    case Types.ADD_SUCESS:
      return {
        ...state,
        loading: false,
        error: null,
        data: action.payload.data,
      }
    case Types.ADD_FAILURE:
      return { ...state, loading: false, error: action.payload.error }

    default:
      return state
  }
}

/**
 * Actions
 */
export const Creators = {
  addFileRequest: ({ fileToUpload }) => ({
    type: Types.ADD_REQUEST,
    payload: { fileToUpload },
  }),

  addFileSuccess: data => ({
    type: Types.ADD_SUCESS,
    payload: { data },
  }),

  addFileFailure: error => ({
    type: Types.ADD_FAILURE,
    payload: { error },
  }),
}
