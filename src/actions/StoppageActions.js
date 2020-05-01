import { GET_ERRORS } from "./types";
import Axios from "axios";


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