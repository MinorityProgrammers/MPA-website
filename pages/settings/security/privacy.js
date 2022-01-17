import React, { useState, useEffect } from 'react';
import jwt from 'jsonwebtoken';
import SettingsLayout from '../../../components/settings/SettingsLayout';
import SpecificSettingsLayout from '../../../components/settings/SpecificSettingsLayout';
import SettingBodySecurityPrivacy from '../../../components/settings/SettingBodySecurityPrivacy';

function privacy() {
  const [data, setData] = useState([]);
  const [userID, setUserID] = useState('');

  useEffect(() => {
    const token = window.localStorage.getItem('jwtToken');
    const userInfo = window.localStorage.getItem('userInfo');

    if (token && userInfo) { setUserID(jwt.decode(token).id); }
  }, []);

  return (
    <SettingsLayout setData={setData} settingsPage="security">
      <SpecificSettingsLayout settingsPage="security" />
      <SettingBodySecurityPrivacy
        settingsPage="security"
        data={data}
        userID={userID}
      />
    </SettingsLayout>
  );
}

export default privacy;
