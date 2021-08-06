import t from "../../Actions/APIResponseActions/type";

const intitialState = {
  api_response: true,
  api_error_message: "",
};

const APIResponseReducer = (state = intitialState, action) => {
  switch (action.type) {
    case t.API_RESPONSE_SUCCESS:
      return {
        ...state,
        api_response: true,
        api_error_message: "",
      };
    case t.API_RESPONSE_FAILURE:
      return {
        ...state,
        api_response: false,
        api_error_message: action.payload,
      };
    default:
      return state;
  }
};

export default APIResponseReducer;
