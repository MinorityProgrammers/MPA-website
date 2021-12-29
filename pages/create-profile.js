import React, { useState, useEffect } from 'react';
import jwt from 'jsonwebtoken';
import { useRouter } from 'next/router';
import Layout from '../components/Layout';
import HomepageNav from '../components/homepage/HomepageNav';
import SidebarTwo from '../components/SidebarTwo';
import Footer from '../components/Footer';
import CreateProfile from '../components/CreateProfile/CreateProfile';
import links from '../contexts/utils/links';

const CreateProfilePage = function () {
  const [open, setOpen] = useState(false);
  const [userID, setUserID] = useState('');
  const router = useRouter();
  const [data, setData] = useState([]);

  useEffect(() => {
    const token = window.localStorage.getItem('jwtToken');
    const userInfo = window.localStorage.getItem('userInfo');
    const user = JSON.parse(userInfo)?.user || JSON.parse(userInfo);

    if (token && userInfo) {
      setUserID(jwt.decode(token).id);
    } else {
      router.push('/auth');
    }

    if (user?.isUpdated === true) {
      const slug = user?.userName;
      router.push(`/user/${slug}`);
    }
  }, []);

  return (
    <Layout pageTitle="Create Profile">
      <div id="SidebarPage">
        <HomepageNav
          open={open}
          setData={setData}
          setOpen={setOpen}
          page="CreateProfile"
        />
        <SidebarTwo open={open} setOpen={setOpen} links={links} active="Home" />
        <div className="create--profile">
          <CreateProfile userID={userID} data={data} />
        </div>
      </div>
      <Footer />
    </Layout>
  );
};

export default CreateProfilePage;
