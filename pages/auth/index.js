import React, { useRef, useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Styles from './auth.module.css';
import Card from '../../components/login-signup/card/index';
import Layout from '../../components/Layout';
import HomepageNav from '../../components/HomepageNav';
import Footer from '../../components/Footer';
import SidebarTwo from '../../components/SidebarTwo';
import links from '../../contexts/utils/links';
import ComingSoon from '../../components/ComingSoon';
import { useDetectOutsideClick } from '../../components/UseDetectOutsideClick';

const Index = function () {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);
  const [hide, setHide] = useDetectOutsideClick(dropdownRef, true);
  const [data, setData] = useState([]);
  const handleClick = () => {
    setHide(!hide);
  };
  if (hide == false) {
    setTimeout(() => {
      setHide(true);
    }, 10000);
  }

  useEffect(() => {
    if (data === null) {
      window.location.href = '/';
    }
  }, []);

  const router = useRouter();

  // user redirection's
  useEffect(() => {
    const user = JSON.parse(window?.localStorage.getItem('userInfo'))?.user
      || JSON.parse(window?.localStorage.getItem('userInfo'));
    // console.log(user);
    if (user?.isUpdated === true) {
      const slug = user?.userName;
      router.push(`/user/${slug}`);
    }
    if (user?.isUpdated === false) {
      router.push('/create-profile');
    }
  }, [data]);

  return (
    <div className={Styles.container}>
      <Layout pageTitle="MPA - Authentication">
        <HomepageNav open={open} setData={setData} setOpen={setOpen} page="auth" />
        <SidebarTwo
          open={open}
          setOpen={setOpen}
          links={links}
          active="Home"
        />
        {data !== [] && (
          <>

            {hide == false && <ComingSoon closeClick={handleClick} />}
            <div
              style={{ marginTop: '0' }}
              className="tw-mx-24 tw-my-32 md:tw-mx-4"
            >
              <Card />
            </div>
            <Footer />
          </>
        )}
      </Layout>
    </div>
  );
};

export default Index;
