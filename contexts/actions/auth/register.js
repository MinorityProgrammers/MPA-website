import axiosInstance from '../../../helpers/axiosInstance';
import {
  REGISTER_LOADING,
  REGISTER_SUCCESS,
  REGISTER_ERROR,
} from '../actionTypes';
import { successToast, errorToast } from '../../utils/toasts';

export const register = (body) => (dispatch) => {
  dispatch({
    type: REGISTER_LOADING,
  });

  // axios post request

  axiosInstance()
    .post('/user/signup', body)
    .then((res) => {
      const { token } = res.data.data;

      // using localstorage approach
      localStorage.setItem('jwtToken', token);

      //   setAuthorizationToken(token)
      localStorage.setItem('userInfo', JSON.stringify(res.data.data));

      if (res?.data?.status == 'success') {
        successToast(res.data.message);
        // window.location.href = "/create-profile";
      } else {
        errorToast(res.data.message.msg);
      }

      dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      errorToast(
        err?.response?.data?.data?.message?.msg
          ? err.response.data.data.message.msg
          : 'something went wrong',
      );

      dispatch({
        type: REGISTER_ERROR,
        payload: err.response ? err.response.data : 'COULD NOT CONNECT',
      });
    });
};
