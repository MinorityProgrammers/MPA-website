import React from 'react';
import Footer from '../../components/Footer';
import Layout from '../../components/Layout';
import ViewTask from '../../components/ViewTask';
import ViewTaskHeader from '../../components/ViewTaskHeader';

const viewTask = () => (
  <Layout pageTitle="View-Task">
    <div className="proposal-bg">
      <ViewTaskHeader />
      <ViewTask />
      <Footer />
    </div>
  </Layout>
);

export default viewTask;
