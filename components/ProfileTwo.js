/* eslint-disable no-unsafe-optional-chaining */
/* eslint-disable react/no-array-index-key */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-unused-expressions */
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
import moment from 'moment';
import DatePicker from 'react-datepicker';
import FormData from 'form-data';
import { errorToast, successToast } from '../contexts/utils/toasts';
import ProfileTwoGenerateAvatarPopUp from './ProfileTwoGenerateAvatarPopUp';
import getProgressPercentage from '../contexts/utils/settings/getProgressPercentage';
import getLevelUpTips from '../contexts/utils/settings/getLevelUpTips';
import { useMoralisDapp } from '../MoralisDappProvider/MoralisDappProvider';
import TopSection from './profile/TopSection';
import ProfileStength from './profile/ProfileStength';
import UserDatas from './profile/UserDatas';
import Tabs from './profile/Tabs';
import Reputation from './profile/Reputation';
import CoursesSkeleton from './learn/CoursesSkeleton';
import UserCourses from './learn/UserCourses';
import NoDataFound from './learn/NoDataFound';
import Experience from './profile/Experience';

function countDown(mintedURL, tx) {
  let secondsToGo = 30;
  const modal = Modal.success({
    title: 'Successfully minted Your profile',
    content: `Checkout your minted profile metadata ${mintedURL}, transaction id: ${process.env.NETWORK_URL}/tx/${tx}`,
  });
  const timer = setInterval(() => {
    secondsToGo -= 1;
  }, 1000);
  setTimeout(() => {
    clearInterval(timer);
    modal.destroy();
  }, secondsToGo * 1000);
}

const ProfileTwo = function ({
  userData, isLoggedIn, ownsProfile,
  profileDispatch, setChangeInProfile, userId,
}) {
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

  const [experienceCards, setExperienceCards] = useState([]);
  const [expAddMode, setExpAddMode] = useState(false);
  const [expEditMode, setExpEditMode] = useState(false);
  const [uploadedExpImg, setUploadedExpImg] = useState('');
  const [ExpImg, setExpImg] = useState('');
  const [expJobTitleInput, setExpJobTitleInput] = useState('');
  const [expDateInputFrom, setExpDateInputFrom] = useState('');
  const [expDateInputTo, setExpDateInputTo] = useState('');
  const [expLocationInput, setExpLocationInput] = useState('');
  const { walletAddress, chainId } = useMoralisDapp();
  const [educationCards, setEducationCards] = useState([]);
  const [projectCards, setProjectCards] = useState([]);
  const [eduAddMode, setEduAddMode] = useState(false);
  const [proAddMode, setProAddMode] = useState(false);
  const [eduEditMode, setEduEditMode] = useState(false);
  const [proEditMode, setProEditMode] = useState(false);
  const [uploadedEduImg, setUploadedEduImg] = useState('');
  const [uploadedProImg, setUploadedProImg] = useState('');
  const [eduTitleInput, setEduTitleInput] = useState('');
  const [proTitleInput, setProTitleInput] = useState('');
  const [eduDateInput, setEduDateInput] = useState('');
  const [ProDateInput, setProDateInput] = useState('');
  const [EducationMajor, setEducationMajor] = useState('');
  const [ProjectRole, setProjectRole] = useState('');
  const [copyText, setCopyText] = useState('Click to copy');
  const [isMinting, setIsMinting] = useState(false);
  const [, setDoneMinting] = useState(false);
  // const [mintedURL, setMintedURl] = useState('');
  const [reputation, setReputation] = useState([]);
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [userNfts, setUserNFTs] = useState([]);
  const [company, setCompany] = useState('');
  const [link, setLink] = useState('');
  const [eduDateGrad, setEduDateGrad] = useState('');
  const [University, setUniversity] = useState('');
  const [UnIMG, setUnIMG] = useState('');
  const [project, setProject] = useState('');
  const [ProIMG, setProIMG] = useState('');
  const [tabsActive, setTabsActive] = useState(
    { nfts: false, userCourses: true, badges: false },
  );
  const [loading, setLoading] = useState(true);

  const router = useRouter();
  const { Moralis, isAuthenticated } = useMoralis();

  const getNFTs = async () => {
    if (chainId === process.env.NEXT_PUBLIC_NETWORK_ID_MAINNET && walletAddress !== '' && isAuthenticated) {
      const options = { chain: 'matic', address: walletAddress };
      const polygonNFTs = await Moralis.Web3.getNFTs(options);
      setUserNFTs(polygonNFTs);
    } if (chainId === process.env.NEXT_PUBLIC_NETWORK_ID_TESTNET && walletAddress !== '' && isAuthenticated) {
      const options = { chain: 'mumbai', address: walletAddress };
      const polygonNFTs = await Moralis.Web3.getNFTs(options);
      setUserNFTs(polygonNFTs);
    }
  };

  useEffect(() => {
    getNFTs();
  }, [walletAddress, isAuthenticated, chainId]);
  console.log(userNfts);

  const axiosFunc = (url, token, setState) => {
    axios
      .get(`${process.env.BASE_URI}/${url}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setState(res.data.data);
        setLoading(false);
      });
  };

  useEffect(() => {
    const userToken = JSON.parse(localStorage.getItem('userInfo'));
    if (userToken !== null) {
      axiosFunc(`learn/user/${userId}`, userToken.token, setEnrolledCourses);
      axiosFunc('reputation/userReputations', userToken.token, setReputation);
      axiosFunc(
        'experience/userExperience',
        userToken.token,
        setExperienceCards,
      );
      axiosFunc('education/userEducation', userToken.token, setEducationCards);
      axiosFunc(
        'personalProject/userPersonalProject',
        userToken.token,
        setProjectCards,
      );
    }
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

  const clearEduAdd = () => {
    document.getElementsByClassName('edu-data-warn')?.[0]?.remove();
    setUploadedEduImg('');
    setEduTitleInput('');
    setEduDateInput('');
    setEducationMajor('');
    setEduAddMode(false);
  };

  const clearProAdd = () => {
    document.getElementsByClassName('edu-data-warn')?.[0]?.remove();
    setUploadedProImg('');
    setProTitleInput('');
    setProDateInput('');
    setProjectRole('');
    setProAddMode(false);
  };

  const copyWallet = () => {
    setCopyText('Copied');
    navigator.clipboard.writeText(walletAddress);
    setTimeout(() => {
      setCopyText('Click to copy');
    }, 5000);
  };

  const handleExpImgUpload = (file) => {
    if (file) {
      setUploadedExpImg(URL.createObjectURL(file));
    }
  };

  const handleEduImgUpload = (file) => {
    if (file) {
      setUploadedEduImg(URL.createObjectURL(file));
    }
  };

  const clearExpAdd = () => {
    document.getElementsByClassName('exp-data-warn')?.[0]?.remove();
    setUploadedExpImg('');
    setExpJobTitleInput('');
    setExpDateInputFrom('');
    setExpDateInputTo('');
    setExpLocationInput('');
    setExpAddMode(false);
  };

  const completeExpAdd = () => {
    if (
      uploadedExpImg
      && expJobTitleInput
      && expDateInputFrom
      && expDateInputTo
      && expLocationInput
      && link
    ) {
      const newCard = {
        image: uploadedExpImg,
        jobTitle: expJobTitleInput,
        from: expDateInputFrom,
        to: expDateInputTo,
        location: expLocationInput,
        company,
        link,
      };

      const formData = new FormData();
      formData.append('image', ExpImg);
      formData.append('jobTitle', expJobTitleInput);
      formData.append('from', expDateInputFrom);
      formData.append('to', expDateInputTo);
      formData.append('location', expLocationInput);
      formData.append('company', company);
      formData.append('link', link);

      document.getElementsByClassName('exp-data-warn')?.[0]?.remove();
      setExperienceCards((currentCards) => [...currentCards, newCard]);
      const userToken = JSON.parse(localStorage.getItem('userInfo'));
      axios
        .post(`${process.env.BASE_URI}/experience`, formData, {
          headers: {
            Authorization: `Bearer ${userToken.token}`,
          },
        })
        .then(() => {
          successToast('Experience Added');
        })
        .catch((e) => {
          console.log(e);
          errorToast('Something went wrong');
        });
      clearExpAdd();
    } else if (!document.getElementsByClassName('exp-data-warn')?.[0]) {
      const el = document.getElementById('add-exp-fields');
      el.insertAdjacentHTML(
        'afterend',
        '<div class="exp-data-warn tw-ml-4 tw-mb-3 tw-self-end tw-text-red-500 tw-font-bold">Please add an image and fill in all fields</div>',
      );
    }
  };

  const removeExp = (expId) => {
    const userToken = JSON.parse(localStorage.getItem('userInfo'));
    experienceCards.length === 1 && setExpEditMode(false);
    setExperienceCards((prevCards) => prevCards.filter((card) => card._id !== expId));
    axios
      .delete(`${process.env.BASE_URI}/experience/${expId}`, {
        headers: {
          Authorization: `Bearer ${userToken.token}`,
        },
      })
      .then(() => {
        successToast('Experience deleted');
      })
      .catch((e) => {
        console.log(e);
        errorToast('Something went wrong');
      });
  };

  const handleProImgUpload = (file) => {
    file && setUploadedProImg(URL.createObjectURL(file));
  };
  const completeEduAdd = () => {
    if (uploadedEduImg && eduTitleInput && eduDateInput && EducationMajor) {
      const newCard = {
        image: uploadedEduImg,
        name: eduTitleInput,
        date: eduDateInput,
        gradDate: eduDateGrad,
        major: EducationMajor,
        link: University,
      };

      const formData = new FormData();
      formData.append('image', UnIMG);
      formData.append('name', eduTitleInput);
      formData.append('date', eduDateInput);
      formData.append('gradDate', eduDateGrad);
      formData.append('major', EducationMajor);
      formData.append('link', University);
      document.getElementsByClassName('edu-data-warn')?.[0]?.remove();
      setEducationCards((currentCards) => [...currentCards, newCard]);
      const userToken = JSON.parse(localStorage.getItem('userInfo'));
      axios
        .post(`${process.env.BASE_URI}/education`, formData, {
          headers: {
            Authorization: `Bearer ${userToken.token}`,
          },
        })
        .then(() => {
          successToast('Education Added');
        })
        .catch((e) => {
          console.log(e);
          errorToast('Something went wrong');
        });

      clearEduAdd();
    } else if (!document.getElementsByClassName('edu-data-warn')?.[0]) {
      const el = document.getElementById('add-edu-fields');
      el.insertAdjacentHTML(
        'afterend',
        '<div class="edu-data-warn tw-ml-4 tw-mb-3 tw-self-end tw-text-red-500 tw-font-bold">Please add an image and fill in all fields</div>',
      );
    }
  };

  const completeProAdd = () => {
    if (uploadedProImg && proTitleInput && ProDateInput && ProjectRole) {
      const newCard = {
        image: uploadedProImg,
        title: proTitleInput,
        date: ProDateInput,
        role: ProjectRole,
        link: project,
      };

      const formData = new FormData();
      formData.append('image', ProIMG);
      formData.append('title', proTitleInput);
      formData.append('date', ProDateInput);
      formData.append('role', ProjectRole);
      formData.append('link', project);
      document.getElementsByClassName('edu-data-warn')?.[0]?.remove();
      setProjectCards((currentCards) => [...currentCards, newCard]);
      const userToken = JSON.parse(localStorage.getItem('userInfo'));
      axios
        .post(`${process.env.BASE_URI}/personalProject`, formData, {
          headers: {
            Authorization: `Bearer ${userToken.token}`,
          },
        })
        .then(() => {
          successToast('Project Added');
        })
        .catch((e) => {
          console.log(e);
          errorToast('Something went wrong');
        });

      clearProAdd();
    } else if (!document.getElementsByClassName('edu-data-warn')?.[0]) {
      const el = document.getElementById('add-edu-fields');
      el.insertAdjacentHTML(
        'afterend',
        '<div class="edu-data-warn tw-ml-4 tw-mb-3 tw-self-end tw-text-red-500 tw-font-bold">Please add an image and fill in all fields</div>',
      );
    }
  };

  const removeEdu = (eduId) => {
    educationCards.length === 1 && setEduEditMode(false);
    setEducationCards((prevCards) => prevCards.filter((card) => card._id !== eduId));
    const userToken = JSON.parse(localStorage.getItem('userInfo'));
    axios
      .delete(`${process.env.BASE_URI}/education/${eduId}`, {
        headers: {
          Authorization: `Bearer ${userToken.token}`,
        },
      })
      .then(() => {
        successToast('Education deleted');
      })
      .catch((e) => {
        console.log(e);
        errorToast('Something went wrong');
      });
  };

  const removePro = (eduId) => {
    projectCards.length === 1 && setProEditMode(false);
    setProjectCards((prevCards) => prevCards.filter((card) => card._id !== eduId));
    const userToken = JSON.parse(localStorage.getItem('userInfo'));
    axios
      .delete(`${process.env.BASE_URI}/personalProject/${eduId}`, {
        headers: {
          Authorization: `Bearer ${userToken.token}`,
        },
      })
      .then(() => {
        successToast('Project deleted');
      })
      .catch((e) => {
        console.log(e);
        errorToast('Something went wrong');
      });
  };

  const onMint = async () => {
    if (isAuthenticated) {
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
            const userToken = JSON.parse(localStorage.getItem('userInfo'));
            axios
              .post(`${process.env.BASE_URI}/user/mintProfile`, { metadata: mintedMetadata.ipfs(), userAddress: walletAddress }, {
                headers: {
                  Authorization: `Bearer ${userToken.token}`,
                },
              })
              .then((res) => {
                console.log(res);
                successToast(res.data.message);
                setDoneMinting(true);
                setIsMinting(false);
                countDown(mintedMetadata.ipfs(), res.data.data.transaction);
              })
              .catch((e) => {
                console.log(e);
                setIsMinting(false);
                errorToast(e?.response?.data?.data?.message?.msg
                  ? e.response.data.data.message.msg
                  : 'something went wrong');
              });
          }
        }
      } catch (e) {
        setIsMinting(false);
        console.log(e);
      }
    } else {
      errorToast('You need to connect your wallet');
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
    } else {
      window.removeEventListener('click', clickOutsideAvatarPopup);
    }
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
              setChangeInProfile={setChangeInProfile}
            />
          </div>
        </div>
      )}
      <div className="">
        <TopSection
          userData={userData}
          isLoggedIn={isLoggedIn}
          ownsProfile={ownsProfile}
          setGenerateAvatarPopUp={setGenerateAvatarPopUp}
          isMinting={isMinting}
          onMint={onMint}
          socialLinks={socialLinks}
          walletAddress={walletAddress}
          copyText={copyText}
          copyWallet={copyWallet}
          profileDispatch={profileDispatch}
          setChangeInProfile={setChangeInProfile}
        />
        {ownsProfile && (
        <ProfileStength
          userData={userData}
          setPsArrowUp={setPsArrowUp}
          psArrowUp={psArrowUp}
        />
        )}

        {/* <UserDatas enrolledCourses={enrolledCourses} /> */}

        <Tabs tabsActive={tabsActive} setTabsActive={setTabsActive} />

        {tabsActive.userCourses && (
          <div className="courses tw-px-5">
            {loading ? (
              <CoursesSkeleton title="My Courses" />
            ) : enrolledCourses.length > 0 ? (
              <UserCourses enrolledCourses={enrolledCourses} user={userData} />
            ) : (
              <div className="mb-5 pb-3">
                <div className="courses-info tw-px-10">
                  <NoDataFound title="Courses" isActionable action="/learn" textAction="Start Learning" description={`${ownsProfile ? 'When you enroll for courses, we will display it here.' : 'This User has not enrolled in any course yet!'}`} />
                </div>
              </div>
            )}

          </div>
        )}

        {tabsActive.badges && (
          <div className="courses tw-p-5">
            {loading ? (
              <CoursesSkeleton title="My Badges" />
            ) : reputation.length > 0 ? (
              <Reputation reputation={reputation} reputationBadge={reputationBadge} />
            ) : (
              <div className="mb-5 pb-3">
                <div className="courses-info tw-px-10">
                  <NoDataFound title="Courses" isActionable={false} action="" textAction="" description={`${ownsProfile ? 'You will see your badges here as activity reward!' : 'This User has not Earned a Badge yet!'}`} />
                </div>
              </div>
            )}

          </div>
        )}

        {/* <Experience experienceCards={experienceCards} /> */}


        <section className="tw-mb-8 tw-container ">
          <div className="pp-exp-edu-area tw-p-6  tw-rounded-md tw-grid tw-grid-flow-row tw-auto-rows-max">
            <div className="hover:tw-bg-light-blue-500 hover:tw-border-transparent hover:tw-shadow-lg tw-group tw-block tw-rounded-lg tw-p-4 tw-border-gray-300 tw-border tw-bg-white">
              <h2 className="tw-relative tw-text-xl tw-font-bold tw-mb-3 tw-text-black">
                Projects
                {isLoggedIn && ownsProfile && !!projectCards?.length && (
                  <span className="tw-absolute tw-top-0 tw-right-0 tw-text-xs tw-cursor-pointer">
                    <div
                      className="pencil tw-cursor-pointer tw-m-0"
                      onClick={() => {
                        setProEditMode(!proEditMode);
                      }}
                    >
                      <HiOutlinePencil style={{ fontSize: '1.5rem' }} />
                    </div>
                  </span>
                )}
              </h2>

              <div className="exp-edu-content">
                {!projectCards?.length && (
                  <div className="no-content">
                    <h3>No Project to Display</h3>
                  </div>
                )}

                {!!projectCards?.length
                  && projectCards.map((card, idx) => (
                    <div
                      className={`add-exp-edu tw-relative tw-flex tw-items-center tw-mb-4 ${
                        !(idx === projectCards?.length - 1)
                          ? 'tw-border-b border-gray-500'
                          : ''
                      }`}
                      key={idx}
                    >
                      <div className="addImg tw-mr-4 tw-mb-6 tw-cursor-pointer">
                        <a
                          href={card.link ? card.link : '#'}
                          target="_blank"
                          rel="noreferrer"
                        >
                          <img
                            src={card.image}
                            alt="add item"
                            className="tw-w-full"
                          />
                        </a>
                      </div>
                      <div className="ee-fields tw-flex tw-flex-col tw-items-start tw-mb-2">
                        <p className="tw-block tw-rounded tw-px-2 tw-text-black tw-font-bold tw-w-full">
                          {card.title}
                        </p>
                        <p className="tw-block tw-rounded tw-px-2 tw-my-2 tw-w-full">
                          {moment(card.date).calendar()}
                        </p>
                        <p className="tw-block tw-rounded tw-px-2 tw-w-full">
                          {card.role}
                        </p>
                      </div>
                      {proEditMode && (
                        <span
                          className="tw-absolute tw-top-1/3 tw-right-0 tw-text-xs tw-font-bold tw-text-red-500 tw-cursor-pointer hover:tw-text-gray-500"
                          onClick={() => removePro(card._id)}
                        >
                          Remove
                        </span>
                      )}
                    </div>
                  ))}

                {isLoggedIn
                  && ownsProfile
                  && (!projectCards?.length || !proEditMode) && (
                    <form
                      id="add-edu-fields"
                      className="add-exp-edu tw-flex tw-items-center"
                    >
                      <div className="addImg tw-mr-4 tw-cursor-pointer">
                        {proAddMode ? (
                          <label
                            htmlFor="upload-edu-image"
                            className="tw-m-0 tw-w-full"
                          >
                            <input
                              type="file"
                              name="image"
                              id="upload-edu-image"
                              onChange={(e) => {
                                handleProImgUpload(e.target.files[0]);
                                setProIMG(e.target.files[0]);
                              }}
                            />
                            <img
                              src={
                                uploadedProImg
                                || '/assets/images/profile/add-image.svg'
                              }
                              alt="add item"
                              className="tw-w-full"
                            />
                            <p className="tw-text-sm tw-text-gray-500">
                              add Project's image
                            </p>
                          </label>
                        ) : (
                          <img
                            src="/assets/images/profile/add-image.svg"
                            alt="add item"
                            className="tw-w-full"
                            onClick={() => setProAddMode(true)}
                          />
                        )}
                      </div>
                      {proAddMode ? (
                        <div className="ee-fields tw-flex tw-flex-col tw-items-start tw-mb-2">
                          <input
                            type="text"
                            name="title"
                            placeholder="Project Name"
                            className="tw-block tw-rounded tw-px-2 tw-font-bold tw-w-full tw-my-1"
                            value={proTitleInput}
                            onChange={(e) => setProTitleInput(e.target.value)}
                          />
                          <input
                            type="text"
                            placeholder="Role"
                            name="role"
                            className="tw-block tw-rounded tw-px-2 tw-w-full tw-my-1"
                            value={ProjectRole}
                            onChange={(e) => setProjectRole(e.target.value)}
                          />
                          <DatePicker
                            className="tw-block tw-rounded tw-px-2 tw-w-full tw-text-gray-400"
                            name="date"
                            value={
                              ProDateInput === ''
                                ? 'Project Date'
                                : ProDateInput
                            }
                            selected={ProDateInput}
                            onChange={(date) => {
                              setProDateInput(date);
                            }}
                            dateFormat="MM/dd/yyyy"
                            placeholder="Project Date"
                            autoComplete="false"
                            required
                          />
                          <input
                            type="text"
                            placeholder="Project link"
                            name="link"
                            className="tw-block tw-rounded tw-px-2 tw-w-full tw-my-1"
                            value={project}
                            onChange={(e) => setProject(e.target.value)}
                          />
                        </div>
                      ) : (
                        <h3
                          className="tw-font-bold tw-cursor-pointer"
                          onClick={() => setProAddMode(true)}
                        >
                          Add Project
                        </h3>
                      )}
                      {proAddMode && (
                        <>
                          <div
                            className="ee-add-btn tw-px-2 tw-py-1 tw-ml-4 tw-mb-3 tw-self-end tw-rounded tw-cursor-pointer tw-text-white"
                            onClick={() => completeProAdd()}
                          >
                            Add
                          </div>
                          <div
                            className="ee-rm-btn tw-px-2 tw-py-1 tw-ml-4 tw-mb-3 tw-self-end tw-rounded tw-cursor-pointer tw-text-white"
                            onClick={() => clearProAdd()}
                          >
                            Cancel
                          </div>
                        </>
                      )}
                    </form>
                )}
              </div>
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
                      key={card._id}
                    >
                      <div className="addImg tw-mr-4 tw-mb-6 tw-cursor-pointer">
                        <a
                          href={card.link ? card.link : '#'}
                          target="_blank"
                          rel="noreferrer"
                        >
                          <img
                            src={card.image}
                            alt="add item"
                            className="tw-w-full"
                          />
                        </a>
                      </div>

                      <div className="ee-fields tw-flex tw-flex-col tw-items-start tw-mb-2">
                        <p className="tw-block tw-rounded tw-px-2 tw-text-black tw-font-bold tw-w-full">
                          {card.jobTitle}
                        </p>
                        <p className="tw-block tw-rounded tw-px-2 tw-my-2 tw-w-full">
                          {moment(card?.from).calendar()}
                          {' '}
                          -
                          {' '}
                          {moment(card?.to).calendar()}
                        </p>
                        <p className="tw-block tw-rounded tw-px-2 tw-w-full">
                          {card.company}
                        </p>
                      </div>
                      {expEditMode && (
                        <span
                          className="tw-absolute tw-top-1/3
                          tw-right-0 tw-text-xs tw-font-bold tw-text-red-500 tw-cursor-pointer hover:tw-text-gray-500"
                          onClick={() => removeExp(card._id)}
                        >
                          Remove
                        </span>
                      )}
                    </div>
                  ))}

                {isLoggedIn
                  && ownsProfile
                  && (!experienceCards?.length || !expEditMode) && (
                    <form
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
                              onChange={(e) => {
                                handleExpImgUpload(e.target.files[0]);
                                setExpImg(e.target.files[0]);
                              }}
                            />

                            <img
                              src={
                                uploadedExpImg
                                || '/assets/images/profile/add-image.svg'
                              }
                              alt="add item"
                              className="tw-w-full"
                            />
                            <p className="tw-text-sm tw-text-gray-500">
                              add company's image (logo)
                            </p>
                          </label>
                        ) : (
                          <img
                            src="/assets/images/profile/add-image.svg"
                            alt="add item"
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
                            name="jobTitle"
                            className="tw-block tw-rounded tw-px-2 tw-font-bold tw-w-full"
                            value={expJobTitleInput}
                            onChange={(e) => setExpJobTitleInput(e.target.value)}
                          />
                          <input
                            type="text"
                            placeholder="Company name"
                            name="company"
                            className="tw-block tw-rounded tw-px-2 tw-w-full tw-my-1"
                            value={company}
                            onChange={(e) => setCompany(e.target.value)}
                          />
                          <DatePicker
                            className="tw-block tw-rounded tw-px-2 tw-w-full tw-text-gray-400"
                            value={
                              expDateInputFrom === ''
                                ? 'From'
                                : expDateInputFrom
                            }
                            selected={expDateInputFrom}
                            name="from"
                            onChange={(date) => {
                              setExpDateInputFrom(date);
                            }}
                            dateFormat="MM/dd/yyyy"
                            placeholder="from"
                            autoComplete="false"
                            required
                          />
                          <DatePicker
                            className="tw-block tw-rounded tw-px-2 tw-w-full tw-text-gray-400"
                            minDate={new Date(expDateInputFrom)}
                            maxDate={moment().toDate()}
                            name="to"
                            value={
                              expDateInputTo === '' ? 'To' : expDateInputTo
                            }
                            selected={expDateInputTo}
                            onChange={(date) => {
                              setExpDateInputTo(date);
                            }}
                            dateFormat="MM/dd/yyyy"
                            placeholder="to"
                            autoComplete="false"
                            required
                          />
                          <input
                            type="text"
                            placeholder="Location"
                            name="location"
                            className="tw-block tw-rounded tw-px-2 tw-w-full tw-my-1"
                            value={expLocationInput}
                            onChange={(e) => setExpLocationInput(e.target.value)}
                          />
                          <input
                            type="text"
                            placeholder="Link"
                            name="link"
                            className="tw-block tw-rounded tw-px-2 tw-w-full tw-my-1"
                            value={link}
                            onChange={(e) => setLink(e.target.value)}
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
                    </form>
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
                        <a
                          href={card.link ? card.link : '#'}
                          target="_blank"
                          rel="noreferrer"
                        >
                          <img
                            src={card.image}
                            alt="add item"
                            className="tw-w-full"
                          />
                        </a>
                      </div>
                      <div className="ee-fields tw-flex tw-flex-col tw-items-start tw-mb-2">
                        <p className="tw-block tw-rounded tw-px-2 tw-text-black tw-font-bold tw-w-full">
                          {card.name}
                        </p>
                        <p className="tw-block tw-rounded tw-px-2 tw-my-2 tw-w-full">
                          {moment(card.date).calendar()}
                          {' '}
                          -
                          {' '}
                          {moment(card.gradDate).calendar()}
                        </p>
                        <p className="tw-block tw-rounded tw-px-2 tw-w-full">
                          {card.major}
                        </p>
                      </div>
                      {eduEditMode && (
                        <span
                          className="tw-absolute tw-top-1/3 tw-right-0 tw-text-xs tw-font-bold tw-text-red-500 tw-cursor-pointer hover:tw-text-gray-500"
                          onClick={() => removeEdu(card._id)}
                        >
                          Remove
                        </span>
                      )}
                    </div>
                  ))}

                {isLoggedIn
                  && ownsProfile
                  && (!educationCards?.length || !eduEditMode) && (
                    <form
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
                              onChange={(e) => {
                                handleEduImgUpload(e.target.files[0]);
                                setUnIMG(e.target.files[0]);
                              }}
                            />
                            <img
                              src={
                                uploadedEduImg
                                || '/assets/images/profile/add-image.svg'
                              }
                              alt="add item"
                              className="tw-w-full"
                            />
                            <p className="tw-text-sm tw-text-gray-500">
                              add University's image (logo)
                            </p>
                          </label>
                        ) : (
                          <img
                            src="/assets/images/profile/add-image.svg"
                            alt="add item"
                            className="tw-w-full"
                            onClick={() => setEduAddMode(true)}
                          />
                        )}
                      </div>
                      {eduAddMode ? (
                        <div className="ee-fields tw-flex tw-flex-col tw-items-start tw-mb-2">
                          <input
                            type="text"
                            name="name"
                            placeholder="Institute Name"
                            className="tw-block tw-rounded tw-px-2 tw-font-bold tw-w-full tw-my-1"
                            value={eduTitleInput}
                            onChange={(e) => setEduTitleInput(e.target.value)}
                          />
                          <DatePicker
                            className="tw-block tw-rounded tw-px-2 tw-w-full tw-text-gray-400"
                            value={
                              eduDateInput === ''
                                ? 'Date attended'
                                : eduDateInput
                            }
                            name="date"
                            selected={eduDateInput}
                            onChange={(date) => {
                              setEduDateInput(date);
                            }}
                            dateFormat="MM/dd/yyyy"
                            placeholder="Started"
                            autoComplete="false"
                            required
                          />
                          <DatePicker
                            className="tw-block tw-rounded tw-px-2 tw-w-full tw-text-gray-400"
                            minDate={new Date(eduDateInput)}
                            name="gradDate"
                            value={
                              eduDateGrad === '' ? 'Graduate Date' : eduDateGrad
                            }
                            selected={eduDateGrad}
                            onChange={(date) => {
                              setEduDateGrad(date);
                            }}
                            dateFormat="MM/dd/yyyy"
                            placeholder="Graduate Date"
                            autoComplete="false"
                            required
                          />
                          <input
                            type="text"
                            placeholder="Major"
                            name="major"
                            className="tw-block tw-rounded tw-px-2 tw-w-full tw-my-1"
                            value={EducationMajor}
                            onChange={(e) => setEducationMajor(e.target.value)}
                          />
                          <input
                            type="text"
                            placeholder="School link"
                            name="link"
                            className="tw-block tw-rounded tw-px-2 tw-w-full tw-my-1"
                            value={University}
                            onChange={(e) => setUniversity(e.target.value)}
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
                    </form>
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
