import React, {
  useEffect, useState, useContext, useRef,
} from 'react';
import HomepageNav from '../components/homepage/HomepageNav';
import { GlobalContext } from '../contexts/provider';
import Layout from '../components/Layout';
import WalletComponent from '../components/dashboard/wallet/WalletPage';
import SidebarTwo from '../components/sidebar/SidebarTwo';
import links from '../contexts/utils/links';
import Footer from '../components/Footer';
import ComingSoon from '../components/ComingSoon';
import useDetectOutsideClick from '../components/UseDetectOutsideClick';

const index = () => {
  const [userData, setUserData] = useState({});
  const [token, setToken] = useState('');
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [, setData] = useState([]);
  const dropdownRef = useRef(null);
  const [hide, setHide] = useDetectOutsideClick(dropdownRef, false);

  const handleClick = () => {
    setHide(!hide);
  };

  const {
    authState: {
      auth: { data },
    },
  } = useContext(GlobalContext);

  const redirect = () => {
    window.location.href = '/';
  };
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 500);
  }, []);

  useEffect(() => {
    document.title = 'Dashboard';
    setToken(window.localStorage.getItem('jwtToken'));
    const userInfo = window.localStorage.getItem('userInfo');

    if (token == null || userInfo == null) {
      redirect();
    }
    setUserData(Object.values(JSON.parse(userInfo))[1]);
  }, [data]);

  return (
    <Layout pageTitle="Dashboard">
      <HomepageNav
        open={open}
        setData={setData}
        setOpen={setOpen}
        page="CreateProfile"
      />
      <SidebarTwo open={open} setOpen={setOpen} links={links} active="Home" />
      {hide === false && <ComingSoon closeClick={handleClick} />}
      <div
        className="container dashboard-overall-container d-flex"
        style={{ padding: 0 }}
      >
        <div style={{ width: '100%' }} className="outer-dashboard-container">
          <div className="container inner-wallet-dashboard-container  tw-mt-28 tw-mb-10">
            {loading ? (
              <></>
            ) : (
              <WalletComponent userData={userData} token={token} />
            )}
          </div>
        </div>
      </div>
      <Footer />
    </Layout>
  );
};

export default index;
