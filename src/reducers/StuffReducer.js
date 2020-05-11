import { GET_STUFFS_INSERVICE, DELETE_STUFF } from '../actions/types';

const initialState = {
  stuffs: [],
  stuff: {}
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_STUFFS_INSERVICE:
      return {
        ...state,
        stuffs: action.payload
      }

    case DELETE_STUFF:
      return {
        ...state,
        stuffs: state.stuffs.filter(
          stuff => stuff.stuffId !== action.payload
        )
      }

    default:
      return state;
  }
}
