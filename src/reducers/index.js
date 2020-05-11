import { combineReducers } from "redux";
import ErrorReducer from "./ErrorReducer";
import StoppageReducer from "./StoppageReducer";
import BusReducer from "./BusReducer";
import ScheduleReducer from "./ScheduleReducer";
import BusRouteReducer from "./BusRouteReducer";
import DriverReducer from "./DriverReducer";
import StuffReducer from "./StuffReducer";
import AnnouncementReducer from "./AnnouncementReducer";
import FeedbackReducer from "./FeedbackReducer";

export default combineReducers({
  errors: ErrorReducer,
  stoppage: StoppageReducer,
  bus: BusReducer,
  busRoute: BusRouteReducer,
  schedule: ScheduleReducer,
  driver: DriverReducer,
  stuff: StuffReducer,
  announcement: AnnouncementReducer,
  feedback: FeedbackReducer
});