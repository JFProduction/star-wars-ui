import { createStore, applyMiddleware } from "redux";
import createSagaMiddleware from "redux-saga";

import {DataReducer} from "./reducers/data";
import mySaga from "./sagas";

import {
  composeWithDevTools
} from 'redux-devtools-extension';

// create the saga middleware
const sagaMiddleware = createSagaMiddleware();
// mount it on the Store
export default createStore(
  DataReducer, 
  composeWithDevTools(
    applyMiddleware(sagaMiddleware)
  )
);

// then run the saga
sagaMiddleware.run(mySaga);