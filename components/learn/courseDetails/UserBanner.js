import React from 'react';
import { CircularProgressbarWithChildren, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const UserBanner = function ({ userInfo, userPercentages }) {
  function scrollToModule() {
    window.scrollTo(400, 400);
  }
  return (
    <div className="pt-5 ml-5 pl-md-5">
      <div className="d-md-flex pb-5 mb-2">
        <div className="col-12 col-md-4 mt-2">
          <div style={{ width: 260, height: 260 }}>
            <CircularProgressbarWithChildren
              value={!Number.isNaN(userPercentages) && userPercentages}
              strokeWidth={4}
              styles={buildStyles({
                pathColor: '#ffc700',
                trailColor: '#B9BCC1',
                strokeLinecap: 'butt',
                rotation: 0.25,
                transition: 'stroke-dashoffset 0.5s ease 0s',
              })}
            >
              {userInfo != null && userInfo.profilePicture
                ? <img src={userInfo.profilePicture} className="img-fluid progress-circle" alt="user_image" />
                : <img src="/assets/images/profile.png" className="img-fluid progress-circle" alt="user_image" />}
            </CircularProgressbarWithChildren>
          </div>
        </div>

        <div className="col-12 col-md-6 mt-3 ml-4">
          <div className="user-info">
            {userInfo != null && (
            <h1>
              Welcome back,
              <br />
              {userInfo.firstName}
            </h1>
            )}
            {
              !Number.isNaN(userPercentages) && (
                <p className="mt-3">
                  {userPercentages}
                  % Completed
                </p>
              )
            }
          </div>
          <div className="ml-5 mt-5 pb-4">
            <button type="button" className="btn banner-btn px-5" style={{ borderRadius: '15px' }} onClick={() => { scrollToModule(); }}>Resume</button>
          </div>
        </div>
        <div className="col-md-2" />
      </div>
    </div>
  );
};

export default UserBanner;
