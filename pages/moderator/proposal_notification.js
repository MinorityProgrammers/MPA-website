import React from 'react';
import Footer from '../../components/Footer';
import HomepageNav from '../../components/homepage/HomepageNav';
import Layout from '../../components/Layout';
import ProposalNotification from '../../components/Moderator/ProposalNotification/ProposalNotification';

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
