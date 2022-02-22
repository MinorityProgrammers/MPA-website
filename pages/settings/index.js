import React, { useState, useEffect } from 'react';
import jwt from 'jsonwebtoken';
import { useRouter } from 'next/router';
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
  const router = useRouter();

  const [data, setData] = useState({});
  const [userID, setUserID] = useState('');
  const [tabsActive, setTabsActive] = useState({
    overview: true, profile: false, notification: false, security: false,
  });
  const [step, setStep] = useState(1);
  const [profileStep, setProfileStep] = useState(router.query.step);

  // Security tabs
  const [subActive, setSubActive] = useState({
  });

  useEffect(() => {
    if (profileStep && Object.keys(data).length > 0) {
      setTabsActive({
        overview: false, profile: true, notification: false, security: false,
      });
      setStep(parseInt(router.query.step));
      setProfileStep(0);
    }
  }, [data]);
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
      && <SettingBodyOverview setTabsActive={setTabsActive} data={data} />}
      {tabsActive.profile
      && (
      <SettingSetup
        setData={setData}
        data={data}
        setStep={setStep}
        step={step}
      />
      )}
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
