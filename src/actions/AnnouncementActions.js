import Axios from 'axios';
import { GET_ANNOUNCEMENTS } from './types';

export const getAll = () => async dispatch => {
  const res = await Axios.get('/api/announcement/GLOBAL/all');
  let announcements = res.data;
  announcements.sort(function (a, b) { return new Date(b.date) - new Date(a.date) });
  dispatch({
    type: GET_ANNOUNCEMENTS,
    payload: announcements
  });
};