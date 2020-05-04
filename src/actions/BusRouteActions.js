import Axios from "axios";
import { GET_ERRORS, GET_BUSROUTES, DELETE_BUSROUTE, GET_BUSROUTE } from "./types";

export const addBusRoute = (busRoute, history) => async dispatch => {
  try {
    await Axios.post(`/api/route/add`, busRoute);
    history.push("/route");
    dispatch({
      type: GET_ERRORS,
      payload: {}
    });

  } catch (err) {
    dispatch({
      type: GET_ERRORS,
      payload: err.respose.data
    });
  }
};

export const getBusRoutes = () => async dispatch => {
  const res = await Axios.get(`/api/route/GLOBAL/all`);
  res.data.sort(function (a, b) { return a.routeId - b.routeId; })
  dispatch({
    type: GET_BUSROUTES,
    payload: res.data
  });
};

export const getBusRoute = (routeId, history) => async dispatch => {
  try {
    const res = await Axios.get(`/api/route/GLOBAL/${routeId}`);
    dispatch({
      type: GET_BUSROUTE,
      payload: res.data
    });
  } catch (err) {
    history.push("/route");
  }
};

export const deleteBusRoute = (routeId, history) => async dispatch => {
  try {
    await Axios.delete(`/api/route/${routeId}`);
    dispatch({
      type: DELETE_BUSROUTE,
      payload: routeId
    });
  } catch (err) {
    history.push("/route");
  }
};