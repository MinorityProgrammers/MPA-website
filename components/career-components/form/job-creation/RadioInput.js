import React from 'react';

const RadioInput = ({
  id, name, required, value, text,
}) => (
  <label htmlFor={id} className="jobType-label tw-text-white tw-mr-5 tw-mb-0">
    <input
      name={name}
      id={id}
      required={required}
      type="radio"
      value={value}
      className="jobType-checkbox tw-mr-1"
    />
    <span className="jobType-custom-checkbox" />
    {text}
  </label>
);

export default RadioInput;
