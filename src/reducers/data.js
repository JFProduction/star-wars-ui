import { 
  RECEIVE_API_DATA, 
  RECEIVE_PERSON_API, 
  ERROR_WITH_DATA, 
  REMOVE_PERSON,
  SELECTED_PERSON,
  LOADING
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
    case REMOVE_PERSON:
      return {
        ...state,
        selectedPerson: {}
      }
    case SELECTED_PERSON:
      return {
        ...state,
        selectedPerson: payload
      }
    case LOADING:
      return {
        ...state,
        loading: payload
      }
    default:
      return state;
  }
};