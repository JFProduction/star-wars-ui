import { createStore, applyMiddleware } from "redux"
import createSagaMiddleware from "redux-saga"

import {DataReducer} from "./reducers/data"
import mySaga from "./sagas"


// create the saga middleware
const sagaMiddleware = createSagaMiddleware()
// mount it on the Store
export default createStore(
  DataReducer,
  applyMiddleware(sagaMiddleware)
)

// then run the saga
sagaMiddleware.run(mySaga)