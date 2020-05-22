import { GET_ANNOUNCEMENTS, DELETE_ANNOUNCEMENT } from '../actions/types';

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

    case DELETE_ANNOUNCEMENT:
      return {
        ...state,
        announcements: state.announcements.filter(
          announcement => announcement.announcementId !== action.payload
        )
      }

    default:
      return state;
  }
}