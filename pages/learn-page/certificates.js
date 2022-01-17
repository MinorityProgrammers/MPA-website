import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import Layout from '../../components/Layout';
import HomepageNav from '../../components/homepage/HomepageNav';
import Footer from '../../components/Footer';
import Certificates from '../../components/learn/Certificates';
import SidebarTwo from '../../components/sidebar/SidebarTwo';
import links from '../../contexts/utils/links';
import ComingSoon from '../../components/ComingSoon';
import useDetectOutsideClick from '../../components/UseDetectOutsideClick';

const LearnPage = function () {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);
  const [hide, setHide] = useDetectOutsideClick(dropdownRef, true);
  const [data, setData] = useState([]);
  const [certificate, setCertificate] = useState([]);
  const [loading, setLoading] = useState(true);
  const handleClick = () => {
    setHide(!hide);
  };
  if (hide === false) {
    setTimeout(() => {
      setHide(true);
    }, 60000);
  }

  useEffect(() => {
    const userToken = JSON.parse(localStorage.getItem('userInfo'));
    if (userToken !== null) {
      axios
        .get(`${process.env.BASE_URI}/certificate/getUserCertificate`, {
          headers: {
            Authorization: `Bearer ${userToken.token}`,
          },
        })
        .then((res) => {
          setCertificate(res.data.data);
          setTimeout(() => { setLoading(false); }, 3000);
        });
    }
  }, [typeof window !== 'undefined'
    ? window.localStorage.getItem('jwtToken')
    : null]);

  return (
    <Layout pageTitle="Learn Page - Minority Programmers Association">
      <HomepageNav
        open={open}
        setOpen={setOpen}
        page="learn-page"
        setData={setData}
      />
      <SidebarTwo
        open={open}
        setOpen={setOpen}
        links={links}
        active="Home"
        handleClick={handleClick}
      />
      {hide === false && <ComingSoon closeClick={handleClick} />}
      <div className="tw-py-20 certificate">
        <Certificates
          user={data}
          certificates={certificate}
          loading={loading}
        />
      </div>
      <Footer />
    </Layout>
  );
};

export default LearnPage;
