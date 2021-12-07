import React from 'react';
import { useRouter } from 'next/router';
import styles from '../../styles/settings/specificSettingsLayoutNavigation.module.css';
import { getSpecificSettingsLayoutNavigationList } from '../../helpers/getSpecificSettingsLayoutNavigationList';

const SettingsLayout = function ({ settingsPage }) {
  const router = useRouter();

  const settingsSubPage = router.pathname.substring(
    router.pathname.lastIndexOf('/') + 1,
  );

  const settingsNameAndList = getSpecificSettingsLayoutNavigationList(settingsPage);
  return (
    <div className={styles.specificSettingsNavigation}>
      <nav>
        <div className={styles.navHeader}>
          <h1>{settingsNameAndList.header}</h1>
        </div>
        <ul>
          {settingsNameAndList.content.map((setting) => (
            <li
              className={`${styles.navHeader} ${
                settingsSubPage === setting.subPath && styles.activeLi
              }`}
              key={setting.id}
            >
              <div className={styles.h2wrapper}>
                <h2>
                  <div className={styles.icon}>
                    <img
                      src={setting.icon}
                      alt={`${setting.name} icon`}
                      onClick={() => router.push(
                        `/settings/${settingsPage}/${setting.subPath}`,
                      )}
                    />
                  </div>
                  <span
                    onClick={() => router.push(
                      `/settings/${settingsPage}/${setting.subPath}`,
                    )}
                  >
                    {setting.name}
                  </span>
                  <div className={styles.arrow}>
                    <img
                      src="../../assets/images/settings/arrow-white.svg"
                      alt="arrow icon"
                      onClick={() => router.push(
                        `/settings/${settingsPage}/${setting.subPath}`,
                      )}
                    />
                  </div>
                </h2>
              </div>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default SettingsLayout;
