import React from 'react';
import TaskName from '../../components/coreteam/TaskName';
import HomepageNav from '../../components/homepage/HomepageNav';
import Layout from '../../components/Layout';
import Footer from '../../components/Footer';

const openandview = () => (
  <Layout>
    <HomepageNav />
    <TaskName />
    <Footer />
  </Layout>
);

export default openandview;
