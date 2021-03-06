import React, { useState } from 'react';
import BlackBanner from '../components/BlackBanner';
import Footer from '../components/Footer';
import HomepageNav from '../components/homepage/HomepageNav';
import Layout from '../components/Layout';
import SidebarTwo from '../components/sidebar/SidebarTwo';
import links from '../contexts/utils/links';

const DevxDaoMilestonesPage = () => {
  const [open, setOpen] = useState(false);
  const bannerImgLink = 'https://www.devxdao.com/wp-content/uploads/2020/10/favicon-01-300x300.png';

  return (
    <Layout pageTitle="DevXDao Milestones">
      <HomepageNav open={open} setOpen={setOpen} page="Milestones" />
      <SidebarTwo open={open} setOpen={setOpen} links={links} active="Home" />
      <BlackBanner
        title="DevXDao Milestones"
        subtitle="For MPA career development dApp grant application."
        bannerImgLink={bannerImgLink}
      />

      <iframe
        title="Presentation Docs Embed"
        src="https://docs.google.com/presentation/d/e/2PACX-1vTeEIq7kLhw_4hHdH35ZsF7rHqdwYZR7gM41TmtLQ8LoVtQGSFI2HPqlgM5nmZ_S2c7MF3nX_nZGFBk/embed?start=false&loop=false&delayms=15000"
        frameBorder="0"
        width="100%"
        height="839"
        allowFullScreen="true"
        mozallowfullscreen="true"
        webkitallowfullscreen="true"
      />
      <iframe
        title="Clickup Embed"
        className="clickup-embed"
        src="https://sharing.clickup.com/g/h/88bv0-126/1d761dd09d2f6e1"
        width="100%"
        height="1000px"
        styles="background: transparent; border: 1px solid #ccc;"
      />
      <Footer />
    </Layout>
  );
};
export default DevxDaoMilestonesPage;
