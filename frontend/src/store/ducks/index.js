import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'
import history from '../../routes/history'

import auth from './auth'
import user from './user'
import preference from './preference'
import meetup from './meetup'

export default combineReducers({
  router: connectRouter(history),
  auth,
  user,
  preference,
  meetup,
})
