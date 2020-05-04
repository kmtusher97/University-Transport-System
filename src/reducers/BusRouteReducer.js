import { GET_BUSROUTES, GET_BUSROUTE, DELETE_BUSROUTE } from "../actions/types";

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

    case GET_BUSROUTE:
      return {
        ...state,
        route: action.payload
      }

    case DELETE_BUSROUTE:
      return {
        ...state,
        routes: state.routes.filter(
          route => route.routeId !== action.payload
        )
      }

    default:
      return state;
  }
}