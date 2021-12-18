import React, {
  useState, useContext, useEffect, useRef,
} from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { GoogleLogin, GoogleLogout } from 'react-google-login';
import { useRouter } from 'next/router';
import {
  signIn,
  signOut,
  useSession,
  getProviders,
  providers,
  getSession,
} from 'next-auth/client';
import styles from './card.module.css';
import Form from '../form/index';
import { GlobalContext } from '../../../contexts/provider';
import { register } from '../../../contexts/actions/auth/register';
import { login } from '../../../contexts/actions/auth/login';
import { googleAuth, nextAuth } from '../../../contexts/actions/auth/googleAuth';
import 'react-toastify/dist/ReactToastify.css';
import { getProfile } from '../../../contexts/actions/profile/getProfile';

export default function Index() {
  // USED FOR SOCIAL AUTHENTICATION

  const googleClientId = process.env.CLIENT_ID;
  const [session, isLoading] = useSession();

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

  // NAME USED FOR USERS PROFILE
  const [name, setName] = useState('');
  let firstName = '';
  let lastName = '';

  // checking first name and lastname

  if (name.trim().split(' ').length < 2) {
    firstName = name;
    lastName = name;
  } else {
    firstName = name.trim().split(' ')[0];
    lastName = name.trim().split(' ')[1];
  }

  // STATES USED THROUGHOUT THE COMPONENT
  const [submit, setSubmit] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [ConfirmPassword, setConfirmPassword] = useState('');
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
        const loginSignUp = document.querySelector('.card_cardContainer__12vmM');
        loginSignUp.style.display = 'none';
      } else {
        const loginSignUp = document.querySelector('.create_event');
        loginSignUp.style.display = 'none';
      }
    }
  }, [data]);

  const handleRegister = async (e) => {
    e.preventDefault();

    setSubmit(true);

    setTimeout(() => {
      setSubmit(false);
    }, 3000);

    if (
      (email !== ''
        || name !== ''
        || password !== ''
        || ConfirmPassword !== ' ')
      && email.length > 5
      && regEmail.test(email)
      && password.length >= 6
      && password === ConfirmPassword
    ) {
      setSpin(true);

      register(registerBody)(authDispatch);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    setSubmit(true);

    setTimeout(() => {
      setSubmit(false);
    }, 3000);

    if (
      (email !== '' || password !== '')
      && email.length > 5
      && regEmail.test(email)
      && password.length >= 6
    ) {
      setSpin(true);

      login(loginBody)(authDispatch);
    }
  };

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
      nextAuth({ name: session.user.name, email: session.user.email, image: session.user.image })(authDispatch);
    }
  }, [session]);

  return (
    <div className={styles.cardContainer}>
      <ToastContainer limit={3} />
      <div className={`${styles.cardLeft} ${router.pathname.endsWith('/auth') ? 'tw-mt-40' : ''}`}>
        <div className={styles.contentContainer}>
          <div className={styles.cardLeftLogo}>
            <img
              src="/assets/images/mpicon.svg"
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
      <div className={`${styles.cardRight} ${router.pathname.endsWith('/auth') ? 'tw-mt-40' : ''}`}>
        <div className={styles.cardRightText}>
          <h2>{cardText.h2Title}</h2>
          <p>
            {cardText.para}
            <a href="#" className="tw-text-blue-800" onClick={handleClick}>
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
          email={email}
          setEmail={setEmail}
          name={name}
          setName={setName}
          submit={submit}
          regEmail={regEmail}
          password={password}
          setPassword={setPassword}
          data={data}
          handleLogin={handleLogin}
          spin={spin}
          setSpin={setSpin}
          handleRegister={handleRegister}
          ConfirmPassword={ConfirmPassword}
          loading={loading}
          setConfirmPassword={setConfirmPassword}
          error={error}
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
