import Axios from "axios";
import {
  GET_ERRORS,
  GET_SCHEDULES,
  GET_SCHEDULE,
  DELETE_SCHEDULE
} from "./types"

export const createSchedule = (schedule, history) => async dispatch => {
  try {
    await Axios.post(`/api/schedule/add`, schedule);
    history.push("/schedule");
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

export const getAllSchedules = () => async dispatch => {
  const res = await Axios.get(`/api/schedule/GLOBAL/all`);
  let schedules = res.data;
  schedules.sort(function (a, b) { return new Date(b.date) - new Date(a.date) });
  dispatch({
    type: GET_SCHEDULES,
    payload: schedules
  });
};

export const getSchedule = (scheduleId, history) => async dispatch => {
  try {
    const res = await Axios.get(`/api/schedule/GLOBAL/${scheduleId}`);
    dispatch({
      type: GET_SCHEDULE,
      payload: res.data
    });
  } catch (err) {
    history.push("/schedule");
  }
};

export const deleteSchedule = (scheduleId, history) => async dispatch => {
  if (
    window.confirm("Are you sure?")
  ) {
    try {
      await Axios.delete(`/api/schedule/${scheduleId}`);
      dispatch({
        type: DELETE_SCHEDULE,
        payload: scheduleId
      });
    } catch (err) {
      history.push("/schedule");
    }
  }
};