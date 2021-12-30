/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-bitwise */
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Provider } from 'next-auth/client';
import { PayPalScriptProvider } from '@paypal/react-paypal-js';
import { MoralisProvider } from 'react-moralis';
import Loading from '../components/Loading';
import * as ga from '../ga';
import 'react-modal-video/scss/modal-video.scss';
import 'tailwindcss/tailwind.css';
import 'toastify-js/src/toastify.css';
import 'antd/dist/antd.css';
import '../styles/main.scss';
import '../styles/MentorshipCSS/MentorshipAppSideBar.css';
import '../styles/MentorshipCSS/MentorshipAppSwipeCards.css';
import '../styles/MentorshipCSS/MentorshipPersonalDetailsDropDown.css';
import '../styles/MentorshipCSS/MentorshipPersonalDetails.css';
import '../styles/MentorshipCSS/MentorshipRegister.css';
import '../components/join/join.css';
import '../styles/PresaleCss/index.css';
import '../components/join/joinNavbar.css';
import '../styles/MentorshipCSS/mentorship.css';
import '../styles/incubator-css/incubator.css';
import { GlobalProvider } from '../contexts/provider';
import { SettingsPagesProvider } from '../contexts/settingsPagesProvider/settingsPagesProvider';
import '../styles/Careers/index.css';
import '../styles/SidebarCSS/sidebar.css';
import '../styles/ProfileCSS/profile.css';
import '../styles/ProfileCSS/updateProfile.css';
import '../public/assets/scss/_service.scss';
import '../styles/ChapterCSS/chapter.css';
import '../styles/ToolkitCSS/toolkit.css';
import '../styles/JoinCSS/join.css';
import '../styles/sponsorship-css/sponsorship.css';
import '../styles/$-Minority-Earned/style.css';
import '../components/learn/learn-css/LearnBanner.css';
import '../components/learn/learn-css/CourseCategories.css';
import '../components/learn/learn-css/MyCourses.css';
import '../components/learn/learn-css/FeaturedCourses.css';
import '../components/learn/courseDetails/coursesDetails.css';
import '../styles/iframes/swap.css';
import '../public/assets/scss/_event.scss';
import '../styles/QuickJobApply/QuickApplyJobApplication.css';
import '../styles/Chat/chat.css';
import '../components/learn/quizActivity/SimpleQuiz.scss';
import '../components/vote-components/vote.css';
import '../components/Consultancy/Consultancy.css';
import '../components/Internship/Internship.css';
import '../styles/ProfileCSS/create-profile.css';
import '../styles/Events/Event.css';
import '../components/Faucet/faucet.css';
import '../styles/ModeratorCss/ElectProposals.css';
import '../styles/coreteam/coreteam.css';
import { MoralisDappProvider } from '../MoralisDappProvider/MoralisDappProvider';
import '../styles/$-Minority-Earned/comingSoon.css';
import '../styles/DashboardCSS/dashboard.css';

const APP_ID = process.env.REACT_APP_MORALIS_APPLICATION_ID;
const SERVER_URL = process.env.REACT_APP_MORALIS_SERVER_URL;

// Required in a new `pages/_app.js` file.
export default function MyApp({ Component, pageProps }) {
  const router = useRouter();

  const [state, setState] = useState({
    isRouteChanging: false,
    loadingKey: 0,
  });

  useEffect(() => {
    const handleRouteChangeStart = () => {
      setState((prevState) => ({
        ...prevState,
        isRouteChanging: true,
        loadingKey: prevState.loadingKey ^ 1,
      }));
    };

    const handleRouteChangeEnd = () => {
      setState((prevState) => ({
        ...prevState,
        isRouteChanging: false,
      }));
    };

    const handleRouteChange = (url) => {
      ga.pageview(url);
    };

    router.events.on('routeChangeComplete', handleRouteChange);
    router.events.on('routeChangeStart', handleRouteChangeStart);
    router.events.on('routeChangeComplete', handleRouteChangeEnd);
    router.events.on('routeChangeError', handleRouteChangeEnd);

    return () => {
      router.events.off('routeChangeStart', handleRouteChangeStart);
      router.events.off('routeChangeComplete', handleRouteChangeEnd);
      router.events.off('routeChangeError', handleRouteChangeEnd);
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router.events]);

  return (
    <>
      <Loading isRouteChanging={state.isRouteChanging} key={state.loadingKey} />
      <MoralisProvider appId={APP_ID} serverUrl={SERVER_URL}>
        <MoralisDappProvider>
          <Provider session={pageProps.session}>
            <PayPalScriptProvider
              options={{ 'client-id': process.env.PAYPAL_CLIENT_ID }}
            >
              <GlobalProvider>
                <SettingsPagesProvider>
                  <Component {...pageProps} />
                </SettingsPagesProvider>
              </GlobalProvider>
            </PayPalScriptProvider>
          </Provider>
        </MoralisDappProvider>
      </MoralisProvider>
    </>
  );
}
