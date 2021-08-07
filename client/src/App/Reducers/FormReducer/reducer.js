import t from "../../Actions/FormActions/types";
const intitialState = {
  forms: [],
  formCreate: {},
  formData: {},
  editform: {},
  submitRes: {},
  resData: [],
};

const FormReducer = (state = intitialState, action) => {
  switch (action.type) {
    case t.GET_FORMS:
      return {
        ...state,
        forms: action.payload,
      };
    case t.CREATE_FORMS:
      return {
        ...state,
        formCreate: action.payload,
      };
    case t.GET_FORM:
      return {
        ...state,
        editform: action.payload,
      };
    case t.SUBMIT_RESPONSE:
      return {
        ...state,
        submitRes: action.payload,
      };
    case t.GET_RESPONSE:
      return {
        ...state,
        resData: action.payload,
      };
    default:
      return state;
  }
};

export default FormReducer;
