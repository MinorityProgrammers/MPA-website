import React from 'react';
import Footer from '../../components/Footer';
import HomepageNav from '../../components/homepage/HomepageNav';
import Layout from '../../components/Layout';
import ElectProposals from '../../components/Moderator/ElectProposals/ElectProposals';

const ElectProposalsPage = () => (
  <Layout pageTitle="Moderator_Elect Proposals">
    <div className="moderator-area">
      <HomepageNav />
      <ElectProposals />
      <Footer />
    </div>
  </Layout>
);

export default ElectProposalsPage;
