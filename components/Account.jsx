import { useState } from "react";
import { useMoralis } from "react-moralis";
import { Button, Card, Modal } from "antd";
import { SelectOutlined } from "@ant-design/icons";
import { useMoralisDapp } from "../MoralisDappProvider/MoralisDappProvider";
import { getEllipsisTxt } from "../helpers/formatters";
import Address from "./Address/Address";
import { getExplorer } from "../helpers/networks";
const styles = {
  account: {
    height: "20px",
    padding: "0 10px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "fit-content",
    borderRadius: "5px",
    backgroundColor: "rgb(244, 244, 244)",
    cursor: "pointer",
  },
  text: {
    color: "#21BF96",
  },
};

const Account = () => {
  const { authenticate, isAuthenticated, logout } = useMoralis();
  const { walletAddress, chainId } = useMoralisDapp();
  const [isModalVisible, setIsModalVisible] = useState(false);

  console.log(getEllipsisTxt(walletAddress, 6));

  if (!isAuthenticated) {
    return (
      <div
        className="topbar__vote"
        onClick={() => authenticate({ signingMessage: "connected!" })}
      >
        <p>Connect wallet</p>
      </div>
    );
  }

  return (
    <>
      <div className="topbar__vote" onClick={() => setIsModalVisible(true)}>
        <p className="tw-text-sm">{getEllipsisTxt(walletAddress, 6)}</p>
      </div>
      <Modal
        visible={isModalVisible}
        footer={null}
        onCancel={() => setIsModalVisible(false)}
        bodyStyle={{
          padding: "15px",
          fontSize: "17px",
          fontWeight: "500",
        }}
        style={{ fontSize: "16px", fontWeight: "500", zIndex: "100" }}
        width="400px"
      >
        Account
        <Card
          style={{
            marginTop: "10px",
            borderRadius: "1rem",
          }}
          bodyStyle={{ padding: "15px" }}
        >
          <Address
            avatar="left"
            size={6}
            copyable
            style={{ fontSize: "20px" }}
          />
          <div style={{ marginTop: "10px", padding: "0 10px" }}>
            <a
              href={`${getExplorer(chainId)}/address/${walletAddress}`}
              target="_blank"
              rel="noreferrer"
            >
              <SelectOutlined style={{ marginRight: "5px" }} />
              View on Explorer
            </a>
          </div>
        </Card>
        <Button
          size="large"
          type="primary"
          style={{
            width: "100%",
            marginTop: "10px",
            borderRadius: "0.5rem",
            fontSize: "16px",
            fontWeight: "500",
          }}
          onClick={() => {
            logout();
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
