import React from 'react';
import Footer from '../../components/Footer';
import HomepageNav from '../../components/homepage/HomepageNav';
import Layout from '../../components/Layout';
import TaskStatus from '../../components/Moderator/TaskStatus';

const taskStatusNotification = () => (
  <Layout pageTitle="Moderator_Elect Proposals">
    <div className="moderator-area">
      <HomepageNav />
      <TaskStatus />
      <Footer />
    </div>
  </Layout>
);

export default taskStatusNotification;
