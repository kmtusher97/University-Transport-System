import { GET_STUFFS_INSERVICE } from '../actions/types';

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

    default:
      return state;
  }
}
