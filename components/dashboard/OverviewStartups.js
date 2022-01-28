/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable quote-props */
import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import Skeleton from 'react-loading-skeleton';
import EmptyOverviewComponent from './EmptyOverviewComponent';

const OverviewStartups = ({ userData, token }) => {
  const [currentView, setCurrentView] = useState('founded');
  const [loading, setLoading] = useState(true);
  const [startups, setStartups] = useState([]);

  useEffect(() => {
    if (token !== null) {
      axios
        .get(`${process.env.BASE_URI}/startup`, {
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET',
            'Access-Control-Allow-Headers': 'Content-Type',
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        })
        .then((response) => {
          const tempStartupData = response.data.data;
          tempStartupData.forEach((startup) => {
            const tempAmount = parseInt(startup.amount);
            startup.amount = tempAmount;
            startup.percentRaised = Math.ceil(
              (tempAmount * 100) / startup.targetAmount,
            );
            startup.isFounder = userData._id === startup.startupOwner._id;
          });
          setStartups(tempStartupData);
          return true;
        })
        .then(() => {
          setTimeout(setLoading(false), 3000);
        })
        .catch((error) => {
          if (error.response) {
            console.log(error.response.data);
          } else if (error.request) {
            console.log(error.request);
          } else {
            console.log('Error', error.message);
          }
          console.log(error.config);
          setStartups([]);
          setLoading(true);
        });
    }
  }, []);

  const EmptyStartupComponent = useCallback(
    () => (
      <EmptyOverviewComponent
        imgURL="https://s3-alpha-sig.figma.com/img/e964/1331/6f840dad9adc11eb036d0b485ebb0233?Expires=1639353600&Signature=RXwGa6MBpBjiVeurYUQh0TJw2fUop~2fEHntjng0YwETQ~oMj-FkgjSFj1DgcM8btl~fK~jWHK-Sy6v6e7AJ3ymEpHu0jfGhkN7q2aziZ77EqcAFCfFE6rM352S-1lVIryJxBfF0L~v6ATChxxKtJpFv5Fn1nkp37OWdkx4PCR4SqElXgKGPPihF~SMq4ZJUgqeFhg9gDfPCYGEWrSb9nA3vy3~BLrqsjrvyfffxQ5duVTKVLURVZtY-oBdbD09LVHnDm~8VzLyAjv-rcBn3z74ndOFojz7N7L1Zcj9dKQcn7WvR-qEH~CeByULnNEPCaZZfQ-ELHeKXCDRl~unXrA__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA"
        description="You currently have no stakes or founded any of the startups yet. To explore your options, go to the Startups Section."
        btnText="Try your first Stake in"
        btnFunction={() => {
          setLoading(false);
        }}
      />
    ),
    [],
  );

  const ProgressBar = useCallback((props) => {
    let value = props.completionRate;
    if (typeof value === 'number' || typeof value === 'string') {
      value = props.completionRate;
    } else {
      value = 0;
    }
    return (
      <div className="overview-wrapper">
        <div className="overview-barContainer">
          <div className="overview-filler" style={{ width: `${value}%` }} />
        </div>
      </div>
    );
  }, []);

  const StartupCards = () => {
    let startupData = [];
    if (currentView === 'founded') {
      startupData = startups.filter((startup) => startup.isFounder);
    } else if (currentView === 'staked') {
      startupData = startups.filter((startup) => startup.shareOwner);
    } else {
      startupData = startups;
    }
    return (
      <>
        {startupData.length > 0 ? (
          startupData.map((startup) => (
            <div
              key={startup.createdAt}
              className="overview-course-card d-flex flex-row justify-content-between"
            >
              {/* First and Second */}
              <div
                className="d-flex flex-row"
                style={{ width: '38%', marginRight: '2%' }}
              >
                {/* First Column - logo */}
                <div
                  className="overview-career-card-image d-flex justify-content-center align-items-center"
                  style={{ paddingRight: '10px', width: '30%' }}
                >
                  <img alt="company's logo" src={startup.startupImage} />
                </div>
                {/* Second Column - Title + Description */}
                <div
                  className="overview-course-card-info d-flex flex-column"
                  style={{ width: '70%' }}
                >
                  <p className="overview-course-card-info-title">
                    {startup.name}
                  </p>
                  <p
                    className="overview-course-card-description"
                    style={{ marginBottom: 0 }}
                  >
                    {startup.shareOffered.toLocaleString()}
                    {' '}
                    Shares offered
                  </p>
                </div>
              </div>
              {/* Third Column */}
              <div
                className="d-flex flex-column justify-content-center"
                style={{ width: '37%', marginRight: '3%' }}
              >
                <ProgressBar completionRate={startup.percentRaised} />
                <p
                  style={{
                    fontSize: '12px',
                    color: 'black',
                    textAlign: 'center',
                    lineHeight: '14px',
                    marginBottom: 0,
                    marginTop: '5px',
                  }}
                >
                  $
                  {(startup.amount / 1000).toLocaleString()}
                  k / $
                  {(startup.targetAmount / 1000).toLocaleString()}
                  k Raised
                </p>
              </div>
              {/* Fourth and Fifth Column */}
              <div className="d-flex flex-row" style={{ width: '18%' }}>
                {/* Fourth Column */}
                <div
                  className="overview-course-currency d-flex justify-content-center flex-column align-items-center"
                  style={{
                    marginRight: '2%',
                    width: '75%' /* marginRight: '5%' */,
                  }}
                >
                  <p
                    style={{
                      fontSize: '16px',
                      fontWeight: '700',
                      color: '#151371',
                    }}
                  >
                    {startup.percentRaised}
                    %
                  </p>
                </div>
                {/* Fifth Column */}
                <div
                  className="d-flex justify-content-center align-items-center "
                  style={{ width: '20%' }}
                >
                  <a href="#" target="_blank">
                    <p
                      style={{
                        color: '#151371',
                        fontSize: '24px',
                        fontWeight: '700',
                      }}
                    >
                      &gt;
                    </p>
                  </a>
                </div>
              </div>
            </div>
          ))
        ) : (
          <EmptyStartupComponent />
        )}
      </>
    );
  };

  return (
    <div
      className="d-flex flex-column justify-content-between "
      style={{ height: '100%' }}
    >
      <div
        className="d-flex flex-row justify-content-between align-items-center"
        style={{ height: '15%', marginBottom: '2%' }}
      >
        <div>
          <p
            style={{
              fontSize: '18px',
              fontWeight: '700',
              color: 'black',
              margin: 0,
              marginRight: '5px',
            }}
          >
            Startups
          </p>
        </div>
        <div
          className="overview-courses-list d-flex flex-row justify-content-between align-items-center"
          style={{ maxWidth: '80%', overflowY: 'hidden' }}
        >
          <div
            className="d-flex flex-row justify-content-between"
            style={{ height: '25px' }}
          >
            <div
              className={
                currentView === 'founded'
                  ? 'overview-career-button selected'
                  : 'overview-career-button'
              }
              onClick={() => {
                setCurrentView('founded');
              }}
              style={{ marginRight: '2%' }}
            >
              <p>Founded</p>
            </div>
            <div
              className={
                currentView === 'staked'
                  ? 'overview-career-button selected'
                  : 'overview-career-button'
              }
              onClick={() => {
                setCurrentView('staked');
              }}
            >
              <p>Staked In</p>
            </div>
            <div
              className={
                currentView === 'all'
                  ? 'overview-career-button selected'
                  : 'overview-career-button'
              }
              onClick={() => {
                setCurrentView('all');
              }}
            >
              <p>View All</p>
            </div>
          </div>
        </div>
      </div>
      <div
        className="overview-courses-cards d-flex flex-column"
        style={{ height: '85%' }}
      >
        {loading ? (
          <div
            className="d-flex flex-row justify-content-start align-items-start"
            style={{ lineHeight: 2, height: '100%', overflowX: 'hidden' }}
          >
            <Skeleton count={7} height={40} width={1200} />
          </div>
        ) : (
          <StartupCards />
        )}
      </div>
    </div>
  );
};

export default OverviewStartups;
