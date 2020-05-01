import { GET_STOPPAGES } from "../actions/types";

const initialState = {
  stoppages: [],
  stoppage: {}
};


export default function (state = initialState, action) {
  switch (action.type) {
    case GET_STOPPAGES:
      return {
        ...state,
        stoppages: action.payload
      };

    default:
      return state;
  }
}