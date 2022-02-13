import React, { useState, useEffect } from 'react';
import jwt from 'jsonwebtoken';
import SettingsLayout from '../../components/settings/SettingsLayout';
import SettingBodyOverview from '../../components/settings/SettingBodyOverview';
import SettingSetup from '../../components/settings/SettingSetup';

const index = () => {
  const [data, setData] = useState([]);
  const [, setUserID] = useState('');
  const [tabsActive, setTabsActive] = useState({ overview: true, profile: false });
  useEffect(() => {
    const token = window.localStorage.getItem('jwtToken');
    const userInfo = window.localStorage.getItem('userInfo');

    if (token && userInfo) {
      setUserID(jwt.decode(token).id);
    }
  }, []);
  return (
    <SettingsLayout setData={setData} settingsPage="overview" tabsActive={tabsActive} setTabsActive={setTabsActive}>
      {tabsActive.overview
      && <SettingBodyOverview data={data} />}
      {tabsActive.profile
      && <SettingSetup setData={setData} data={data} />}
    </SettingsLayout>
  );
};

export default index;
