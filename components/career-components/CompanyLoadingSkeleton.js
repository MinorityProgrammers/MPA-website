import Skeleton from 'react-loading-skeleton';

const CompanySkeleton = () => {
  return (
    <>
      <div className="company-stub">
        <div className="company-stub-box1">

          <Skeleton className="company-stub-box1-logo" width={100} height={100} />

          <Skeleton className="company-stub-box1-location" height={25} />
          <Skeleton className="company-stub-box1-createdDate" />

        </div>
        <div className="company-stub-box2">
          <Skeleton className="company-stub-box2-name" width={150} />

          <div className="company-stub-box2-size"><Skeleton width={200} /></div>
          <div className="company-stub-box2-description">
            <Skeleton count={3} />
          </div>
        </div>
        <div className="company-stub-box3">

          <span><Skeleton className="company-stub-box3-diversity" width={125} height={90} /></span>
          {/* <div className="company-stub-box3-diversity-score">{`${company.diversity_score}/10`}</div> */}

        </div>
      </div>
    </>
  )
}

export default CompanySkeleton;