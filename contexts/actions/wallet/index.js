import { USERS, SIGNER } from '../actionTypes';

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
