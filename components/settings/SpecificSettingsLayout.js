import React, { useEffect } from 'react';
import styles from '../../styles/settings/specificSettingsLayoutNavigation.module.css';
import getSpecificSettingsLayoutNavigationList from '../../helpers/getSpecificSettingsLayoutNavigationList';

const SettingsLayout = ({ settingsPage, subActive, setSubActive }) => {
  const settingsNameAndList = getSpecificSettingsLayoutNavigationList(settingsPage);
  const getNavs = (subpath) => {
    const navs = {};
    navs[subpath] = true;
    settingsNameAndList.content.forEach((setting) => {
      if (setting.subPath !== subpath) navs[setting.subPath] = false;
    });
    return navs;
  };
  useEffect(() => {
    if (settingsPage === 'security') {
      setSubActive({
        login: true,
        management: false,
        privacy: false,
      });
    } else if (settingsPage === 'notifications') {
      setSubActive({
        notifications: true,
      });
    }
  }, []);
  return (
    <div className={styles.specificSettingsNavigation}>
      <nav>
        <div className={styles.navHeader}>
          <h1>{settingsNameAndList.header}</h1>
        </div>
        <ul>
          {settingsNameAndList.content.map((setting) => (
            <li
              className={`${styles.navHeader} ${subActive[setting.subPath]
                && styles.activeLi
              }`}
              key={setting.id}
            >
              <div className={styles.h2wrapper}>
                <h2>
                  <div className={styles.icon}>
                    <img
                      src={setting.icon}
                      alt={`${setting.name} icon`}
                      onClick={() => setSubActive(getNavs(setting.subPath))}
                    />
                  </div>
                  <span
                    onClick={() => setSubActive(getNavs(setting.subPath))}
                  >
                    {setting.name}
                  </span>
                  <div className={styles.arrow}>
                    <img
                      src="../../assets/images/settings/arrow-white.svg"
                      alt="arrow icon"
                      onClick={() => setSubActive(getNavs(setting.subPath))}
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
