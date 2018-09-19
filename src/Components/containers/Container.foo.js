import React from 'react'
import {mount} from 'enzyme'
import {shallowToJson} from 'enzyme-to-json'
import Container from './Container';

import resp from '../../../__mocks__/MockResult'

describe("container tests", () => {
  let wrapper

  beforeAll(() => {
    window.fetch = jest.fn(() => Promise.resolve({
      json: () => Promise.resolve(resp)
    }))

    wrapper = mount(
      <Container />
    )
  })

  describe("render tests", () => {
    it("should match snapshot", () => {
      expect(shallowToJson(wrapper)).toMatchSnapshot()
    })

    it("should show loading", () => {
      expect(wrapper.find("Loading")).toHaveLength(1)
    })

    it("should show cards after fetch is done", () => {
      window.fetch()
        .then(() => {})
        .then(() => {
          wrapper.update()
          expect(wrapper.find("Loading")).toHaveLength(0)
          expect(wrapper.find("MainCard")).toHaveLength(10)
        })
    })
  })

  describe("functionality tests", () => {
    it("should click a card", () => {
      expect(wrapper.state().selectedPerson.films).toBe(undefined)

      wrapper.find("MainCard").forEach((node, i) => {
        if (i === 0) {
          node.simulate("click")
          window.fetch()
            .then(() => {})
            .then(() => {
              wrapper.update()
              expect(wrapper.state().selectedPerson).toBe(resp.results[0])
            })
        }
      })
    })
  })
})