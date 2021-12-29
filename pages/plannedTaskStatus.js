import React from 'react';
import Footer from '../components/Footer';
import Layout from '../components/Layout';
import PlannedTaskStatus from '../components/PlannedTaskStatus';
import PlannedTaskStatusHeader from '../components/PlannedTaskStatusHeader';

const plannedTaskStatus = () => (
  <Layout pageTitle="View-Task-Status">
    <div className="proposal-bg">
      <PlannedTaskStatusHeader />
      <PlannedTaskStatus />
      <Footer />
    </div>
  </Layout>
);

export default plannedTaskStatus;
