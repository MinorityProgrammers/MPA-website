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
import { useMoralisDapp } from '../MoralisDappProvider/MoralisDappProvider';
import TopSection from './profile/TopSection';
import ProfileStength from './profile/ProfileStength';
import Tabs from './profile/Tabs';
import Reputation from './profile/Reputation';
import CoursesSkeleton from './learn/CoursesSkeleton';
import UserCourses from './learn/UserCourses';
import NoDataFound from './learn/NoDataFound';
import Experience from './profile/Experience';
import Education from './profile/Education';

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
    { nfts: false, userCourses: false, badges: true },
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
      errorToast('Please add an image and fill in all fields');
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
      errorToast('Please add an image and fill in all fields');
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
      errorToast('Please add an image and fill in all fields');
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
            attributes: [userData.avatarOptions, enrolledCourses, projectCards, educationCards],
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
              <div className="profileTopSection tw-relative tw-z-10">
                <section className="tw-w-11/12 tw-mx-auto tw-rounded-xl tw-shadow-md topSection tw-py-10 tw-flex tw-flex-col tw-justify-center">
                  <div className="tw-text-3xl lg:tw-text-xl tw-font-medium tw-text-left tw-px-10 tw-text-gray-600">Enrolled courses</div>
                  <div className="tw-px-4 tw-my-1">
                    <CoursesSkeleton title="My Courses" />
                  </div>
                </section>

              </div>
            ) : enrolledCourses.length > 0 ? (
              <div className="profileTopSection tw-relative tw-z-10">
                <section className="tw-w-11/12 tw-mx-auto tw-rounded-xl tw-shadow-md topSection tw-py-10 tw-flex tw-flex-col tw-justify-center">
                  <div className="tw-text-3xl lg:tw-text-xl tw-font-medium tw-text-left tw-px-10 tw-text-gray-600">Enrolled courses</div>
                  <div className="tw-px-4 tw-my-1">
                    <UserCourses enrolledCourses={enrolledCourses} user={userData} />
                  </div>
                </section>

              </div>
            ) : (

              <NoDataFound title="Courses" isActionable action="/learn" textAction="Start Learning" description={`${ownsProfile ? 'When you enroll for courses, we will display it here.' : 'This User has not enrolled in any course yet!'}`} />
            )}

          </div>
        )}

        {tabsActive.badges && (
          <div className="courses tw-p-5">
            {loading ? (
              <div className="profileTopSection tw-relative tw-z-10">
                <section className="tw-w-11/12 tw-mx-auto tw-rounded-xl tw-shadow-md topSection tw-py-10 tw-flex tw-flex-col tw-justify-center">
                  <div className="tw-text-3xl lg:tw-text-xl tw-font-medium tw-text-left tw-px-10 tw-text-gray-600">Enrolled courses</div>
                  <div className="tw-px-4 tw-my-1">
                    <CoursesSkeleton title="My Badges" />
                  </div>
                </section>

              </div>
            ) : reputation.length > 0 ? (
              <Reputation reputation={reputation} reputationBadge={reputationBadge} />
            ) : (
              <div className="mb-5 pb-3">
                <div className="courses-info tw-px-10">
                  <NoDataFound title="Badges" isActionable={false} action="" textAction="" description={`${ownsProfile ? 'You will see your badges here as activity reward!' : 'This User has not Earned a Badge yet!'}`} />
                </div>
              </div>
            )}

          </div>
        )}

        <Experience
          experienceCards={experienceCards}
          isLoggedIn={isLoggedIn}
          ownsProfile={ownsProfile}
          expEditMode={expEditMode}
          expAddMode={expAddMode}
          handleExpImgUpload={handleExpImgUpload}
          setExpImg={setExpImg}
          uploadedExpImg={uploadedExpImg}
          setExpAddMode={setExpAddMode}
          expDateInputTo={expDateInputTo}
          setExpDateInputFrom={setExpDateInputFrom}
          setExpDateInputTo={setExpDateInputTo}
          setExpJobTitleInput={setExpJobTitleInput}
          expDateInputFrom={expDateInputFrom}
          expJobTitleInput={expJobTitleInput}
          company={company}
          setCompany={setCompany}
          clearExpAdd={clearExpAdd}
          expLocationInput={expLocationInput}
          setExpLocationInput={setExpLocationInput}
          link={link}
          completeExpAdd={completeExpAdd}
          setLink={setLink}
          setExpEditMode={setExpEditMode}
          removeExp={removeExp}
        />

        <Education
          isLoggedIn={isLoggedIn}
          ownsProfile={ownsProfile}
          educationCards={educationCards}
          eduEditMode={eduEditMode}
          setEduEditMode={setEduEditMode}
          removeEdu={removeEdu}
          eduAddMode={eduAddMode}
          eduDateGrad={eduDateGrad}
          eduDateInput={eduDateInput}
          eduTitleInput={eduTitleInput}
          EducationMajor={EducationMajor}
          setEduTitleInput={setEduTitleInput}
          setUnIMG={setUnIMG}
          setEduDateInput={setEduDateInput}
          setEduDateGrad={setEduDateGrad}
          setEducationMajor={setEducationMajor}
          handleEduImgUpload={handleEduImgUpload}
          uploadedEduImg={uploadedEduImg}
          setUniversity={setUniversity}
          setEduAddMode={setEduAddMode}
          University={University}
          clearEduAdd={clearEduAdd}
          completeEduAdd={completeEduAdd}
        />

      </div>
    </div>
  );
};

export default ProfileTwo;
