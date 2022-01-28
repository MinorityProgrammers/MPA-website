/* eslint-disable consistent-return */
import { Form, Formik } from 'formik';
import {
  getProviders, getSession, signIn, useSession,
} from 'next-auth/client';
import { useRouter } from 'next/router';
import React, { useContext, useEffect, useState } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import * as Yup from 'yup';
import { googleAuth, nextAuth } from '../../contexts/actions/auth/googleAuth';
import login from '../../contexts/actions/auth/login';
import { GlobalContext } from '../../contexts/provider';
import TextField from '../TextField';

const HomepageNavLogin = ({ onCloseMobileMenu }) => {
  const router = useRouter();
  const [click, setClick] = useState(false);
  const handleClick = () => setClick(!click);
  const [, setLoginSubmit] = useState(false);
  const [session] = useSession();
  const [providers, setPrivders] = useState([]);

  const {
    authDispatch,
    authState: {
      auth: { loading, data },
    },
  } = useContext(GlobalContext);

  useEffect(() => {
    const token = window.localStorage.getItem('jwtToken');
    let timerId;
    if (data || token !== null) {
      setLoginSubmit(false);
      router.push(router.pathname);
      timerId = setTimeout(() => {
        onCloseMobileMenu();
      }, 2000);
    } else {
      setLoginSubmit(false);
    }
    return () => timerId && clearTimeout(timerId);
  }, [data]);

  useEffect(() => {
    const setupProviders = async () => {
      const _providers = await getProviders();

      setPrivders(_providers);
    };
    setupProviders();
  }, []);

  useEffect(() => {
    if (session) {
      nextAuth({
        name: session.user.name,
        email: session.user.email,
        image: session.user.image,
      })(authDispatch);
    }
  }, [session]);

  const handleLoginSuccess = (res) => {
    googleAuth({ tokenId: res.tokenId })(authDispatch);
  };

  const onSubmit = async (e) => {
    setLoginSubmit(true);
    login({
      email: e.email,
      password: e.password,
    })(authDispatch);
    setLoginSubmit(false);
  };

  return (
    <div className={click ? 'dropdown-login clicked' : 'dropdown-login'}>
      <button
        type="button"
        className="dropdown-login-btn-close"
        onClick={onCloseMobileMenu}
      >
        <i className="fas fa-times" />
      </button>
      <div className="dropdown-login-icons">
        <div>
          <img
            src="/assets/images/linkedin-white.png"
            alt="linkedin icon"
            className="tw-mx-4"
            onClick={() => signIn(providers.linkedin.id)}
          />
        </div>
        <div>
          <img
            src="/assets/images/github.svg"
            alt="github icon"
            onClick={() => signIn(providers.github.id, {
              callbackUrl: 'https://minorityprogrammers.com/auth',
            })}
          />
        </div>
      </div>
      <div className="login-form mt-2">
        <Formik
          initialValues={{
            email: '',
            password: '',
          }}
          validationSchema={Yup.object({
            email: Yup.string().email('Invalid Email').required('Required'),
            password: Yup.string().required('Required'),
          })}
          onSubmit={onSubmit}
        >
          {() => (
            <Form>
              <div className="form-group login-input">
                <TextField
                  label="Email Address"
                  name="email"
                  type="email"
                  placeholder="&#xf0e0; Enter email"
                  required
                  textStyle="form-control fas"
                  alertStyle="form-text dropdown-form-text mb-3 tw-text-red-400"
                />
              </div>
              <div className="form-group login-input">
                <TextField
                  label="Password"
                  name="password"
                  type="password"
                  placeholder="&#xf023; Password"
                  textStyle="form-control fas"
                  alertStyle="form-text dropdown-form-text mb-3 tw-text-red-400"
                />
              </div>
              <div
                id="password"
                className="form-text dropdown-form-text mb-3"
              />
              <button
                type="submit"
                className="btn btn-warning btn-dropdown-filled"
              >
                {loading ? 'Signing In...' : 'Sign In'}
              </button>
            </Form>
          )}
        </Formik>
      </div>

      <div className="login-register mt-2">
        <p className="mb-2">Don&apos;t have an account?</p>
        <div className="dropdown-login-button">
          <a
            href="/auth"
            className="btn btn-outline-warning"
            onClick={handleClick}
          >
            Register
          </a>
        </div>
      </div>
    </div>
  );
};

HomepageNavLogin.getInitialProps = async (context) => {
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

export default HomepageNavLogin;
