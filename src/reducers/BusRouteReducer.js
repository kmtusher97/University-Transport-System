import { GET_BUSROUTES } from "../actions/types";

const initailState = {
  routes: [],
  route: {}
};

export default function (state = initailState, action) {
  switch (action.type) {
    case GET_BUSROUTES:
      return {
        ...state,
        routes: action.payload
      }

    default:
      return state;
  }
}