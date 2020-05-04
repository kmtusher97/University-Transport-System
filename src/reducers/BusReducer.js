import {
  GET_BUSES,
  GET_BUS,
  DELETE_BUS,
  GET_AVAILABLE_BUSES
} from "../actions/types";

const initialState = {
  buses: [],
  availableBuses: [],
  bus: {}
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_BUSES:
      return {
        ...state,
        buses: action.payload
      }

    case GET_BUS:
      return {
        ...state,
        bus: action.payload
      }

    case DELETE_BUS:
      return {
        ...state,
        buses: state.buses.filter(
          bus => bus.busId !== action.payload
        )
      }

    case GET_AVAILABLE_BUSES:
      return {
        ...state,
        availableBuses: action.payload
      }

    default:
      return state;
  }
}