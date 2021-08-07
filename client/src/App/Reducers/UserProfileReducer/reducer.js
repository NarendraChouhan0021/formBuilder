import t from "../../Actions/UserProfileActions/types";

const UserReducer = (state = {}, action) => {
  switch (action.type) {
    case t.FETCH_USERPROFILE:
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
};

export default UserReducer;
