import React, { useState } from 'react';
import Layout from '../components/Layout';
import HomepageNav from '../components/HomepageNav';
import VoteHero from '../components/vote-components/VoteHero';
import VoteGuide from '../components/vote-components/VoteGuide';
import Footer from '../components/Footer';
import SidebarTwo from '../components/SidebarTwo';
import links from '../contexts/utils/links';

const VotePage = function () {
  const [open, setOpen] = useState(false);
  return (
    <Layout pageTitle="Voting Resource Guide">
      <HomepageNav open={open} setOpen={setOpen} page="Vote" />
      <SidebarTwo open={open} setOpen={setOpen} links={links} active="Home" />
      <VoteHero />
      <VoteGuide />
      <Footer />
    </Layout>
  );
};
export default VotePage;
