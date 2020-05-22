import { GET_STOPPAGES, GET_STOPPAGE, DELETE_STOPPAGE } from "../actions/types";

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

    case GET_STOPPAGE:
      return {
        ...state,
        stoppage: action.payload
      }

    case DELETE_STOPPAGE:
      return {
        ...state,
        stoppages: state.stoppages.filter(
          stoppage => stoppage.stoppageId !== action.payload
        )
      }

    default:
      return state;
  }
}