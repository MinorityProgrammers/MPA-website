import ViewTask from "../components/ViewTask";
import ViewTaskHeader from "../components/ViewTaskHeader";
import Footer from "../components/Footer";
import Layout from "../components/Layout";

const viewTask = () => {
  return (
    <Layout pageTitle="View-Task">
      <div className="proposal-bg">
        <ViewTaskHeader />
        <ViewTask />
        <Footer />
      </div>
    </Layout>
  );
};

export default viewTask;
