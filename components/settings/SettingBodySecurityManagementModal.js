import React, { useContext } from 'react';
import axios from 'axios';
import { signOut, useSession } from 'next-auth/client';
import emailjs from '@emailjs/browser';
import Router from 'next/router';
import styles from '../../styles/settings/settingBodySecurityManagementModal.module.css';
import { successToast, errorToast } from '../../contexts/utils/toasts';
import { LOGOUT_USER } from '../../contexts/actions/actionTypes';
import { GlobalContext } from '../../contexts/provider';
import updateProfileJSON from '../../contexts/actions/profile/updateProfileJSON';

const SettingBodySecurityManagementModal = ({
  modal,
  goBack,
  data,
}) => {
  const [session] = useSession();

  const { authDispatch, profileDispatch } = useContext(GlobalContext);

  function sendEmail(e) {
    emailjs
      .sendForm(
        'service_17fj8xn',
        'template_m7523br',
        e.target,
        'user_GZW9IIq4bQnBZXdhJvD5R',
      )
      .then(
        (result) => {
          console.log(result.text);
        },
        (error) => {
          console.log(error.text);
        },
      );
    e.target.reset();
  }
  const deleteHandler = (e) => {
    e.preventDefault();
    const token = window.localStorage.getItem('jwtToken');
    axios.get(`${process.env.BASE_URI}/user/delete/${data._id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        console.log(response);
        sendEmail(e);
        successToast('successfully deleted account');
        localStorage.removeItem('userInfo');
        localStorage.removeItem('jwtToken');
        authDispatch({
          type: LOGOUT_USER,
        });
        if (session) {
          signOut();
        }
        Router.push('/');
      })
      .catch((error) => {
        if (error.response) {
          console.log(error.response.data);
        } else if (error.request) {
          console.log(error.request);
        } else {
          console.log('Error', error.message);
        }
        console.log(error.config);
        errorToast('Something went wrong');
      });
  };
  const deactivateHandler = (e) => {
    e.preventDefault();
    const updatedUser = updateProfileJSON(
      data._id,
      JSON.stringify({ isDeactivated: true }),
    )(profileDispatch);
    updatedUser.then(() => {
      sendEmail(e);
      successToast('successfully deactivated account');
      localStorage.removeItem('userInfo');
      localStorage.removeItem('jwtToken');
      authDispatch({
        type: LOGOUT_USER,
      });
      if (session) {
        signOut();
      }
      Router.push('/');
    });
  };
  return (
    <div className={styles.modalWrap}>
      <div className={styles.modalADD}>
        <h1>
          Are you sure you want to
          {` ${modal}`}
          {' '}
          your account?
        </h1>
        <p>
          Please leave a feedback why you are
          {' '}
          {`${modal.slice(0, -1)}ing`}
          {' '}
          your
          account:
        </p>
        <form onSubmit={modal === 'delete' ? deleteHandler : deactivateHandler}>
          <textarea
            placeholder="Feedback here"
            rows={5}
            name="feedback"
            required
          />
          <input type="hidden" name="fullName" value={`${data?.firstName} ${data?.lastName}`} />
          <input type="hidden" name="status" value={modal === 'delete' ? 'deleted' : 'deactivated'} />
          <input type="hidden" name="email" value={data?.email} />
          <div className={styles.actionBtns}>
            <div className={`${styles.goBack} ${styles.btn}`} onClick={goBack}>
              Go Back
            </div>
            <input className={`${styles[modal]} ${styles.btn}`} type="submit" value={`${modal} Account`} />
          </div>
        </form>

        <div className={styles.ps}>
          <span className={modal === 'delete' ? styles.warn : styles.note}>
            {modal === 'delete' ? 'WARNING! ' : 'NOTE! '}
          </span>
          {modal === 'delete'
            ? `Your account will be permanently deleted and
          cannot be reactivated!`
            : 'Your account will be activated upon signing in'}
        </div>
      </div>
    </div>
  );
};

export default SettingBodySecurityManagementModal;
