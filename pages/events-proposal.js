import React, {
  useContext, useEffect, useRef, useState,
} from 'react';
import ComingSoon from '../components/ComingSoon';
import Events from '../components/events-proposal/events-component/events-component';
import Footer from '../components/Footer';
import HomepageNav from '../components/homepage/HomepageNav';
import Layout from '../components/Layout';
import SidebarTwo from '../components/sidebar/SidebarTwo';
import { useDetectOutsideClick } from '../components/UseDetectOutsideClick';
import { GlobalContext } from '../contexts/provider';
import links from '../contexts/utils/links';

const events = () => {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(false);
  const [clickRegister, setClickRegister] = useState(false);
  const [token, setToken] = useState('');
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
      <Layout pageTitle="MPA - Events">
        <div className="section__styles__">
          <HomepageNav
            open={open}
            setOpen={setOpen}
            page="Events"
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
          <Events
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

export default events;
