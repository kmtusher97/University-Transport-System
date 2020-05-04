import Axios from "axios";
import { GET_ERRORS } from "./types";

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