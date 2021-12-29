import React, {
  useContext, useEffect, useRef, useState,
} from 'react';
import ComingSoon from '../components/ComingSoon';
import Footer from '../components/Footer';
import HomepageNav from '../components/homepage/HomepageNav';
import Layout from '../components/Layout';
import Search from '../components/search/search-main/search';
import SidebarTwo from '../components/SidebarTwo';
import { useDetectOutsideClick } from '../components/UseDetectOutsideClick';
import { GlobalContext } from '../contexts/provider';
import links from '../contexts/utils/links';

const search = () => {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(false);
  const [clickRegister, setClickRegister] = useState(false);
  const [token, setToken] = useState(null);
  const dropdownRef = useRef(null);
  const [userData, setUserData] = useState([]);
  const [hide, setHide] = useDetectOutsideClick(dropdownRef, false);

  const handleClick = () => {
    setHide(!hide);
  };
  if (hide === false) {
    setTimeout(() => {
      setHide(true);
    }, 60000);
  }

  const {
    authDispatch,
    authState: {
      auth: { loading, error, data },
    },
  } = useContext(GlobalContext);

  useEffect(() => {
    const token = window.localStorage.getItem('jwtToken');
    const userInfo = window.localStorage.getItem('userInfo');
    setToken(token);
    if (token == null || userInfo === {}) {
      setUserData(null);
      setActive(false);
    } else {
      setUserData(Object.values(JSON.parse(userInfo))[1]);
      setActive(true);
    }
  }, [data]);

  return (
    <div>
      <Layout pageTitle="MPA - Search">
        <div className="section__styles__">
          <HomepageNav
            open={open}
            setOpen={setOpen}
            page="Search"
            setToken={setToken}
          />
          <SidebarTwo
            open={open}
            setOpen={setOpen}
            links={links}
            active="Home"
            handleClick={handleClick}
          />
          {hide === false && <ComingSoon closeClick={handleClick} />}
          <Search
            userData={userData}
            active={active}
            setClickRegister={setClickRegister}
            clickRegister={clickRegister}
            token={token}
          />
        </div>
        <Footer />
      </Layout>
    </div>
  );
};

export default search;
