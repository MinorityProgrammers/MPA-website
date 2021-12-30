/* eslint-disable react/jsx-no-constructed-context-values */
import React, { useReducer, createContext } from 'react';
import { auth } from './reducers/auth';
import { profile } from './reducers/profile';
import { donate } from './reducers/donate';
import authInitialStates from './initialStates/authInitialStates';
import profileInitialStates from './initialStates/profileInitialStates';
import authModalInitialStates from './initialStates/authModalInitialStates';
import authModal from './reducers/authModal';
import walletReducer from './reducers/walletReducer';
import signerReducer from './reducers/signerReducer';
import walletInitialState from './initialStates/walletInitialState';
import signerInitialState from './initialStates/signerInitialState';

export const GlobalContext = createContext();

// main provider

export const GlobalProvider = function ({ children }) {
  const [authState, authDispatch] = useReducer(auth, authInitialStates);
  const [profileState, profileDispatch] = useReducer(profile, profileInitialStates);
  const [amount, donateDispatch] = useReducer(donate, '');
  const [showModalState, setShowModal] = useReducer(authModal, authModalInitialStates);
  const [walletState, setWalletState] = useReducer(walletReducer, walletInitialState);
  const [signerState, setSignerState] = useReducer(signerReducer, signerInitialState);

  return (
    <GlobalContext.Provider
      value={{
        authState,
        authDispatch,
        profileState,
        profileDispatch,
        amount,
        donateDispatch,
        showModalState,
        setShowModal,
        walletState,
        setWalletState,
        signerState,
        setSignerState,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
