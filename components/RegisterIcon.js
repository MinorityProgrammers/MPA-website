import React from 'react';
import Link from 'next/link';

const RegisterIcon = ({ icon, link }) => (
  <div
    className="tw-m-2 tw-text-gray-600 tw-items-center tw-border-2 tw-cursor-pointer
        tw-border-gray-500 tw-rounded-full tw-p-2 hover:tw-bg-white tw-transition tw-duration-500 tw-ease-in-out tw-transform hover:tw--translate-y-3 hover:tw-scale-110 "
  >
    <Link href={`/${link}`}>
      <img
        src={`./assets/images/favicons/${icon}.svg`}
        className="tw-w-4 tw-h-4"
        alt={`${icon}`}
      />
    </Link>
  </div>
);

export default RegisterIcon;
