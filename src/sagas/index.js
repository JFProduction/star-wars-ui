import { call, put, takeLatest, all } from "redux-saga/effects";

import { 
  REQUEST_API_DATA, 
  receiveApiData, 
  REQUEST_PERSON_API, 
  receivePersonApi, 
  errorWithData,
} from "./actions";

import { fetchData } from "../apis";

// worker Saga: will be fired on USER_FETCH_REQUESTED actions
function* getApiData(action) {
  try {
    // do api call
    const data = yield call(fetchData, action.payload);
    if (!data.error) {
      if (action.type === REQUEST_API_DATA) {
        yield put(receiveApiData(data));
      } else if (action.type === REQUEST_PERSON_API) {
        yield put(receivePersonApi(data.results[0]))
      }
    } else {
      yield put(errorWithData(data))
    }
  } catch (e) {
    console.log(e);
  }
}

export default function* mySaga() {
  yield all([
    takeLatest(REQUEST_API_DATA, getApiData),
    takeLatest(REQUEST_PERSON_API, getApiData)
  ])
}