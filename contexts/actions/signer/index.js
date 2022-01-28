/* eslint-disable max-len */
import { Signer } from 'casper-js-sdk';
import {
  CONNECT_SUCCESS,
  DISCONNECT_USER,
} from '../actionTypes';

export const updateConnectStatus = (isConnected) => (dispatch) => dispatch({ type: CONNECT_SUCCESS, payload: { isConnected } });

export const updateLockStatus = (isUnlocked) => ({ type: CONNECT_SUCCESS, payload: { isUnlocked } });

export const handleUnlockSigner = (data) => (dispatch) => {
  dispatch({
    type: CONNECT_SUCCESS,
    payload: data,
  });
};

export const handleLockSigner = () => (dispatch) => dispatch({ type: DISCONNECT_USER, payload: { isUnlocked: false } });

export const isConnectedCasper = async () => {
  try {
    return await Signer.isConnected();
  } catch (error) {
    return undefined;
  }
};

export const isLockedCasper = async () => {
  try {
    await Signer.getActivePublicKey();
  } catch (error) {
    return true;
  }
  return false;
};

export const getConnectError = ({ signer }) => signer.error;

export const getSignerStatus = ({ signer }) => {
  const isAvailable = Boolean(window.casperlabsHelper);
  return { isUnlocked: signer.isUnlocked, isConnected: signer.isConnected, isAvailable };
};
