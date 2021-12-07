import ContentLoader from 'react-content-loader';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';

const CurrentJobSkeleton = function () {
  return (
    <div className="jobs-main-container-single">
      {/* NAME TITLE AND LOCATION */}
      <div className="current-job-view-box1">
        <div>
          <h1 style={{ margin: 0 }}><Skeleton width={250} /></h1>
          <h2><Skeleton width={200} /></h2>
          <p style={{ margin: '0' }}><Skeleton width={150} /></p>
          <p style={{ margin: '0' }}><Skeleton width={150} /></p>
          <p><Skeleton width={100} height={40} /></p>
        </div>
        <div>
          {/* <Skeleton width={150} height={150} /> */}
          <p><Skeleton width={150} height={40} /></p>
        </div>
      </div>

      {/* POSITION INFORMATION */}
      {/* <SkeletonTheme  >
        <div style={{ width: '100%' }}>
          <Skeleton height={100} />
        </div>
      </SkeletonTheme> */}

      <hr className="current-job__rule" />
      {/* JOB DESCRIPTION */}
      <div className="current-job-view-box3" style={{ marginBottom: 0 }}>
        <h1 style={{ marginTop: 10 }}><Skeleton width={150} /></h1>
        {/* <h3><Skeleton style={{ marginTop: 5 }} /></h3>
        <h4><Skeleton width={200} /></h4> */}
        <p style={{ margin: 0, marginTop: 10 }}><Skeleton style={{ margin: 0 }} count={4} /></p>
      </div>
      <hr className="current-job__rule" />
      {/* MIN REQUIREMENTS */}
      <div className="current-job-view-box3" style={{ marginBottom: 0 }}>
        <h1 style={{ marginTop: 10 }}><Skeleton width={150} /></h1>
        {/* <h3><Skeleton style={{ marginTop: 5 }} /></h3>
        <h4><Skeleton width={200} /></h4> */}
        <p style={{ margin: 0, marginTop: 10, width: '70%' }}><Skeleton style={{ margin: 0 }} count={4} /></p>
      </div>
      {/* WAGE */}

      <SkeletonTheme>
        <h1 style={{ marginTop: 10 }}><Skeleton width={150} /></h1>
        <div style={{ width: '100%' }}>
          <Skeleton height={100} />
        </div>
      </SkeletonTheme>

      {/* INDUSTRY */}
      <div className="current-job-view-box6">
        <h4 style={{ marginTop: 10 }}><Skeleton width={200} /></h4>
      </div>
    </div>
  );
};

export default CurrentJobSkeleton;
