import { GET_SCHEDULES, GET_SCHEDULE, DELETE_SCHEDULE } from "../actions/types";

const initialSate = {
  schedules: [],
  schedule: {}
};

export default function (state = initialSate, action) {
  switch (action.type) {
    case GET_SCHEDULES:
      return {
        ...state,
        schedules: action.payload
      }

    case GET_SCHEDULE:
      return {
        ...state,
        schedule: action.payload
      }

    case DELETE_SCHEDULE:
      return {
        ...state,
        schedules: state.schedules.filter(
          schedule => schedule.scheduleId !== action.payload
        )
      }

    default:
      return state;
  }
}