import React from 'react';
import { useRouter } from 'next/router';
import getProgressPercentage from '../../contexts/utils/settings/getProgressPercentage';
import getLevelUpTips from '../../contexts/utils/settings/getLevelUpTips';

function ProfileStength({ userData, setPsArrowUp, psArrowUp }) {
  const router = useRouter();
  return (
    <>
      {getProgressPercentage(userData)
              && getProgressPercentage(userData) < 100 && (
                <div className="tw-py-2 profileTopSection tw-relative tw-z-10">
                  <section className="tw-w-11/12 tw-mx-auto tw-rounded-xl tw-shadow-md tw-overflow-hidden topSection">
                    <div className="profile-strength tw-p-6  tw-rounded-md tw-grid tw-grid-flow-row tw-auto-rows-max">
                      <div
                        className={`${
                          !psArrowUp
                            ? 'hover:tw-shadow-lg '
                            : 'tw-shadow-lg'
                        }tw-group tw-block tw-rounded-lg tw-p-4 tw-bg-transparent`}
                      >
                        <h2 className="tw-relative tw-text-xl tw-font-medium tw-mb-3 tw-text-gray-200">
                          Profile Strength
                          {' '}
                          {`(${getProgressPercentage(userData)}%)`}
                          :
                          {' '}

                          <span className={`tw-font-medium ${getProgressPercentage(userData) <= 33 ? 'tw-text-red-500' : getProgressPercentage(userData) <= 66 ? 'newColor' : 'tw-text-green-500'}`}>
                            {`${
                              getProgressPercentage(userData) <= 33
                                ? 'Low'
                                : getProgressPercentage(userData) <= 66
                                  ? 'Intermediate'
                                  : 'High'
                            }`}
                          </span>

                          <span
                            className="ps-arrow tw-absolute tw-top-0 tw-right-0 tw-text-xs tw-cursor-pointer"
                            onClick={() => setPsArrowUp(!psArrowUp)}
                          >
                            <img
                              src={`/assets/images/profile/${
                                psArrowUp ? 'arrow-up' : 'arrow-down'
                              }.svg`}
                              alt={`arrow ${psArrowUp ? 'up' : 'down'}`}
                            />
                          </span>
                        </h2>
                        <div className="ps-pb-wrapper">

                          <div className="tw-w-full tw-rounded-full tw-h-2.5 tw-bg-gray-700">
                            <div className="new-bg tw-h-2.5 tw-rounded-full" style={{ width: `${getProgressPercentage(userData).toString()}%` }} />
                          </div>
                        </div>
                      </div>

                      {psArrowUp && (
                      <div className="steps-note tw-bg-transparent hover:tw-bg-light-blue-500hover:tw-shadow-lg tw-group tw-block tw-rounded-lg tw-rounded-t-none tw-p-4 tw--my-2">
                        <h2 className="tw-relative tw-text-xl tw-font-medium tw-mb-3 tw-text-gray-200">
                          Your profile is at an intermediate level. Do the following
                          to increase your level
                        </h2>
                        <div className="increase-level-steps tw-flex tw-flex-wrap">
                          {getLevelUpTips(userData)
                            .filter((data) => data.missing)
                            .map((missingData) => (
                              <div
                                className="md:tw-w-1/5 tw-m-2 mintBTN tw-outline-none focus:tw-ring-offset-0 focus:tw-border-opacity-0 tw-ring-offset-0 tw-transition tw-ease-in-out tw-delay-150 duration-300 tw-w-1/5 tw-text-white tw-p-2 tw-rounded-3xl tw-h-10 tw-cursor-pointer tw-flex tw-flex-row tw-justify-center tw-mx-2"
                                onClick={() => router.push(missingData.route)}
                              >
                                Add
                                {' '}
                                {`${missingData.name}`}
                              </div>
                            ))}
                        </div>
                      </div>
                      )}
                    </div>
                  </section>
                </div>
      )}
    </>
  );
}

export default ProfileStength;
