import React, { useState, useRef } from "react";
import Layout from "../../components/Layout";
import TaskStatus from "../../components/Moderator/TaskStatus";
import Footer from "../../components/Footer";
import HomepageNav from "../../components/HomepageNav";
//import TaskStatusDnD from "../../components/Moderator/TaskStatusDragNdrop";

const taskStatusNotification = () => {
  return (
    <Layout pageTitle="Moderator_Elect Proposals">
      <div className="moderator-area">
        <HomepageNav />
        <TaskStatus />
        <Footer />
      </div>
    </Layout>
  );
};

export default taskStatusNotification;
