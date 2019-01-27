import React from 'react'
import { shallow } from 'enzyme'
import { shallowToJson } from 'enzyme-to-json'

import { Container } from './Container'
import resp from '../../../__mocks__/MockResult'

describe("container tests", () => {
  let wrapper
  const api = jest.fn(),
        remove = jest.fn()

  beforeAll(() => {
    wrapper = shallow(
      <Container
        people={resp}
        requestApi={api}
        removePerson={remove}
        selectedPerson={{}}
      />
    )
  })

  describe("render tests", () => {
    it("should match snapshot", () => {
      expect(shallowToJson(wrapper)).toMatchSnapshot()
    })
  
    it("should render 10 main cards", () => {
      expect(wrapper.find("Connect(Layout)")).toHaveLength(10)
    })

    it("should have a modal", () => {
      const tmp = shallow(
        <Container
          people={resp}
          requestApi={api}
          removePerson={remove}
          selectedPerson={resp.results[0]}
        />
      )

      expect(shallowToJson(tmp)).toMatchSnapshot()
    })
  })

  describe("funcitonality tests", () => {
    it("should call remove", () => {
      wrapper.instance().handleClose()
      expect(remove).toHaveBeenCalled()
    })

    it("should call api", () => {
      wrapper.instance().clickNextPrev(1)()
      expect(api).toHaveBeenCalledWith("https://swapi.co/api/people")
    })

    it("should call api", () => {
      wrapper.instance().clickNextPrev("")()
      expect(api).toHaveBeenCalledWith("https://swapi.co/api/people")
    })

    it("should call api as well", () => {
      wrapper.instance().componentDidMount()
      expect(api).toHaveBeenCalledWith("https://swapi.co/api/people")
    })

    it("should update layout to 'list'", () => {
      expect(wrapper.state().layout).toEqual("card")
      wrapper.instance().handleClickViewType({target: {id:"list"}})
      expect(wrapper.state().layout).toEqual("list")
      expect(wrapper.find("ListHeader")).toHaveLength(1)
    })
  })
})