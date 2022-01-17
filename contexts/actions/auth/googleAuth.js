import axios from 'axios';
import {
  LOGIN_LOADING,
  LOGIN_SUCCESS,
  LOGIN_ERROR,
} from '../actionTypes';
import { successToast, errorToast } from '../../utils/toasts';

const postData = (route, body, dispatch) => {
  dispatch({
    type: LOGIN_LOADING,
  });

  axios.post(`https://koinstreet-learn-api.herokuapp.com/${route}`, body).then((res) => {
    const { token } = res.data.data;

    // using localstorage approach
    localStorage.setItem('jwtToken', token);

    // //   setAuthorizationToken(token)
    localStorage.setItem('userInfo', JSON.stringify(res.data.data));

    console.log(res);

    if (res.data.status === 'success') {
      successToast(res.data.message);
      window.location.href = '/';
    } else {
      errorToast(res.data ? res.data.message.msg : 'something went wrong');
    }

    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data,
    });
  })
    .catch((err) => {
      console.log(err);
      errorToast(err.response.data.data.message.msg);
      dispatch({
        type: LOGIN_ERROR,
        payload: err.response ? err.response.data : 'COULD NOT CONNECT',
      });
    });
};

export const googleAuth = (body) => (dispatch) => {
  postData('googleLogin', body, dispatch);
};

export const nextAuth = (body) => (dispatch) => {
  postData('nextAuth', body, dispatch);
};
