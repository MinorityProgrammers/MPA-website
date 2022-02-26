import React, { useState, useEffect, useContext } from 'react';
import Link from 'next/link';
import 'react-circular-progressbar/dist/styles.css';
import {
  CircularProgressbarWithChildren,
  buildStyles,
} from 'react-circular-progressbar';
import { GlobalContext } from '../../contexts/provider';
import SidebarNav from './SidebarNav';
import getProfile from '../../contexts/actions/profile/getProfile';
import getProgressPercentage from '../../contexts/utils/settings/getProgressPercentage';

const SidebarTwo = ({
  links, active, open, setOpen, handleClick,
}) => {
  const [userData, setUserData] = useState([]);
  const [sectionStates, setSectionStates] = useState({
    collapseAll: true,
    ...links.reduce((result, item) => ({ ...result, [item.title]: true }), {}),
  });

  const {
    profileDispatch,
    authState: {
      auth: { data },
    },
  } = useContext(GlobalContext);

  useEffect(() => {
    const token = typeof window !== 'undefined'
      ? window.localStorage.getItem('jwtToken')
      : null;
    const userInfo = typeof window !== 'undefined'
      ? window.localStorage.getItem('userInfo')
      : null;

    if (token == null || userInfo === {}) {
      setUserData(null);
    } else {
      getProfile(setUserData)(profileDispatch);
    }
  }, [data]);

  const handleCollapseAll = () => {
    setSectionStates((prev) => ({ ...prev, collapseAll: !prev.collapseAll }));
    Object.keys(sectionStates).forEach((title) => {
      if (title !== 'collapseAll') {
        setSectionStates((prev) => ({ ...prev, [title]: prev.collapseAll }));
      }
    });
  };
  const toggleState = (title) => {
    setSectionStates((prevStates) => ({
      ...prevStates,
      [title]: !prevStates[title],
    }));
  };

  return (
    <>
      <div className={open ? 'sidebarTwo ' : 'sidebarTwo hide'}>
        <div className="sidebarHeader relative">
          <Link href="/">
            <div className="progressBarContainer">
              <CircularProgressbarWithChildren
                value={getProgressPercentage(userData)}
                className="progressBar"
                styles={buildStyles({
                  rotation: 0,
                  strokeLinecap: 'butt',
                  pathColor: 'var(--tertiary-main)',
                  trailColor: 'var(--secondary-low-contrast)',
                })}
              >
                <img
                  src={
                    userData && userData.profilePicture
                      ? userData.profilePicture
                      : '/assets/images/profile.png'
                  }
                  className="profileImg"
                  alt="profile_image"
                />
              </CircularProgressbarWithChildren>
            </div>
          </Link>
          <h3>
            Hello,
            {userData ? userData.firstName : ''}
          </h3>
          <span className="collapseAll" onClick={handleCollapseAll}>
            {sectionStates.collapseAll ? 'Expand All' : 'Collapse All'}
          </span>
        </div>
        {links.map((section) => (
          <SidebarNav
            handleClick={handleClick}
            key={section.title}
            section={section}
            active={active}
            collapse={sectionStates[section.title]}
            setCollapse={() => {
              toggleState(section.title);
            }}
          />
        ))}
      </div>
      <div
        className={open ? 'overlay' : 'overlay hide-overlay'}
        onClick={() => {
          setOpen(!open);
        }}
      />
    </>
  );
};

export default SidebarTwo;
