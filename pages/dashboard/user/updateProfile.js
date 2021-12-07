import React, { useEffect, useState, useContext } from 'react';
import { useRouter } from 'next/router';
import DashNav from '../../../components/DashNav';
import Loader from '../../../components/Loader';
import Sidebar from '../../../components/Sidebar';
import UpdateProfile from '../../../components/UpdateProfile';
import { GlobalContext } from '../../../contexts/provider';
import Profile from '../../../components/Profile';
import { getProfile } from '../../../contexts/actions/profile/getProfile';

function dashboard() {
  const [Dark, setDark] = useState(false);
  const [Open, setOpen] = useState(false);
  const [loader, setLoader] = useState(false);
  const [Log, setLog] = useState(false);
  const [notice, setNotice] = useState(false);
  const session = true;
  const [userData, setUserData] = useState({});

  // states from global context

  const {
    profileDispatch,
    profileState: {
      profile: { profileLoading, profileError, profileData },
    },
  } = useContext(GlobalContext);

  useEffect(() => {
    getProfile(setUserData)(profileDispatch);
  }, []);

  // redirect unauthorized users

  const redirect = () => {
    window.location.href = '/login';
  };
  // grab a token from local storage so as user info

  useEffect(() => {
    const token = window.localStorage.getItem('jwtToken');
    const userInfo = window.localStorage.getItem('userInfo');

    if (token == null || userInfo == {}) {
      redirect();
    }
  }, [profileData]);

  let firstName;
  let lastName;

  if (userData.firstName === userData.lastName) {
    firstName = userData.firstName;
    lastName = 'Last Name';
  } else {
    firstName = userData.firstName;
    lastName = userData.lastName;
  }

  return (
    <>
      {session && (
        <>
          <div
            className={`${
              loader ? 'tw-flex tw-items-center tw-justify-center tw-h-screen' : 'tw-hidden'
            }`}
          />
          <div
            className={`${
              loader ? 'tw-hidden' : 'tw-grid'
            }   tw-grid-cols-1 lg:tw-grid-cols-main tw-font-body  tw-grid-rows-main`}
          >
            <DashNav
              Open={Open}
              setOpen={setOpen}
              user={userData}
            />
            <Sidebar Open={Open} user={userData} />
            <UpdateProfile
              Open={Open}
              setOpen={setOpen}
              setLog={setLog}
              setNotice={setNotice}
              user={userData}
            />

          </div>
        </>
      )}
    </>
  );
}

export default dashboard;
