import React from 'react'
import { mount } from 'enzyme'
import { Provider } from 'react-redux'
import createStore from 'redux-mock-store'
import MockRouter from 'react-mock-router'
import { INITIAL_STATE } from '../../__mocks__/initialState'
import Dashboard from '../../pages/dashboard'
import { Creators as SearchActions } from '../../store/ducks/search'

const push = jest.fn()

const mockStore = createStore()

const mockedPropTypes = {
  location: { pathname: '/search' },
  searchRequest: jest.fn(),
  searchSuccess: jest.fn(),
  searchFailure: jest.fn(),
}

const store = mockStore(INITIAL_STATE)

describe('Dashboard', () => {
  it('should be able to mount component', () => {
    const wrapper = mount(
      <Provider store={store}>
        <MockRouter push={push}>
          <Dashboard {...mockedPropTypes} />
        </MockRouter>
      </Provider>,
    )

    expect(wrapper.find('Header').length).toBe(1)
  })

  it('should be able to search', () => {
    const wrapper = mount(
      <Provider store={store}>
        <MockRouter push={push}>
          <Dashboard {...mockedPropTypes} />
        </MockRouter>
      </Provider>,
    )
    const wrapperInside = wrapper.find('Dashboard')
    const title = 'teste'
    wrapperInside.setState({ title })
    wrapperInside.find('#search').simulate('submit')

    expect(store.getActions()).toContainEqual(
      SearchActions.searchRequest({ title, page: 1, route: 'all' }),
    )
  })
})
