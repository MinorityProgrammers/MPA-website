import React from 'react';
import Skeleton from 'react-loading-skeleton';

const RecommendedCoursesListSkeleton = function () {
  return (
    <div className="courses-items px-3 mb-4 mx-2 tw-bg-white tw-shadow-lg">
      <div className="pt-3">
        <div className="earn-rate ml-auto d-flex align-items-center">
          <Skeleton />
        </div>
      </div>
      <div className="d-pb-1 ml-2 mb-1">
        <h3 className="course-name mt-3 mb-0">
          <Skeleton height={40} />
        </h3>
      </div>
      <p className="course-des ml-2 pb-2"><Skeleton height={20} /></p>

      <div className="text-center pb-4">
        <button
          type="button"
          data-toggle="modal"
          data-target="#exampleModal"
        >
          <Skeleton width={70} height={20} />
        </button>
      </div>
    </div>
  );
};

export default RecommendedCoursesListSkeleton;
