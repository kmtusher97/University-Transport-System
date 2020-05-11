import Axios from 'axios';
import { GET_ANNOUNCEMENTS, GET_ERRORS } from './types';

export const create = (announcement, history) => async dispatch => {
  try {
    await Axios.post('/api/announcement/add', announcement);
    dispatch({
      type: GET_ERRORS,
      payload: {}
    });
    history.push('/notice');
  } catch (err) {
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    });
  }
};

export const getAll = () => async dispatch => {
  const res = await Axios.get('/api/announcement/GLOBAL/all');
  let announcements = res.data;
  announcements.sort(function (a, b) { return new Date(b.date) - new Date(a.date) });
  dispatch({
    type: GET_ANNOUNCEMENTS,
    payload: announcements
  });
};