import { GET_DRIVERS_INSERVICE, DELETE_DRIVER } from '../actions/types';

const initialState = {
  drivers: [],
  driver: {}
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_DRIVERS_INSERVICE:
      return {
        ...state,
        drivers: action.payload
      }

    case DELETE_DRIVER:
      return {
        ...state,
        drivers: state.drivers.filter(
          driver => driver.driverId !== action.payload
        )
      }

    default:
      return state;
  }
}