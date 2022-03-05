/* eslint-disable consistent-return */
/* eslint-disable max-len */
/* eslint-disable no-undef */
// import Router from 'next/router';
import Web3 from 'web3';
import blockies from 'ethereum-blockies-png';
import { LOGIN_LOADING, LOGIN_SUCCESS, LOGIN_ERROR } from '../actionTypes';
import { successToast, errorToast } from '../../utils/toasts';

let web3;

const handleSignMessage = async ({
  publicAddress,
  nonce,
}, authenticate) => {
  try {
    web3 = new Web3((window).ethereum);
    const signature = await web3?.eth.personal.sign(
      `I am signing my one-time nonce: ${nonce}`,
      publicAddress,
      '',
    );
    // authenticate();

    return { publicAddress, signature };
  } catch (err) {
    console.log(err);
  }
};

const handleSignup = (publicAddress, dataURL) => fetch(`${process.env.BASE_URI}/user/account/create`, {
  body: JSON.stringify({ publicAddress, profilePicture: dataURL }),
  headers: {
    'Content-Type': 'application/json',
  },
  method: 'POST',
}).then((response) => response.json());

const handleAuthenticate = ({
  publicAddress,
  signature,
}) => fetch(`${process.env.BASE_URI}/user/account/login`, {
  body: JSON.stringify({ publicAddress, signature }),
  headers: {
    'Content-Type': 'application/json',
  },
  method: 'POST',
}).then((response) => response.json());

const walletLogin = (walletAddress, authenticate) => (dispatch) => {
  const dataURL = blockies.createDataURL({ seed: walletAddress });
  dispatch({
    type: LOGIN_LOADING,
  });

  fetch(
    `${process.env.BASE_URI}/user/account/get/${walletAddress}`,
  )
    .then((response) => response.json())
    // If yes, retrieve it. If no, create it.
    .then((users) => (users.length !== 0 ? users[0] : handleSignup(walletAddress, dataURL))).then((data) => handleSignMessage(data, authenticate))
  // Send signature to backend on the /auth route
    .then(handleAuthenticate)
    .then((data) => {
      if (data?.status === 'success') {
        successToast(data?.message);
        localStorage.setItem('jwtToken', data?.data?.token);
        localStorage.setItem('userInfo', JSON.stringify(data?.data));
      } else {
        errorToast(data?.data?.message?.msg || 'Something went wrong!!!');
      }

      dispatch({
        type: LOGIN_SUCCESS,
        payload: data.data,
      });
    })
    .catch((err) => {
      errorToast(
        err?.response?.data?.data?.message?.msg
          ? err.response.data.data.message.msg
          : 'something went wrong',
      );

      dispatch({
        type: LOGIN_ERROR,
        payload: err.response ? err.response.data : 'COULD NOT CONNECT',
      });
    });
};

export default walletLogin;
