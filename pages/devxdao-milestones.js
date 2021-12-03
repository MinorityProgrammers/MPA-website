import React, { useState } from "react";
import Layout from "../components/Layout";
import HomepageNav from "../components/HomepageNav";
import BlackBanner from "../components/BlackBanner";
import Footer from "../components/Footer";
import SidebarTwo from "../components/SidebarTwo";
import links from "../contexts/utils/links";

const DevxDaoMilestonesPage = () => {
  const [open, setOpen] = useState(false);
  const bannerImgLink =
    "https://www.devxdao.com/wp-content/uploads/2020/10/favicon-01-300x300.png";
  let termsText = "";
  return (
    <Layout pageTitle="DevXDao Milestones">
      <HomepageNav open={open} setOpen={setOpen} page={"Milestones"} />
      <SidebarTwo open={open} setOpen={setOpen} links={links} active={"Home"} />
      <BlackBanner
        title="DevXDao Milestones"
        subtitle="For MPA career development dApp grant application."
        bannerImgLink={bannerImgLink}
      />
      {/* <UnderBannerBody text="The following is terms and conditions for the Minority Programmers Association"/> */}
      <iframe
        src="https://docs.google.com/presentation/d/e/2PACX-1vTeEIq7kLhw_4hHdH35ZsF7rHqdwYZR7gM41TmtLQ8LoVtQGSFI2HPqlgM5nmZ_S2c7MF3nX_nZGFBk/embed?start=false&loop=false&delayms=15000"
        frameborder="0"
        width="100%"
        height="839"
        allowfullscreen="true"
        mozallowfullscreen="true"
        webkitallowfullscreen="true"
      ></iframe>
      <iframe
        className="clickup-embed"
        src="https://sharing.clickup.com/g/h/88bv0-126/1d761dd09d2f6e1"
        width="100%"
        height="1000px"
        styles="background: transparent; border: 1px solid #ccc;"
      ></iframe>
      {/* <iframe className="legal-frame"src="https://docs.google.com/spreadsheets/d/e/2PACX-1vRih2lxPJmVGM9NB76xjOe6JX_2JVCE-1NPZnsGXaikOpFnHkWPSnnJT6iLcDr_AiobRvknX2jzHihN/pubhtml?widget=true&amp;headers=false"></iframe> */}
      <Footer />
    </Layout>
  );
};
export default DevxDaoMilestonesPage;
