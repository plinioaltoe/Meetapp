import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'
import history from '../../routes/history'
import repository from './repository'
import auth from './auth'
import user from './user'
import preference from './preference'
import meetup from './meetup'

export default combineReducers({
  router: connectRouter(history),
  repository,
  auth,
  user,
  preference,
  meetup,
})
