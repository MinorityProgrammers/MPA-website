import React, { useState, useRef } from 'react';
import Layout from '../../components/Layout';
import ElectProposals from '../../components/Moderator/ElectProposals/ElectProposals';
import Footer from '../../components/Footer';
import HomepageNav from '../../components/homepage/HomepageNav';
import HomeBanner from '../../components/homepage/HomeBanner';

const ElectProposalsPage = function () {
  return (
    <Layout pageTitle="Moderator_Elect Proposals">
      <div className="moderator-area">
        <HomepageNav />
        <ElectProposals />
        <Footer />
      </div>
    </Layout>
  );
};

export default ElectProposalsPage;
