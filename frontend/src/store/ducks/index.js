import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'
import history from '../../routes/history'

import auth from './auth'
import user from './user'
import meetup from './meetup'
import search from './search'

export default combineReducers({
  router: connectRouter(history),
  auth,
  user,
  meetup,
  search,
})
