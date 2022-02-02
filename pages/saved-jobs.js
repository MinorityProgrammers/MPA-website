import React, { useState } from 'react';
import Applied from '../components/career-components/Applied';
import CareersMainComponent from '../components/career-components/CareersMainComponent';
import Saved from '../components/career-components/Saved';

const SavedJobs = () => {
  const [currentView, changeCurrentView] = useState('saved');

  const loadApplied = () => {
    changeCurrentView('applied');
  };

  const loadSaved = () => {
    changeCurrentView('saved');
  };

  return (
    <CareersMainComponent>
      <div className="saved-jobsMain">
        <h2 className="saved-jobsMain-search-heading">Search For Jobs</h2>
        <div className="saved-jobsMain-search-links">
          <a className="saved-jobsMain-search-links-link" href="/careers">
            Browse All
          </a>
          <a
            className="saved-jobsMain-search-links-link"
            href="/careers/saved-jobs"
          >
            Saved
          </a>
        </div>
        <div className="saved-jobsMain-toggler">
          <button type="button" className="tw-mr-4" onClick={loadSaved}>
            Saved
          </button>
          <button type="button" onClick={loadApplied}>
            Applied
          </button>
        </div>
        <div>
          {currentView === 'saved' && <Saved />}
          {currentView === 'applied' && <Applied />}
        </div>
      </div>
    </CareersMainComponent>
  );
};

export default SavedJobs;
