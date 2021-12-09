import React from 'react';
import Blockies from 'react-blockies';
import { useMoralisDapp } from '../MoralisDappProvider/MoralisDappProvider';

const Blockie = function (props) {
  const { walletAddress } = useMoralisDapp();
  if ((!props.address && !props.currentWallet) || !walletAddress) return null;

  return (
    <Blockies
      seed={
        props.currentWallet
          ? walletAddress.toLowerCase()
          : props.address.toLowerCase()
      }
      className="identicon"
      {...props}
    />
  );
};

export default Blockie;
