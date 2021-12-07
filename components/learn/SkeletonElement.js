import React from 'react';
import Skeleton from 'react-loading-skeleton';
import './learn-css/Skeleton.module.css';

const SkeletonElement = function () {
  return (
    <div className="courses-details banner-bg">
      <div className="row" style={{ backgroundColor: '#f7f7f7' }}>
        <div className="col-12 col-md-3 pr-0">
          {/* Course Sidebar */}
          <div className="pb-5 lg:pt-5">
            <div className="ml-md-4 mb-3 mt-4">
              <Skeleton style={{ backgroundColor: '#dcdcdc' }} width={90} height={10} />
            </div>

            <div className="px-md-5">
              <Skeleton width={150} height={15} style={{ backgroundColor: '#dcdcdc' }} />
              <div className="mt-4 pt-3">
                  <h5 className="mb-3">
                          <Skeleton width={170} height={20} style={{ backgroundColor: '#dcdcdc' }} />
                        </h5>
                  <div className="mb-2 d-flex align-items-center">
                          <Skeleton className="mr-2" width={25} height={25} style={{ borderRadius: '50%', backgroundColor: '#dcdcdc' }} />
                          <Skeleton width={160} height={13} style={{ backgroundColor: '#dcdcdc' }} />
                        </div>
                  <div className="mb-2 d-flex align-items-center">
                          <Skeleton className="mr-2" width={25} height={25} style={{ borderRadius: '50%', backgroundColor: '#dcdcdc' }} />
                          <Skeleton width={160} height={13} style={{ backgroundColor: '#dcdcdc' }} />
                        </div>
                </div>

              <div className="mt-4 pt-3">
                  <h5 className="mb-3">
                          <Skeleton width={170} height={20} style={{ backgroundColor: '#dcdcdc' }} />
                        </h5>
                  <div className="mb-2 d-flex align-items-center">
                          <Skeleton className="mr-2" width={25} height={25} style={{ borderRadius: '50%', backgroundColor: '#dcdcdc' }} />
                          <Skeleton width={160} height={13} style={{ backgroundColor: '#dcdcdc' }} />
                        </div>
                  <div className="mb-2 d-flex align-items-center">
                          <Skeleton className="mr-2" width={25} height={25} style={{ borderRadius: '50%', backgroundColor: '#dcdcdc' }} />
                          <Skeleton width={160} height={13} style={{ backgroundColor: '#dcdcdc' }} />
                        </div>
                </div>

              <div className="mt-4 pt-3">
                  <h5 className="mb-3">
                          <Skeleton width={170} height={20} style={{ backgroundColor: '#dcdcdc' }} />
                        </h5>
                  <div className="mb-2 d-flex align-items-center">
                          <Skeleton className="mr-2" width={25} height={25} style={{ borderRadius: '50%', backgroundColor: '#dcdcdc' }} />
                          <Skeleton width={160} height={13} style={{ backgroundColor: '#dcdcdc' }} />
                        </div>
                  <div className="mb-2 d-flex align-items-center">
                          <Skeleton className="mr-2" width={25} height={25} style={{ borderRadius: '50%', backgroundColor: '#dcdcdc' }} />
                          <Skeleton width={160} height={13} style={{ backgroundColor: '#dcdcdc' }} />
                        </div>
                </div>
            </div>
          </div>
        </div>

        {/* MainCourse Info */}
        <div className="col-12 col-md-9 pl-0">
          {/* Course Sidebar */}
          <div className="activities-banner">
            <div className="pt-5 mx-5 pe-5 ps-md-5 pb-5">
              <div className="week-info mx-5 px-4">
                  <h1 className="mb-3">
                          <Skeleton width={170} height={20} style={{ backgroundColor: '#dcdcdc' }} />
                        </h1>
                  <Skeleton style={{ backgroundColor: '#dcdcdc' }} width={70} height={10} />
                  <div className=" mt-2 mb-2">
                          <Skeleton height={6} style={{ backgroundColor: '#dcdcdc', width: '100%' }} />
                        </div>
                  <div className=" mt-2 mb-2">
                          <Skeleton height={6} style={{ backgroundColor: '#dcdcdc', width: '100%' }} />
                        </div>
                </div>
            </div>
          </div>

          <div className="skeStyle pt-4">
            <div className="d-flex justify-content-between mx-5">
              <Skeleton height={10} width={22} style={{ backgroundColor: '#dcdcdc' }} />
              <Skeleton height={10} width={22} style={{ backgroundColor: '#dcdcdc' }} />
            </div>

            <a className="text-decoration-none">
              <div className="px-md-3 mx-md-5 mt-4 pt-2 all-weeks">
                  <div className="mb-4 skeCard">
                          <div className="pt-3 pr-3">
                              <p className="d-flex flex-row-reverse">
                                  <Skeleton className="ml-3" style={{ backgroundColor: '#dcdcdc', borderRadius: '15px' }} width={70} height={15} />
                                </p>
                            </div>
                          <div className="d-pb-1 d-flex justify-content-center">
                              <h4 className="mt-2 mb-2">
                                  <Skeleton width={170} height={14} style={{ backgroundColor: '#dcdcdc' }} />
                                </h4>
                            </div>
                          <div className="mb-1" style={{ padding: '0px 115px' }}>
                              <div className="mt-1">
                                  <Skeleton className="mr-5" height={6} style={{ backgroundColor: '#dcdcdc', width: '90%', marginLeft: '4rem' }} />
                                </div>
                              <div className="mt-2">
                                  <Skeleton className="mr-5" height={6} style={{ backgroundColor: '#dcdcdc', width: '90%', marginLeft: '4rem' }} />
                                </div>
                            </div>
                        </div>
                </div>
            </a>
          </div>

        </div>
      </div>
    </div>
  );
};

export default SkeletonElement;
