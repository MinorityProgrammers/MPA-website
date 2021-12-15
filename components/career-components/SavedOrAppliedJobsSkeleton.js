import React from 'react';
import Skeleton from 'react-loading-skeleton';

const SavedOrAppliedJobSkeleton = () => (
  <div className="saved-job-stub">
    <div className="saved-job-stub-header">
      <Skeleton className="saved-job-stub-title" />
      <Skeleton className="saved-job-stub-company" />
      <Skeleton className="saved-job-stub-location" />
    </div>
    <Skeleton count={3} className="saved-job-stub-description" />
    <div className="saved-job-stub-footer">
      <Skeleton className="saved-job-stub-postDate" />
      <Skeleton className="saved-job-stub-saveLink" />
    </div>
  </div>
);

export default SavedOrAppliedJobSkeleton;
