import Axios from "axios";
import { GET_ERRORS, GET_BUSES, GET_BUS } from "./types";

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
  let buses = [];
  res.data.map(bus => {
    let tmpBus = {
      busId: bus.busId,
      number: bus.number,
      oilTankCapacity: bus.oilTankCapacity,
      gasCylinderCapacity: bus.gasCylinderCapacity,
      isAvailable: bus.isAvailable,
      schedules: [],
      busReports: []
    };
    buses.push(tmpBus);
  })
  dispatch({
    type: GET_BUSES,
    payload: buses
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