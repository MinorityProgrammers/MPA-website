import ViewTask from '../../components/ViewTask';
import ViewTaskHeader from '../../components/ViewTaskHeader';
import Layout from '../../components/Layout';
import Footer from '../../components/Footer';

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
