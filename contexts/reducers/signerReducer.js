// import { SIGNER } from '../actions/actionTypes';

import {
  CONNECT_LOADING,
  CONNECT_SUCCESS,
  CONNECT_ERROR,
  DISCONNECT_USER,
} from '../actions/actionTypes';

// signer reducer body
const signer = (state, { payload, type }) => {
  switch (type) {
    case CONNECT_LOADING:
      return {
        ...state,
        signer: {
          ...state.signer,
          isConnected: false,
          isUnlocked: true,
          activeKey: null,
          error: null,
        },
      };

    case CONNECT_SUCCESS:
      return {
        ...state,
        signer: {
          ...state.signer,
          isConnected: payload.isConnected,
          isUnlocked: payload.isUnlocked,
          activeKey: payload.activeKey,
          error: false,
        },
      };

    case DISCONNECT_USER: {
      return {
        ...state,
        signer: {
          ...state.signer,
          isConnected: false,
          isUnlocked: false,
          activeKey: null,
          error: false,
        },
      };
    }

    case CONNECT_ERROR:
      return {
        ...state,
        signer: {
          ...state.signer,
          isConnected: false,
          isUnlocked: false,
          activeKey: null,
          error: payload.error,
        },
      };
    default:
      return state;
  }
};

export default signer;
