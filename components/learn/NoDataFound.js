import React from 'react';
import ButtonComponent from '../profile/ButtonComponent';

function NoDataFound({
  title, description, textAction, isActionable, action,
}) {
  return (
    <div className="profileTopSection tw-relative tw-z-10">
      <section className="tw-w-11/12 tw-mx-auto tw-rounded-xl tw-shadow-md tw-overflow-hidden topSection tw-p-10 tw-flex tw-flex-col tw-justify-center tw-h-auto ">
        <div className="tw-m-10 tw-text-3xl lg:tw-text-xl tw-font-medium tw-text-center tw-text-gray-600">{`No ${title} to Display`}</div>
        <div className="tw-text-md tw-font-normal tw-text-center tw-text-gray-100">{`${description}`}</div>
        <div className="tw-mt-3 tw-w-full tw-flex tw-flex-row tw-justify-center tw-my-3">
          {isActionable && (
          <a href={action} className="tw-justify-center">
            <ButtonComponent text={textAction} />
          </a>
          )}
        </div>
      </section>
    </div>
  );
}

export default NoDataFound;
