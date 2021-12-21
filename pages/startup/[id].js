import React, { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import Layout from '../../components/Layout';
import HomepageNav from '../../components/homepage/HomepageNav';
import StartupTopBar from '../../components/startup/StartupTopBar';
import StartupMainBar from '../../components/startup/StartupMainBar';
import Footer from '../../components/Footer';
import SidebarTwo from '../../components/sidebar/SidebarTwo';
import links from '../../contexts/utils/links';
// import datas from '../../helpers/mockData';

export const getStaticPaths = async () => {
  const res = await axios.get(`${process.env.BASE_URI}/startup/`);
  const data = await res.data.data;

  const paths = data.map((startup) => ({
    params: { id: startup._id },
  }));

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps = async (context) => {
  const { id } = context.params;
  // change url later when the get single startup controller is fixed in git repo

  // const res = await axios.get(
  //   `${process.env.BASE_URI}/startup/` + id
  // )

  // Calendly test startup
  const res = await axios.get(
    `${process.env.BASE_URI}/startup/60ca4c75620570082453fc34`
  );
  const data = await res.data.data;

  return {
    props: { startup: data },
  };
};

const StartupInfoPage = function ({ startup }) {
  const [open, setOpen] = useState(false);
  // console.log("startup data from [id]page", startup)

  return (
    <Layout pageTitle="Information">
      <HomepageNav open={open} setOpen={setOpen} page="Information" />
      <SidebarTwo open={open} setOpen={setOpen} links={links} active="Home" />
      <section className="section__styles">
        <StartupTopBar data={startup} />
        <StartupMainBar data={startup} />
      </section>
      <Footer />
    </Layout>
  );
};
export default StartupInfoPage;
