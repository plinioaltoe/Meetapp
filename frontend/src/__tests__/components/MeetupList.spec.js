import React from 'react'
import { shallow } from 'enzyme'
import MockRouter from 'react-mock-router'

import MeetupList from '../../components/MeetupList'
import { mockedPropTypes } from '../../__mocks__/mockedPropTypes'

const push = jest.fn()

describe('MeetupList', () => {
  it('should be able to mount component', () => {
    const wrapper = shallow(
      <MockRouter push={push}>
        <MeetupList {...mockedPropTypes} />
      </MockRouter>,
    )
    const wrapperInside = wrapper.dive()
    wrapperInside.instance().componentWillReceiveProps(mockedPropTypes)
    wrapperInside.update()
    expect(wrapperInside.instance().state.preparedList.length).toBe(3)
    expect(wrapperInside.find('#first').length).toBe(1)
    expect(wrapperInside.find('#prev').length).toBe(1)
    expect(wrapperInside.find('#next').length).toBe(1)
    expect(wrapperInside.find('#last').length).toBe(1)
    expect(wrapperInside.find('#card').length).toBe(3)
  })

  it('should be able to paginate', () => {
    const wrapper = shallow(
      <MockRouter push={push}>
        <MeetupList {...mockedPropTypes} />
      </MockRouter>,
    )
    const wrapperInside = wrapper.dive()
    wrapperInside.find('#first').simulate('click')
    expect(mockedPropTypes.handlePaginate).toHaveBeenCalled()
    wrapperInside.find('#prev').simulate('click')
    expect(mockedPropTypes.handlePaginate).toHaveBeenCalled()
    wrapperInside.find('#next').simulate('click')
    expect(mockedPropTypes.handlePaginate).toHaveBeenCalled()
    wrapperInside.find('#last').simulate('click')
    expect(mockedPropTypes.handlePaginate).toHaveBeenCalled()
  })
})
