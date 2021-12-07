import React, { useState, useEffect } from 'react';
import jwt from 'jsonwebtoken';
import SettingsLayout from '../../../components/settings/SettingsLayout';
import SpecificSettingsLayout from '../../../components/settings/SpecificSettingsLayout';
import SettingBodyProfileMedia from '../../../components/settings/SettingBodyProfileMedia';

function media() {
  const [data, setData] = useState([]);
  const [userID, setUserID] = useState('');

  useEffect(() => {
    const token = window.localStorage.getItem('jwtToken');
    const userInfo = window.localStorage.getItem('userInfo');

    token && userInfo && setUserID(jwt.decode(token).id);
  }, []);

  return (
    <SettingsLayout setData={setData} settingsPage="profile">
      <SpecificSettingsLayout settingsPage="profile" />
      <SettingBodyProfileMedia
        settingsPage="profile"
        data={data}
        userID={userID}
      />
    </SettingsLayout>
  );
}

export default media;
