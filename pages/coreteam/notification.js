import React from 'react';
import Notification from '../../components/coreteam/Notification';

import Footer from '../../components/Footer';
import HomepageNav from '../../components/HomepageNav';
import Layout from '../../components/Layout';

const notificaton = () => (
  <Layout>
    <HomepageNav />
    <Notification />
    <Footer />
  </Layout>
);

export default notificaton;
