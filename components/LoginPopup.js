import React from 'react';

const LoginPop = (props) => props.trigger && (
<div
  className="popup"
  style={{
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100vh',
    backgroundColor: 'rgb(0,0,0,0.8)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    color: 'black',
    zIndex: '20',
  }}
>
  <div
    className="popup__inner"
    style={{
      position: 'relative',
      padding: '32px',
      width: '100%',
      maxWidth: '640px',
      backgroundColor: 'none',
      borderRadius: '15px',
      transition: '0.3s ease-in-out',
    }}
  >
    {props.children}
  </div>
</div>
);

export default LoginPop;
