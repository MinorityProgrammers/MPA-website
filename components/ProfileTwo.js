import React, { useState, useEffect, useCallback } from 'react';
import {
  FaFacebook,
  FaLinkedin,
  FaGithub,
  FaGoogle,
  FaFigma,
  FaDribbble,
} from 'react-icons/fa';
import axios from 'axios';
import { HiOutlinePencil } from 'react-icons/hi';
import jwt from 'jsonwebtoken';
import { useRouter } from 'next/router';
import { Tooltip, Button, Modal } from 'antd';
import { useMoralis } from 'react-moralis';
import { ethers } from 'ethers';
import Web3Modal from 'web3modal';
import ProfileTwoGenerateAvatarPopUp from './ProfileTwoGenerateAvatarPopUp';
import getProgressPercentage from '../contexts/utils/settings/getProgressPercentage';
import getLevelUpTips from '../contexts/utils/settings/getLevelUpTips';
import { useMoralisDapp } from '../MoralisDappProvider/MoralisDappProvider';
import projectCards from '../contexts/utils/profile/projectCards.json';
import pinnedCards from '../contexts/utils/profile/pinnedCards.json';
import NFT from '../artifacts/contracts/NFT.sol/NFT.json';

const nftaddress = process.env.ADDRESS;

function countDown(mintedURL, tx) {
  let secondsToGo = 30;
  const modal = Modal.success({
    title: 'Successfully minted Your profile',
    content: `Checkout your minted profile metadata ${mintedURL}, transaction id: ${process.env.NETWORK_URL}/tx/${tx.transactionHash}`,
  });
  const timer = setInterval(() => {
    secondsToGo -= 1;
  }, 1000);
  setTimeout(() => {
    clearInterval(timer);
    modal.destroy();
  }, secondsToGo * 1000);
}

const ProfileTwo = function ({ userData, isLoggedIn, ownsProfile }) {
  const reputationBadge = {
    jobApplyCount: '/assets/images/job_apply.png',
    eventRegisterCount: '/assets/images/event_badge.png',
    courseEnroll: '/assets/images/course_enroll.png',
    courseFinish: '/assets/images/course_finish.png',
  };

  const [generateAvatarPopUp, setGenerateAvatarPopUp] = useState(false);
  const [socialLinks, setSocialLinks] = useState([]);
  const [userID, setUserID] = useState('');
  const [psArrowUp, setPsArrowUp] = useState(false);

  const [experienceCards, setExperienceCards] = useState([
    {
      cardId: 1,
      jobImg: '/assets/images/profile/exp-microsoft.png',
      jobTitle: 'Product Designer at Microsoft',
      date: 'June 2021 - Present • 4 mos',
      location: 'Remote',
    },
    {
      cardId: 2,
      jobImg: '/assets/images/profile/exp-mp.png',
      jobTitle: 'Product Designer at Microsoft',
      date: 'March - June 2021 • 3 mos',
      location: 'Remote',
    },
  ]);
  const [expAddMode, setExpAddMode] = useState(false);
  const [expEditMode, setExpEditMode] = useState(false);
  const [uploadedExpImg, setUploadedExpImg] = useState('');
  const [expJobTitleInput, setExpJobTitleInput] = useState('');
  const [expDateInput, setExpDateInput] = useState('');
  const [expLocationInput, setExpLocationInput] = useState('');
  const { walletAddress } = useMoralisDapp();
  const [educationCards, setEducationCards] = useState([
    {
      cardId: 3,
      eduImg: '/assets/images/profile/exp-florida-uni.png',
      eduTitle: 'University of Florida',
      date: 'Sept 2017 - June 2021',
      location: 'Bachelor’s degree, Computer Science',
    },
  ]);
  const [eduAddMode, setEduAddMode] = useState(false);
  const [eduEditMode, setEduEditMode] = useState(false);
  const [uploadedEduImg, setUploadedEduImg] = useState('');
  const [eduTitleInput, setEduTitleInput] = useState('');
  const [eduDateInput, setEduDateInput] = useState('');
  const [eduLocationInput, setEduLocationInput] = useState('');
  const [copyText, setCopyText] = useState('Click to copy');
  const [isMinting, setIsMinting] = useState(false);
  const [, setDoneMinting] = useState(false);
  // const [mintedURL, setMintedURl] = useState('');
  const [reputation, setReputation] = useState([]);
  const [enrolledCourses, setEnrolledCourses] = useState([]);

  const router = useRouter();
  const { Moralis } = useMoralis();

  useEffect(() => {
    const userToken = JSON.parse(localStorage.getItem('userInfo'));
    if (userToken !== null) {
      axios
        .get(`${process.env.BASE_URI}/learn/userCourses`, {
          headers: {
            Authorization: `Bearer ${userToken.token}`,
          },
        })
        .then((res) => {
          setEnrolledCourses(res.data.data);
        });
    }
    axios
      .get(`${process.env.BASE_URI}/reputation/userReputations`, {
        headers: {
          Authorization: `Bearer ${userToken.token}`,
        },
      })
      .then((res) => {
        setReputation(res.data.data);
      });
  }, []);

  useEffect(() => {
    const allSocials = [
      {
        id: 101,
        name: 'FacebookLink',
        url: '',
        slink: <FaFacebook style={{ fill: 'url(#pink-gradient)' }} />,
      },
      {
        id: 102,
        name: 'LinkedinLink',
        url: '',
        slink: <FaLinkedin style={{ fill: 'url(#pink-gradient)' }} />,
      },
      {
        id: 103,
        name: 'GithubLink',
        url: '',
        slink: <FaGithub style={{ fill: 'url(#pink-gradient)' }} />,
      },
      {
        id: 104,
        name: 'GoogleLink',
        url: '',
        slink: <FaGoogle style={{ fill: 'url(#pink-gradient)' }} />,
      },
      {
        id: 105,
        name: 'FigmaLink',
        url: '',
        slink: <FaFigma style={{ fill: 'url(#pink-gradient)' }} />,
      },
      {
        id: 106,
        name: 'DribbleLink',
        url: '',
        slink: <FaDribbble style={{ fill: 'url(#pink-gradient)' }} />,
      },
      {
        id: 107,
        name: 'ClickupLink',
        url: '',
        slink: (
          <img src="/assets/images/profile/si-clickup.svg" alt="si-clickup" />
        ),
      },
    ];

    const socials = [];

    if (userData) {
      allSocials.forEach((social) => {
        if (userData[social.name]) {
          social.url = userData[social.name];
          socials.push(social);
        }
      });
    }
    setSocialLinks(socials);
  }, [userData]);

  useEffect(() => {
    if (isLoggedIn && ownsProfile) {
      const token = window.localStorage.getItem('jwtToken');
      const userInfo = window.localStorage.getItem('userInfo');
      if (!(token == null) || !(userInfo == null)) {
        setUserID(jwt.decode(token).id);
      }
    }
  }, [isLoggedIn, ownsProfile]);

  useEffect(() => {
    if (!isLoggedIn || !ownsProfile) {
      setGenerateAvatarPopUp(false);
    }
  }, [isLoggedIn, ownsProfile]);

  /*  const downloadProfilePDF = () => {}; // this function is unused */

  const copyWallet = () => {
    setCopyText('Copied');
    navigator.clipboard.writeText(walletAddress);
  };

  const handleExpImgUpload = (file) => {
    if (file) { setUploadedExpImg(URL.createObjectURL(file)); }
  };
  const clearExpAdd = () => {
    document.getElementsByClassName('exp-data-warn')?.[0]?.remove();
    setUploadedExpImg('');
    setExpJobTitleInput('');
    setExpDateInput('');
    setExpLocationInput('');
    setExpAddMode(false);
  };
  const removeExp = (expId) => {
    if (experienceCards.length === 1) { setExpEditMode(false); }
    setExperienceCards((prevCards) => prevCards.filter((card) => card.cardId !== expId));
  };

  const completeExpAdd = () => {
    if (
      uploadedExpImg
      && expJobTitleInput
      && expDateInput
      && expLocationInput
    ) {
      const newCard = {
        cardId: Math.floor(Math.random() * 100000),
        jobImg: uploadedExpImg,
        jobTitle: expJobTitleInput,
        date: expDateInput,
        location: expLocationInput,
      };

      document.getElementsByClassName('exp-data-warn')?.[0]?.remove();
      setExperienceCards((currentCards) => [...currentCards, newCard]);
      clearExpAdd();
    } else if (!document.getElementsByClassName('exp-data-warn')?.[0]) {
      const el = document.getElementById('add-exp-fields');
      el.insertAdjacentHTML(
        'afterend',
        '<div class="exp-data-warn tw-ml-4 tw-mb-3 tw-self-end tw-text-red-500 tw-font-bold">Please add an image and fill in all fields</div>',
      );
    }
  };

  const handleEduImgUpload = (file) => {
    if (file) { setUploadedEduImg(URL.createObjectURL(file)); }
  };

  const clearEduAdd = () => {
    document.getElementsByClassName('edu-data-warn')?.[0]?.remove();
    setUploadedEduImg('');
    setEduTitleInput('');
    setEduDateInput('');
    setEduLocationInput('');
    setEduAddMode(false);
  };

  const removeEdu = (eduId) => {
    if (educationCards.length === 1) { setEduEditMode(false); }
    setEducationCards((prevCards) => prevCards.filter((card) => card.cardId !== eduId));
  };

  const completeEduAdd = () => {
    if (uploadedEduImg && eduTitleInput && eduDateInput && eduLocationInput) {
      const newCard = {
        cardId: Math.floor(Math.random() * 100000),
        eduImg: uploadedEduImg,
        eduTitle: eduTitleInput,
        date: eduDateInput,
        location: eduLocationInput,
      };

      document.getElementsByClassName('edu-data-warn')?.[0]?.remove();
      setEducationCards((currentCards) => [...currentCards, newCard]);
      clearEduAdd();
    } else if (!document.getElementsByClassName('edu-data-warn')?.[0]) {
      const el = document.getElementById('add-edu-fields');
      el.insertAdjacentHTML(
        'afterend',
        '<div class="edu-data-warn tw-ml-4 tw-mb-3 tw-self-end tw-text-red-500 tw-font-bold">Please add an image and fill in all fields</div>',
      );
    }
  };

  const onMint = async () => {
    const file = new Moralis.File('avatar.png', {
      base64: userData.profilePicture,
    });
    setIsMinting(true);
    try {
      await file.saveIPFS();
      if (file.ipfs()) {
        const metadata = {
          name: `${userData.firstName} ${userData.lastName}`,
          image: file.ipfs() || '',
          description: userData?.bio || '',
          attributes: userData.avatarOptions,
        };

        const JsonFormat = JSON.stringify(metadata);

        const mintedMetadata = new Moralis.File('metadata.json', {
          base64: btoa(JsonFormat),
        });
        await mintedMetadata.saveIPFS();

        if (mintedMetadata.ipfs()) {
          const web3Modal = new Web3Modal();
          const connection = await web3Modal.connect();
          const provider = new ethers.providers.Web3Provider(connection);
          const signer = provider.getSigner();

          let contract = new ethers.Contract(nftaddress, NFT.abi, signer);
          let transaction = await contract.mintNFT(
            nftaddress,
            mintedMetadata.ipfs(),
          );
          const tx = await transaction.wait();
          const event = tx.events[0];
          const value = event.args[2];
          const tokenId = value.toNumber();
          contract = new ethers.Contract(nftaddress, NFT.abi, signer);
          transaction = await contract.giveOwnership(nftaddress, tokenId, {
            value: 10,
          });
          await transaction.wait();
          setDoneMinting(true);
          setIsMinting(false);
          countDown(mintedMetadata.ipfs(), tx);
        }
      }
    } catch (e) {
      setIsMinting(false);
      console.log(e);
    }
  };

  const clickOutsideAvatarPopup = useCallback((e) => {
    if (e.target.className === 'avatar-popup-wrap') {
      setGenerateAvatarPopUp(false);
      window.removeEventListener('click', clickOutsideAvatarPopup);
    }
  }, []);

  useEffect(() => {
    if (generateAvatarPopUp) {
      window.addEventListener('click', clickOutsideAvatarPopup);
    } else { window.removeEventListener('click', clickOutsideAvatarPopup); }
  }, [generateAvatarPopUp]);
  return (
    <div className="profile_container">
      {generateAvatarPopUp && (
        <div className="avatar-popup-wrap">
          <div className="profile-two-generate-avatar-popup">
            <ProfileTwoGenerateAvatarPopUp
              loggedInUserData={userData}
              userID={userID}
              setGenerateAvatarPopUp={setGenerateAvatarPopUp}
            />
          </div>
        </div>
      )}
      <div className="tw-container tw-mx-auto ">
        <svg width="1em" height="1em">
          <linearGradient
            id="pink-gradient"
            x1="0%"
            y1="0%"
            x2="100%"
            y2="100%"
          >
            <stop stopColor="#FF00B8" offset="0%" />
            <stop stopColor="#FF655B" offset="50.8%" />
            <stop stopColor="#FFC700" offset="100%" />
          </linearGradient>
        </svg>

        <section className="user-info tw-bg-gray-300 tw-rounded-xl">
          <div className="user-details tw-mb-2 tw-flex md:tw-flex-wrap sm:tw-flex-wrap tw-p-5 ">
            <div className=" avatar-area lg:tw-mr-5 xl:tw-mr-5 md:tw-mr-4 2xl:tw-mr-4  sm:tw-grid-col-span-4">
              <div className="avatar">
                <img
                  className="tw-h-330px tw-w-full tw-rounded-2xl"
                  src={userData?.profilePicture || '/assets/images/profile.png'}
                  alt="avatar"
                />
                {isLoggedIn && ownsProfile && (
                  <div className="avatar-btn">
                    <p
                      className="generate-avatar lg:tw-p-0 tw-text-sm"
                      onClick={() => setGenerateAvatarPopUp(true)}
                    >
                      <span id="generate-avatar-text"> Generate Avatar</span>
                    </p>
                  </div>
                )}
              </div>
            </div>

            <div className="user-data-area">
              <div
                className="tw-flex tw-bg-white tw-p-4 tw-rounded-md tw-flex-wrap"
                style={{ height: '100%' }}
              >
                <div className="user lg:tw-w-5/5 md:tw-w-5/5 xl:tw-2/5">
                  <div className="user-title">
                    <h3 className="tw-text-2xl tw-font-bold">
                      {`${userData?.firstName} ${userData?.lastName}`}
                      <small className="tw-font-medium tw-text-gray-300 tw-text-base">
                        {userData?.userName
                          ? `@${userData?.userName}`
                          : 'no username'}
                      </small>
                    </h3>
                    {/* <p className="tw-text-sm tw-text-gray-500">
                      UX Design Intern, Minority Programmers
                    </p> */}
                    {userData?.locationVisibility && (
                      <h4 className="tw-mt-2 tw-font-medium">
                        {userData?.location}
                      </h4>
                    )}
                    {isLoggedIn && ownsProfile && (
                      <Button
                        onClick={() => {
                          onMint();
                        }}
                        className="tw-mt-2"
                      >
                        {isMinting ? (
                          <img
                            src="/assets/spinner.png"
                            className="tw-h-5 tw-animate-spin"
                            alt="spinner"
                          />
                        ) : (
                          'Mint profile'
                        )}
                      </Button>
                    )}
                  </div>

                  <div className="social-link">
                    <div className="sl-wrap">
                      <div>
                        {socialLinks.map((link) => (
                          <a key={link.id} target="_blank" rel="noreferrer" href={link.url || '#'}>
                            <span className="social">{link.slink}</span>
                          </a>
                        ))}
                      </div>
                      {isLoggedIn && ownsProfile && (
                        <div className="add-or-edit-links">
                          {!socialLinks.length && (
                            <div>
                              <span
                                className="note"
                                onClick={() => router.push('/settings/profile/media')}
                              >
                                Please Add Social Links...
                              </span>
                            </div>
                          )}
                          <div className="pencil tw-cursor-pointer">
                            <HiOutlinePencil
                              style={{ fontSize: '1.5rem' }}
                              onClick={() => router.push('/settings/profile/media')}
                            />
                          </div>
                        </div>
                      )}
                    </div>
                    <div className="cw-wrap">
                      {isLoggedIn && ownsProfile && walletAddress && (
                        <Tooltip placement="top" title={copyText}>
                          <div
                            className="copy-wallet"
                            onClick={() => copyWallet()}
                          >
                            Copy Wallet
                            <img
                              src="/assets/images/profile/copy-wallet.png"
                              alt="copy wallet icon"
                            />
                          </div>
                        </Tooltip>
                      )}
                    </div>
                  </div>
                </div>

                <div className="skills-and-badges">
                  <div className="skills tw-mt-5 tw-w-full">
                    <p className="tw-font-bold">Passions & Skills</p>

                    <p className="all-skills tw-flex tw-justify-start  tw-flex-wrap ">
                      {userData?.passions?.length
                      && !(
                        userData.passions.length === 1
                        && userData.passions[0] === ''
                      ) ? (
                          userData.passions.map(
                            (passion, index) => passion && (
                              <span
                                key={`${index + 1}`}
                                className="tw-inline-block tw-px-2 tw-py-1 tw-mr-1 tw-text-xs tw-text-gray-500 tw-border-gray-500 tw-mb-1 tw-rounded-md tw-border"
                              >
                                {passion}
                              </span>
                            ),
                          )
                        ) : (
                          <span
                            className="note"
                            onClick={() => isLoggedIn
                            && ownsProfile
                            && router.push('/settings/profile/background')}
                            style={
                            isLoggedIn && ownsProfile
                              ? { cursor: 'pointer' }
                              : { cursor: 'default' }
                          }
                          >
                            {isLoggedIn && ownsProfile
                              ? 'Please Add Passions...'
                              : 'N/A'}
                          </span>
                        )}
                    </p>
                  </div>

                  <div className="badges tw-mt-4">
                    <p className="tw-font-bold">Reputation Badges</p>

                    <p className="all-badges tw-flex tw-justify-start  tw-flex-wrap ">
                      {reputation?.length ? (
                        reputation.map((badge) => (
                          <div
                            key={badge._id}
                            className="tw-inline-block tw-p-1 tw-mr-1 tw-cursor-pointer"
                          >
                            <Tooltip placement="top" title={badge.title}>
                              <img
                                className="tw-w-10 tw-h-10"
                                src={reputationBadge[badge.type]}
                                alt={badge.title}
                              />
                            </Tooltip>
                          </div>
                        ))
                      ) : (
                        <span className="note" style={{ cursor: 'default' }}>
                          No badge yet
                        </span>
                      )}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="tw-mb-8 tw-container ">
          <div className="pp-card-area tw-p-6  tw-rounded-md tw-grid tw-grid-flow-row tw-auto-rows-max">
            <div className="hover:tw-bg-light-blue-500 hover:tw-border-transparent hover:tw-shadow-lg tw-group tw-block tw-rounded-lg tw-p-4 tw-border-gray-300 tw-border tw-bg-white">
              <h2 className="tw-relative tw-text-xl tw-font-bold tw-mb-3 tw-text-black">
                Achievements at MPA
                <span className="tw-absolute tw-top-0 tw-right-0 tw-text-xs tw-cursor-pointer">
                  <a className="pp-view-all" href="#">
                    View All
                  </a>
                </span>
              </h2>

              {pinnedCards.length ? (
                <ul className="tw-flex sm:tw-flex-wrap">
                  {pinnedCards.map((pinitem) => (
                    <li
                      x-for="item in items"
                      key={pinitem.id}
                      className="tw-mx-2 tw-w-1/3 sm:tw-w-full tw-mb-4 tw-rounded-2xl tw-filter tw-drop-shadow-lg"
                    >
                      <a
                        href={pinitem.link}
                        className="tw-group tw-block tw-p-4"
                      >
                        <div className="tw-grid sm:tw-block lg:tw-grid xl:tw-block tw-items-start">
                          <div className="pinned-item">
                            <p className="tw-text-left tw-leading-6 tw-flex tw-text-sm tw-font-medium tw-text-current tw-font-bold ">
                              <span className={`circle ${pinitem.base}`} />
                              {pinitem.title}
                            </p>
                            <h3>{pinitem.desc}</h3>
                            <p className="tw-text-left tw-text-sm tw-font-medium tw-text-gray-500 sm:tw-mt-0 lg:tw-mt-0 xl:tw-mt-0">
                              {pinitem.desc2}
                            </p>
                            <div className="tw-flex tw-flex-wrap">
                              {pinitem.checklist.map((item, index) => (
                                <div
                                  className="chk-step tw-inline-block tw-px-2 tw-py-1 tw-rounded-md tw-my-1 tw-mr-1 tw-bg-white tw-text-black tw-text-xs tw-font-bold"
                                  key={`${`0${index}${pinitem.id}`}`}
                                >
                                  {item}
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </a>
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="no-content">
                  <h3>No Achievements to Display</h3>
                </div>
              )}
            </div>
          </div>
        </section>

        {getProgressPercentage(userData)
          && getProgressPercentage(userData) < 100 && (
            <section className="tw-mb-8 tw-container ">
              <div className="profile-strength tw-p-6  tw-rounded-md tw-grid tw-grid-flow-row tw-auto-rows-max">
                <div
                  className={`${
                    !psArrowUp
                      ? 'hover:tw-bg-light-blue-500 hover:tw-border-transparent hover:tw-shadow-lg '
                      : 'tw-shadow-lg tw-bg-light-blue-500'
                  }tw-group tw-block tw-rounded-lg tw-p-4 tw-border-gray-300 tw-border tw-bg-white`}
                >
                  <h2 className="tw-relative tw-text-xl tw-font-bold tw-mb-3 tw-text-black">
                    Profile Strength:
                    {' '}
                    <span className="tw-font-medium">
                      {`${
                        getProgressPercentage(userData) <= 33
                          ? 'Low'
                          : getProgressPercentage(userData) <= 66
                            ? 'Intermediate'
                            : 'High'
                      }`}
                    </span>
                    {' '}
                    {`${getProgressPercentage(userData)}%`}
                    <span
                      className="ps-arrow tw-absolute tw-top-0 tw-right-0 tw-text-xs tw-cursor-pointer"
                      onClick={() => setPsArrowUp(!psArrowUp)}
                    >
                      <img
                        src={`/assets/images/profile/${
                          psArrowUp ? 'arrow-up' : 'arrow-down'
                        }.svg`}
                        alt={`arrow ${psArrowUp ? 'up' : 'down'}`}
                      />
                    </span>
                  </h2>
                  <div className="ps-pb-wrapper">
                    <div
                      className="ps-progress-bar tw-h-6 tw-rounded-md"
                      onClick={() => setPsArrowUp(!psArrowUp)}
                    >
                      <div
                        className="progress-fill"
                        style={{ width: `${getProgressPercentage(userData)}%` }}
                      />
                    </div>
                    <div className="pb-tick tw-h-6 tw-rounded-md">
                      <img
                        src="/assets/images/profile/pb-tick.svg"
                        alt="tick"
                      />
                    </div>
                  </div>
                </div>

                {psArrowUp && (
                  <div className="steps-note tw-bg-transparent hover:tw-bg-light-blue-500 hover:tw-border-transparent hover:tw-shadow-lg tw-group tw-block tw-rounded-lg tw-rounded-t-none tw-p-4 tw-border-gray-300 tw-border-r tw-border-b tw-border-l tw--my-2">
                    <h2 className="tw-relative tw-text-xl tw-font-bold tw-mb-3 tw-text-black">
                      Your profile is at an intermediate level. Do the following
                      to increase your level
                    </h2>
                    <div className="increase-level-steps tw-flex tw-flex-wrap">
                      {getLevelUpTips(userData)
                        .filter((data) => data.missing)
                        .map((missingData) => (
                          <div
                            className="il-step tw-cursor-pointer tw-inline-block tw-px-2 tw-py-1 tw-rounded-md tw-m-2"
                            onClick={() => router.push(missingData.route)}
                          >
                            Add a
                            {' '}
                            {`${missingData.name}`}
                          </div>
                        ))}
                    </div>
                  </div>
                )}
              </div>
            </section>
        )}

        <section className="tw-mb-8 tw-container ">
          <div className="pp-card-area pp-projects tw-p-6  tw-rounded-md tw-grid tw-grid-flow-row tw-auto-rows-max">
            <div className="hover:tw-bg-light-blue-500 hover:tw-border-transparent hover:tw-shadow-lg tw-group tw-block tw-rounded-lg tw-p-4 tw-border-gray-300 tw-border tw-bg-white">
              <h2 className="tw-relative tw-text-xl tw-font-bold tw-mb-3 tw-text-black">
                Projects
                <span className="tw-absolute tw-top-0 tw-right-0 tw-text-xs tw-cursor-pointer">
                  <a className="pp-view-all" href="#">
                    View All
                  </a>
                </span>
              </h2>

              {projectCards.length ? (
                <ul className="tw-grid tw-grid-cols-2 md:tw-grid-cols-1">
                  {projectCards.map((pCard) => (
                    <li
                      x-for="item in items"
                      key={pCard.id}
                      className="tw-mx-2 tw-mb-4 tw-rounded-2xl tw-filter tw-drop-shadow-lg"
                    >
                      <a
                        href={pCard.link}
                        className="tw-flex tw-flex-wrap hover:tw-bg-light-blue-500 tw-block tw-p-4"
                      >
                        <div className="imgDiv sm:tw-m-0 sm:tw-w-full">
                          <img
                            src={pCard.image}
                            alt={`${pCard.title}_image`}
                            className="tw-block tw-w-1/2 tw-mr-2 tw-rounded-lg"
                          />
                        </div>
                        <div className="tw-w-1/2 sm:tw-w-full">
                          <h3 className="tw-text-center tw-font-bold tw-text-black">
                            {pCard.title}
                          </h3>
                          <p className="tw-text-center tw-leading-6 tw-text-sm tw-font-medium tw-text-current tw-text-gray-500">
                            {pCard.subTitle}
                          </p>
                          <div className="tw-flex tw-flex-wrap">
                            {pCard.checklist.map((item, index) => (
                              <div
                                className="chk-step tw-inline-block tw-px-2 tw-py-1 tw-rounded-md tw-my-1 tw-mr-1 tw-bg-white tw-text-black tw-text-xs tw-font-bold"
                                key={`${`0${index}${pCard.id}`}`}
                              >
                                {item}
                              </div>
                            ))}
                          </div>
                        </div>
                      </a>
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="no-content">
                  <h3>No Projects to Display</h3>
                </div>
              )}
            </div>
          </div>
        </section>

        <section className="tw-mb-8 tw-container ">
          <div className="pp-card-area pp-projects pp-courses tw-p-6  tw-rounded-md tw-grid tw-grid-flow-row tw-auto-rows-max">
            <div className="hover:tw-bg-light-blue-500 hover:tw-border-transparent hover:tw-shadow-lg tw-group tw-block tw-rounded-lg tw-p-4 tw-border-gray-300 tw-border tw-bg-white">
              <h2 className="tw-relative tw-text-xl tw-font-bold tw-mb-3 tw-text-black">
                Enrolled Courses
                <span className="tw-absolute tw-top-0 tw-right-0 tw-text-xs tw-cursor-pointer">
                  <a className="pp-view-all" href="/learn-page">
                    View All
                  </a>
                </span>
              </h2>

              {enrolledCourses.length ? (
                <ul
                  className="tw-grid tw-grid-cols-3 md:tw-grid-cols-1"
                  style={
                    enrolledCourses.length < 3
                      ? { display: 'flex', justifyContent: 'center' }
                      : {}
                  }
                >
                  {enrolledCourses.map((courseCard) => (
                    <li
                      x-for="item in items"
                      key={Math.floor(Math.random() * 100000)}
                      className="tw-mx-2 tw-mb-4 tw-rounded-2xl tw-filter tw-drop-shadow-lg"
                      style={
                        enrolledCourses.length < 3
                          ? {
                            width: '33%',
                          }
                          : {}
                      }
                    >
                      <div className="pp-card-content tw-flex tw-flex-col tw-items-center tw-justify-center hover:tw-bg-light-blue-500 tw-block tw-p-4">
                        <h3 className="tw-text-center tw-font-bold tw-text-black tw-cursor-text">
                          {courseCard.courseId.name}
                        </h3>
                        <p className="tw-text-center tw-mb-2 tw-text-xs tw-font-medium tw-text-current tw-text-gray-500 tw-cursor-text">
                          {courseCard.courseId.description}
                        </p>
                        <div className="imgDiv tw-mb-6">
                          <img
                            src={courseCard.courseId.image}
                            alt={`${courseCard.courseId.name} Course`}
                            className="tw-block tw-w-11/12 tw-h-48 tw-rounded-md"
                          />
                        </div>
                        <div className="cd-btn tw-rounded-md tw-text-white">
                          <a
                            href={`/courses/${courseCard.courseId._id}`}
                            className="tw-block tw-py-1 tw-px-5"
                          >
                            View Course Details
                          </a>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="no-content">
                  <h3>No Courses to Display</h3>
                </div>
              )}
            </div>
          </div>
        </section>

        <section className="tw-mb-8 tw-container ">
          <div className="pp-exp-edu-area tw-p-6  tw-rounded-md tw-grid tw-grid-flow-row tw-auto-rows-max">
            <div className="hover:tw-bg-light-blue-500 hover:tw-border-transparent hover:tw-shadow-lg tw-group tw-block tw-rounded-lg tw-p-4 tw-border-gray-300 tw-border tw-bg-white">
              <h2 className="tw-relative tw-text-xl tw-font-bold tw-mb-3 tw-text-black">
                Experience
                {isLoggedIn && ownsProfile && !!experienceCards?.length && (
                  <span className="tw-absolute tw-top-0 tw-right-0 tw-text-xs tw-cursor-pointer">
                    <div
                      className="pencil tw-cursor-pointer tw-m-0"
                      onClick={() => {
                        setExpEditMode(!expEditMode);
                      }}
                    >
                      <HiOutlinePencil style={{ fontSize: '1.5rem' }} />
                    </div>
                  </span>
                )}
              </h2>

              <div className="exp-edu-content">
                {!experienceCards?.length && (
                  <div className="no-content">
                    <h3>No Experience to Display</h3>
                  </div>
                )}

                {!!experienceCards?.length
                  && experienceCards.map((card, idx) => (
                    <div
                      className={`add-exp-edu tw-relative tw-flex tw-items-center tw-mb-4 ${
                        !(idx === experienceCards || experienceCards.length - 1)
                          ? 'tw-border-b border-gray-500'
                          : ''
                      }`}
                      key={card.cardId}
                    >
                      <div className="addImg tw-mr-4 tw-mb-6 tw-cursor-pointer">
                        <img
                          src={card.jobImg}
                          alt="add_image"
                          className="tw-w-full"
                          onClick={() => setExpAddMode(true)}
                        />
                      </div>
                      <div className="ee-fields tw-flex tw-flex-col tw-items-start tw-mb-2">
                        <p className="tw-block tw-rounded tw-px-2 tw-text-black tw-font-bold tw-w-full">
                          {card.jobTitle}
                        </p>
                        <p className="tw-block tw-rounded tw-px-2 tw-my-2 tw-w-full">
                          {card.date}
                        </p>
                        <p className="tw-block tw-rounded tw-px-2 tw-w-full">
                          {card.location}
                        </p>
                      </div>
                      {expEditMode && (
                        <span
                          className="tw-absolute tw-top-1/3 tw-right-0 tw-text-xs tw-font-bold tw-text-red-500 tw-cursor-pointer hover:tw-text-gray-500"
                          onClick={() => removeExp(card.cardId)}
                        >
                          Remove
                        </span>
                      )}
                    </div>
                  ))}

                {isLoggedIn
                  && ownsProfile
                  && (!experienceCards?.length || !expEditMode) && (
                    <div
                      id="add-exp-fields"
                      className="add-exp-edu tw-flex tw-items-center"
                    >
                      <div className="addImg tw-mr-4 tw-cursor-pointer">
                        {expAddMode ? (
                          <label
                            htmlFor="upload-exp-image"
                            className="tw-m-0 tw-w-full"
                          >
                            <input
                              type="file"
                              name="image"
                              id="upload-exp-image"
                              onChange={(e) => handleExpImgUpload(e.target.files[0])}
                            />
                            <img
                              src={
                                uploadedExpImg
                                || '/assets/images/profile/add-image.svg'
                              }
                              alt="add_image"
                              className="tw-w-full"
                            />
                          </label>
                        ) : (
                          <img
                            src="/assets/images/profile/add-image.svg"
                            alt="add_image"
                            className="tw-w-full"
                            onClick={() => setExpAddMode(true)}
                          />
                        )}
                      </div>
                      {expAddMode ? (
                        <div className="ee-fields tw-flex tw-flex-col tw-items-start tw-mb-2">
                          <input
                            type="text"
                            placeholder="Job Title"
                            className="tw-block tw-rounded tw-px-2 tw-font-bold tw-w-full"
                            value={expJobTitleInput}
                            onChange={(e) => setExpJobTitleInput(e.target.value)}
                          />
                          <input
                            type="text"
                            placeholder="Start Date - End Date"
                            className="tw-block tw-rounded tw-px-2 tw-my-2 tw-w-full"
                            value={expDateInput}
                            onChange={(e) => setExpDateInput(e.target.value)}
                          />
                          <input
                            type="text"
                            placeholder="Location"
                            className="tw-block tw-rounded tw-px-2 tw-w-full"
                            value={expLocationInput}
                            onChange={(e) => setExpLocationInput(e.target.value)}
                          />
                        </div>
                      ) : (
                        <h3
                          className="tw-font-bold tw-cursor-pointer"
                          onClick={() => setExpAddMode(true)}
                        >
                          Add Experience
                        </h3>
                      )}
                      {expAddMode && (
                        <>
                          <div
                            className="ee-add-btn tw-px-2 tw-py-1 tw-ml-4 tw-mb-3 tw-self-end tw-rounded tw-cursor-pointer tw-text-white"
                            onClick={() => completeExpAdd()}
                          >
                            Add
                          </div>
                          <div
                            className="ee-rm-btn tw-px-2 tw-py-1 tw-ml-4 tw-mb-3 tw-self-end tw-rounded tw-cursor-pointer tw-text-white"
                            onClick={() => clearExpAdd()}
                          >
                            Cancel
                          </div>
                        </>
                      )}
                    </div>
                )}
              </div>
            </div>
          </div>
        </section>

        <section className="tw-mb-8 tw-container ">
          <div className="pp-exp-edu-area tw-p-6  tw-rounded-md tw-grid tw-grid-flow-row tw-auto-rows-max">
            <div className="hover:tw-bg-light-blue-500 hover:tw-border-transparent hover:tw-shadow-lg tw-group tw-block tw-rounded-lg tw-p-4 tw-border-gray-300 tw-border tw-bg-white">
              <h2 className="tw-relative tw-text-xl tw-font-bold tw-mb-3 tw-text-black">
                Education
                {isLoggedIn && ownsProfile && !!educationCards?.length && (
                  <span className="tw-absolute tw-top-0 tw-right-0 tw-text-xs tw-cursor-pointer">
                    <div
                      className="pencil tw-cursor-pointer tw-m-0"
                      onClick={() => {
                        setEduEditMode(!eduEditMode);
                      }}
                    >
                      <HiOutlinePencil style={{ fontSize: '1.5rem' }} />
                    </div>
                  </span>
                )}
              </h2>

              <div className="exp-edu-content">
                {!educationCards?.length && (
                  <div className="no-content">
                    <h3>No Education to Display</h3>
                  </div>
                )}

                {!!educationCards?.length
                  && educationCards.map((card, idx) => (
                    <div
                      className={`add-exp-edu tw-relative tw-flex tw-items-center tw-mb-4 ${
                        !(idx === educationCards || educationCards.length - 1)
                          ? 'tw-border-b border-gray-500'
                          : ''
                      }`}
                      key={`${idx + 1}`}
                    >
                      <div className="addImg tw-mr-4 tw-mb-6 tw-cursor-pointer">
                        <img
                          src={card.eduImg}
                          alt="add_image"
                          className="tw-w-full"
                          onClick={() => setEduAddMode(true)}
                        />
                      </div>
                      <div className="ee-fields tw-flex tw-flex-col tw-items-start tw-mb-2">
                        <p className="tw-block tw-rounded tw-px-2 tw-text-black tw-font-bold tw-w-full">
                          {card.eduTitle}
                        </p>
                        <p className="tw-block tw-rounded tw-px-2 tw-my-2 tw-w-full">
                          {card.date}
                        </p>
                        <p className="tw-block tw-rounded tw-px-2 tw-w-full">
                          {card.location}
                        </p>
                      </div>
                      {eduEditMode && (
                        <span
                          className="tw-absolute tw-top-1/3 tw-right-0 tw-text-xs tw-font-bold tw-text-red-500 tw-cursor-pointer hover:tw-text-gray-500"
                          onClick={() => removeEdu(card.cardId)}
                        >
                          Remove
                        </span>
                      )}
                    </div>
                  ))}

                {isLoggedIn
                  && ownsProfile
                  && (!educationCards?.length || !eduEditMode) && (
                    <div
                      id="add-edu-fields"
                      className="add-exp-edu tw-flex tw-items-center"
                    >
                      <div className="addImg tw-mr-4 tw-cursor-pointer">
                        {eduAddMode ? (
                          <label
                            htmlFor="upload-edu-image"
                            className="tw-m-0 tw-w-full"
                          >
                            <input
                              type="file"
                              name="image"
                              id="upload-edu-image"
                              onChange={(e) => handleEduImgUpload(e.target.files[0])}
                            />
                            <img
                              src={
                                uploadedEduImg
                                || '/assets/images/profile/add-image.svg'
                              }
                              alt="add_image"
                              className="tw-w-full"
                            />
                          </label>
                        ) : (
                          <img
                            src="/assets/images/profile/add-image.svg"
                            alt="add_image"
                            className="tw-w-full"
                            onClick={() => setEduAddMode(true)}
                          />
                        )}
                      </div>
                      {eduAddMode ? (
                        <div className="ee-fields tw-flex tw-flex-col tw-items-start tw-mb-2">
                          <input
                            type="text"
                            placeholder="Institute Name"
                            className="tw-block tw-rounded tw-px-2 tw-font-bold tw-w-full"
                            value={eduTitleInput}
                            onChange={(e) => setEduTitleInput(e.target.value)}
                          />
                          <input
                            type="text"
                            placeholder="Dates Attended"
                            className="tw-block tw-rounded tw-px-2 tw-my-2 tw-w-full"
                            value={eduDateInput}
                            onChange={(e) => setEduDateInput(e.target.value)}
                          />
                          <input
                            type="text"
                            placeholder="Degree Awarded"
                            className="tw-block tw-rounded tw-px-2 tw-w-full"
                            value={eduLocationInput}
                            onChange={(e) => setEduLocationInput(e.target.value)}
                          />
                        </div>
                      ) : (
                        <h3
                          className="tw-font-bold tw-cursor-pointer"
                          onClick={() => setEduAddMode(true)}
                        >
                          Add Education
                        </h3>
                      )}
                      {eduAddMode && (
                        <>
                          <div
                            className="ee-add-btn tw-px-2 tw-py-1 tw-ml-4 tw-mb-3 tw-self-end tw-rounded tw-cursor-pointer tw-text-white"
                            onClick={() => completeEduAdd()}
                          >
                            Add
                          </div>
                          <div
                            className="ee-rm-btn tw-px-2 tw-py-1 tw-ml-4 tw-mb-3 tw-self-end tw-rounded tw-cursor-pointer tw-text-white"
                            onClick={() => clearEduAdd()}
                          >
                            Cancel
                          </div>
                        </>
                      )}
                    </div>
                )}
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ProfileTwo;
