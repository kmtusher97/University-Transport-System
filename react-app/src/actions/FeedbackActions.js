import Axios from 'axios';
import { GET_FEEDBACKS, DELETE_FEEDBACK, GET_ERRORS } from './types';

export const getAllFeedbacks = () => async dispatch => {
  let feedbacks = (await Axios.get('/api/feedback/all')).data;
  dispatch({
    type: GET_FEEDBACKS,
    payload: feedbacks.sort(function (a, b) { return new Date(b.date) - new Date(a.date) })
  });
};

export const deleteFeedback = (feedbackId, history) => async dispatch => {
  if (
    window.confirm('Are you sure?')
  ) {
    try {
      await Axios.delete(`/api/feedback/${feedbackId}`);
      dispatch({
        type: DELETE_FEEDBACK,
        payload: feedbackId
      });
    } catch (err) {
      history.push('/feedback');
    }
  }
};

export const replyFeedback = (notification) => async dispatch => {
  try {
    await Axios.post('/api/notification/add', notification);

  } catch (err) {
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    });
  }
};