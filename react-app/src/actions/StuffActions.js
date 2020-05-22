import Axios from "axios";
import { GET_STUFFS_INSERVICE, DELETE_STUFF } from "./types";

export const getAllStuffsInservice = () => async dispatch => {
  const res = await Axios.get(`/api/stuff/inService/all`);
  dispatch({
    type: GET_STUFFS_INSERVICE,
    payload: res.data
  });
};

export const deleteStuff = (stuffId, history) => async dispatch => {
  if (
    window.confirm("Are you sure?")
  ) {
    try {
      await Axios.delete(`/api/stuff/remove/${stuffId}`);
      dispatch({
        type: DELETE_STUFF,
        payload: stuffId
      });

    } catch (err) {
      history.push('/stuff');
    }
  }
};