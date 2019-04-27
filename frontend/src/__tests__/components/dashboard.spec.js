import React from 'react'
import { mount } from 'enzyme'
import { Provider } from 'react-redux'
import createStore from 'redux-mock-store'

import Dashboard from '../../pages/dashboard'

const mockStore = createStore()
const INITIAL_STATE = {
  search: { data: { recommended: [1, 2, 3] } },
}

const store = mockStore(INITIAL_STATE)
describe('Dashboard', () => {
  it('should be able to mount component', () => {
    const wrapper = mount(
      <Provider store={store}>
        <Dashboard />
      </Provider>,
    )
  })
})
