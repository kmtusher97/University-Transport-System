import Axios from "axios";
import { GET_ERRORS, GET_STOPPAGES } from "./types";


export const addStoppage = (stoppage, history) => async dispatch => {
  try {
    const res = await Axios.post(
      "http://localhost:8081/api/stoppage/add",
      stoppage
    );
    history.push("/stoppage");

  } catch (err) {
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    });
  }
};


export const getAllStoppages = () => async dispatch => {
  const res = await Axios.get("http://localhost:8081/api/stoppage/GLOBAL/getAll");
  dispatch({
    type: GET_STOPPAGES,
    payload: res.data
  });
};