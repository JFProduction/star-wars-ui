import { 
  RECEIVE_API_DATA, 
  RECEIVE_PERSON_API, 
  ERROR_WITH_DATA 
} from "../sagas/actions";

const initialState = {
  people: {},
  selectedPerson: {},
  error: {},
  loading: false
}

export const DataReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case RECEIVE_API_DATA:
      let newState = {
        ...state,
        people: payload
      }
      console.log(newState)
      return newState;
    case RECEIVE_PERSON_API:
      return {
        ...state,
        selectedPerson: payload
      }
    case ERROR_WITH_DATA:
      return {
        ...state,
        error: payload
      }
    default:
      return state;
  }
};