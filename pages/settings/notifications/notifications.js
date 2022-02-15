import jwt from 'jsonwebtoken';
import React, { useEffect, useState } from 'react';
import SettingBodyNotificationsNotifications from '../../../components/settings/SettingBodyNotificationsNotifications';
import SettingsLayout from '../../../components/settings/SettingsLayout';
import SpecificSettingsLayout from '../../../components/settings/SpecificSettingsLayout';

function notifications() {
  const [data, setData] = useState([]);
  const [userID, setUserID] = useState('');
  const [tabsActive, setTabsActive] = useState({ overview: true, profile: false });

  useEffect(() => {
    const token = window.localStorage.getItem('jwtToken');
    const userInfo = window.localStorage.getItem('userInfo');

    if (token && userInfo) { setUserID(jwt.decode(token).id); }
  }, []);

  return (
    <SettingsLayout setData={setData} settingsPage="overview" tabsActive={tabsActive} setTabsActive={setTabsActive}>
      <SpecificSettingsLayout settingsPage="notifications" />
      <SettingBodyNotificationsNotifications
        settingsPage="notifications"
        data={data}
        userID={userID}
      />
    </SettingsLayout>
  );
}

export default notifications;
