import { createStore, applyMiddleware } from "redux";
import createSagaMiddleware from "redux-saga";

import reducer from "./reducers";
import mySaga from "./sagas";

import {
  composeWithDevTools
} from 'redux-devtools-extension';

// create the saga middleware
const sagaMiddleware = createSagaMiddleware();
// mount it on the Store
export default createStore(
  reducer, 
  composeWithDevTools(
    applyMiddleware(sagaMiddleware)
  )
);

// then run the saga
sagaMiddleware.run(mySaga);