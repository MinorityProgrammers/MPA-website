/* eslint-disable */
import axios from "axios";
import { Form, Formik } from "formik";
import { getProviders, getSession, signIn, useSession } from "next-auth/client";
import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import * as Yup from "yup";
import { googleAuth, nextAuth } from "../../contexts/actions/auth/googleAuth";
import { login } from "../../contexts/actions/auth/login";
import { GlobalContext } from "../../contexts/provider";
import { successToast, errorToast } from "../../contexts/utils/toasts";
import TextField from "../TextField";

const HomepageNavLogin = ({ onCloseMobileMenu }) => {
  const router = useRouter();
  const googleClientId = process.env.CLIENT_ID;
  const [switchToReset, setSwitchToReset] = useState(false);
  const [click, setClick] = useState(false);
  const handleClick = () => setClick(!click);
  const [loginSubmit, setLoginSubmit] = useState(false);
  const [session, isLoading] = useSession();
  const [providers, setPrivders] = useState([]);

  const {
    authDispatch,
    authState: {
      auth: { loading, error, data },
    },
  } = useContext(GlobalContext);

  // user redirect
  useEffect(() => {
    const token = window.localStorage.getItem("jwtToken");
    let timerId;
    if (data || token !== null) {
      setLoginSubmit(false);
      router.push(router.pathname);
      timerId = setTimeout(() => {
        onCloseMobileMenu();
      }, 2000);
    } else {
      // router.push('/login')
      // window.location.href = '/login'
      setLoginSubmit(false);
    }
    return () => timerId && clearTimeout(timerId);
  }, [data]);

  // const { walletAddress, chainId } = useMoralisDapp();

  useEffect(() => {
    const setupProviders = async () => {
      const providers = await getProviders();

      setPrivders(providers);
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
    // keep this

    googleAuth({ tokenId: res.tokenId })(authDispatch);
  };

  const handleLoginFailure = (res) => {
    // console.log(res);
  };

  const onSubmit = async (e) => {
    setLoginSubmit(true);
    login({
      email: e.email,
      password: e.password,
    })(authDispatch);
    setLoginSubmit(false);
  };

  const onReset = async (e) => {
    setLoginSubmit(true);
    try {
      const request = await axios.post(
        "http://localhost:5000/api/v1/user/forgotPassword",
        {
          email: e.email,
        }
      );
      successToast(request.data.message);
    } catch (error) {
      errorToast("User with the given email doesn't exist");
    }
  };

  return (
    <div className={click ? "dropdown-login clicked" : "dropdown-login"}>
      <button
        type="button"
        className="dropdown-login-btn-close"
        onClick={onCloseMobileMenu}
      >
        <i className="fas fa-times" />
      </button>
      <div className="dropdown-login-icons">
        <img
          onClick={() => signIn(providers.google.id)}
          src="./assets/images/login-signup/google.png"
          alt="icon"
        />
        <div>
          <img
            src="/assets/images/linkedin-white.png"
            alt="linkedin icon"
            onClick={() => signIn(providers.linkedin.id)}
          />
        </div>
        <div>
          <img
            src="/assets/images/github.svg"
            alt="github icon"
            onClick={() =>
              signIn(providers.github.id, {
                callbackUrl: "https://minorityprogrammers.com/auth",
              })
            }
          />
        </div>
        <div>
          <img
            src="/assets/images/facebook.svg"
            alt="facebook icon"
            onClick={() => signIn(providers.facebook.id)}
          />
        </div>
      </div>
      <div className="login-form mt-2">
        {!switchToReset && (
          <Formik
            initialValues={{
              email: "",
              password: "",
            }}
            validationSchema={Yup.object({
              email: Yup.string().email("Invalid Email").required("Required"),
              password: Yup.string().required("Required"),
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
                >
                  {/* <p>Forgot password?</p> */}
                </div>
                <button
                  type="submit"
                  className="btn btn-warning btn-dropdown-filled"
                >
                  {loading ? "Signing In..." : "Sign In"}
                </button>
              </Form>
            )}
          </Formik>
        )}
        {switchToReset && (
          <Formik
            initialValues={{
              email: "",
            }}
            validationSchema={Yup.object({
              email: Yup.string().email("Invalid Email").required("Required"),
            })}
            onSubmit={onReset}
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

                <button
                  type="submit"
                  className="btn btn-warning btn-dropdown-filled"
                >
                  {loading ? "Loading..." : "Reset Password"}
                </button>
              </Form>
            )}
          </Formik>
        )}
      </div>

      <div className="login-register mt-2">
        <p
          onClick={() => setSwitchToReset(true)}
          className="tw-cursor-pointer tw-hover:text-blue-700 tw-mb-4"
        >
          Forget password?
        </p>
        <p className="mb-2">Don't have an account?</p>
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
      Location: "/",
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
