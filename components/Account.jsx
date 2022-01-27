/* eslint-disable max-len */
import React, {
  useState, useEffect, useContext, useCallback,
} from 'react';
import { useMoralis } from 'react-moralis';
import {
  Button, Card, Modal, Row, Col,
} from 'antd';
import { SelectOutlined } from '@ant-design/icons';
import { Signer } from 'casper-js-sdk';
import { GlobalContext } from '../contexts/provider';
import { useMoralisDapp } from '../MoralisDappProvider/MoralisDappProvider';
import { getEllipsisTxt } from '../helpers/formatters';
import Address from './Address/Address';
import { errorToast } from '../contexts/utils/toasts';
import changeAuthModal from '../contexts/actions/authModal/index';
import {
  handleLockSigner,
  handleUnlockSigner,
  isConnectedCasper,
} from '../contexts/actions/signer/index';

const Account = function () {
  const { authenticate, isAuthenticated, logout } = useMoralis();
  const { walletAddress, chainId } = useMoralisDapp();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const {
    showModalState: { showModal },
    setShowModal,
    signerState: {
      signer: {
        error, isConnected, /* isUnlocked, */ activeKey,
      },
    },
    setSignerState,
  } = useContext(GlobalContext);

  const SIGNER_EVENTS = {
    connected: 'signer:connected',
    disconnected: 'signer:disconnected',
    tabUpdated: 'signer:tabUpdated',
    activeKeyChanged: 'signer:activeKeyChanged',
    locked: 'signer:locked',
    unlocked: 'signer:unlocked',
  };

  const dispatchUnlockSinger = useCallback(
    (event) => {
      handleUnlockSigner(event.detail)(setSignerState);
    },
    [isConnected, setSignerState],
  );

  const dispatchDisconnectedSinger = useCallback(() => {
    handleLockSigner()(setSignerState);
  }, [isConnected, setSignerState]);

  useEffect(() => {
    [
      SIGNER_EVENTS.unlocked,
      SIGNER_EVENTS.activeKeyChanged,
      SIGNER_EVENTS.connected,
    ].forEach((event) => window.addEventListener(event, dispatchUnlockSinger));
    [SIGNER_EVENTS.locked, SIGNER_EVENTS.disconnected].forEach((event) => window.addEventListener(event, dispatchDisconnectedSinger));

    return () => {
      [
        SIGNER_EVENTS.unlocked,
        SIGNER_EVENTS.activeKeyChanged,
        SIGNER_EVENTS.connected,
      ].forEach((event) => window.removeEventListener(event, dispatchUnlockSinger));
      [SIGNER_EVENTS.locked, SIGNER_EVENTS.disconnected].forEach((event) => window.removeEventListener(event, dispatchDisconnectedSinger));
    };
  });

  useEffect(() => {
    isConnectedCasper().then(() => {
      [
        SIGNER_EVENTS.unlocked,
        SIGNER_EVENTS.activeKeyChanged,
        SIGNER_EVENTS.connected,
      ].forEach((event) => window.addEventListener(event, dispatchUnlockSinger));
    });
    if (error) {
      errorToast(error);
    }
  }, [isConnected, setSignerState, error]);

  const wallets = [
    {
      icon: '/assets/images/metamask.png',
      label: 'MetaMask',
      id: 'MetaMask',
    },
    {
      icon: '/assets/images/casper.png',
      label: 'Casper',
      id: 'Casper',
    },
  ];

  const closeAuthModal = () => {
    changeAuthModal(!showModal)(setShowModal);
  };

  const openAuthModal = () => {
    changeAuthModal(!showModal)(setShowModal);
  };

  const metamaskConnectWallet = async () => {
    if (
      chainId === process.env.NEXT_PUBLIC_NETWORK_ID_MAINNET
      || chainId === process.env.NEXT_PUBLIC_NETWORK_ID_TESTNET
    ) {
      authenticate({ signingMessage: 'connected!' });
      if (isConnected === true) {
        await window.casperlabsHelper.disconnectFromSite();
      }
    } else {
      errorToast('Wrong Chain, please connect to Polygon chain');
      logout();
    }
  };

  useEffect(async () => {
    if (
      chainId !== process.env.NEXT_PUBLIC_NETWORK_ID_MAINNET
      && chainId !== process.env.NEXT_PUBLIC_NETWORK_ID_TESTNET
      && showModal === true
    ) {
      errorToast('Wrong Chain, please connect to Polygon chain');

      try {
        logout();
      } catch (e) {
        console.log(e);
      }
    }
  }, [isAuthenticated]);

  const casperConnectWallet = async () => {
    try {
      Signer?.sendConnectionRequest();
    } catch (err) {
      if (err) {
        errorToast(err);
      }
    }
  };

  if (isAuthenticated === false && isConnected === false) {
    return (
      <>
        <div
          className="tw-bg-blue-600 hover:tw-bg-blue-700 tw-text-white tw-text-center tw-font-bold tw-py-1.5 tw-px-1.5 tw-rounded tw-w-11/12 tw-cursor-pointer"
          onClick={() => {
            openAuthModal();
          }}
        >
          <p className="tw-text-sm">Connect</p>
        </div>
        <Modal
          title={false}
          footer={false}
          visible={showModal}
          onCancel={closeAuthModal}
          closable={false}
        >
          <Row className="tw-mb-5">
            <Col span={20} className="tw-flex-1 tw-font-bold tw-text-lg">
              Connect wallet
            </Col>
            <Col span={4} className="flex-1">
              <svg
                onClick={closeAuthModal}
                xmlns="http://www.w3.org/2000/svg"
                className="tw-h-5 tw-w-5 tw-ml-6 tw-cursor-pointer"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M18 12H6"
                />
              </svg>
            </Col>
          </Row>
          <Row justify="center">
            {wallets.map((wallet) => (
              <Col
                key={wallet.id}
                align="middle"
                span={11}
                className="tw-py-3 tw-cursor-pointer hover:tw-bg-gray-100 hover:tw-shadow-xl tw-transition-all tw-duration-500 tw-mb-10"
                onClick={() => (wallet.id === 'MetaMask'
                  ? metamaskConnectWallet()
                  : casperConnectWallet())}
              >
                <img
                  alt="wallet"
                  className="tw-w-32 tw-h-32"
                  src={wallet.icon}
                />
                <div className="tw-mt-2 tw-font-bold">{wallet.label}</div>
              </Col>
            ))}
          </Row>
          <div className="tw-text-center tw-font-bold tw-pt-10">
            <span className="tw-cursor-pointer hover:tw-text-gray-500 tw-transition-all tw-duration-500">
              Dont have a wallet? Get one
            </span>
            <div className="tw-flex tw-flex-row tw-justify-evenly tw-w-full tw-mt-4">
              <a href="https://metamask.io/" target="_blank" rel="noreferrer">
                <span className="tw-cursor-pointer hover:tw-text-gray-500 tw-transition-all tw-duration-500">
                  Metamask
                </span>
              </a>
              <a href="https://casper.network/en/network" target="_blank" rel="noreferrer">
                <span className="tw-cursor-pointer hover:tw-text-gray-500 tw-transition-all tw-duration-500">
                  Casper
                </span>
              </a>
            </div>
          </div>
        </Modal>
      </>
    );
  }

  return (
    <>
      <div
        className="tw-bg-blue-600 hover:tw-bg-blue-700 tw-text-white tw-font-bold tw-text-center tw-py-2 tw-px-2 tw-rounded tw-cursor-pointer tw-w-11/12"
        onClick={() => setIsModalVisible(true)}
      >
        <p className="tw-text-sm">
          {isConnected
            ? getEllipsisTxt(activeKey, 6)
            : getEllipsisTxt(walletAddress, 6)}
        </p>
      </div>
      <Modal
        visible={isModalVisible}
        footer={null}
        onCancel={() => setIsModalVisible(false)}
        bodyStyle={{
          padding: '15px',
          fontSize: '17px',
          fontWeight: '500',
        }}
        style={{ fontSize: '16px', fontWeight: '500', zIndex: '100' }}
        width="400px"
      >
        Account
        <Card
          style={{
            marginTop: '10px',
            borderRadius: '1rem',
          }}
          bodyStyle={{ padding: '15px' }}
        >
          <Address
            avatar="left"
            size={6}
            copyable
            style={{ fontSize: '20px' }}
            address={activeKey}
          />
          <div style={{ marginTop: '10px', padding: '0 10px' }}>
            {!isConnected && activeKey === null ? (
              <a
                href={`${process.env.NETWORK_URL}/address/${walletAddress}`}
                target="_blank"
                rel="noreferrer"
              >
                <SelectOutlined style={{ marginRight: '5px' }} />
                View on Explorer
              </a>
            ) : (
              <a
                href={`${process.env.CASPER_URL}/account/${activeKey}`}
                target="_blank"
                rel="noreferrer"
              >
                <SelectOutlined style={{ marginRight: '5px' }} />
                View on CSPR live
              </a>
            )}
          </div>
        </Card>
        <Button
          size="large"
          type="primary"
          style={{
            width: '100%',
            marginTop: '10px',
            borderRadius: '0.5rem',
            fontSize: '16px',
            fontWeight: '500',
            backgroundColor: '#2364EB',
          }}
          onClick={async () => {
            logout();
            await window.casperlabsHelper.disconnectFromSite();
            [SIGNER_EVENTS.locked, SIGNER_EVENTS.disconnected].forEach(
              (event) => window.addEventListener(event, dispatchDisconnectedSinger),
            );
            setIsModalVisible(false);
          }}
        >
          Disconnect Wallet
        </Button>
      </Modal>
    </>
  );
};

export default Account;
