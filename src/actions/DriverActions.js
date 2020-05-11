import Axios from 'axios';
import {
  GET_DRIVERS_INSERVICE,
  GET_ERRORS,
  DELETE_DRIVER
} from './types';

export const getAllDriversInservice = () => async dispatch => {
  const res = await Axios.get(`/api/driver/inService/all`);
  dispatch({
    type: GET_DRIVERS_INSERVICE,
    payload: res.data
  });
};

export const addNewDriverOrStuff = (user, reqType, history) => async dispatch => {
  try {
    await Axios.post(`/api/user/register/${reqType}`, user);
    dispatch({
      type: GET_ERRORS,
      payload: {}
    });
    history.push(`/${reqType}`);

  } catch (err) {
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    });
  }
};

export const deleteDriver = (driverId, history) => async dispatch => {
  if (
    window.confirm("Are you sure?")
  ) {
    try {
      await Axios.delete(`/api/driver/remove/${driverId}`);
      dispatch({
        type: DELETE_DRIVER,
        payload: driverId
      });
    } catch (err) {
      history.push('/driver');
    }
  }
};