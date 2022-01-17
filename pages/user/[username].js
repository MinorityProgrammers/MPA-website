import React, {
  useEffect, useState, useContext, useRef,
} from 'react';
import { useRouter } from 'next/router';
import NotFoundPage from '../404';
import Layout from '../../components/Layout';
import HomepageNav from '../../components/homepage/HomepageNav';
import SidebarTwo from '../../components/sidebar/SidebarTwo';
import ProfileTwo from '../../components/ProfileTwo';
import { GlobalContext } from '../../contexts/provider';
import getProfile from '../../contexts/actions/profile/getProfile';
import links from '../../contexts/utils/links';
import Footer from '../../components/Footer';
import ComingSoon from '../../components/ComingSoon';
import useDetectOutsideClick from '../../components/UseDetectOutsideClick';

const User = function ({ user }) {
  const [hiddenProfileValidated, setHiddenProfileValidated] = useState(false);
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);
  const [hide, setHide] = useDetectOutsideClick(dropdownRef, false);
  const [userData, setUserData] = useState({});
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [ownsProfile, setOwnsProfile] = useState(false);

  useEffect(() => {
    const timeoutID = setTimeout(() => (
      !((isLoggedIn && ownsProfile) || user[0]?.profileVisibility)
        && setHiddenProfileValidated(true)
    ), 2000);
    return () => { clearTimeout(timeoutID); };
  }, [isLoggedIn, ownsProfile, user]);

  const handleClick = () => {
    setHide(!hide);
  };

  // states from global context
  const {
    profileDispatch,
    profileState: {
      profile: { profileData },
    },
  } = useContext(GlobalContext);

  const router = useRouter();

  // grab a token from local storage so as user info
  useEffect(() => {
    if (window.localStorage.getItem('jwtToken')) {
      getProfile(setUserData)(profileDispatch);
    }
  }, []);

  // user is logged in and viewing own profile page
  useEffect(() => {
    setOwnsProfile(
      userData?.userName === user[0]?.userName
        || profileData?.userName === user[0]?.userName,
    );
  }, [user, userData, profileData]);

  useEffect(() => {
    const token = window.localStorage.getItem('jwtToken');
    const userInfo = window.localStorage.getItem('userInfo');

    if (token == null || userInfo === {}) {
      setIsLoggedIn(false);
    } else {
      setIsLoggedIn(true);
    }
  }, [userData, profileData]);

  useEffect(() => {
    if (userData && ownsProfile && userData?.isUpdated === false) {
      router.push('/create-profile');
    }
  }, [userData]);

  if (hide === false) {
    setTimeout(() => {
      setHide(true);
    }, 60000);
  }

  // console.log(userData, profileData);
  return (
    <Layout pageTitle="Profile">
      {(isLoggedIn && ownsProfile && user?.[0])
      || user[0]?.profileVisibility !== false ? (
        <>
          <HomepageNav
            setData={setUserData}
            open={open}
            setOpen={setOpen}
            page="user"
          />
          <SidebarTwo
            open={open}
            setOpen={setOpen}
            links={links}
            active="Home"
            handleClick={handleClick}
          />
          {hide === false && <ComingSoon closeClick={handleClick} />}
          <ProfileTwo
            userData={
              isLoggedIn && ownsProfile ? userData || profileData : user[0]
            }
            isLoggedIn={isLoggedIn}
            ownsProfile={ownsProfile}
          />
          <Footer />
        </>
        ) : hiddenProfileValidated ? (
          <NotFoundPage />
        ) : (
          <></>
        )}
    </Layout>
  );
};

export default User;

export const getServerSideProps = async (context) => {
  const slug = context.params.username;

  const res = await fetch(`${process.env.BASE_URI}/user/${slug}`);
  const { data } = await res.json();

  return {
    props: { user: data },
  };
};

// // static generation
// export const getStaticPaths = async () => {
//   const res = await fetch(
//     "${process.env.BASE_URI}/user/"
//   );
//   const data = await res.json();

//   const paths = data.data.map((user) => {
//     return { params: { username: user.userName } };
//   });

//   return {
//     paths,
//     fallback: false,
//   };
// };
// // static generation
// export const getStaticProps = async (context) => {
//   const slug = context.params.username;

//   const res = await fetch(
//     `${process.env.BASE_URI}/user/${slug}`
//   );
//   const data = await res.json();

//   return {
//     props: { user: data },
//   };
// };
