import React, { useState, useEffect } from 'react';
import jwt from 'jsonwebtoken';
import SettingsLayout from '../../../components/settings/SettingsLayout';
import SpecificSettingsLayout from '../../../components/settings/SpecificSettingsLayout';
import SettingBodyProfileOverview from '../../../components/settings/SettingBodyProfileOverview';
import ProfileTwoGenerateAvatarPopUp from '../../../components/ProfileTwoGenerateAvatarPopUp';

function overview() {
  const [data, setData] = useState([]);
  const [userID, setUserID] = useState('');
  const [generateAvatarPopUp, setGenerateAvatarPopUp] = useState(false);

  useEffect(() => {
    const token = window.localStorage.getItem('jwtToken');
    const userInfo = window.localStorage.getItem('userInfo');

    token && userInfo && setUserID(jwt.decode(token).id);
  }, []);

  return (
    <>
      <SettingsLayout setData={setData} settingsPage="profile">
        <SpecificSettingsLayout settingsPage="profile" />
        <SettingBodyProfileOverview
          settingsPage="profile"
          data={data}
          userID={userID}
          setGenerateAvatarPopUp={setGenerateAvatarPopUp}
        />
      </SettingsLayout>
      {generateAvatarPopUp && (
        <div
          className="profile-two-generate-avatar-popup"
          style={{ top: '17.5vh' }}
        >
          <ProfileTwoGenerateAvatarPopUp
            loggedInUserData={data}
            userID={userID}
            setGenerateAvatarPopUp={setGenerateAvatarPopUp}
          />
        </div>
      )}
    </>
  );
}

export default overview;
