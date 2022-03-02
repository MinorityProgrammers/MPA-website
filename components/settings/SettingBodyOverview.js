import React, { useEffect, useContext } from 'react';
import styles from '../../styles/settings/settingBodyOverview.module.css';
import { uprContext } from '../../contexts/settingsPagesProvider/settingsPagesProvider';
import getProgressPercentage from '../../contexts/utils/settings/getProgressPercentage';
import Account from '../Account';

const SettingBodyOverview = ({ data, setTabsActive }) => {
  const { setUpdatePasswordRedirection } = useContext(uprContext);
  useEffect(() => {
    setUpdatePasswordRedirection(false);
  }, []);

  const getProgressBar = () => {
    const prg = getProgressPercentage(data);
    let barPrg1 = 0;
    let barPrg2 = 0;
    if (prg <= 50) {
      barPrg1 = (prg / 100) * 185;
    }
    if (prg > 50) {
      barPrg1 = 185;
      barPrg2 = ((prg - 50) / 100) * 360;
    }
    return { barPrg1, barPrg2 };
  };
  return (
    <div className={styles.overviewContent}>
      <div className={`${styles.fItem} ${styles.fiCompletion}`}>
        <div>
          <div className={`${styles.progress} ${styles.blue}`}>
            <span className={styles.progressLeft}>
              <span style={{ transform: `rotate(${getProgressBar().barPrg2}deg)` }} className={styles.progressBar} />
            </span>
            <span className={styles.progressRight}>
              <span style={{ transform: `rotate(${getProgressBar().barPrg1}deg)` }} className={styles.progressBar} />
            </span>
            <div className={styles.progressValue}>
              <p>
                {getProgressPercentage(data)}
                <span>%</span>

              </p>
            </div>
          </div>
        </div>
        {getProgressPercentage(data) === 100 ? (
          <div className={styles.info}>

            <div className={styles.completedProfile}>
              Your Profile Is Complete
            </div>
          </div>

        ) : (
          <div className={styles.info}>

            <p>Your profile is at intermediate level, complete setup to increase your level</p>

            <button
              type="button"
              onClick={() => setTabsActive({
                overview: false, profile: true, notification: false, security: false,
              })}
            >
              Complete setup
            </button>
          </div>

        )}

      </div>
      <div className={styles.fleft}>
        <div className={`${styles.fItem} ${styles.fIProfile}`}>
          <h5>
            Profile
            {' '}
            <i className="fas fa-ellipsis-v" />
          </h5>
          <div className={styles.lineContainer}>
            <div className={styles.line} />
          </div>
          <div className={styles.userContent}>
            <div className={styles.uCLeft}>
              <div className={styles.info}>
                <div className={styles.infoKey}>Role</div>
                <div className={styles.infoValue}>{data?.role}</div>
              </div>
              <div className={styles.info}>
                <div className={styles.infoKey}>Username</div>
                <div className={styles.infoValue}>{data.userName}</div>
              </div>
              <div className={styles.info}>
                <div className={styles.infoKey}>Email</div>
                <div className={styles.infoValue}>
                  <a
                    target="_blank"
                    href={`mailto:${data.email}`}
                    rel="noreferrer"
                  >
                    {data.email}
                  </a>
                </div>
              </div>
              <div className={styles.info}>
                <div className={styles.infoKey}>Link URL</div>
                <div className={styles.infoValue}>
                  <a
                    target="_blank"
                    href={`https://minorityprogrammers.com/user/${data?.userName}`}
                    rel="noreferrer"
                  >
                    {`https://minorityprogrammers.com/user/${data?.userName}`}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={`${styles.fItem} ${styles.fIProfile}`}>
          <h5>
            Wallet
            <i className="fas fa-ellipsis-v" />
          </h5>
          <div className={styles.lineContainer}>
            <div className={styles.line} />
          </div>
          <div style={{ paddingLeft: '35px', paddingBottom: '8px' }} className={`${styles.userContent} ${styles.walletContainer}`}>
            <div className="col-6">
              <div>Connected</div>
              <div className="tw-mt-2">
                <Account />
              </div>
            </div>
            <div className="col-6">
              <div style={{ fontSize: '20px', fontWeight: 'bold' }}>Balance</div>
              <div className={`tw-flex tw-w-8/12 tw-justify-between ${styles.walletRow}`}>
                <h3 className="tw-text-white tw-flex tw-items-center">$ Minority Earned</h3>
                <p style={{ color: '#FF8947' }} className="tw-text-lg tw-font-bold">$ 0</p>
              </div>
              <div className={`tw-flex tw-w-8/12 tw-justify-between ${styles.walletRow}`}>
                <h3 className="tw-text-white tw-flex tw-items-center">$ MPA Earned</h3>
                <p style={{ color: '#FF8947' }} className="tw-text-lg tw-font-bold">$ 0</p>
              </div>
            </div>
          </div>
        </div>
        <div className={`${styles.bodyBottom}`}>
          <div className={`${styles.bottomItem}`}>
            <div>
              <h2>
                Notification
                {' '}
                <i className="fas fa-ellipsis-v" />
              </h2>
            </div>
            <div className={styles.lineContainer}>
              <div className={styles.line} />
            </div>
            <div className={styles.itemElement}>
              <p
                onClick={() => setTabsActive({
                  overview: false, profile: false, notification: true, security: false,
                })}
              >
                Message

              </p>
              <img
                src="../../assets/images/settings/angle-right.svg"
                onClick={() => setTabsActive({
                  overview: false, profile: false, notification: true, security: false,
                })}
                alt="arrow"
              />

            </div>
            <div className={styles.itemElement}>
              <p onClick={() => setTabsActive({
                overview: false, profile: false, notification: true, security: false,
              })}
              >
                Manage message delivery
                Notification
              </p>
              <img
                className="m-auto"
                src="../../assets/images/settings/angle-right.svg"
                onClick={() => setTabsActive({
                  overview: false, profile: false, notification: true, security: false,
                })}
                alt="arrow"
              />

            </div>
          </div>
          <div className={`${styles.bottomItem}`}>
            <div>
              <h2>
                Security and  Login
                {' '}
                <i className="fas fa-ellipsis-v" />
              </h2>
            </div>
            <div className={styles.lineContainer}>
              <div className={styles.line} />
            </div>
            <div className={styles.itemElement}>
              <p onClick={() => setTabsActive({
                overview: false, profile: false, notification: false, security: true,
              })}
              >
                Change Password

              </p>
              <img
                src="../../assets/images/settings/angle-right.svg"
                alt="arrow"
                onClick={() => setTabsActive({
                  overview: false, profile: false, notification: false, security: true,
                })}
              />

            </div>
            <div style={{ marginTop: '8px' }} className={styles.itemElement}>
              <p onClick={() => setTabsActive({
                overview: false, profile: false, notification: false, security: true,
              })}
              >
                Change Username

              </p>
              <img
                src="../../assets/images/settings/angle-right.svg"
                alt="arrow"
                onClick={() => setTabsActive({
                  overview: false, profile: false, notification: false, security: true,
                })}
              />

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingBodyOverview;
