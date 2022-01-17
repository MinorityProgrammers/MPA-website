import React from 'react';
import Blockies from 'react-blockies';
import { useMoralisDapp } from '../MoralisDappProvider/MoralisDappProvider';

const Blockie = (props) => {
  const { address, currentWallet } = props;
  const { walletAddress } = useMoralisDapp();
  if ((!address && !currentWallet) || !walletAddress) return null;

  return (
    <Blockies
      seed={
        currentWallet
          ? walletAddress.toLowerCase()
          : address.toLowerCase()
      }
      className="identicon"
      {...props}
    />
  );
};

export default Blockie;
