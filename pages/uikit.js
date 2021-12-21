import React, { useState } from 'react';
import Layout from '../components/Layout';
import HomepageNav from '../components/homepage/HomepageNav';
import BlackBanner from '../components/BlackBanner';
import Footer from '../components/Footer';
import SidebarTwo from '../components/sidebar/SidebarTwo';
import links from '../contexts/utils/links';

const UIKit = function () {
  const [open, setOpen] = useState(false);
  const bannerImgLink =
    'https://lh3.googleusercontent.com/proxy/kebLnb_ZXHeYtyuRXNNA_etHIRqPHEu9eawDUk7Y6Asmk9t75_ZuOTSrgDflrCo4S6_Ch80FUANkfLHMrLC-Ygw4';
  const termsText = '';
  return (
    <Layout pageTitle="UI Kit">
      <HomepageNav open={open} setOpen={setOpen} page="UIKit" />
      <SidebarTwo open={open} setOpen={setOpen} links={links} active="Home" />
      <BlackBanner
        title="MPA UI Kit"
        subtitle="MPA dAPP UI Kit."
        bannerImgLink={bannerImgLink}
      />
      <iframe
        width="100%"
        height="1000px"
        src="https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Ffile%2Fu9PtXvpKdawtmdRVs46I10%2FMPA-MASTER-UI-KIT%3Fnode-id%3D19%253A3"
        allowFullScreen
      />
      <Footer />
    </Layout>
  );
};
export default UIKit;
