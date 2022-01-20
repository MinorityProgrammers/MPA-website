import React from 'react';
import Card from '../../login-signup/card';

const LoginPage = function ({ setClickRegister, clickRegister }) {
  return (
    <>
      {clickRegister ? (
        <div className="create_event">
          <div
            className="create_event-shadow"
            onClick={() => {
              setClickRegister(false);
            }}
          />
          <div id="create_event-container" className="create_event-container">
            <Card setClickRegister={setClickRegister} />
          </div>
          <i
            className="close_icon fas fa-times close-icon tw-text-white"
            onClick={() => {
              setClickRegister(false);
            }}
          />
        </div>
      ) : (
        ''
      )}
    </>
  );
};

export default LoginPage;
