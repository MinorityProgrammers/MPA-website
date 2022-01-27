import React, { useState } from 'react';
import Layout from '../components/Layout';
import HomepageNav from '../components/homepage/HomepageNav';
import BlackBanner from '../components/BlackBanner';
import UnderBannerBody from '../components/UnderBannerBody';
import Footer from '../components/Footer';
import SidebarTwo from '../components/sidebar/SidebarTwo';
import links from '../contexts/utils/links';

const PrivacyPage = () => {
  const [open, setOpen] = useState(false);
  const bannerImgLink = 'https://www.washingtonian.com/wp-content/uploads/2020/01/iStock-1028373274-2048x1366.jpg';
  return (
    <Layout pageTitle="MPA - Privacy Policy">
      <HomepageNav open={open} setOpen={setOpen} page="Privacy" />
      <SidebarTwo open={open} setOpen={setOpen} links={links} active="Home" />
      <BlackBanner
        title="Privacy Policy"
        subtitle="Last Updated on July 1st, 2021."
        bannerImgLink={bannerImgLink}
      />
      <UnderBannerBody text="The following is the Privacy Policy for the Minority Programmers Association" />
      <Footer />
    </Layout>
  );
};
export default PrivacyPage;
