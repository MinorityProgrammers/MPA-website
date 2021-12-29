import React from 'react';
import Label from './Label';

const TextAreaGroup = ({
  isRequried, labelText, name, placeholder,
}) => (
  <div className="tw-flex tw-flex-col tw-mb-3">
    <Label text={labelText} isRequried={isRequried} />
    <textarea
      name={name}
      required={isRequried}
      rows="6"
      className="tw-text-white focus:tw-outline-none focus:tw-ring-2 focus:tw-ring-yellow-300 tw-py-1 tw-px-2 tw-border tw-border-white tw-bg-transparent tw-placeholder-white tw-placeholder-opacity-80"
      placeholder={placeholder}
    />
  </div>
);

export default TextAreaGroup;
