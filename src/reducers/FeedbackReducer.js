import { GET_FEEDBACKS, DELETE_FEEDBACK } from '../actions/types';

const initialState = {
  feadbacks: []
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_FEEDBACKS:
      return {
        ...state,
        feadbacks: action.payload
      }

    case DELETE_FEEDBACK:
      return {
        ...state,
        feadbacks: state.feadbacks.filter(
          feadback => feadback.feadbackId !== action.payload
        )
      }

    default:
      return state;
  }
}