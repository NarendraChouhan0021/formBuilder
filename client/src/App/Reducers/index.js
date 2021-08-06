import { combineReducers } from "redux";
import UserProfileDetailsReducer from "./UserProfileReducer/reducer";
// import CurrentPermitReducer from './CurrentPermitReducer/reducer'
import APIResponseReducer from "./APIResponseReducer/reducer";
// import DashBoardReducer from './DashBoardReducer/reducer'
// import ResidentReducer from './ResidentReducer/reducer'

import { connectRouter } from "connected-react-router";

const rootReducer = (history) =>
  combineReducers({
    router: connectRouter(history),
    UserProfileDetails: UserProfileDetailsReducer,
    // CurrentPermitDatils: CurrentPermitReducer,
    // DashBoardDatils: DashBoardReducer,
    APIResponseDatils: APIResponseReducer,
    // ResidenDetails: ResidentReducer,
  });

export default rootReducer;
