import { USERS, SIGNER } from '../actionTypes';

// export const getUserDetails = (publicKey) => ({
//   type: USERS.FETCH_USER_DETAILS,
//   request: { url: `/user/${publicKey}` },
// });

export const updatePublicKeyFromSigner = (publicKey) => (dispatch) => {
  try {
    dispatch({ type: USERS.SET_USER_ADDRESS, payload: { publicKey } });
  } catch (error) {
    dispatch({ type: SIGNER.UPDATE_LOCK_STATUS, payload: { isLocked: true } });
  }
};

export const setPublicKey = (publicKey) => (dispatch) => dispatch({
  type: USERS.SET_USER_ADDRESS,
  payload: { publicKey },
});
