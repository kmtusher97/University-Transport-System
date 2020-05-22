import { GET_FEEDBACKS, DELETE_FEEDBACK } from '../actions/types';

const initialState = {
  feedbacks: []
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_FEEDBACKS:
      return {
        ...state,
        feedbacks: action.payload
      }

    case DELETE_FEEDBACK:
      return {
        ...state,
        feedbacks: state.feedbacks.filter(
          feedback => feedback.feedbackId !== action.payload
        )
      }

    default:
      return state;
  }
}