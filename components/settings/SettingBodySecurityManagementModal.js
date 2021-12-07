import React, { useState } from 'react';
import styles from '../../styles/settings/settingBodySecurityManagementModal.module.css';

const SettingBodySecurityManagementModal = function ({
  modal,
  goBack,
  deactivateAccount,
  deleteAccount,
}) {
  const [feedBack, setFeedBack] = useState('');

  return (
    <div className={styles.modalWrap}>
      <div className={styles.modalADD}>
        <h1>
          Are you sure you want to
          {`${modal}`}
          {' '}
          your account?
        </h1>
        <p>
          Please leave a feedback why you are
          {' '}
          {`${modal.slice(0, -1)}ing`}
          {' '}
          your
          account:
        </p>
        <textarea
          placeholder="Feedback here"
          value={feedBack}
          onChange={(e) => setFeedBack(e.target.value)}
        />
        <div className={styles.actionBtns}>
          <div className={`${styles.goBack} ${styles.btn}`} onClick={goBack}>
            Go Back
          </div>
          <div
            className={`${styles[modal]} ${styles.btn}`}
            onClick={modal === 'delete' ? deleteAccount : deactivateAccount}
          >
            {`${modal} Account`}
          </div>
        </div>
        <div className={styles.ps}>
          <span className={modal === 'delete' ? styles.warn : styles.note}>
            {modal === 'delete' ? 'WARNING! ' : 'NOTE! '}
          </span>
          {modal === 'delete'
            ? `Your account will be permanently deleted and
          cannot be reactivated!`
            : 'Your account can be reactivated by MPA'}
        </div>
      </div>
    </div>
  );
};

export default SettingBodySecurityManagementModal;
