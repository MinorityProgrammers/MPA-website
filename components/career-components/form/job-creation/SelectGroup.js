import React from 'react';
import Label from './Label';

const SelectGroup = ({
  isRequried, labeText, name, options = [],
}) => (
  <>
    <Label text={labeText} isRequried={isRequried} />
    <div>
      <select
        name={name}
        required={isRequried}
        className="tw-w-full tw-py-1 tw-px-2 tw-border tw-border-white tw-bg-transparent tw-placeholder-white tw-placeholder-opacity-80 tw-text-white"
      >
        {
          options.map((item, index) => (
            <option key={`${item + index}`} style={{ background: '#151371' }}>{item}</option>
          ))
        }
      </select>
    </div>

  </>
);

export default SelectGroup;
