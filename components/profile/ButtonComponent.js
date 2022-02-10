import React from 'react';

function ButtonComponent({
  state, func, text, disabled,
}) {
  return (
    <button type="button" onClick={func} className={`md:tw-w-11/12 md:tw-my-2 mintBTN tw-outline-none focus:tw-ring-offset-0 focus:tw-border-opacity-0 tw-ring-offset-0 tw-transition tw-ease-in-out tw-delay-150 duration-300 tw-w-auto tw-p-3 tw-rounded-3xl tw-h-12 tw-flex tw-flex-row tw-justify-center tw-mx-2 ${disabled === true ? 'tw-cursor-not-allowed tw-opacity-5' : ''}`}>
      <p className="tw-text-white tw-text-md tw-text-center ">
        {state ? (
          <img
            src="/assets/spinner.png"
            className="tw-h-5 tw-animate-spin"
            alt="spinner"
          />
        ) : (
          <p>{text}</p>
        )}
      </p>
    </button>
  );
}

export default ButtonComponent;
