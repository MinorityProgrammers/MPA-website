import React, { useState, useEffect } from 'react';
import axios from 'axios';
import EmptyOverviewComponent from './EmptyOverviewComponent';

const OverviewMyProposals = (props) => {
  const [loading, setLoading] = useState(true);
  const [currentView, setCurrentView] = useState('ideas');

  const AprrovedButton = () => (
    <button className="btn btn-primary overview-proposal-button" style={{ background: '#2D761B' }}>Approved</button>
  );
  const UnderReviewButton = () => (
    <button className="btn btn-primary overview-proposal-button" style={{ background: '#6A0C8B' }}>Under Review</button>
  );
  const SubmitedButton = () => (
    <button className="btn btn-primary overview-proposal-button" style={{ background: '#151371' }}>Submited</button>
  );
  const ProposalCard = () => (
    <div className="overview-proposal-card d-flex flex-row justify-content-center align-items-center" style={{ width: '100%' }}>
      <p className="proposal-card-info" style={{ width: '25%', margin: 0 }}>
        Dog Walkr
      </p>
      <div style={{ width: '24%', marginLeft: '1%' }}>
        <AprrovedButton />
      </div>
      <p className="proposal-card-info" style={{ width: '24%', marginLeft: '1%' }}>
        Sep 30th, 2021
      </p>
      <div className="d-flex flex-row align-items-center" style={{ width: '24%', marginLeft: '1%' }}>
        <img
          style={{
            height: '24px', width: '24px', borderRadius: '50%', marginRight: '2px',
          }}
          src="https://s3-alpha-sig.figma.com/img/8f26/8387/fe7165a279e84bfb08b58534b8aff61a?Expires=1638748800&Signature=EcDi0o7X9EcSh~fF3W21-A~FYI-99XEY-KWaIr862bD7XA2VIxsQEDxsg~0hLgfFk-4lsYjLKPyiQnHwZ13fZy8IN7L0vX81Nb5dKdpfp5Ii-GJ2rNkD6eGSNfL6~zMWygUfBHJzObhrZhPUYzhU45HldQxHCUQRtMMPbqhOJFtGj59GmFAt4YUXfBy3fGbtWoMOZ9v3xEm6X7dDyLCeX5J7IwkvYLlqN4j95N4yo6Nor1PfGAs564wZzNUynl~I3Th6QypIVQz-kG6k0NwsePDlT7RXcQJv8d8~2rk3FpZaCQ5Ud35T3JS6xnw8KCfboJ0pcgL7-w9JfzyXB3rMZg__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA"
        />
        <p className="proposal-card-info">Scott Davis</p>
      </div>
    </div>
  );

  return (
    <div className="d-flex flex-column justify-content-between " style={{ height: '100%' }}>
      {/* First row */}
      <div className="d-flex flex-row justify-content-between align-items-center" style={{ height: '13%', marginBottom: '2%' }}>
        <div>
          <p style={{
            fontSize: '18px', fontWeight: '700', color: 'black', margin: 0, marginRight: '5px',
          }}
          >
            Proposals
          </p>
        </div>
        <div className="overview-courses-list d-flex flex-row justify-content-between align-items-center" style={{ overflowY: 'scroll' }}>
          <div className="d-flex flex-row justify-content-between" style={{ height: '25px' }}>
            <div
              className={currentView === 'ideas' ? 'overview-career-button selected' : 'overview-career-button'}
              onClick={() => { setCurrentView('ideas'); }}
              style={{ marginRight: '2%' }}
            >
              <p>Ideas</p>
            </div>
            <div className={currentView === 'tasks' ? 'overview-career-button selected' : 'overview-career-button'} onClick={() => { setCurrentView('tasks'); }}>
              <p>Tasks</p>
            </div>
            <div
              className={currentView === 'all' ? 'overview-career-button selected' : 'overview-career-button'}
              onClick={() => { setCurrentView('all'); }}
            >
              <p>View All</p>
            </div>
          </div>
        </div>
      </div>
      <div className="" style={{ height: '85%' }}>

        {loading
          ? (
            <EmptyOverviewComponent
              imgURL="https://s3-alpha-sig.figma.com/img/5bcf/ddf5/5d9ce499aec11e58757d8a16806d3987?Expires=1638748800&Signature=QUNE46yfLdleC33bUJm5O~ZM~z5P0--l91eouMJV3u6gZjn3yEiLkHtx3o7JkktsyR6xlpgnPjoIa1z9nj50kJnnibCXah3yvtyhnBZVHs6rArNY9xPZGHvHOqeuHnEZ3fnsUjMt20EzO4ErYbXXGj776fmXMLYQ5jXSo2RaFQopijoq7zBZ6vINknp79gcG0koH95IL8kmgfpF1TzmDCOjwjTuStalEM~l7RCIpJrtgXd2yUZe0hEi1I8GPNvEjlvbcbWkozt0I3AXX2QiOj6rrQvjmlQ5Elt-E9aHV71jsg-gUHRihTmztyJZxPO5rT21byXQEL9rGNm2M0lNoBQ__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA"
              description="Oops, it seems you haven’t submitted any proposals yet."
              btnText="Submit your first proposal"
              btnFunction={() => setLoading(false)}
            />
          )
          : (
            <div className="d-flex flex-column" style={{ width: '100%', height: '100%' }}>
              {/* Titles Row */}
              <div
                className="d-flex flex-row"
                style={{
                  width: '100%', fontSize: '12px', margin: '0', fontWeight: '700', color: 'black', padding: '0 10px', height: '15%',
                }}
              >
                {/* 25% each */}
                <p style={{ width: '25%' }}>Name</p>
                <p style={{ width: '24%', marginLeft: '1%' }}>Status</p>
                <p style={{ width: '24%', marginLeft: '1%' }}>Created On</p>
                <p style={{
                  maxLines: '1', overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis', width: '24%', marginLeft: '1%',
                }}
                >
                  Project Manager
                </p>
              </div>
              {/* Proposals Row */}
              <div
                className="overview-proposal-cards d-flex flex-column"
                style={{
                  width: '100%', margin: '0', padding: 0, height: '85%',
                }}
              >
                <ProposalCard />
                <ProposalCard />
                <ProposalCard />
                <ProposalCard />
                <ProposalCard />
                <ProposalCard />
                <ProposalCard />
                <ProposalCard />
              </div>
            </div>
          )}
      </div>
    </div>
  );
};

export default OverviewMyProposals;
