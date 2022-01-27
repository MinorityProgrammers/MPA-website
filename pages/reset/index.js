/* eslint-disable */
import { Form, Formik, useField } from "formik";
import React, { useRef, useState, useEffect } from "react";
import { ToastContainer } from "react-toastify";
import styles from "./Reset.module.scss";
import { useRouter } from "next/router";
import Layout from "../../components/Layout";
import HomepageNav from "../../components/homepage/HomepageNav";
import { successToast, errorToast } from "../../contexts/utils/toasts";
import Footer from "../../components/Footer";
import SidebarTwo from "../../components/sidebar/SidebarTwo";
import links from "../../contexts/utils/links";
import ComingSoon from "../../components/ComingSoon";
import * as Yup from "yup";
import { useDetectOutsideClick } from "../../components/UseDetectOutsideClick";
import "react-toastify/dist/ReactToastify.css";
import { ResetInput } from "../../components/TextField";
import axios from "axios";

const Index = () => {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);
  const [hide, setHide] = useDetectOutsideClick(dropdownRef, true);
  const router = useRouter();
  // const [data, setData] = useState([]);
  const handleClick = () => {
    setHide(!hide);
  };
  if (hide === false) {
    setTimeout(() => {
      setHide(true);
    }, 10000);
  }

  useEffect(() => {}, []);

  const onSubmit = async (e) => {
    const { userId, token } = router.query;

    try {
      const resp = await axios.post(
        `http://localhost:5000/api/v1/user/password-reset/${userId}/${token}`,
        {
          password: e.password,
        }
      );
      successToast(resp.data.message);
      successToast("Try logging in with new Password");
      router.push("/");
    } catch (error) {
      errorToast(resp.data.message);
    }
  };

  return (
    <div className={styles.container}>
      <Layout pageTitle="MPA - Password">
        <HomepageNav open={open} setOpen={setOpen} />
        <SidebarTwo open={open} setOpen={setOpen} links={links} active="Home" />
        <>
          {hide === false && <ComingSoon closeClick={handleClick} />}
          <div
            style={{ marginTop: "0" }}
            className="tw-mx-24 tw-my-32 md:tw-mx-4"
          >
            <div className={styles.cardContainer}>
              <ToastContainer limit={3} />
              <div className={`${styles.cardLeft} tw-mt-40`}>
                <div className={styles.contentContainer}>
                  <div className={styles.cardLeftLogo}>
                    <img
                      src="./assets/images/mpicon.svg"
                      alt="icon"
                      className={styles.logo}
                    />
                  </div>
                  <div className={styles.innerText}>
                    <h1>WELCOME BACK</h1>
                    <span>
                      To keep connecting with us please
                      <br />
                      register with your personal info.
                    </span>
                  </div>
                </div>
              </div>
              <div className={`${styles.cardRight} tw-mt-40`}>
                <div className={styles.cardRightText}>
                  <h2>SET NEW PASSWORD</h2>
                </div>
                <div>
                  <Formik
                    initialValues={{
                      password: "",
                      confirmPassword: "",
                    }}
                    validationSchema={Yup.object({
                      password: Yup.string().required("Required"),
                      confirmPassword: Yup.string().oneOf(
                        [Yup.ref("password"), null],
                        "Passwords must match"
                      ),
                    })}
                    onSubmit={onSubmit}
                  >
                    {() => (
                      <Form>
                        <div className="form-group login-input">
                          <div className="mb-3">
                            <span className={`${styles.inputLabel} form-label`}>
                              New Password
                            </span>
                            <ResetInput
                              minLength={6}
                              errorText={styles.errorText}
                              maxLength={128}
                              name="password"
                              type="password"
                              textStyle={styles.passInput}
                              placeholder="Password"
                            />
                          </div>
                          <div className="mb-3">
                            <span className={`${styles.inputLabel} form-label`}>
                              Confirm Password
                            </span>

                            <ResetInput
                              minLength={6}
                              errorText={styles.errorText}
                              maxLength={128}
                              name="confirmPassword"
                              type="password"
                              textStyle={styles.passInput}
                              placeholder="Password"
                            />
                          </div>
                        </div>
                        <button type="submit" className={styles.submit}>
                          Reset Password
                        </button>
                      </Form>
                    )}
                  </Formik>
                </div>
              </div>
            </div>
          </div>
          <Footer />
        </>
      </Layout>
    </div>
  );
};

export default Index;
