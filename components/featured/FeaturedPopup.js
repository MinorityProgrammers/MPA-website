import React from 'react';

const FeaturedPopup = (props) =>
  props.trigger && (
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
          backgroundColor: '#FFF',
          borderRadius: '15px',
          transition: '0.3s ease-in-out',
        }}
      >
        <button
          className="close__btn"
          style={{
            position: 'absolute',
            top: '16px',
            right: '16px',
            outline: 'none',
          }}
          onClick={() => props.setTrigger(false)}
        >
          <i
            className="far fa-times-circle"
            style={{ fontSize: '24px', color: '#FF7F7F' }}
          />
        </button>
        {props.children}
      </div>
    </div>
  );

export default FeaturedPopup;
