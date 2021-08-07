import { combineReducers } from "redux";
import UserProfileDetailsReducer from "./UserProfileReducer/reducer";
import { connectRouter } from "connected-react-router";

const rootReducer = (history) =>
  combineReducers({
    router: connectRouter(history),
    UserProfileDetails: UserProfileDetailsReducer,
  });

export default rootReducer;
