import { GET_BUSES, GET_BUS, DELETE_BUS } from "../actions/types";

const initialState = {
  buses: [],
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

    default:
      return state;
  }
}