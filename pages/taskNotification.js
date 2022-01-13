import React from 'react';
import Footer from '../components/Footer';
import Layout from '../components/Layout';
import TaskNotification from '../components/ProjectManager/TaskNotification';
import TaskNotificationHeader from '../components/ProjectManager/TaskNotificationHeader';

const taskNotification = () => (
  <Layout pageTitle="Task-Notification">
    <div className="proposal-bg">
      <TaskNotificationHeader />
      <TaskNotification />
      <Footer />
    </div>
  </Layout>
);

export default taskNotification;
