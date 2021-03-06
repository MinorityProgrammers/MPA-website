import React from 'react';
import Skeleton from 'react-loading-skeleton';

const JobStubSkeleton = () => (
  <div className="job-stub">
    <div className="job-stub-header">
      <div className="job-stub-title">
        <h1>
          <Skeleton width={250} />
        </h1>
      </div>
      <div className="job-stub-company" style={{ marginTop: 10 }}>
        <p>
          <Skeleton width={100} />
        </p>
      </div>
    </div>

    <div className="job-stub-footer">
      <div className="d-flex flex-row w-100 justify-content-between">
        <div className="d-flex justify-content-start w-50">
          <Skeleton width={100} height={20} />
        </div>
        <div className="d-flex justify-content-end w-50">
          <Skeleton style={{ marginLeft: '10px' }} width={100} height={20} />
        </div>
      </div>
    </div>
  </div>
);

export default JobStubSkeleton;
