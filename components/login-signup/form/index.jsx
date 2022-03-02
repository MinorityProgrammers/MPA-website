import React from 'react';
import Login from './Login';
import Signup from './Signup';

export default function Index({
  signIn,
  setSubmit,
}) {
  return (
    <div>
      {signIn === false ? (
        <Signup setSubmit={setSubmit} />
      ) : (
        <Login setSubmit={setSubmit} />
      )}
    </div>
  );
}
