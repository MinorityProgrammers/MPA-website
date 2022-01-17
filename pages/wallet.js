import React, { useEffect, useState, useContext } from 'react';
import HomepageNav from '../components/homepage/HomepageNav';
import { GlobalContext } from '../contexts/provider';
import Layout from '../components/Layout';
import WalletComponent from '../components/dashboard/wallet/WalletPage';
import SidebarTwo from '../components/sidebar/SidebarTwo';
import links from '../contexts/utils/links';
import Footer from '../components/Footer';

const index = () => {
  const [userData, setUserData] = useState({});
  const [token, setToken] = useState('');
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [, setData] = useState([]);
  // states from global context

  const {
    authState: {
      auth: { data },
    },
  } = useContext(GlobalContext);

  // redirect unauthorized users

  const redirect = () => {
    window.location.href = '/';
  };
  // spinner loading
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 500);
  }, []);

  // grab a token from local storage so as user info

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
      {/* <DashboardNavbar /> */}
      <HomepageNav
        open={open}
        setData={setData}
        setOpen={setOpen}
        page="CreateProfile"
      />
      <SidebarTwo open={open} setOpen={setOpen} links={links} active="Home" />
      <div className="container dashboard-overall-container d-flex" style={{ padding: 0 }}>
        <div className="outer-dashboard-container">
          <div className="container inner-dashboard-container  tw-mt-28 tw-mb-10">
            {loading
              ? <></>
              : <WalletComponent userData={userData} token={token} />}
          </div>
        </div>
      </div>
      <Footer />
    </Layout>
  );
};

export default index;
