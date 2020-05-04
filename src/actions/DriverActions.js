import Axios from 'axios';
import { GET_DRIVERS_INSERVICE } from './types';

export const getAllDriversInservice = () => async dispatch => {
  const res = await Axios.get(`/api/driver/inService/all`);
  dispatch({
    type: GET_DRIVERS_INSERVICE,
    payload: res.data
  });
};