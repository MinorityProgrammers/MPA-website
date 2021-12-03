import React, { useState, useEffect } from "react";
import SettingsLayout from "../../../components/settings/SettingsLayout";
import SpecificSettingsLayout from "../../../components/settings/SpecificSettingsLayout";
import jwt from "jsonwebtoken";
import SettingBodySecurityLogin from "../../../components/settings/SettingBodySecurityLogin";

function login() {
  const [data, setData] = useState([]);
  const [userID, setUserID] = useState("");

  useEffect(() => {
    const token = window.localStorage.getItem("jwtToken");
    const userInfo = window.localStorage.getItem("userInfo");

    token && userInfo && setUserID(jwt.decode(token).id);
  }, []);

  return (
    <SettingsLayout setData={setData} settingsPage="security">
      <SpecificSettingsLayout settingsPage="security" />
      <SettingBodySecurityLogin
        settingsPage="security"
        data={data}
        userID={userID}
      />
    </SettingsLayout>
  );
}

export default login;
