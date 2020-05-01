import Axios from "axios";
import { GET_ERRORS, GET_STOPPAGES, GET_STOPPAGE, DELETE_STOPPAGE } from "./types";


export const addStoppage = (stoppage, reqType, history) => async dispatch => {
  try {
    await Axios.post(`http://localhost:8081/api/stoppage/${reqType}`, stoppage
    );
    history.push("/stoppage");
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


export const getAllStoppages = () => async dispatch => {
  const res = await Axios.get(`http://localhost:8081/api/stoppage/GLOBAL/getAll`);
  dispatch({
    type: GET_STOPPAGES,
    payload: res.data
  });
};


export const getStoppageById = (stoppageId, history) => async dispatch => {
  try {
    const res = await Axios.get(`http://localhost:8081/api/stoppage/GLOBAL/get/${stoppageId}`);
    dispatch({
      type: GET_STOPPAGE,
      payload: res.data
    });

  } catch (err) {
    history.push("/stoppage");
  }
};


export const deleteStoppage = (stoppageId, history) => async dispatch => {
  try {
    await Axios.delete(`http://localhost:8081/api/stoppage/delete/${stoppageId}`);
    dispatch({
      type: DELETE_STOPPAGE,
      payload: stoppageId
    });
  } catch (err) {
    history.push("/schedule");
  }
};