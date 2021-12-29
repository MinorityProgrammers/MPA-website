import { PayPalScriptProvider } from '@paypal/react-paypal-js';
import 'antd/dist/antd.css';
import { Provider } from 'next-auth/client';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { MoralisProvider } from 'react-moralis';
import 'tailwindcss/tailwind.css';
import 'toastify-js/src/toastify.css';
import '../components/Consultancy/Consultancy.css';
import '../components/Faucet/faucet.css';
import '../components/Internship/Internship.css';
import '../components/join/join.css';
import '../components/join/joinNavbar.css';
import '../components/learn/courseDetails/coursesDetails.css';
import '../components/learn/learn-css/CourseCategories.css';
import '../components/learn/learn-css/FeaturedCourses.css';
import '../components/learn/learn-css/LearnBanner.css';
import '../components/learn/learn-css/MyCourses.css';
import '../components/learn/quizActivity/SimpleQuiz.scss';
import '../components/vote-components/vote.css';
import { GlobalProvider } from '../contexts/provider';
import { SettingsPagesProvider } from '../contexts/settingsPagesProvider/settingsPagesProvider';
import * as ga from '../ga';
import { MoralisDappProvider } from '../MoralisDappProvider/MoralisDappProvider';
import '../node_modules/react-modal-video/scss/modal-video.scss';
import '../public/assets/scss/_event.scss';
import '../public/assets/scss/_service.scss';
import '../styles/$-Minority-Earned/style.css';
import '../styles/Careers/index.css';
import '../styles/ChapterCSS/chapter.css';
import '../styles/Chat/chat.css';
import '../styles/coreteam/coreteam.css';
import '../styles/Events/Event.css';
import '../styles/iframes/swap.css';
import '../styles/incubator-css/incubator.css';
import '../styles/JoinCSS/join.css';
import '../styles/main.scss';
import '../styles/MentorshipCSS/mentorship.css';
import '../styles/MentorshipCSS/MentorshipAppSideBar.css';
import '../styles/MentorshipCSS/MentorshipAppSwipeCards.css';
import '../styles/MentorshipCSS/MentorshipPersonalDetails.css';
import '../styles/MentorshipCSS/MentorshipPersonalDetailsDropDown.css';
import '../styles/MentorshipCSS/MentorshipRegister.css';
import '../styles/ModeratorCss/ElectProposals.css';
import '../styles/PresaleCss/index.css';
import '../styles/ProfileCSS/create-profile.css';
import '../styles/ProfileCSS/profile.css';
import '../styles/ProfileCSS/updateProfile.css';
import '../styles/QuickJobApply/QuickApplyJobApplication.css';
import '../styles/SidebarCSS/sidebar.css';
import '../styles/sponsorship-css/sponsorship.css';
import '../styles/ToolkitCSS/toolkit.css';

const APP_ID = process.env.REACT_APP_MORALIS_APPLICATION_ID;
const SERVER_URL = process.env.REACT_APP_MORALIS_SERVER_URL;

// Required in a new `pages/_app.js` file.
export default function MyApp({ Component, pageProps }) {
  const router = useRouter();

  useEffect(() => {
    const handleRouteChange = (url) => {
      ga.pageview(url);
    };

    router.events.on('routeChangeComplete', handleRouteChange);

    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router.events]);

  return (
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
  );
}
