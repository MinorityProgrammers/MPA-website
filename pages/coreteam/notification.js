import Notification from "../../components/coreteam/Notification";
import React from "react";

import Footer from "../../components/Footer";
import HomepageNav from "../../components/HomepageNav";
import Layout from "../../components/Layout";

const notificaton = () => {
  return (
    <Layout>
      <HomepageNav />
      <Notification />
      <Footer />
    </Layout>
  );
};

export default notificaton;
