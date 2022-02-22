import React from 'react';
import { useRouter } from 'next/router';
import styles from '../../styles/settings/settingBody.module.css';
import getSpecificSettingsLayoutNavigationList from '../../helpers/getSpecificSettingsLayoutNavigationList';

const SettingBody = ({
  settingsPage,
  children,
  closeProfileSetup,
  handleSubmit,
}) => {
  const router = useRouter();

  const settingsSubPage = router.pathname.substring(
    router.pathname.lastIndexOf('/') + 1,
  );

  const settingsNameAndList = getSpecificSettingsLayoutNavigationList(settingsPage);

  return (
    <div className={styles.detailSettings}>
      <div className={styles.settingHeader}>
        <h1>
          {
            settingsNameAndList?.content?.find(
              (dataObj) => dataObj.subPath === settingsSubPage,
            )?.name
          }
        </h1>
      </div>
      <div
        className={styles.settingContent}
        style={
          settingsSubPage === 'my-wallet'
          || settingsSubPage === 'votes'
          || settingsSubPage === 'management'
            ? { height: '94%' }
            : {}
        }
      >
        {children}
        {settingsSubPage !== 'my-wallet'
          && settingsSubPage !== 'votes'
          && settingsSubPage !== 'management' && (
            <div className={styles.footerButtons}>
              <button
                type="button"
                className={styles.danger}
                onClick={(e) => {
                  e.preventDefault();
                  closeProfileSetup();
                }}
              >
                Discard Changes
              </button>
              <button
                type="button"
                className={styles.success}
                onClick={(e) => {
                  e.preventDefault();
                  handleSubmit();
                }}
              >
                Save Changes
              </button>
            </div>
        )}
      </div>
    </div>
  );
};

export default SettingBody;
