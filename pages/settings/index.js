import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
// settings nav
import SettingsLayout from '../../components/settings/SettingsLayout';
// Overview
import SettingBodyOverview from '../../components/settings/SettingBodyOverview';
// Profile
import SettingSetup from '../../components/settings/SettingSetup';
// Notifications
import SettingsNotifications from '../../components/settings/SettingsNotifications';
// security and login
import SettingsSecurity from '../../components/settings/SettingsSecurity';

const index = () => {
  const router = useRouter();

  const [data, setData] = useState({});
  const [tabsActive, setTabsActive] = useState({
    overview: true, profile: false, notification: false, security: false,
  });
  const [step, setStep] = useState(1);
  const [profileStep, setProfileStep] = useState(router.query.step);

  useEffect(() => {
    if (data === null) {
      router.push('/auth');
    }
  }, [data]);
  useEffect(() => {
    if (profileStep && Object.keys(data).length > 0) {
      setTabsActive({
        overview: false, profile: true, notification: false, security: false,
      });
      setStep(parseInt(router.query.step));
      setProfileStep(0);
    }
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
      <SettingsNotifications data={data} />
      )}
      {tabsActive.security
      && (<SettingsSecurity data={data} />
      )}
    </SettingsLayout>
  );
};

export default index;
