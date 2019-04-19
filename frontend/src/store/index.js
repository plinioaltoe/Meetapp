import { createStore, compose, applyMiddleware } from 'redux'
import { connectRouter, routerMiddleware } from 'connected-react-router'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
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

const persistConfig = {
  key: 'root',
  storage,
}

const persistedReducer = persistReducer(persistConfig, reducers)

const store = createStore(
  connectRouter(history)(persistedReducer),
  compose(
    applyMiddleware(...middlewares),
    tronMiddleware(),
  ),
)

const persistor = persistStore(store)

sagaMiddleware.run(sagas)

export { store, persistor }
