import React, { useEffect, useState, useContext } from 'react';
// This page will have 12 components inside dashboard
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

const Overview = (props) => {
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
  const [currentView, setCurrentView] = useState('Profile');
  const [winSize, setWinSize] = useState(window.innerWidth);
  const [winHeight, setWinHeight] = useState(window.innerHeight);

  useEffect(() => {
    const handleResize = () => {
      setWinSize(window.innerWidth);
    };
    window.addEventListener('resize', handleResize);
    return (_) => {
      window.removeEventListener('resize', handleResize);
    };
  }, [winSize]);

  // Desktop view is exactly the same with Wireframe
  // Has 2 rows:
  // - First row has 2 columns:
  //    - First column takes 70% width that has 2 rows:
  //       - first row has 3 4 3
  //       - second row has 6 4
  //    - Second column is events calendar
  // - Second row follows the same format
  //    - First row 4 2 4
  //    - Second row 4 6

  const DesktopView2 = (winWidth) => (
    <div className="tw-h-px-1300" style={{ height: '1300px' }}>
      {/* Title + Button row */}
      <div className="d-flex flex-row justify-content-between align-items-center " style={{ height: '40px', paddingTop: '20px' }}>
        <p className="fs-1" style={{ fontWeight: 700, color: 'black' }}>Dashboard Overview (Desktop)</p>
        <button className="btn btn-primary" style={{ background: '#6A0C8B' }}> Manage Dashboard</button>
      </div>
      <div className="tw-grid tw-grid-cols-24 tw-grid-rows-10 tw-gap-4 tw-h-full tw-w-full" style={{ padding: '20px 0px', height: '1260px' }}>

        <div className="tw-bg-white tw-p-3 tw-col-span-4 tw-row-span-2 tw-rounded">
          {/* 1 */}
          <OverviewProfile userData={props.userData} token={props.token} />
        </div>
        <div className="tw-bg-white tw-p-3 tw-col-span-8 tw-row-span-2 tw-rounded">
          {/* 2 */}
          <OverviewCareer userData={props.userData} token={props.token} />
        </div>
        <div className="tw-bg-white tw-p-3 tw-col-span-6 tw-row-span-2 tw-rounded">
          {/* 3 */}
          <OverviewMentor userData={props.userData} token={props.token} />
        </div>
        <div className="tw-bg-white tw-p-3 tw-col-span-6 tw-row-span-5 tw-rounded">
          {/* 4 */}
          <OverviewEvents userData={props.userData} token={props.token} />
        </div>
        <div className="tw-bg-white tw-p-3 tw-col-span-10 tw-row-span-3 tw-rounded">
          {/* 5 */}
          <OverviewProgress userData={props.userData} token={props.token} />
        </div>
        <div className="tw-bg-white tw-p-3 tw-col-span-8 tw-row-span-3 tw-rounded">
          {/* 6 */}
          <OverviewProjects userData={props.userData} token={props.token} />
        </div>

        <div className="tw-bg-white tw-p-3 tw-col-span-7 tw-row-span-2 tw-rounded">
          {/* 7 */}
          <OverviewMyChatper userData={props.userData} token={props.token} />
        </div>
        <div className="tw-bg-white tw-p-3 tw-col-span-4 tw-row-span-2 tw-rounded">
          {/* 8 */}
          <OverviewWallet userData={props.userData} token={props.token} />
        </div>
        <div className="tw-bg-white tw-p-3 tw-col-span-7 tw-row-span-2 tw-rounded">
          {/* 9 */}
          <OverviewStartups userData={props.userData} token={props.token} />
        </div>
        <div className="tw-bg-white tw-p-3 tw-col-span-6 tw-row-span-5 tw-rounded">
          {/* 10 */}
          <OverviewStatistic userData={props.userData} token={props.token} />
        </div>
        <div className="tw-bg-white tw-p-3 tw-col-span-8 tw-row-span-3 tw-rounded">
          {/* 11 */}
          <OverviewMyProposals userData={props.userData} token={props.token} />
        </div>
        <div className="tw-bg-white tw-p-3 tw-col-span-10 tw-row-span-3 tw-rounded">
          {/* 12 */}
          <OverviewCourses userData={props.userData} token={props.token} />
        </div>

      </div>
    </div>
  );

  // Tablet view only has 2 to 3 components each row
  const TabletView2 = (winWidth) => (
    <div className="tw-h-px-2340" style={{ height: '2340px' }}>
      {/* Title + Button row */}
      <div className="d-flex flex-row justify-content-between align-items-center " style={{ height: '40px', paddingTop: '20px' }}>
        <p className="fs-1" style={{ fontWeight: 700, color: 'black' }}>Dashboard Overview (Tablet)</p>
        <button className="btn btn-primary" style={{ background: '#6A0C8B' }}> Manage Dashboard</button>
      </div>
      <div className="tw-grid tw-grid-cols-24 tw-grid-rows-14 tw-gap-5 tw-w-full" style={{ padding: '20px 0px', height: '2300px' }}>
        {/* 2rows */}
        <div className="tw-bg-white tw-p-3 tw-col-span-6 tw-row-span-2 tw-rounded">
          {/* 1 */}
          <OverviewProfile userData={props.userData} token={props.token} />
        </div>
        <div className="tw-bg-white tw-p-3 tw-col-span-10 tw-row-span-2 tw-rounded">
          {/* 2 */}
          <OverviewCareer userData={props.userData} token={props.token} />
        </div>
        <div className="tw-bg-white tw-p-3 tw-col-span-8 tw-row-span-2 tw-rounded">
          {/* 3 */}
          <OverviewMentor userData={props.userData} token={props.token} />
        </div>

        {/* 2rows */}
        <div className="tw-bg-white tw-p-3 tw-col-span-14 tw-row-span-2 tw-rounded">
          {/* 4 */}
          <OverviewProgress userData={props.userData} token={props.token} />
        </div>
        <div className="tw-bg-white tw-p-3 tw-col-span-10 tw-row-span-2 tw-rounded">
          {/* 5 */}
          <OverviewProjects userData={props.userData} token={props.token} />
        </div>

        {/* 4rows */}
        <div className="tw-bg-white tw-p-3 tw-col-span-12 tw-row-span-4 tw-rounded">
          {/* 6 */}
          <OverviewEvents userData={props.userData} token={props.token} />
        </div>
        <div className="tw-bg-white tw-p-3 tw-col-span-12 tw-row-span-4 tw-rounded">
          {/* 7 */}
          <OverviewStatistic userData={props.userData} token={props.token} />
        </div>

        {/* 2rows */}
        <div className="tw-bg-white tw-p-3 tw-col-span-16 tw-row-span-2 tw-rounded">
          {/* 8 */}
          <OverviewStartups userData={props.userData} token={props.token} />
        </div>
        <div className="tw-bg-white tw-p-3 tw-col-span-8 tw-row-span-2 tw-rounded">
          {/* 9 */}
          <OverviewWallet userData={props.userData} token={props.token} />
        </div>

        {/* 2rows */}
        <div className="tw-bg-white tw-p-3 tw-col-span-12 tw-row-span-2 tw-rounded">
          {/* 10 */}
          <OverviewMyChatper userData={props.userData} token={props.token} />
        </div>
        <div className="tw-bg-white tw-p-3 tw-col-span-12 tw-row-span-2 tw-rounded">
          {/* 11 */}
          <OverviewMyProposals userData={props.userData} token={props.token} />
        </div>

        {/* 2 rows */}
        <div className="tw-bg-white tw-p-3 tw-col-span-24 tw-row-span-2 tw-rounded">
          {/* 12 */}
          <OverviewCourses userData={props.userData} token={props.token} />
        </div>

      </div>
    </div>
  );

  // Mobile view only has a list of buttons, and will render accordingly when selected
  const MobileView = (winWidth) => {
    const handleClick = (compName) => {
      if (currentView === compName) {
        setCurrentView('');
      } else {
        setCurrentView(compName);
      }
    };
    // Has 12 rows full width
    return (
      <div className="d-flex flex-column" style={{ height: '100vh', width: '100%' }}>

        {/* Title + Button row */}
        <div className="d-flex flex-row justify-content-between align-items-center" style={{ height: '5%', minHeight: '40px', width: '100%' }}>
          <p className="fs-1" style={{ fontWeight: 700, color: 'black' }}>Dashboard Overview (Mobile)</p>
          <button className="btn btn-primary" style={{ background: '#6A0C8B', fontSize: '8px' }}> Manage Dashboard</button>
        </div>

        <div className=" d-flex flex-column" style={{ width: '100%', height: '32px' }}>
          {Components.map((component) => {
            const CompName = component.component;
            return (
              <div key={component.componentName} className="component-mobile-button d-flex flex-column">
                <div className="d-flex flex-row justify-content-between align-items-center" style={{ paddingLeft: '2%' }} onClick={() => { handleClick(component.componentName); }}>
                  <p>{component.componentName}</p>
                  <button style={{ width: '32px', height: '32px' }} className="open-component-button">
                    {currentView === component.componentName ? '-' : '+'}
                  </button>
                </div>
                <div className={currentView === component.componentName ? 'dashboard-card' : 'hide-mobile-component'} onClick={() => { setCurrentView(component.componentName); }} style={{ height: component.height }}>
                  <CompName userData={props.userData} token={props.token} renderMobile />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <>
      {
        winSize >= 1440
          ? window.innerHeight >= 768
            ? DesktopView2(winSize)
            : TabletView2(winSize)
          : winSize >= 768
            ? TabletView2(winSize)
            : MobileView(winSize)
      }
    </>
  );
};

export default Overview;
