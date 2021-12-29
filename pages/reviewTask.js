import React from 'react';
import Footer from '../components/Footer';
import Layout from '../components/Layout';
import PlannedTaskStatusHeader from '../components/PlannedTaskStatusHeader';
import ReviewTask from '../components/ReviewTask';

const reviewTask = () => (
  <Layout pageTitle="Review-Task">
    <div className="proposal-bg">
      <PlannedTaskStatusHeader />
      <ReviewTask />
    </div>
    <Footer />
  </Layout>
);

export default reviewTask;
