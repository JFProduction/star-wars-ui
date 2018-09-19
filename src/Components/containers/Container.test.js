import React from 'react'
import { mount } from 'enzyme'
import { shallowToJson } from 'enzyme-to-json'

import Container from './Container'
import { Provider } from 'react-redux'
import store from '../../store'
import resp from '../../../__mocks__/MockResult'

describe("container tests", () => {
  let wrapper

  beforeAll(() => {
    window.fetch = jest.fn(() => Promise.resolve({
      json: () => Promise.resolve(resp)
    }))

    wrapper = mount(
      <Provider store={store}>
        <Container />
      </Provider>
    )
  })

  it("should match snapshot", done => {
    setTimeout(() => {
      wrapper.update()
      expect(shallowToJson(wrapper)).toMatchSnapshot()
      done()
    }, 0)
  })

  it("should render 10 main cards", () => {
    expect(wrapper.find("MainCard")).toHaveLength(10)
  })

  // TODO: Figure this out...
  // it("should change state.layout to list", () => {
  //   expect(wrapper.state().layout).toEqual("card")
  //   wrapper.find("img[id='list']").simulate("click")
  //   wrapper.update()
  //   expect(wrapper.state().layout).toEqual("list")
  // })
})