import React, { useState, useRef, useEffect, useContext } from 'react';
import Layout from '../../components/Layout';
import Footer from '../../components/Footer';
import HomepageNav from '../../components/homepage/HomepageNav';
import useDetectOutsideClick from '../../components/UseDetectOutsideClick';
import ChapterHeader from '../../components/chapterHeader/chapterHeader.component';
import ChapterDirectory from '../../components/ChapterDirectory/ChapterDirectory.component';
import SidebarTwo from '../../components/sidebar/SidebarTwo';
import links from '../../contexts/utils/links';
import { GlobalContext } from '../../contexts/provider';

const Chapter = () => {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState('');
  const [userData, setUserData] = useState([]);
  const [token, setToken] = useState('');
  const dropdownRef = useRef(null);
  const {
    authState: {
      auth: { data },
    },
  } = useContext(GlobalContext);

  useEffect(() => {
    const userToken = window.localStorage.getItem('jwtToken');
    const userInfo = window.localStorage.getItem('userInfo');

    if (userToken == null || userInfo === {}) {
      setUserData(null);
      setActive(false);
    } else {
      setUserData(Object.values(JSON.parse(userInfo))[1]);
      setActive(true);
    }
  }, [data]);

  const [hide, setHide] = useDetectOutsideClick(dropdownRef, false);
  const handleClick = () => {
    setHide(!hide);
  };
  if (hide === false) {
    setTimeout(() => {
      setHide(true);
    }, 60000);
  }

  return (
    <Layout pageTitle="Chapter">
      <HomepageNav
        open={open}
        setOpen={setOpen}
        page="Chapter_start"
        setToken={setToken}
      />
      <SidebarTwo
        open={open}
        setOpen={setOpen}
        links={links}
        active="Home"
        handleClick={handleClick}
      />

      <ChapterHeader />
      <ChapterDirectory token={token} userData={userData} active={active} />
      <Footer />
    </Layout>
  );
};

export default Chapter;
