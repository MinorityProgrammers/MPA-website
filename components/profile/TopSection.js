import React from 'react';

function TopSection() {
  return (
    <>
      <div className="tw-py-20 profileTopSection">
        <div className="tw-my-5">
          <div className="tw-m-8 tw-flex tw-flex-row tw-justify-start tw-w-1/6">
            <img className="tw-w-16" src="/assets/new/arrow-down-circle.png" alt="back arrow" />
            <p className="tw-text-white tw-mx-3 tw-mt-3 tw-text-2xl">My Profile</p>
          </div>
        </div>

        <div className="tw-max-w-6xl tw-mx-auto tw-rounded-xl tw-shadow-md tw-overflow-hidden md:tw-max-w-md topSection">
          <div className="md:tw-flex tw-relative">
            <div className="new-bg tw-w-full tw-h-28 tw-flex tw-justify-end tw-p-5">
              <div className="tw-bg-white tw-rounded-3xl tw-w-1/5 tw-h-14 tw-p-4 tw-flex tw-flex-row tw-justify-center tw-cursor-pointer hover:tw-bg-gray-200">
                <img className="tw-w-6" src="/assets/new/edit.png" alt="edit icon" />
                <p className="newColor tw-mx-3 tw-mt-1 tw-text-md tw-font-medium">Edit Profile</p>
              </div>
            </div>
            <div className="tw-w-full tw-p-2 tw-py-10">
              <div className="tw-absolute tw-flex tw-justify-center tw-top-10 absoluteUser">
                <div className="tw-relative tw-border-8 tw-border-gray-900 tw-rounded-full">
                  {' '}
                  <img src="https://i.imgur.com/z4YSzDD.jpg" className="tw-rounded-full tw-w-28" alt="user pic icon" />
                  {' '}
                  <span className="tw-absolute tw-border-white tw-border-6 tw-h-8 tw-top-16 tw-left-20 tw-bg-white tw-rounded-full tw-w-8 tw-flex tw-justify-center tw-py-2">
                    <img className="tw-w-4 tw-h-4 tw-shadow-2xl tw-cursor-pointer" src="/assets/new/camera.png" alt="camera icon" />
                  </span>
                  {' '}
                </div>
              </div>
            </div>
          </div>
          <div className="tw-flex tw-flex-col tw-my-4 tw-py-2 tw-w-full tw-justify-center">
            <p className="colorSecond tw-text-md tw-text-center">@ClaraMady</p>
            <p className="tw-text-white tw-text-md tw-text-center">claraMady@gmail.com</p>
            <p className="tw-text-white tw-text-xl tw-text-center">Clara Mady</p>
          </div>
          <div className="tw-flex tw-flex-row md:tw-flex-col tw-my-4 tw-py-2 tw-w-full tw-justify-center">
            <button type="button" className="gradientBg tw-w-1/4 tw-p-3 tw-rounded-3xl tw-h-12 tw-flex tw-flex-row tw-justify-around tw-mx-2">
              <p className="tw-text-white tw-text-md">0x6cCe1E90630D...5030Bd4b24</p>
              <img className="tw-w-5 tw-h-5 tw-shadow-2xl tw-cursor-pointer" src="/assets/new/copy.png" alt="copy icon" />
            </button>
            <button type="button" className="mintBTN tw-transition tw-ease-in-out tw-delay-150 duration-300 tw-w-1/6 tw-p-3 tw-rounded-3xl tw-h-12 tw-flex tw-flex-row tw-justify-center tw-mx-2">
              <p className="tw-text-white tw-text-md tw-text-center">Mint Profile</p>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default TopSection;
