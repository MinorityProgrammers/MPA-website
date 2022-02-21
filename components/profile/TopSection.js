import React, { useState, useEffect } from 'react';
import { Tooltip } from 'antd';
import { useRouter } from 'next/router';
import FormData from 'form-data';
import { getEllipsisTxt } from '../../helpers/formatters';
import ButtonComponent from './ButtonComponent';
import updateProfile from '../../contexts/actions/profile/updateProfile';

function TopSection({
  userData,
  isLoggedIn,
  ownsProfile,
  setGenerateAvatarPopUp,
  isMinting,
  onMint,
  socialLinks,
  walletAddress,
  copyText,
  copyWallet,
  profileDispatch,
  setChangeInProfile,
}) {
  const router = useRouter();
  const [bio, setBio] = useState('');
  const [stateChanged, setStateChanged] = useState(false);
  const [stateUpdating, setStateUpdating] = useState(false);
  const [allowUpdate, setAllowUpdate] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (bio !== '') {
      setStateChanged(true);
    } else {
      setStateChanged(false);
    }
    if (bio.trim() !== userData.bio && bio.length <= 600) {
      setAllowUpdate(true);
    } else {
      setAllowUpdate(false);
    }
  }, [bio]);

  const handleSubmit = () => {
    setIsSaving(true);
    const formData = new FormData();
    formData.append('bio', bio);

    try {
      updateProfile(userData._id, formData)(profileDispatch);
      setTimeout(() => {
        setIsSaving(false);
        setChangeInProfile(true);
        setStateUpdating(false);
      }, 3000);
    } catch {
      setIsSaving(false);
    }
  };

  return (
    <>
      <div className="tw-py-20 profileTopSection tw-relative tw-z-10">
        <div className="tw-absolute tw-top-1/2 tw-bottom-1/2 tw-right-1 tw-z-0">
          <img
            src="/assets/images/home-page/about-title-icon.svg"
            alt="blockchain"
            className="tw-w-16"
          />
        </div>
        <div className="tw-my-5">
          <div className="tw-m-8 tw-flex tw-flex-row tw-justify-start tw-w-1/6 lg:tw-w-1/2">
            <img onClick={() => { router.back(); }} className="tw-w-12 tw-h-12 tw-mt-1 xl:tw-w-8 xl:tw-mt-3 tw-cursor-pointer" src="/assets/new/arrow-down-circle.png" alt="back arrow" />
            <p className="tw-text-white tw-mx-3 tw-mt-6 tw-text-2xl xl:tw-text-xl">My Profile</p>
          </div>
        </div>

        <div className="tw-w-11/12 tw-mx-auto tw-rounded-xl tw-shadow-md tw-overflow-hidden md:tw-max-w-3xl topSection">
          <div className="md:tw-flex tw-relative tw-w-full">
            <div className="new-bg tw-w-full tw-h-28 tw-flex tw-justify-end tw-p-5 editSection">
              <div onClick={() => router.push('/settings')} className="tw-bg-white tw-rounded-3xl tw-w-1/5 xl:tw-w-1/3 tw-h-14 tw-p-4 md:tw-p-3 tw-flex tw-flex-row tw-justify-center tw-cursor-pointer hover:tw-bg-gray-200">
                <img className="tw-w-6 tw-h-6" src="/assets/new/edit.png" alt="edit icon" />
                <p className="newColor tw-mx-3 tw-mt-0 tw-text-md tw-font-medium">Edit Profile</p>
              </div>
            </div>
            <div className="tw-w-full tw-p-2 tw-py-10">
              <div className="tw-absolute tw-flex tw-justify-center tw-top-10 absoluteUser">
                <div className="tw-relative tw-border-8 tw-border-gray-900 tw-rounded-full">
                  {' '}
                  <img src={userData?.profilePicture || '/assets/images/profile.png'} className="tw-rounded-full tw-w-28 tw-h-28" alt="user pic icon" />
                  {' '}
                  {isLoggedIn && ownsProfile && (
                  <span className="tw-absolute tw-border-white tw-border-6 tw-h-8 tw-top-16 tw-left-20 tw-bg-white tw-rounded-full tw-w-8 tw-flex tw-justify-center tw-py-2">

                    <img onClick={() => setGenerateAvatarPopUp(true)} className="tw-w-4 tw-h-4 tw-shadow-2xl tw-cursor-pointer" src="/assets/new/camera.png" alt="camera icon" />

                  </span>
                  )}
                  {' '}
                </div>
              </div>
            </div>

          </div>
          <div className="tw-flex tw-flex-col tw-my-4 tw-py-2 tw-w-full tw-justify-center">
            <p className="colorSecond tw-text-md tw-text-center">{`@${userData?.userName}`}</p>
            <p className="tw-text-white tw-text-md tw-text-center">{`${userData?.email}`}</p>
            <p className="tw-text-white tw-text-xl tw-text-center">{`${userData?.firstName} ${userData?.lastName}`}</p>
            <div className="sl-wrap">
              <div className="tw-justify-center tw-text-center tw-my-2">
                {socialLinks.length >= 1 && socialLinks.map((linkSocial) => (
                  <a
                    key={linkSocial.id}
                    target="_blank"
                    rel="noreferrer"
                    href={linkSocial.url || '#'}
                  >
                    <span className="social">{linkSocial.slink}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>
          {isLoggedIn && ownsProfile && walletAddress && (
          <div className="tw-flex tw-flex-row md:tw-flex-col md:tw-w-full tw-my-4 tw-py-2 tw-w-full tw-justify-center">
            <Tooltip placement="top" title={copyText} color="#a159fe">
              <button type="button" onClick={() => { copyWallet(); }} className="gradientBg tw-w-1/4 md:tw-w-11/12 tw-p-3 tw-rounded-3xl tw-h-12 tw-flex tw-flex-row tw-justify-evenly tw-mx-2">
                <p className="tw-text-white tw-text-md">{getEllipsisTxt(walletAddress, 10)}</p>
                <img className="tw-w-5 tw-h-5 tw-shadow-2xl tw-cursor-pointer" src="/assets/new/copy.png" alt="copy icon" />
              </button>
            </Tooltip>

            <ButtonComponent func={() => { onMint(); }} text="Mint Profile" state={isMinting} />
          </div>
          )}
          <div className="tw-my-2 tw-p-10">
            <div className="tw-w-full Biosection tw-flex tw-flex-row tw-justify-between">
              <p className="tw-text-2xl tw-font-normal
               tw-my-2 tw-text-white"
              >
                Bio
              </p>
              {isLoggedIn && ownsProfile && userData?.bio && (
              <div className="tw-w-1/6 md:tw-w-1/4 tw-flex tw-flex-row">
                <img onClick={() => { setStateUpdating(!stateUpdating); setBio(userData.bio); }} className="tw-w-8 tw-h-8 tw-cursor-pointer" src="/assets/new/edit.png" alt="edit icon" />
                <p className="tw-text-gray-500 tw-m-2">600 words</p>
              </div>
              )}

            </div>
            {userData?.bio && ownsProfile && isLoggedIn ? (
              <>
                {!stateUpdating ? (
                  <div className="tw-p-5 tw-flex tw-flex-row tw-justify-center">
                    <p className="tw-text-lg tw-font-normal
               tw-my-2 tw-text-gray-500 tw-bg-transparent tw-w-full tw-outline-none"
                    >
                      {userData.bio ? userData.bio : 'No Bio'}

                    </p>

                  </div>
                ) : (
                  <div className="tw-p-5 tw-flex tw-flex-col tw-justify-center">
                    <textarea
                      maxLength={600}
                      className="tw-text-lg tw-font-normal
                               tw-my-2 tw-text-gray-500 tw-bg-transparent tw-w-full tw-outline-none"
                      placeholder={userData.bio}
                      value={bio}
                      onChange={(e) => { setBio(e.target.value); }}
                    />
                    <div className="tw-flex tw-flex-row">
                      <button type="button" onClick={() => { setStateUpdating(false); }} className="tw-bg-red-500 hover:tw-bg-red-600 tw-outline-none focus:tw-ring-offset-0 focus:tw-border-opacity-0 tw-ring-offset-0 tw-transition tw-ease-in-out tw-delay-150 duration-300 tw-w-1/6 tw-p-3 tw-rounded-3xl tw-h-12 tw-flex tw-flex-row tw-justify-center tw-mx-2 tw-text-white">Cancel</button>
                      {stateChanged && (
                      <div className="tw-justify-center tw-flex-end tw-w-full">
                        <ButtonComponent func={() => { if (allowUpdate) { handleSubmit(); } }} text="save" state={isSaving} disabled={!allowUpdate} />
                      </div>
                      )}
                    </div>
                  </div>
                )}
              </>

            ) : (
              <>
                {ownsProfile ? (
                  <div className="tw-p-5 tw-flex tw-flex-col tw-justify-center">
                    <div className="tw-flex tw-flex-row tw-justify-between">
                      <textarea
                        maxLength={600}
                        className="tw-text-lg tw-font-normal
               tw-my-2 tw-text-gray-500 tw-bg-transparent tw-w-11/12 tw-outline-none"
                        placeholder="Tell us about you"
                        value={bio}
                        onChange={(e) => { setBio(e.target.value); }}
                      />
                      {' '}
                      <p className="tw-text-gray-500 tw-my-6 tw-w-1/6">600 words</p>

                    </div>

                    {stateChanged && (
                    <div className="tw-my-2 tw-justify-center tw-flex-end tw-w-full">
                      <ButtonComponent func={() => { handleSubmit(); }} text="save" state={isSaving} />
                    </div>
                    )}

                  </div>
                ) : (
                  <p className="tw-text-lg tw-font-normal
                tw-my-2 tw-text-gray-500 tw-bg-transparent tw-w-full tw-outline-none"
                  >
                    No Bio!
                  </p>
                )}

              </>

            )}
          </div>

        </div>
      </div>
    </>
  );
}

export default TopSection;
