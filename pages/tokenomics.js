import React, { useState } from 'react';
import BlackBanner from '../components/BlackBanner';
import Footer from '../components/Footer';
import SidebarTwo from '../components/sidebar/SidebarTwo';
import HomepageNav from '../components/homepage/HomepageNav';
import Layout from '../components/Layout';
import links from '../contexts/utils/links';

const TokenomicsPage = function () {
  const [open, setOpen] = useState(false);
  const bannerImgLink =
    'https://raw.githubusercontent.com/MinorityProgrammers/graphics/f75b343d4eadc38bf1c6e27f3614329385eb4604/transactional%20burn%20tax.svg';
  return (
    <Layout pageTitle="$MINORITY Tokenomics">
      <HomepageNav open={open} setOpen={setOpen} page="Tokenomics" />
      <SidebarTwo open={open} setOpen={setOpen} links={links} active="Home" />
      <BlackBanner
        title="$MINORITY Tokenomics"
        subtitle="%MINORITY Token Allocations."
        bannerImgLink={bannerImgLink}
      />
      <iframe
        title="Legal Frame"
        className="legal-frame"
        src="https://docs.google.com/spreadsheets/d/e/2PACX-1vRih2lxPJmVGM9NB76xjOe6JX_2JVCE-1NPZnsGXaikOpFnHkWPSnnJT6iLcDr_AiobRvknX2jzHihN/pubhtml?widget=true&amp;headers=false"
      />
      <Footer />
    </Layout>
  );
};
export default TokenomicsPage;
