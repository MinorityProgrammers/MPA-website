import React, { useState, useEffect, useContext } from 'react';
import FormData from 'form-data';
import { useRouter } from 'next/router';
import { GlobalContext } from '../../contexts/provider';
import { updateProfile } from '../../contexts/actions/profile/updateProfile';
import { all } from '../../contexts/utils/settings/settingsInputFields';
import styles from '../../styles/settings/settingBodySecurityManagement.module.css';
import SettingBody from './SettingBody';
import SettingBodySecurityManagementModal from './SettingBodySecurityManagementModal';

const SettingBodySecurityManagement = function ({ settingsPage, data, userID }) {
  const [modal, openModal] = useState('');
  const router = useRouter();

  const goBack = () => {
    openModal(false);
  };
  const deactivateAccount = () => {
    openModal(false);
  };
  const deleteAccount = () => {
    openModal(false);
  };

  return (
    <SettingBody settingsPage={settingsPage} data={data} userID={userID}>
      {(modal === 'deactivate' || modal === 'delete') && (
        <SettingBodySecurityManagementModal
          modal={modal}
          goBack={goBack}
          deactivateAccount={deactivateAccount}
          deleteAccount={deleteAccount}
        />
      )}
      <div className={styles.managementContent}>
        <div className={styles.btnWrapper}>
          <div
            className={`${styles.btn} ${styles.deactivate}`}
            onClick={() => openModal('deactivate')}
          >
            Deactivate Account
          </div>
          <p>
            *Temporarily deactivates your account. Must be reactivated by MPA.
          </p>
        </div>
        <div className={styles.btnWrapper}>
          <div
            className={`${styles.btn} ${styles.delete}`}
            onClick={() => openModal('delete')}
          >
            Delete Account
          </div>
          <p>*Permanently deletes your account, cannot be reactivated.</p>
        </div>
      </div>
    </SettingBody>
  );
};

export default SettingBodySecurityManagement;
