import React, { useState, useRef } from 'react';
import Layout from '../../components/Layout';
import ProposalNotification from '../../components/Moderator/ProposalNotification/ProposalNotification';
import Footer from '../../components/Footer';
import HomepageNav from '../../components/HomepageNav';

const proposal_notification = () => (
  <Layout pageTitle="Moderator_Elect Proposals">
    <div className="moderator-area">
      <HomepageNav />

      <ProposalNotification />
      <Footer />
    </div>
  </Layout>
);

export default proposal_notification;
