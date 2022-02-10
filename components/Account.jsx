/* eslint-disable max-len */
/* eslint-disable */
import React, { useState, useEffect, useContext, useCallback } from "react";
import { useMoralis } from "react-moralis";
import { Button, Card, Modal, Row, Col } from "antd";
import { SelectOutlined } from "@ant-design/icons";
import { Signer } from "casper-js-sdk";
import { GlobalContext } from "../contexts/provider";
import { useMoralisDapp } from "../MoralisDappProvider/MoralisDappProvider";
import { getEllipsisTxt } from "../helpers/formatters";
import Address from "./Address/Address";
import { errorToast } from "../contexts/utils/toasts";
import changeAuthModal from "../contexts/actions/authModal/index";
import {
  handleLockSigner,
  handleUnlockSigner,
  isConnectedCasper,
} from "../contexts/actions/signer/index";
import styles from "../styles/account/account.module.css";
import ButtonComponent from "./profile/ButtonComponent";

const Account = () => {
  const { authenticate, isAuthenticated, logout } = useMoralis();
  const { walletAddress, chainId } = useMoralisDapp();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const {
    showModalState: { showModal },
    setShowModal,
    signerState: {
      signer: { error, isConnected, activeKey },
    },
    setSignerState,
  } = useContext(GlobalContext);

  const SIGNER_EVENTS = {
    connected: "signer:connected",
    disconnected: "signer:disconnected",
    tabUpdated: "signer:tabUpdated",
    activeKeyChanged: "signer:activeKeyChanged",
    locked: "signer:locked",
    unlocked: "signer:unlocked",
  };

  const dispatchUnlockSinger = useCallback(
    (event) => {
      handleUnlockSigner(event.detail)(setSignerState);
    },
    [isConnected, setSignerState]
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
    [SIGNER_EVENTS.locked, SIGNER_EVENTS.disconnected].forEach((event) =>
      window.addEventListener(event, dispatchDisconnectedSinger)
    );

    return () => {
      [
        SIGNER_EVENTS.unlocked,
        SIGNER_EVENTS.activeKeyChanged,
        SIGNER_EVENTS.connected,
      ].forEach((event) =>
        window.removeEventListener(event, dispatchUnlockSinger)
      );
      [SIGNER_EVENTS.locked, SIGNER_EVENTS.disconnected].forEach((event) =>
        window.removeEventListener(event, dispatchDisconnectedSinger)
      );
    };
  });

  useEffect(() => {
    isConnectedCasper().then(() => {
      [
        SIGNER_EVENTS.unlocked,
        SIGNER_EVENTS.activeKeyChanged,
        SIGNER_EVENTS.connected,
      ].forEach((event) =>
        window.addEventListener(event, dispatchUnlockSinger)
      );
    });
    if (error) {
      errorToast(error);
    }
  }, [isConnected, setSignerState, error]);

  const wallets = [
    {
      icon: "/assets/images/metamask.png",
      label: "MetaMask",
      id: "MetaMask",
    },
    {
      icon: "/assets/images/casper.png",
      label: "Casper",
      id: "Casper",
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
      chainId === process.env.NEXT_PUBLIC_NETWORK_ID_MAINNET ||
      chainId === process.env.NEXT_PUBLIC_NETWORK_ID_TESTNET
    ) {
      authenticate({ signingMessage: "connected!" });
      if (isConnected === true) {
        await window.casperlabsHelper.disconnectFromSite();
      }
    } else {
      errorToast("Wrong Chain, please connect to Polygon chain");
      logout();
    }
  };

  useEffect(async () => {
    if (
      chainId !== process.env.NEXT_PUBLIC_NETWORK_ID_MAINNET &&
      chainId !== process.env.NEXT_PUBLIC_NETWORK_ID_TESTNET &&
      showModal === true
    ) {
      errorToast("Wrong Chain, please connect to Polygon chain");

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
          className="tw-text-white  tw-text-center tw-font-bold tw-py-2 tw-px-5 tw-w-11/12 tw-cursor-pointer connect__button"
          onClick={() => {
            openAuthModal();
          }}
        >
          <p className="tw-text-sm">Connect Wallet</p>
        </div>
        <div>
          <Modal
            style={{
              background: "#1c1d37",
              border: "1px solid #A259FF",
              borderRadius: "20px",
            }}
            bodyStyle={{
              marginTop: "30px",
              background: "#1c1d37",
            }}
            title={false}
            footer={false}
            visible={showModal}
            onCancel={closeAuthModal}
            closable={false}
            width={"700px"}
          >
            <div className={styles.modalHeader}>
              <div />
              <div className={styles.modalWrapper}>
                <div className={styles.modalImage}>
                  <img src="/assets/images/mpicon.svg" alt="logo" />
                </div>
                <h2 className="tw-flex-1 tw-text-white tw-text-center tw-w-full tw-font-bold tw-text-lg">
                  Connect Wallet
                </h2>
              </div>
              <h1
                className="tw-text-white tw-font-bold tw-text-2xl hover:tw-text-gray-500 tw-cursor-pointer"
                onClick={closeAuthModal}
              >
                X
              </h1>
            </div>
            <Row className="tw-mb-5">
              <Col span={4} className="flex-1"></Col>
            </Row>
            <Row justify="center">
              {wallets.map((wallet) => (
                <div
                  key={wallet.id}
                  className={`${styles.account} tw-py-3 tw-cursor-pointer tw-mr-6 hover:tw-shadow-xl tw-transition-all tw-duration-500 tw-mb-10`}
                  onClick={() =>
                    wallet.id === "MetaMask"
                      ? metamaskConnectWallet()
                      : casperConnectWallet()
                  }
                >
                  <img
                    alt="wallet"
                    className={`tw-w-32 tw-h-32`}
                    src={wallet.icon}
                  />
                  <div className="tw-mt-2 tw-text-white tw-font-bold">
                    {wallet.label}
                  </div>
                </div>
              ))}
            </Row>
            <div className="tw-text-center tw-font-bold tw-pt-2">
              <span className=" tw-text-white  tw-transition-all tw-duration-500">
                Dont have a wallet? Sign up using{"  "}
                <span className="tw-text-blue-600">Email</span>
              </span>
            </div>
          </Modal>
        </div>
      </>
    );
  }

  return (
    <>
      <div
        className="new-bg tw-text-white tw-font-bold tw-text-center tw-py-2 tw-px-2 tw-rounded tw-cursor-pointer tw-w-11/12"
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
        title={false}
        footer={false}
        onCancel={() => setIsModalVisible(false)}
        style={{
          background: "#1c1d37",
          border: "1px solid #A259FF",
          borderRadius: "20px",
        }}
        bodyStyle={{
          marginTop: "30px",
          background: "#1c1d37",
        }}
        closable={false}
        width="700px"
      >
        <div className={styles.modalHeader}>
              <div />
              <div className={styles.modalWrapper}>
                <div className={styles.modalImage}>
                  <img src="/assets/images/mpicon.svg" alt="logo" />
                </div>
                <h2 className="tw-flex-1 tw-text-white tw-text-center tw-w-full tw-font-bold tw-text-lg">
                 Connected Account
                </h2>
              </div>
              <h1
                className="tw-text-white tw-font-bold tw-text-2xl hover:tw-text-gray-500 tw-cursor-pointer"
                onClick={closeAuthModal}
              >
                X
              </h1>
            </div>
            <Row className="tw-mb-5">
              <Col span={4} className="flex-1"></Col>
            </Row>
          <Row justify="center" className="tw-flex tw-flex-col tw-p-3 tw-text-center">
          <Address
            avatar="left"
            size={6}
            copyable
            style={{ fontSize: "20px" }}
            address={activeKey}
          />
          <div className="tw-text-center" style={{ marginTop: "10px", padding: "0 10px" }}>
            {!isConnected && activeKey === null ? (
              <a
                href={`${process.env.NETWORK_URL}/address/${walletAddress}`}
                target="_blank"
                rel="noreferrer"
                className="tw-text-white"
              >
                <SelectOutlined style={{ marginRight: "5px" }} />
                View on Explorer
              </a>
            ) : (
              <a
                href={`${process.env.CASPER_URL}/account/${activeKey}`}
                target="_blank"
                  rel="noreferrer"
                  className="tw-text-white"
              >
                <SelectOutlined style={{ marginRight: "5px" }} />
                View on CSPR live
              </a>
            )}
          </div>
        </Row>
        <Row className="tw-py-3 tw-justify-center">
        <ButtonComponent className="tw-w-full " text="Disconnect Wallet" func={async () => {
            logout();
            await window.casperlabsHelper.disconnectFromSite();
            [SIGNER_EVENTS.locked, SIGNER_EVENTS.disconnected].forEach(
              (event) =>
                window.addEventListener(event, dispatchDisconnectedSinger)
            );
            setIsModalVisible(false);
          }} />
          </Row>
      </Modal>
    </>
  );
};

export default Account;
