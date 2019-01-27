import React from 'react'
import {shallow} from 'enzyme'
import {shallowToJson} from 'enzyme-to-json'

import {SearchStuff} from './SearchStuff'

describe("search tests", () => {
  let wrapper

  const requestPerson = jest.fn()

  beforeAll(() => {
    wrapper = shallow(
      <SearchStuff 
        requestPerson={requestPerson}
      />
    )
  })

  describe("render tests", () => {
    it("should match snapshot", () => {
      expect(shallowToJson(wrapper)).toMatchSnapshot();
    })
  })
})