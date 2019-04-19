import React from 'react'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'

import './config/reactotron'
import { store, persistor } from './store'

import Routes from './routes'

import GlobalStyle from './styles/global'

const App = () => (
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <GlobalStyle />
      <Routes />
    </PersistGate>
  </Provider>
)

export default App
