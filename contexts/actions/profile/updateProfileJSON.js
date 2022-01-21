import axios from "axios";
import jwt from "jsonwebtoken";
import axiosInstance from "../../../helpers/axiosInstance";

import {
  UPDATE_PROFILE_LOADING,
  UPDATE_PROFILE_SUCCESS,
  UPDATE_PROFILE_ERROR,
} from "../actionTypes";
import { successToast, errorToast } from "../../utils/toasts";

export const updateProfileJSON = (id, body, token) => (dispatch) => {
  dispatch({
    type: UPDATE_PROFILE_LOADING,
  });

  // axios post request
  const token = window.localStorage.getItem("jwtToken");

  axios
    .patch(`${process.env.BASE_URI}/user/updateProfile/${id}`, body, {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => {
      // setting updated user

      localStorage.setItem(
        "userInfo",
        JSON.stringify({
          user: res.data.data,
          token: token,
        })
      );
      dispatch({
        type: UPDATE_PROFILE_SUCCESS,
        payload: res.data,
      });
      successToast("successfully updated profile");
    })
    .catch((err) => {
      console.log(err.response.data);
      errorToast("failed to update profile");
      dispatch({
        type: UPDATE_PROFILE_ERROR,
        payload: err.response ? err.response.data : "COULD NOT CONNECT",
      });
    });
};
