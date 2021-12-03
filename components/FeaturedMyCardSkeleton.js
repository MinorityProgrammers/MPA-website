import Skeleton from "react-loading-skeleton";

const FeaturedMyCardSkeleton = () => {
  return (
    <div className="item" style={{ borderRadius: 20 }}>
      <div className="card card__container">
        <div className="card-body">
          <div className="card__header mb-1">
            <div className="card__header-logo">
              <Skeleton width={48} height={48} />
            </div>
            <h2 className="card__header-title">
              <Skeleton style={{ marginLeft: 10 }} width={150} height={30} />
            </h2>
          </div>
          <div
            className="row container mb-1 justify-content-between"
            style={{ paddingRight: 0, paddingLeft: 0, marginLeft: 0 }}
          >
            <div className="card__info mb-0">
              <Skeleton style={{ marginBottom: 0 }} width={95} height={20} />
              <h3 className="">
                <Skeleton height={35} />
              </h3>
            </div>
            <div className="card__info mb-0">
              <Skeleton style={{ marginBottom: 0 }} width={95} height={20} />
              <h3 className="">
                <Skeleton height={35} />
              </h3>
            </div>
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
          <Skeleton height={40} />
        </div>
      </div>
    </div>
  );
};

export default FeaturedMyCardSkeleton;
