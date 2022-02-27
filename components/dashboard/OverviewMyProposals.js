/* eslint-disable max-len */
import React, { useState, useEffect, useCallback } from 'react';
import Skeleton from 'react-loading-skeleton';

const OverviewMyProposals = () => {
  const [loading, setLoading] = useState(true);
  const [currentView, setCurrentView] = useState('ideas');

  useEffect(() => {
    const timeoutID = setTimeout(() => {
      setLoading(false);
    }, 5000);
    return () => {
      clearTimeout(timeoutID);
    };
  }, []);

  const AprrovedButton = useCallback(
    () => (
      <button
        type="button"
        className="overview-proposal-button"
      >
        Approved
      </button>
    ),
    [],
  );

  const ProposalCard = useCallback(
    () => (
      <div
        className="overview-course-card d-flex flex-row justify-content-center align-items-center"
        style={{ width: '100%', padding: '10px' }}
      >
        <p className="proposal-card-info" style={{ width: '25%', margin: 0 }}>
          Dog Walkr
        </p>
        <div style={{ width: '24%', marginLeft: '1%' }}>
          <AprrovedButton />
        </div>
        <p
          className="proposal-card-info"
          style={{ width: '24%', marginLeft: '1%' }}
        >
          Sep 30th, 2021
        </p>
        <div
          className="d-flex flex-row align-items-center"
          style={{ width: '24%', marginLeft: '1%' }}
        >
          <img
            style={{
              height: '30px',
              width: '30px',
              borderRadius: '50%',
              marginRight: '2px',
            }}
            src="/assets/images/dashboard/proposal1.png"
            alt=""
          />
          <p className="proposal-card-info">Scott Davis</p>
        </div>
      </div>
    ),
    [],
  );

  return (
    <div
      className="d-flex flex-column justify-content-between "
      style={{ height: '100%' }}
    >
      {/* First row */}
      <div
        className="d-flex flex-row justify-content-between align-items-center"
        style={{ height: '13%', marginBottom: '2%' }}
      >
        <div>
          <p
            style={{
              fontSize: '18px',
              fontWeight: '700',
              color: 'white',
              margin: 0,
              marginRight: '5px',
            }}
          >
            Proposals
          </p>
        </div>
        <div
          className="overview-courses-list d-flex flex-row justify-content-between align-items-center"
          style={{ overflowY: 'scroll' }}
        >
          <div
            className="d-flex flex-row justify-content-between"
            style={{ height: '25px' }}
          >
            <div
              className={
                currentView === 'ideas'
                  ? 'overview-career-button selected'
                  : 'overview-career-button'
              }
              onClick={() => {
                setCurrentView('ideas');
              }}
              style={{ marginRight: '2%' }}
            >
              <p>Ideas</p>
            </div>
            <div
              className={
                currentView === 'tasks'
                  ? 'overview-career-button selected'
                  : 'overview-career-button'
              }
              onClick={() => {
                setCurrentView('tasks');
              }}
            >
              <p>Tasks</p>
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
      <div className="" style={{ height: '85%' }}>
        <div
          className="d-flex flex-column"
          style={{ width: '100%', height: '100%' }}
        >
          {/* Titles Row */}
          <div
            className="d-flex flex-row"
            style={{
              width: '100%',
              fontSize: '12px',
              margin: '0',
              marginBottom: '10px',
              fontWeight: '700',
              color: 'white',
              padding: '0 10px',
              // height: '15%',
            }}
          >
            {/* 25% each */}
            <p className="dashboard-proposal-table-title" style={{ width: '25%' }}>Name</p>
            <p className="dashboard-proposal-table-title" style={{ width: '24%', marginLeft: '1%' }}>Status</p>
            <p className="dashboard-proposal-table-title" style={{ width: '24%', marginLeft: '1%' }}>Created On</p>
            <p
              className="dashboard-proposal-table-title"
              style={{
                maxLines: '1',
                overflow: 'hidden',
                whiteSpace: 'nowrap',
                textOverflow: 'ellipsis',
                width: '24%',
                marginLeft: '1%',
              }}
            >
              Project Manager
            </p>
          </div>
          {loading ? (
            <div
              className="d-flex flex-row justify-content-start align-items-start"
              style={{
                lineHeight: 2,
                height: '100%',
                overflowX: 'hidden',
                overflowY: 'scroll',
              }}
            >
              <Skeleton count={6} height={35} width={1200} />
            </div>
          ) : (
            <div
              className="overview-proposal-cards d-flex flex-column"
              style={{
                width: '100%',
                margin: '0',
                padding: 0,
                height: '85%',
              }}
            >
              {/* Proposals Row */}
              <ProposalCard />
              <ProposalCard />
              <ProposalCard />
              <ProposalCard />
              <ProposalCard />
              <ProposalCard />
              <ProposalCard />
              <ProposalCard />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default OverviewMyProposals;
