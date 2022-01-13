import React from 'react';

const Label = ({
  className, text, isRequried, children,
}) => (
  <label className={className || 'tw-text-white tw-text-lg tw-mb-1 tw-font-bold'}>
    {text}
    {isRequried && <span className="tw-text-xl tw-text-yellow-200">{' *'}</span>}
    {children}
  </label>
);

export default Label;
