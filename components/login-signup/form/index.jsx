import React from 'react';
import styles from './form.module.css';
import Login from './Login';
import Signup from './Signup';

export default function Index({
  signIn,
  setSubmit,
}) {
  return (
    <div className={styles.container}>
      {signIn === false ? (
        <Signup setSubmit={setSubmit} />
      ) : (
        <Login setSubmit={setSubmit} />
      )}
    </div>
  );
}
