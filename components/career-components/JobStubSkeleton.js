import ContentLoader from 'react-content-loader';
import Skeleton from 'react-loading-skeleton';

const JobStubSkeleton = function () {
  return (
    <div className="job-stub">
      <div className="job-stub-header">
        <div className="job-stub-title"><h1><Skeleton width={250} /></h1></div>
        <div className="job-stub-company" style={{ marginTop: 10 }}><p><Skeleton width={100} /></p></div>
        {/* <div className="job-stub-location" style={{ marginTop: 5 }}><p><Skeleton width={150} /></p></div> */}
      </div>
      {/* <div className="job-stub-description"><p><Skeleton count={3} height={16} /></p></div> */}
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
};

export default JobStubSkeleton;
