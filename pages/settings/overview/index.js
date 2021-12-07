import React, { useState, useEffect } from 'react';
import jwt from 'jsonwebtoken';
import SettingsLayout from '../../../components/settings/SettingsLayout';
import SettingBodyOverview from '../../../components/settings/SettingBodyOverview';

function overview() {
  const [data, setData] = useState([]);
  const [userID, setUserID] = useState('');

  useEffect(() => {
    const token = window.localStorage.getItem('jwtToken');
    const userInfo = window.localStorage.getItem('userInfo');

    token && userInfo && setUserID(jwt.decode(token).id);
  }, []);

  return (
    <SettingsLayout setData={setData} settingsPage="overview">
      <SettingBodyOverview data={data} />
    </SettingsLayout>
  );
}

export default overview;
