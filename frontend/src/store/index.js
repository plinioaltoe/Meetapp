import { createStore, compose, applyMiddleware } from 'redux'
import { connectRouter, routerMiddleware } from 'connected-react-router'
import createSagaMiddleware from 'redux-saga'
import history from '../routes/history'
import sagas from './sagas'
import reducers from './ducks'

const middlewares = []

const sagaMonitor = process.env.NODE_ENV === 'development' ? console.tron.createSagaMonitor() : null
const sagaMiddleware = createSagaMiddleware({ sagaMonitor })

middlewares.push(sagaMiddleware)
middlewares.push(routerMiddleware(history))

const tronMiddleware = process.env.NODE_ENV === 'development' ? console.tron.createEnhancer : () => {}

const store = createStore(
  connectRouter(history)(reducers),
  compose(
    applyMiddleware(...middlewares),
    tronMiddleware(),
  ),
)

sagaMiddleware.run(sagas)

export default store
