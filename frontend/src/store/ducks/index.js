import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'
import history from '../../routes/history'
import file from './file'
import auth from './auth'
import user from './user'
import preference from './preference'
import meetup from './meetup'

export default combineReducers({
  router: connectRouter(history),
  file,
  auth,
  user,
  preference,
  meetup,
})
