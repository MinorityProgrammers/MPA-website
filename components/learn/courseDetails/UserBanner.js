import React from "react";
// import {
//   CircularProgressbarWithChildren,
//   buildStyles,
// } from "react-circular-progressbar";
// import "react-circular-progressbar/dist/styles.css";

const UserBanner = ({ userInfo, userPercentages }) => {
  function scrollToModule() {
    window.scrollTo(400, 400);
  }
  return (
    <div className=" pt-1 ml-5">
      <div className="d-md-flex pb-1 mb-1">
        <div className=" mt-2">
          <div style={{ width: 70, height: 70 }}>
            {userInfo != null && userInfo.profilePicture ? (
              <img
                src={userInfo.profilePicture}
                className="img-fluid progress-circle"
                alt="user_image"
              />
            ) : (
              <img
                src="/assets/images/profile.png"
                className="img-fluid progress-circle"
                alt="user_image"
              />
            )}
          </div>
        </div>

        <div className="ml-3 mt-3">
          <div className="user-info ">
            {userInfo != null && (
              <h1 className="user-info-style">
                Welcome back, {userInfo.firstName}
              </h1>
            )}
          </div>
        </div>
      </div>
      <div className="ml-1  mb-2 pb-1">
        {!Number.isNaN(userPercentages) && (
          <p className="mt-3 tw-text-white">{userPercentages}% Completed</p>
        )}
        <div className="progress mt-2 mb-2">
          <div
            className="progress-bar"
            style={{ width: `${userPercentages}%` }}
            role="progressbar"
            aria-valuenow={userPercentages}
            aria-valuemin="0"
            aria-valuemax="100"
          />
        </div>
        <div className="mt-3 mb-4">
          <button
            type="button"
            className="btn banner-btn px-5"
            style={{ borderRadius: "15px" }}
            onClick={() => {
              scrollToModule();
            }}
          >
            Resume
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserBanner;
