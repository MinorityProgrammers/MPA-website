import React, { useState } from 'react';
import Layout from '../components/Layout';
import HomepageNav from '../components/homepage/HomepageNav';
import VoteHero from '../components/vote-components/VoteHero';
import Footer from '../components/Footer';
import SidebarTwo from '../components/sidebar/SidebarTwo';
import links from '../contexts/utils/links';
import FaucetForm from '../components/Faucet/FaucetForm';

const FaucetPage = function () {
  const [open, setOpen] = useState(false);
  return (
    <Layout pageTitle="Governance Token Faucet">
      <HomepageNav open={open} setOpen={setOpen} page="Vote" />
      <SidebarTwo open={open} setOpen={setOpen} links={links} active="Home" />
      <VoteHero />
      <FaucetForm />
      <Footer />
    </Layout>
  );
};
export default FaucetPage;
