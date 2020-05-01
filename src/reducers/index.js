import { combineReducers } from "redux";
import ErrorReducer from "./ErrorReducer";

export default combineReducers({
  errors: ErrorReducer
});