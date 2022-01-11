import {
  getProviders, getSession, signIn, useSession
} from 'next-auth/client';
import { useRouter } from 'next/router';
import React, { useContext, useEffect, useState } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
  googleAuth,
  nextAuth
} from '../../../contexts/actions/auth/googleAuth';
import { getProfile } from '../../../contexts/actions/profile/getProfile';
import { GlobalContext } from '../../../contexts/provider';
import Form from '../form/index';
import styles from './card.module.css';

export default function Index() {
  // USED FOR SOCIAL AUTHENTICATION

  const googleClientId = process.env.CLIENT_ID;
  const [session, isLoading] = useSession();

  // Instead of another page we will set the text to variables
  const {cardText, setCardText} = useState()
  ({
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
  
  useEffect (()=>{
    localStorage.setItem('cardText',{signIn:False})
  })
  //   localStorage.setItem('cardText',
  //   { signIn:false,
  //     h1Title: 'welcome',
  //     p: (
  //       <p>
  //         To keep connecting with us please
  //         {' '}
  //         <br />
  //         {' '}
  //         register with your personal
  //         info
  //       </p>
  //     ),
  //     h2Title: 'sign up',
  //     para: 'already have an account?',
  //     link: 'sign in',})
  // })

  // STATES USED THROUGHOUT THE COMPONENT
  const [submit, setSubmit] = useState(false);
  const [spin, setSpin] = useState(false);
  const [signedIn, setSignedIn] = useState(false);
  const [userData, setUserData] = useState([]);
  const [providers, setPrivders] = useState([]);
  const router = useRouter();

  const {
    profileDispatch,
    profileState: {
      profile: { profileLoading, profileError, profileData },
    },
  } = useContext(GlobalContext);

  useEffect(() => {
    if (window.localStorage.getItem('jwtToken')) {
      getProfile(setUserData)(profileDispatch);
    }
  }, []);

  useEffect(() => {
    const setupProviders = async () => {
      const providers = await getProviders();

      setPrivders(providers);
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
      auth: { loading, error, data },
    },
  } = useContext(GlobalContext);

  const regEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  // the body to be sent to the api
  const registerBody = {
    firstName,
    lastName,
    email,
    password,
    confirmPassword: ConfirmPassword,
  };

  const loginBody = {
    email,
    password,
  };
   

  

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

    if (window.localStorage.getItem('cardText.signIn') == true) {
      window.localStorage.getItem(setCardText)({
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
    } else if (window.localStorage.getItem("cardText.signIn") === false) {
      window.localStorage.getItem(setCardText)({
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

  console.log(session);

  //local storage signIn / Register
  useEffect (() =>{

    const {login, register} = useState
    localStorage.setItem('login',false)
    localStorage.setItem('register', false)
  })
  

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
              alt="icon"
            />
          </li>
          <li>
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
          </li>
          <li>
            <img
              onClick={() => signIn(providers.facebook.id)}
              src="./assets/images/login-signup/facebook.png"
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
