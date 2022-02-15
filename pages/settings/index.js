import React, { useState, useEffect } from 'react';
import jwt from 'jsonwebtoken';
// settings nav
import SettingsLayout from '../../components/settings/SettingsLayout';
// Overview
import SettingBodyOverview from '../../components/settings/SettingBodyOverview';
// Profile
import SettingSetup from '../../components/settings/SettingSetup';
// Notifications
import SettingBodyNotificationsNotifications from '../../components/settings/SettingBodyNotificationsNotifications';
import SpecificSettingsLayout from '../../components/settings/SpecificSettingsLayout';
import all from '../../contexts/utils/settings/settingsInputFields';
// security and login
import SettingBodySecurityLogin from '../../components/settings/SettingBodySecurityLogin';
import SettingBodySecurityManagement from '../../components/settings/SettingBodySecurityManagement';
import SettingBodySecurityPrivacy from '../../components/settings/SettingBodySecurityPrivacy';

const index = () => {
  const [data, setData] = useState([]);
  const [userID, setUserID] = useState('');
  const [tabsActive, setTabsActive] = useState({
    overview: true, profile: false, notification: false, security: false,
  });
  // Security tabs
  const [subActive, setSubActive] = useState({
  });
  // Notifications
  const inputFields = tabsActive.notification ? [
    all.notifyMessagesField,
    all.notifyAccountActivityField,
    all.notifyJobAlertsField,
    all.notifyEventsField,
  ] : [all.profileVisibilityField,
    all.birthdayVisibilityField,
    all.locationVisibilityField,
    all.emailVisibilityField];
  const initialInputState = {};

  inputFields.forEach((field) => {
    initialInputState[field.name] = '';
  });
  const [inputStates, setInputStates] = useState(initialInputState);

  useEffect(() => {
    const token = window.localStorage.getItem('jwtToken');
    const userInfo = window.localStorage.getItem('userInfo');

    if (token && userInfo) {
      setUserID(jwt.decode(token).id);
    }
    inputFields.forEach((field) => {
      initialInputState[field.name] = data?.[field.name] || false;
    });

    setInputStates(initialInputState);
  }, [data]);
  return (
    <SettingsLayout setData={setData} settingsPage="overview" tabsActive={tabsActive} setTabsActive={setTabsActive}>
      {tabsActive.overview
      && <SettingBodyOverview data={data} />}
      {tabsActive.profile
      && <SettingSetup setData={setData} data={data} />}
      {tabsActive.notification
      && (
        <>
          <SpecificSettingsLayout settingsPage="notifications" subActive={subActive} setSubActive={setSubActive} />

          <SettingBodyNotificationsNotifications
            setInputStates={setInputStates}
            inputStates={inputStates}
            settingsPage="notifications"
            data={data}
            userID={userID}
          />
        </>
      )}
      {tabsActive.security
      && (
        <>
          <SpecificSettingsLayout
            settingsPage="security"
            setSubActive={setSubActive}
            subActive={subActive}
          />
          {subActive.login && (
          <SettingBodySecurityLogin
            settingsPage="security"
            data={data}
            userID={userID}
          />
          )}
          {subActive.management && (
          <SettingBodySecurityManagement
            settingsPage="security"
            data={data}
            userID={userID}

          />
          )}
          {subActive.privacy && (
          <SettingBodySecurityPrivacy
            settingsPage="security"
            data={data}
            userID={userID}
            setInputStates={setInputStates}
            inputStates={inputStates}
          />
          )}
        </>
      )}
    </SettingsLayout>
  );
};

export default index;
