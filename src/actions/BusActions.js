import Axios from "axios";
import { GET_ERRORS, GET_BUSES, GET_BUS, DELETE_BUS } from "./types";

export const addBus = (bus, reqType, history) => async dispatch => {
  try {
    await Axios.post(`/api/bus/${reqType}`, bus);
    history.push("/bus");
    dispatch({
      type: GET_ERRORS,
      payload: {}
    });
  } catch (err) {
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    });
  }
};

export const getAllBuses = () => async dispatch => {
  const res = await Axios.get(`/api/bus/all`);
  dispatch({
    type: GET_BUSES,
    payload: res.data
  });
};

export const getBus = (busId, history) => async dispatch => {
  try {
    const res = await Axios.get(`/api/bus/GLOBAL/${busId}`);
    dispatch({
      type: GET_BUS,
      payload: res.data
    });
  } catch (err) {
    history.push("/bus");
  }
};

export const deleteBus = (busId, history) => async dispatch => {
  if (
    window.confirm("Are you sure?")
  ) {
    try {
      await Axios.delete(`/api/bus/${busId}`);
      dispatch({
        type: DELETE_BUS,
        payload: busId
      });
    } catch (err) {
      history.push("/bus");
    }
  }
};