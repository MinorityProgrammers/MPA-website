import Footer from '../../components/Footer';
import Layout from '../../components/Layout';
import CreateTask from '../../components/CreateTask';
import CreateTaskFooter from '../../components/CreateTaskFooter';
import PlannedTaskStatusHeader from '../../components/PlannedTaskStatusHeader';

const createTask = () => (
  <Layout pageTitle="Create-Task">
    <div className="proposal-bg">
      <PlannedTaskStatusHeader />
      <CreateTask />
      <CreateTaskFooter />
    </div>
    <Footer />
  </Layout>
);

export default createTask;
