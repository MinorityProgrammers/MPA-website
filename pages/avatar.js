import React from "react";
import Layout from "../components/Layout";
import NavOne from "../components/NavOne";
import PageHeader from "../components/PageHeader";
import Footer from "../components/Footer";
import SliderTwo from "../components/SliderTwo";
import TeamOne from "../components/TeamOne";
import TeamTab from "../components/TeamTab";
import Onboarding from "../components/Onboarding";
import TeachersDetails from "../components/TeachersDetails";
import CallToActionOne from "../components/CallToActionOne";
import CallToActionTwo from "../components/CallToActionTwo";
import CallToActionThree from "../components/CallToActionThree";
import CallToActionFour from "../components/CallToActionFour";
import CallToActionFive from "../components/CallToActionFive";
import Mentorship from "../components/Mentorship";
import MapJoin from "../components/MapJoin";
import Chapter from "../components/Chapter";
import Career from "../components/Career";
import Partner from "../components/Partner";
import BrandsOne from "../components/BrandsOne";
import BrandsTwo from "../components/BrandsTwo";
import Events from "../components/Courses";
import AvatarMaker from "../components/AvatarMaker";

const AvatarPage = () => {
  return (
    <Layout pageTitle="Avatar">
      <NavOne />
      {/* <PageHeader title="Services" /> */}
      {/* <SliderTwo/> */}
      {/* <TeamOne/> */}
      {/* <CallToActionFive/> */}
      <AvatarMaker />
      {/* <CallToActionFour/> */}
      {/* <CallToActionThree/> */}
      {/* <CallToActionTwo/> */}
      {/* <CallToActionOne/> */}

      {/* <TeamTab/> */}
      {/* <Onboarding/> */}
      <Footer />
    </Layout>
  );
};

export default AvatarPage;
