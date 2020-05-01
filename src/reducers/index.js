import { combineReducers } from "redux";
import ErrorReducer from "./ErrorReducer";
import StoppageReducer from "./StoppageReducer";

export default combineReducers({
  errors: ErrorReducer,
  stoppage: StoppageReducer
});