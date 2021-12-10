import React from 'react';
import CheckDND from '../../components/coreteam/CheckDND';
import TaskBanner from '../../components/coreteam/TaskBanner';
import ViewTask from '../../components/coreteam/ViewTask';
import Footer from '../../components/Footer';
import HomepageNav from '../../components/homepage/HomepageNav';
import Layout from '../../components/Layout';

const viewtask = () => (
  <Layout>
    <div className="page-gradient tw-w-100">
      <HomepageNav />
      {/* <ViewTask /> */}
      <TaskBanner />
      <CheckDND />
      <Footer />
    </div>
  </Layout>
);

export default viewtask;
