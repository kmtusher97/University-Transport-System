import Axios from 'axios';
import { GET_USERS } from './types';

export const getAllUsers = () => async dispatch => {
  const res = await Axios.get('/api/user/all');
  dispatch({
    type: GET_USERS,
    payload: res.data
  });
};