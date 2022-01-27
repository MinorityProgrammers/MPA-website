import React, { useState } from 'react';
import { ethers } from 'ethers';
import Abi from './contractAbi.json';

const FaucetForm = () => {
  const minterAddress = process.env.MINTER_ADDRESS;
  const [address, setAddresss] = useState('');
  const [error, setError] = useState('');
  const [disabled, setDisabled] = useState(true);
  const [errorState, setErrorState] = useState('ghost');

  async function faucet() {
    if (typeof window.ethereum !== 'undefined') {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      window.ethereum.request({
        method: 'eth_requestAccounts',
      });
      const Idin = await provider.getNetwork();
      if (Idin.chainId !== 80001) {
        alert('change your network to polygon');
        return;
      }
      const signer = provider.getSigner();
      const contract = new ethers.Contract(minterAddress, Abi.abi, signer);
      try {
        await contract.mint(address);
        alert(
          'Token sent, check your wallet, Contract address: 0x316748158Bf8a5C50cfF39aef9AC44aD0a9579B6',
        );
      } catch (err) {
        if (err.code === 4001) {
          setError(err.message);
          alert('You cancelled the transaction!');
        } else {
          setError(err.data.message);
          alert(
            `${
              err.data.message === 'execution reverted'
                ? 'check that you have not recieved $MPA token before'
                : 'check that your wallet contains some $Minority token'
            }`,
          );
        }
        setErrorState('');
      }
    } else {
      alert('download Metamask');
    }
  }

  const handleAddress = (evt) => {
    evt.preventDefault();
    try {
      const validatedAddress = ethers.utils.getAddress(evt.target.value);
      setAddresss(validatedAddress);
      setDisabled(false);
      setErrorState('ghost');
    } catch (e) {
      const err = e.value !== '' ? 'invalid Address' : '';
      setError(err);
      setAddresss(evt.target.value);
      setDisabled(true);
      setErrorState(e.value === '' ? 'ghost' : '');
    }
  };

  return (
    <div className="faucet-section guide">
      <div className="container faucet-header">
        <div className="form-container">
          <input
            type="text"
            value={address}
            onChange={handleAddress}
            placeholder="Enter your address"
            className="faucet-form"
          />
          <span className="icon-bg">
            <span className="tooltiptext">
              To be eligible for the Governance token you must possess some
              $MINORITY token in your wallet, each wallet is only eligible for
              one request.
            </span>
            <span className="eligibility-info">&#8505;</span>
          </span>
        </div>
        <p className={`${errorState} error-message`}>{error}</p>
        <button
          onClick={faucet}
          disabled={disabled}
          className="faucet-btn"
          type="button"
        >
          Send My Token
        </button>
      </div>
    </div>
  );
};

export default FaucetForm;
