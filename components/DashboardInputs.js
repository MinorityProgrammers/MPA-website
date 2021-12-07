import React from 'react';

const DashboardInputs = function ({
  holder, setNew, New, name,
}) {
  return (
    <div className="tw-flex tw-flex-row tw-h-10 tw-bg-white tw-items-center tw-rounded tw-my-3 tw-shadow-xl tw-w-10/12 inp">
      <input
        value={New}
        name={name}
        onChange={(e) => {
          setNew(e.target.value);
        }}
        type="text"
        className="tw-flex-shrink tw-flex-grow tw-flex-auto tw-text-gray-500  tw-leading-normal tw-border-0 tw-rounded tw-pl-5  tw-self-center tw-h-10  tw-text-md tw-outline-none"
        placeholder={holder}
      />
    </div>
  );
};

export default DashboardInputs;
