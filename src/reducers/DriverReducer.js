import { GET_DRIVERS_INSERVICE } from '../actions/types';

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

    default:
      return state;
  }
}