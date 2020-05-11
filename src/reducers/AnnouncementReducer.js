import { GET_ANNOUNCEMENTS } from '../actions/types';

const initialState = {
  announcements: []
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_ANNOUNCEMENTS:
      return {
        ...state,
        announcements: action.payload
      }

    default:
      return state;
  }
}