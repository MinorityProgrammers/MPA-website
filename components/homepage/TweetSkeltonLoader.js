import React from 'react';
import Skeleton from 'react-loading-skeleton';

const TweetSkeltonLoader = () => (
  <div className="tw-rounded-lg tw-pt-2.5 tw-pb-3.5 tw-w-fit tw-h-fit" style={{ maxWidth: '360px' }}>
    <div className="card card__container homepage__comment">
      <div className="card-body">
        <div className="card__header">
          <Skeleton width={60} height={60} circle className="tw-pr-2.5" />
          <div className="tw-flex tw-flex-col">
            <h2 className="card__header-title">
              <Skeleton width={200} />
            </h2>
            <p className="card__header__position">
              <Skeleton width={100} />
            </p>
          </div>
        </div>
        <div className="card__quote">
          <p>
            <Skeleton width={262} count={4} />
            <Skeleton width={100} />
            <Skeleton width={262} count={2} />
            <Skeleton style={{ marginBottom: '5px' }} width={120} />
          </p>
          <hr />
          <div style={{ justifyContent: '', display: 'flex' }}>
            <Skeleton style={{ marginRight: '15px' }} width={50} />
            <Skeleton style={{ marginRight: '15px' }} width={50} />
            <Skeleton width={50} />
          </div>
          <Skeleton width={262} style={{ borderRadius: '15px' }} height={36} />
        </div>
      </div>
    </div>
  </div>
);
export default TweetSkeltonLoader;
