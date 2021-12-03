import { LOGOUT_USER } from "../../actions/actionTypes";

export default () => (dispatch) => {
  // removing the token and userinfo from storage
    localStorage.removeItem("userInfo");
    localStorage.removeItem("jwtToken");
    dispatch({
      type: LOGOUT_USER,
    });
    window.location.href = '/login'
  };
  