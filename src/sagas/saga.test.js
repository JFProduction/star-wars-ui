import { cloneableGenerator } from 'redux-saga/utils'
import {call, takeLatest, all, put} from 'redux-saga/effects'
import mySaga, { getApiData } from './index'
import {
  requestApiData,
  selectPersonFromCard,
  SELECTED_PERSON,
  REQUEST_API_DATA,
  REQUEST_PERSON_API,
  receiveApiData,
  requestPersonApi,
  receivePersonApi,
  errorWithData
} from './actions'
import { fetchData } from '../apis'

describe("saga tests", () => {
  it("should set selectedPerson to person, when calling seletedPersonFromCard", () => {
    const person = {name: "zach", age: 28}
    expect(selectPersonFromCard(person)).toEqual({
      type: SELECTED_PERSON,
      payload: person
    })
  })

  describe("get request saga", () => {
    const url = "foo.com"
    const getAction = requestApiData(url)
    const generator = cloneableGenerator(getApiData)(getAction)

    it("should call all with two takeLatest effects", () => {
      const generator = cloneableGenerator(mySaga)(jest.fn())
      expect(generator.next().value).toEqual(all([
        takeLatest(REQUEST_API_DATA, expect.any(Function)),
        takeLatest(REQUEST_PERSON_API, expect.any(Function))
      ]))
    })

    it("should call api and get people back", () => {
      const result = generator.next().value
      expect(result).toEqual(call(fetchData, url))
    })

    it("should call put receiveApiData of object", () => {
      const result = generator.next({foo: "bar"}).value
      expect(result).toEqual(put(receiveApiData({foo: "bar"})))
    })

    it("performs no other tasks", () => {
      const result = generator.next().done
      expect(result).toEqual(true)
    })
  })

  describe("get person test", () => {
    const url = "foo.com"
    const getAction = requestPersonApi(url)
    const generator = cloneableGenerator(getApiData)(getAction)

    it("should call api with the given url", () => {
      const result = generator.next().value
      expect(result).toEqual(call(fetchData, url))
    })

    it("should call receievePersonApi with person", () => {
      const tmp = {results: [{foo: "bar"}]}
      const result = generator.next(tmp).value
      expect(result).toEqual(put(receivePersonApi(tmp.results[0])))
    })
  })

  describe("get person failure", () => {
    const getAction = requestPersonApi("")
    const generator = cloneableGenerator(getApiData)(getAction)

    it("should return an error", () => {
      generator.next()
      const tmpErr = {error: true, err: {message: "error"}}
      const result = generator.next(tmpErr).value
      expect(result).toEqual(put(errorWithData(tmpErr)))
    })
  })
})