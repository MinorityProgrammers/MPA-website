import React, { useState } from 'react';
import BlackBanner from '../components/BlackBanner';
import Footer from '../components/Footer';
import SidebarTwo from '../components/sidebar/SidebarTwo';
import HomepageNav from '../components/homepage/HomepageNav';
import Layout from '../components/Layout';
import links from '../contexts/utils/links';

const WhitepaperPage = () => {
  const [open, setOpen] = useState(false);
  const bannerImgLink =
    'https://raw.githubusercontent.com/MinorityProgrammers/graphics/4672303d7abc69ad4c2b735ca5f056b6e40cafcc/Minority-gang-vector.svg';
  return (
    <Layout pageTitle="MPA dApp Whitepaper">
      <HomepageNav open={open} setOpen={setOpen} page="Legal" />
      <SidebarTwo open={open} setOpen={setOpen} links={links} active="Home" />
      <BlackBanner
        title="MPA dAPP Whitepaper"
        subtitle="The decentralized career builder for minorities."
        bannerImgLink={bannerImgLink}
      />
      <iframe
        title="Legal Frame"
        className="legal-frame"
        src="https://docs.google.com/document/d/e/2PACX-1vQWleJ-PCigYzyGRswD08b4rVCebfH9Ev-xRN7CKE8ZiOz_W9iHQw_JsgJvbaG2HA8QkA7CHefmQqoJ/pub?embedded=true"
      />
      <Footer />
    </Layout>
  );
};
export default WhitepaperPage;
