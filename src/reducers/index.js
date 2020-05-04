import { combineReducers } from "redux";
import ErrorReducer from "./ErrorReducer";
import StoppageReducer from "./StoppageReducer";
import BusReducer from "./BusReducer";
import ScheduleReducer from "./ScheduleReducer";
import BusRouteReducer from "./BusRouteReducer";

export default combineReducers({
  errors: ErrorReducer,
  stoppage: StoppageReducer,
  bus: BusReducer,
  busRoute: BusRouteReducer,
  schedule: ScheduleReducer
});