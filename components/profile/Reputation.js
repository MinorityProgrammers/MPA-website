import { Tooltip } from 'antd';
import React from 'react';

function NoDataFound({ reputation, reputationBadge }) {
  return (
    <div className="profileTopSection tw-relative tw-z-10">
      <section className="tw-w-11/12 tw-mx-auto tw-rounded-xl tw-shadow-md topSection tw-py-10 tw-p-20 tw-flex tw-flex-col tw-justify-center">
        <div className="tw-m-14 tw-text-3xl lg:tw-text-xl tw-font-medium tw-text-left tw-px-10 tw-text-gray-600">Earned Badges</div>
        <div className="tw-m-8 tw-px-10 tw-my-1">
          {reputation?.length ? (
            reputation.map((badge) => (
              <div
                key={badge._id}
                className="tw-h-24 tw-w-24 tw-flex tw-justify-center tw-py-5 tw-m-1 tw-cursor-pointer topSection tw-rounded-md"
              >
                <Tooltip placement="top" title={badge.title}>
                  <img
                    className="tw-w-10 tw-h-10"
                    src={reputationBadge[badge.type]}
                    alt={badge.title}
                  />
                </Tooltip>
              </div>
            ))
          ) : (
            <span className="note" style={{ cursor: 'default' }}>
              No badge yet
            </span>
          )}
        </div>

      </section>
    </div>
  );
}

export default NoDataFound;
