import { GET_ERROR, GET_REQUEST, GET_SUCCESS } from "./actionType";

const initialState = {
  subData: [],
  isLoading: false,
  isError: false,
};

export const subReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_REQUEST:
      return {
        ...state,
        isLoading: true,
        isError: false,
      };
    case GET_ERROR:
      return {
        ...state,
        isLoading: false,
        isError: true,
      };
    case GET_SUCCESS:
      return {
        ...state,
        subData: action.payload,
        isLoading: false,
        isError: false,
      };
    default:
      return state;
  }
};

export default subReducer; 
