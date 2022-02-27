import React, { useEffect, useState } from 'react';
import OverviewEvents from './OverviewEvents';
import OverviewCareer from './OverviewCareer';
import OverviewCourses from './OverviewCourses';
import OverviewStartups from './OverviewStartups';
import OverviewWallet from './OverviewWallet';
import OverviewMyProposals from './OverviewMyProposals';
import OverviewMyChatper from './OverviewMyChapter';
import OverviewProjects from './OverviewPorjects';
import OverviewMentor from './OverviewMentor';
import OverviewProgress from './OverviewProgress';
import OverviewStatistic from './OverviewStatistic';
import OverviewProfile from './OverviewProfile';

const Components = [
  {
    componentName: 'Profile',
    component: OverviewProfile,
    height: '280px',
  },
  {
    componentName: 'Career',
    component: OverviewCareer,
    height: '280px',
  },
  {
    componentName: 'Mentor',
    component: OverviewMentor,
    height: '280px',
  },
  {
    componentName: 'Progress',
    component: OverviewProgress,
    height: '320px',
  },
  {
    componentName: 'Projects',
    component: OverviewProjects,
    height: '280px',
  },
  {
    componentName: 'Events',
    component: OverviewEvents,
    height: '491px',
  },
  {
    componentName: 'Statistics',
    component: OverviewStatistic,
    height: '491px',
  },
  {
    componentName: 'Chapter',
    component: OverviewMyChatper,
    height: '280px',
  },
  {
    componentName: 'Wallet',
    component: OverviewWallet,
    height: '280px',
  },
  {
    componentName: 'Startups',
    component: OverviewStartups,
    height: '280px',
  },
  {
    componentName: 'Proposals',
    component: OverviewMyProposals,
    height: '280px',
  },
  {
    componentName: 'Courses',
    component: OverviewCourses,
    height: '280px',
  },
];

const DesktopView2 = ({ userData, token }) => (
  <div>
    <div
      className="d-flex flex-row justify-content-between align-items-center "
      style={{ height: '40px', paddingTop: '20px' }}
    >
      <p className="fs-1" style={{ fontWeight: 500, fontSize: '20px', color: 'white' }}>
        Dashboard Overview
      </p>
    </div>
    <div
      className="tw-grid tw-grid-cols-24 tw-gap-4 tw-h-full tw-w-full"
      style={{ padding: '20px 0px', height: '1260px', gridTemplateRows: 'repeat(8, minmax(0, 1fr))' }}
    >
      {/* first row */}
      <div className="dashboard-inner-bg tw-p-3 tw-col-span-7 row-custom-span-3 tw-rounded">
        <OverviewProgress userData={userData} token={token} />
      </div>

      <div className="dashboard-inner-bg tw-p-3 tw-col-span-5 row-custom-span-3 tw-rounded">
        <OverviewWallet userData={userData} token={token} />
      </div>
      <div className="dashboard-inner-bg tw-p-3 tw-col-span-7 row-custom-span-3 tw-rounded">
        <OverviewStartups userData={userData} token={token} />
      </div>
      <div className="dashboard-inner-bg tw-p-3 tw-col-span-5 tw-row-span-4 tw-rounded">
        <OverviewEvents userData={userData} token={token} />
      </div>

      {/*  */}
      {/* second row */}
      <div className="dashboard-inner-bg tw-p-3 tw-col-span-12 tw-row-span-2 tw-rounded">
        <OverviewCourses userData={userData} token={token} />
      </div>
      <div className="dashboard-inner-bg tw-p-3 tw-col-span-7 tw-row-span-2 tw-rounded">
        <OverviewMentor userData={userData} token={token} />
      </div>
      {/*  */}
      {/* Third Row */}
      <div className="dashboard-inner-bg tw-p-3 tw-col-span-5 tw-row-span-2 tw-rounded">
        <OverviewProfile userData={userData} token={token} />
      </div>
      <div className="dashboard-inner-bg tw-p-3 tw-col-span-9 tw-row-span-2 tw-rounded">
        <OverviewProjects userData={userData} token={token} />
      </div>
      <div className="dashboard-inner-bg tw-p-3 tw-col-span-5 tw-row-span-2 tw-rounded">
        <OverviewCareer userData={userData} token={token} />
      </div>
      <div className="dashboard-inner-bg tw-p-3 tw-col-span-5 tw-row-span-4 tw-rounded">
        <OverviewStatistic userData={userData} token={token} />
      </div>
      {/*  */}
      {/* fourth Row */}
      <div className="dashboard-inner-bg tw-p-3 tw-col-span-9 tw-row-span-2 tw-rounded">
        <OverviewMyProposals userData={userData} token={token} />
      </div>
      <div className="dashboard-inner-bg tw-p-3 tw-col-span-10 tw-row-span-2 tw-rounded">
        <OverviewMyChatper userData={userData} token={token} />
      </div>
      {/*  */}
    </div>
  </div>
);

const TabletView2 = ({ userData, token }) => (
  <div>
    <div
      className="d-flex flex-row justify-content-between align-items-center "
      style={{ height: '40px', paddingTop: '20px' }}
    >
      <p className="fs-1" style={{ fontWeight: 500, fontSize: '20px', color: 'white' }}>
        Dashboard Overview
      </p>
    </div>
    <div
      className="tw-grid tw-grid-cols-24 tw-gap-4 tw-h-full tw-w-full"
      style={{ padding: '20px 0px', height: '1460px', gridTemplateRows: 'repeat(12, minmax(0, 1fr))' }}
    >
      {/* first row */}
      <div className="dashboard-inner-bg tw-p-3 tw-col-span-9 row-custom-span-3 tw-rounded">
        <OverviewProgress userData={userData} token={token} />
      </div>

      <div className="dashboard-inner-bg tw-p-3 tw-col-span-6 row-custom-span-3 tw-rounded">
        <OverviewWallet userData={userData} token={token} />
      </div>
      <div className="dashboard-inner-bg tw-p-3 tw-col-span-9 row-custom-span-3 tw-rounded">
        <OverviewStartups userData={userData} token={token} />
      </div>
      {/*  */}
      {/* second row */}

      <div className="dashboard-inner-bg tw-p-3 tw-col-span-8 tw-row-span-4 tw-rounded">
        <OverviewEvents userData={userData} token={token} />
      </div>

      <div className="dashboard-inner-bg tw-p-3 tw-col-span-16 tw-row-span-2 tw-rounded">
        <OverviewCourses userData={userData} token={token} />
      </div>
      {/*  */}
      {/* Third Row */}

      <div className="dashboard-inner-bg tw-p-3 tw-col-span-8 tw-row-span-2 tw-rounded">
        <OverviewMentor userData={userData} token={token} />
      </div>
      <div className="dashboard-inner-bg tw-p-3 tw-col-span-8 tw-row-span-2 tw-rounded">
        <OverviewProfile userData={userData} token={token} />
      </div>
      {/*  */}
      {/* fourth Row */}

      <div className="dashboard-inner-bg tw-p-3 tw-col-span-16 tw-row-span-2 tw-rounded">
        <OverviewProjects userData={userData} token={token} />
      </div>
      <div className="dashboard-inner-bg tw-p-3 tw-col-span-8 tw-row-span-2 tw-rounded">
        <OverviewCareer userData={userData} token={token} />
      </div>
      {/*  */}
      <div className="dashboard-inner-bg tw-p-3 tw-col-span-8 tw-row-span-4 tw-rounded">
        <OverviewStatistic userData={userData} token={token} />
      </div>
      {/*  */}
      <div className="dashboard-inner-bg tw-p-3 tw-col-span-16 tw-row-span-2 tw-rounded">
        <OverviewMyChatper userData={userData} token={token} />
      </div>
      <div className="dashboard-inner-bg tw-p-3 tw-col-span-16 tw-row-span-2 tw-rounded">
        <OverviewMyProposals userData={userData} token={token} />
      </div>
      {/*  */}
    </div>
  </div>
);
const MobileView = ({ userData, token }) => {
  const [currentView, setCurrentView] = useState('Profile');
  const handleClick = (compName) => {
    if (currentView === compName) {
      setCurrentView('');
    } else {
      setCurrentView(compName);
    }
  };
  return (
    <div
      className="d-flex flex-column"
      style={{ height: '100vh', width: '100%' }}
    >
      <div
        className="d-flex flex-row justify-content-between align-items-center"
        style={{ height: '5%', minHeight: '40px', width: '100%' }}
      >
        <p className="fs-1" style={{ fontWeight: 700, color: 'white' }}>
          Dashboard Overview (Mobile)
        </p>
        <button
          type="button"
          className="btn btn-primary"
          style={{ background: '#6A0C8B', fontSize: '8px' }}
        >
          {' '}
          Manage Dashboard
        </button>
      </div>

      <div
        className=" d-flex flex-column"
        style={{ width: '100%', height: '32px' }}
      >
        {Components.map((component) => {
          const CompName = component.component;
          return (
            <div
              key={component.componentName}
              className="component-mobile-button d-flex flex-column"
            >
              <div
                className="d-flex flex-row justify-content-between align-items-center"
                style={{ paddingLeft: '2%' }}
                onClick={() => {
                  handleClick(component.componentName);
                }}
              >
                <p>{component.componentName}</p>
                <button
                  type="button"
                  style={{ width: '32px', height: '32px' }}
                  className="open-component-button"
                >
                  {currentView === component.componentName ? '-' : '+'}
                </button>
              </div>
              <div
                className={
                  currentView === component.componentName
                    ? 'dashboard-card'
                    : 'hide-mobile-component'
                }
                onClick={() => {
                  setCurrentView(component.componentName);
                }}
                style={{ height: component.height }}
              >
                <CompName userData={userData} token={token} renderMobile />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const Overview = ({ userData, token }) => {
  const [winSize, setWinSize] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWinSize(window.innerWidth);
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [winSize]);

  return (
    <>
      {winSize >= 1440 ? (
        window.innerHeight >= 768 ? (
          <DesktopView2 userData={userData} token={token} />
        ) : (
          <TabletView2 userData={userData} token={token} />
        )
      ) : winSize >= 768 ? (
        <TabletView2 userData={userData} token={token} />
      ) : (
        <MobileView userData={userData} token={token} />
      )}
    </>
  );
};

export default Overview;
