import { combineReducers } from "redux";
import ErrorReducer from "./ErrorReducer";
import StoppageReducer from "./StoppageReducer";
import BusReducer from "./BusReducer";
import ScheduleReducer from "./ScheduleReducer";

export default combineReducers({
  errors: ErrorReducer,
  stoppage: StoppageReducer,
  bus: BusReducer,
  schedule: ScheduleReducer
});