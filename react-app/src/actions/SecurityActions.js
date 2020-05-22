import Axios from 'axios';
import { SET_CURRENT_USER, GET_ERRORS } from './types';
import setJWTTokenToHeader from '../security/setJWTTokenToHeader';
import jwt_decode from 'jwt-decode';

export const login = loginRequest => async dispatch => {
  try {
    // post the loginRequest(email and password)
    const res = await Axios.post('/api/admin/login', loginRequest);
    // extract the JWT token
    const token = res.data.jwt;
    // store the token in the localStorage
    localStorage.setItem("jwtToken", token);
    // set the token in the header
    setJWTTokenToHeader(token);
    // decode the token
    const decode = jwt_decode(token);
    // dispatch to SecurityReducer
    dispatch({
      type: SET_CURRENT_USER,
      payload: decode
    });

  } catch (err) {
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    });
  }
};

export const logout = () => async dispatch => {
  localStorage.removeItem("jwtToken");
  setJWTTokenToHeader(false);
  dispatch({
    type: SET_CURRENT_USER,
    payload: {}
  });
};