import React from 'react';
import TaskName from '../../components/coreteam/TaskName';
import HomepageNav from '../../components/HomepageNav';
import Layout from '../../components/Layout';
import Footer from '../../components/Footer';
const openandview = () => {
  return (
    <Layout>
      <HomepageNav />
      <TaskName />
      <Footer />
    </Layout>
  );


};

export default openandview;
