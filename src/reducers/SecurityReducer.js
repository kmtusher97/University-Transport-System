import { SET_CURRENT_USER } from '../actions/types';

const initialSate = {
  user: {},
  isValidToken: false
};

export default function (state = initialSate, action) {
  switch (action.type) {
    case SET_CURRENT_USER:
      return {
        ...state,
        isValidToken: action.payload ? true : false,
        user: action.payload
      }

    default:
      return state;
  }
}