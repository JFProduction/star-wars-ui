import { call, put, takeLatest } from "redux-saga/effects";

import { 
  REQUEST_API_DATA, 
  receiveApiData, 
  REQUEST_PERSON_API, 
  receivePersonApi, 
  errorWithData
} from "./actions";

import { fetchData } from "../apis";

// worker Saga: will be fired on USER_FETCH_REQUESTED actions
function* getApiData(action) {
  try {
    // do api call
    const data = yield call(fetchData, action.payload);
    if (!data.error) {
      yield put(receiveApiData(data));
    } else {
      yield put(errorWithData(data))
    }
  } catch (e) {
    console.log(e);
  }
}

function* getPerson(action) {
  try {
    // do api call
    const data = yield call(fetchData, action.payload);

    if (!data.error) {
      yield put(receivePersonApi(data));
    } else {
      yield put(errorWithData(data))
    }
  } catch (e) {
    console.log(e);
  }
}

/*
  Alternatively you may use takeLatest.
  Does not allow concurrent fetches of user. If "USER_FETCH_REQUESTED" gets
  dispatched while a fetch is already pending, that pending fetch is cancelled
  and only the latest one will be run.
*/
export default function* mySaga() {
  yield takeLatest(REQUEST_API_DATA, getApiData);
  yield takeLatest(REQUEST_PERSON_API, getPerson);
}