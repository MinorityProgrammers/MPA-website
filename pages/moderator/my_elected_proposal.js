import React, { useState, useRef } from 'react';
import Layout from '../../components/Layout';
import Footer from '../../components/Footer';
import HomepageNav from '../../components/HomepageNav';
import MyElectedProposal from '../../components/Moderator/myElectedProposal';

const my_elected_proposal = () => (
  <Layout pageTitle="Moderator_Elect Proposals">
    <div className="moderator-area">
      <HomepageNav />
      <MyElectedProposal />
      <Footer />
    </div>
  </Layout>
);

export default my_elected_proposal;
