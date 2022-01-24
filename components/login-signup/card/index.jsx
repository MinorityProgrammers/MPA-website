import {
  getProviders, getSession, signIn, useSession,
} from 'next-auth/client';
import { useRouter } from 'next/router';
import React, { useContext, useEffect, useState } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
  googleAuth,
  nextAuth,
} from '../../../contexts/actions/auth/googleAuth';
import getProfile from '../../../contexts/actions/profile/getProfile';
import { GlobalContext } from '../../../contexts/provider';
import Form from '../form/index';
import styles from './card.module.css';

export default function Index() {
  // USED FOR SOCIAL AUTHENTICATION

  // const googleClientId = process.env.CLIENT_ID;
  const [session/* , isLoading */] = useSession();

  // Instead of another page we will set the text to variables
  const [cardText, setCardText] = useState({
    signIn: false,
    h1Title: 'welcome',
    p: (
      <p>
        To keep connecting with us please
        {' '}
        <br />
        {' '}
        register with your personal
        info
      </p>
    ),
    h2Title: 'sign up',
    para: 'already have an account?',
    link: 'sign in',
  });

  // STATES USED THROUGHOUT THE COMPONENT
  const [submit, setSubmit] = useState(false);
  const [, setSpin] = useState(false);
  const [, setSignedIn] = useState(false);
  const [, setUserData] = useState([]);
  const [providers, setPrivders] = useState([]);
  const router = useRouter();

  const {
    profileDispatch,
  } = useContext(GlobalContext);

  useEffect(() => {
    if (window.localStorage.getItem('jwtToken')) {
      getProfile(setUserData)(profileDispatch);
    }
  }, []);

  useEffect(() => {
    const setupProviders = async () => {
      const _providers = await getProviders();

      setPrivders(_providers);
    };
    setupProviders();
  }, []);

  // user redirection's
  // useEffect(() => {
  //     if (userData?.isUpdated === true) {
  //         const slug = userData?.userName
  //         router.push(`/user/${slug}`)
  //     }
  //     if (userData?.isUpdated === false) {
  //         router.push(`/create-profile`)
  //     }
  // }, [userData])

  // useEffect(() => {
  //     if (profileData?.isUpdated === true) {
  //         const slug = profileData?.userName
  //         router.push(`/user/${slug}`)
  //     }
  //     if (profileData?.isUpdated === false) {
  //         router.push(`/create-profile`)
  //     }
  // }, [profileData])

  // states from global context
  const {
    authDispatch,
    authState: {
      auth: { loading, data },
    },
  } = useContext(GlobalContext);

  // redirecting the user
  useEffect(() => {
    if (
      window.localStorage.getItem('jwtToken')
      && window.localStorage.getItem('userInfo')
    ) {
      // UPDATE SIGNIN STATE
      setSignedIn(true);
    }
  }, []);

  useEffect(() => {
    if (data && submit) {
      router.push(router.pathname);
      if (router.pathname === '/auth') {
        const loginSignUp = document.querySelector(
          '.card_cardContainer__12vmM',
        );
        loginSignUp.style.display = 'none';
      } else {
        const loginSignUp = document.querySelector('.create_event');
        loginSignUp.style.display = 'none';
      }
    }
  }, [data]);

  // NEED TO CHECK IF ACCOUNT EXISTS, TRY REQUEST TO SEE IF USER EXISTS
  // SOCIAL AUTHENTICATION
  const handleLoginSuccess = (res) => {
    // keep this
    googleAuth({ tokenId: res.tokenId })(authDispatch);
  };

  const handleLoginFailure = (res) => {
    // console.log(res);
  };

  // CHANGES CARD FROM SIGN UP TO SIGN IN
  const handleClick = (event) => {
    event.preventDefault();

    if (cardText.signIn === true) {
      setCardText({
        signIn: false,
        h1Title: 'register for MPA',
        p: (
          <p>
            To keep connecting with us please
            {' '}
            <br />
            {' '}
            register with your personal
            info
          </p>
        ),
        h2Title: 'sign up',
        para: 'already have an account?',
        link: 'sign in',
      });
    } else if (cardText.signIn === false) {
      setCardText({
        signIn: true,
        h1Title: 'welcome back',
        p: (
          <p>
            To keep connecting with us please
            {' '}
            <br />
            {' '}
            sign-in with your personal
            info
          </p>
        ),
        h2Title: 'sign in',
        para: 'new to register?',
        link: 'sign up',
      });
    }
  };

  useEffect(() => {
    if (session) {
      nextAuth({
        name: session.user.name,
        email: session.user.email,
        image: session.user.image,
      })(authDispatch);
    }
  }, [session]);

  return (
    <div className={styles.cardContainer}>
      <ToastContainer limit={3} />
      <div
        className={`${styles.cardLeft} ${
          router.pathname.endsWith('/auth') ? 'tw-mt-40' : ''
        }`}
      >
        <div className={styles.contentContainer}>
          <div className={styles.cardLeftLogo}>
            <img
              src="./assets/images/mpicon.svg"
              alt="icon"
              className={styles.logo}
            />
          </div>
          <div className={styles.innerText}>
            <h1>{cardText.h1Title}</h1>
            {cardText.p}
          </div>
        </div>
      </div>
      <div
        className={`${styles.cardRight} ${
          router.pathname.endsWith('/auth') ? 'tw-mt-40' : ''
        }`}
      >
        <div className={styles.cardRightText}>
          <h2>{cardText.h2Title}</h2>
          <p>
            {cardText.para}
            <a href={`#${cardText.link}`} className="tw-text-blue-800" onClick={handleClick}>
              {' '}
              {cardText.link}
            </a>
          </p>
        </div>
        <ul className={styles.socialMedia}>
          <li>
            {/* <GoogleLogin
              clientId={googleClientId}
              render={(renderProps) => (
                <img
                  src="./assets/images/login-signup/google.png"
                  alt="icon"
                  onClick={renderProps.onClick}
                  disabled={renderProps.disabled}
                />
              )}
              buttonText="Login"
              onSuccess={handleLoginSuccess}
              onFailure={handleLoginFailure}
              cookiePolicy="single_host_origin"
            /> */}
            <img
              onClick={() => signIn(providers.google.id)}
              src="./assets/images/login-signup/google.png"
              className="tw-mx-4"
              alt="icon"
            />
          </li>
          {/* <li>
            <img
              onClick={() => signIn(providers.linkedin.id)}
              src="./assets/images/login-signup/linkin.png"
              alt="icon"
            />
          </li>
          <li>
            <img
              onClick={() => signIn(providers.github.id, {
                callbackUrl: 'https://minorityprogrammers.com/auth',
              })}
              src="./assets/images/login-signup/github.png"
              alt="icon"
            />
          </li> */}
          <li>
            <img
              onClick={() => signIn(providers.facebook.id)}
              src="./assets/images/login-signup/facebook.png"
              className="tw-mx-4"
              alt="icon"
            />
          </li>
        </ul>
        <div className={styles.mid}>
          <div className={styles.line} />
          <p>or</p>
          <div className={styles.line} />
        </div>
        <Form
          signIn={cardText.signIn}
          setSubmit={setSubmit}
          setSpin={setSpin}
          loading={loading}
        />
      </div>
    </div>
  );
}

Index.getInitialProps = async (context) => {
  const { req, res } = context;
  const session = await getSession({ req });

  if (session && res && session.accessToken) {
    res.writeHead(302, {
      Location: '/',
    });
    res.end();
    return;
  }

  return {
    session: undefined,
    providers: await getProviders(),
  };
};
