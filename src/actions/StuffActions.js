import Axios from "axios";
import { GET_STUFFS_INSERVICE } from "./types";

export const getAllStuffsInservice = () => async dispatch => {
  const res = await Axios.get(`/api/stuff/inService/all`);
  dispatch({
    type: GET_STUFFS_INSERVICE,
    payload: res.data
  });
};