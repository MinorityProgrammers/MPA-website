import Skeleton from 'react-loading-skeleton';

const FeaturedCardSkeleton = function () {
  return (
    <div className="item">
      <div className="card card__container">
        <div className="card-body">
          <div className="card__header mb-1">
            <Skeleton className="card__header-logo" width={48} height={48} />
            <h2 className="card__header-title">
              <Skeleton style={{ marginLeft: 10 }} width={150} height={30} />
            </h2>
          </div>
          <div className="card-text card__text mb-1">
            <Skeleton />
            <Skeleton />
          </div>

          <div className="fund__container mb-1">
            <div className="fund__top mb-1">
              <h3 className="fund__topic">
                <Skeleton width={110} height={20} />
              </h3>
              <h3 className="fund__percentage">
                <Skeleton width={80} height={20} />
              </h3>
            </div>
            <h3 className="fund__amount mb-0">
              <Skeleton height={30} />
            </h3>
            <Skeleton height={21} />
          </div>
          <div
            className="d-flex flex-row justify-content-between"
            style={{ paddingRight: 0, paddingLeft: 0, marginLeft: 0 }}
          >
            <div style={{ width: '45%' }}>
              <Skeleton height={40} />
            </div>
            <div style={{ width: '45%' }}>
              <Skeleton height={40} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturedCardSkeleton;
