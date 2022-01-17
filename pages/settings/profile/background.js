import React, { useState, useEffect } from 'react';
import jwt from 'jsonwebtoken';
import SettingsLayout from '../../../components/settings/SettingsLayout';
import SpecificSettingsLayout from '../../../components/settings/SpecificSettingsLayout';
import SettingBodyProfileBackground from '../../../components/settings/SettingBodyProfileBackground';

function background() {
  const [data, setData] = useState([]);
  const [userID, setUserID] = useState('');

  useEffect(() => {
    const token = window.localStorage.getItem('jwtToken');
    const userInfo = window.localStorage.getItem('userInfo');

    if (token && userInfo) { setUserID(jwt.decode(token).id); }
  }, []);

  return (
    <SettingsLayout setData={setData} settingsPage="profile">
      <SpecificSettingsLayout settingsPage="profile" />
      <SettingBodyProfileBackground
        settingsPage="profile"
        data={data}
        userID={userID}
      />
    </SettingsLayout>
  );
}

export default background;
