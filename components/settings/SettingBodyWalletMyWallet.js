import React from 'react';
import { useRouter } from 'next/router';
import stylesOverview from '../../styles/settings/settingBodyOverview.module.css';
import styles from '../../styles/settings/settingBodyWalletMyWallet.module.css';
import SettingBody from './SettingBody';

const SettingBodyWalletMyWallet = ({ settingsPage, data, userID }) => {
  const router = useRouter();
  const handleSubmit = () => {};

  const closeProfileSetup = () => {
    // discard changes
    const slug = data?.userName;
    if (slug) {
      router.push(`/user/${slug}`);
    }
  };

  const wallets = [
    {
      header: 'Fortmatic',
      img: 'wallet-fortmatic',
      alt: 'wallet fortmatic',
      aAddress: '0xa1214a1214b1214c1214f0987',
      actionLink: () => {},
      actionAccount: () => {},
      actionUnlink: () => {},
      isLinked: true,
    },
    {
      header: 'WalletConnect',
      img: 'wallet-connect',
      alt: 'wallet connect',
      aAddress: '0xa3414a1214b1214c1214f0987',
      actionLink: () => {},
      actionAccount: () => {},
      actionUnlink: () => {},
      isLinked: false,
    },
    {
      header: 'Portis',
      img: 'wallet-portis',
      alt: 'wallet portis',
      aAddress: '0xa5614a1214b1214c1214f0987',
      actionLink: () => {},
      actionAccount: () => {},
      actionUnlink: () => {},
      isLinked: true,
    },
    {
      header: 'Metamask',
      img: 'wallet-metamask',
      alt: 'wallet metamask',
      aAddress: '0xa7814a1214b1214c1214f0987',
      actionLink: () => {},
      actionAccount: () => {},
      actionUnlink: () => {},
      isLinked: false,
    },
  ];

  return (
    <SettingBody
      settingsPage={settingsPage}
      data={data}
      userID={userID}
      handleSubmit={handleSubmit}
      closeProfileSetup={closeProfileSetup}
    >
      <div className={styles.myWalletContent}>
        <div className={styles.connectWallets}>
          <h5>Connect Wallets</h5>
          <div className={styles.wallets}>
            {wallets.map((wallet) => (
              <div className={styles.wallet}>
                <h6>{wallet.header}</h6>
                <div className={styles.actionsWrapper}>
                  <img
                    src={`../../assets/images/settings/${wallet.img}.png`}
                    alt={`${wallet.alt}`}
                  />
                  <div className={styles.actions}>
                    {wallet.isLinked ? (
                      <div className={styles.linked}>
                        <button
                          type="button"
                          className={styles.aAddressWrap}
                          onClick={(e) => {
                            e.preventDefault();
                            wallet.actionAccount();
                          }}
                        >
                          <div className={styles.circle}>
                            <img
                              src="../../assets/images/settings/circle-green.png"
                              alt="circle green"
                            />
                          </div>
                          <div className={styles.aAddress}>
                            {wallet.aAddress}
                          </div>
                        </button>
                        <button
                          type="button"
                          className={styles.unlink}
                          onClick={(e) => {
                            e.preventDefault();
                            wallet.actionUnlink();
                          }}
                        >
                          Unlink Wallet
                        </button>
                      </div>
                    ) : (
                      <button
                        type="button"
                        className={styles.link}
                        onClick={(e) => {
                          e.preventDefault();
                          wallet.actionLink();
                        }}
                      >
                        Link Wallet
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className={stylesOverview.balances}>
          <h5>Balances</h5>
          <div className={stylesOverview.cardWrapper}>
            <h6>$MINORITY </h6>
            <div className={stylesOverview.card}>
              <div className={stylesOverview.amountInfo}>
                $MINORITY Earned <div>$150</div>
              </div>
              <div className={stylesOverview.amountInfo}>
                $MINORITY Balance <div>$350</div>
              </div>
              <div className={stylesOverview.addBtn}>Add $MINORITY Funds</div>
            </div>
            <div className={styles.btns}>
              <button
                type="button"
                className={styles.btnBuy}
                onClick={(e) => {
                  e.preventDefault();
                }}
              >
                Buy
              </button>
              <button
                type="button"
                className={styles.btnSell}
                onClick={(e) => {
                  e.preventDefault();
                }}
              >
                Sell
              </button>
            </div>
          </div>
          <div className={stylesOverview.cardWrapper}>
            <h6>$MPA Tokens </h6>
            <div className={stylesOverview.card}>
              <div className={stylesOverview.amountInfo}>
                $MPA Tokens Earned <div>$35</div>
              </div>
              <div className={stylesOverview.amountInfo}>
                $MPA Tokens Balance <div>$65</div>
              </div>
              <div className={stylesOverview.addBtn}>Add $MPA Tokens</div>
            </div>
            <div className={styles.btns}>
              <button
                type="button"
                className={styles.btnBuy}
                onClick={(e) => {
                  e.preventDefault();
                }}
              >
                Buy
              </button>
              <button
                type="button"
                className={styles.btnSell}
                onClick={(e) => {
                  e.preventDefault();
                }}
              >
                Sell
              </button>
            </div>
          </div>
        </div>
      </div>
    </SettingBody>
  );
};

export default SettingBodyWalletMyWallet;
