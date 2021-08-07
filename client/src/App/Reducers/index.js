import { combineReducers } from "redux";
import UserProfileDetailsReducer from "./UserProfileReducer/reducer";
import FormReducer from "./FormReducer/reducer";
import { connectRouter } from "connected-react-router";

const rootReducer = (history) =>
  combineReducers({
    router: connectRouter(history),
    UserProfileDetails: UserProfileDetailsReducer,
    Forms: FormReducer,
  });

export default rootReducer;
