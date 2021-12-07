import ReviewTask from '../components/ReviewTask';
import PlannedTaskStatusHeader from '../components/PlannedTaskStatusHeader';
import Footer from '../components/Footer';
import Layout from '../components/Layout';

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
