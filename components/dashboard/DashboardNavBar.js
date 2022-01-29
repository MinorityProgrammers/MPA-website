import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faGraduationCap,
  faHome,
  faTasks,
  faRocket,
  faSuitcase,
  faCalendarDay,
  faMapMarkedAlt,
  faUsers,
  faColumns,
  faUser,
  faHamburger,
  faWallet,
} from '@fortawesome/free-solid-svg-icons';

const buttons = [
  {
    componentName: 'home',
    iconName: faHome,
    buttonText: 'Home',
  },
  {
    componentName: 'dashboard',
    iconName: faColumns,
    buttonText: 'Dashboard',
  },
  {
    componentName: 'members',
    iconName: faUsers,
    buttonText: 'Members',
  },
  {
    componentName: 'courses',
    iconName: faGraduationCap,
    buttonText: 'Courses',
  },
  {
    componentName: 'careers',
    iconName: faSuitcase,
    buttonText: 'Careers',
  },
  {
    componentName: 'startups',
    iconName: faRocket,
    buttonText: 'Startups',
  },
  {
    componentName: 'projects',
    iconName: faTasks,
    buttonText: 'Projects',
  },
  {
    componentName: 'events',
    iconName: faCalendarDay,
    buttonText: 'Events',
  },
  {
    componentName: 'chapters',
    iconName: faMapMarkedAlt,
    buttonText: 'Chapters',
  },
  {
    componentName: 'account',
    iconName: faUser,
    buttonText: 'Account',
  },
  {
    componentName: 'wallet',
    iconName: faWallet,
    buttonText: 'Wallet',
  },
];

const DashboardNavbar = (props) => {
  const { currentView, setView } = props;

  const [showNavbar, setShowNavbar] = useState(false);
  const [winSize, setWinSize] = useState(0);

  useEffect(() => {
    setWinSize(window.innerWidth);
    const handleResize = () => {
      setWinSize(window.innerWidth);
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [winSize]);

  const PopulatedNavBar = () => buttons.map((button) => (
    <div
      key={button.buttonText}
      style={{ width: '100%' }}
      className={
          button.componentName === currentView
            ? 'sidebar-item tw-items-center dashboard-navbar-button-selected'
            : 'sidebar-item tw-items-center dashboard-navbar-button'
        }
      onClick={() => {
        setView(button.componentName);
      }}
    >
      <FontAwesomeIcon icon={button.iconName} className="fa-2x" />
      <p>{button.buttonText}</p>
    </div>
  ));

  return (
    <>
      {winSize >= 768 ? (
        <DesktopSideBar
          populatedNavBar={<PopulatedNavBar selectedComp={props} />}
        />
      ) : (
        <MobileSideBar
          showNavbar={showNavbar}
          setShowNavbar={setShowNavbar}
          populatedNavBar={<PopulatedNavBar selectedComp={props} />}
        />
      )}
    </>
  );
};

export default DashboardNavbar;
const DesktopSideBar = ({ populatedNavBar }) => (
  <div style={{ height: '100%', width: '100%' }}>
    <div className="d-flex flex-column justify-content-start align-items-center navbar-dashboard-div">
      <img
        src="/assets/images/mpicon.svg"
        style={{ width: '60px', paddingBottom: '80px', paddingTop: '40px' }}
        alt=""
      />
      {populatedNavBar}
    </div>
  </div>
);

const MobileSideBar = ({ populatedNavBar, showNavbar, setShowNavbar }) => (
  <div
    className={showNavbar ? 'd-flex flex-row show-sidebar-container' : ''}
    style={{
      position: 'fixed',
      height: showNavbar ? '100vh' : '0',
      width: showNavbar ? '100vw' : '0',
    }}
  >
    <div
      className="d-flex flex-column justify-content-start align-items-center navbar-dashboard-div"
      style={{
        width: showNavbar ? '60vw' : '0',
        transition: 'width 0.5s linear',
      }}
    >
      <img
        src="/assets/images/mpicon.svg"
        style={{ width: '60px', paddingBottom: '80px', paddingTop: '40px' }}
        alt=""
      />
      {populatedNavBar}
    </div>
    <div
      style={{
        width: showNavbar ? '100vw' : '0',
        height: showNavbar ? '100vh' : '0',
        position: 'fixed',
        zIndex: '1',
      }}
      onClick={() => {
        setShowNavbar(!showNavbar);
      }}
    />
    <div
      className={`tw-float-left d-flex justify-content-center ${
        showNavbar
          ? 'navbar-dashboard-button-selected'
          : 'navbar-dashboard-button'
      }`}
      style={{
        position: 'fixed',
        bottom: '15px',
        left: '15px',
        zIndex: 4,
        height: '56px',
        width: '56px',
      }}
    >
      <button
        type="button"
        className="w-100 h-100"
        onClick={() => {
          setShowNavbar(!showNavbar);
        }}
      >
        <FontAwesomeIcon icon={faHamburger} className="fa-2x" />
      </button>
    </div>
  </div>
);
