import React from 'react';
import Label from './Label';

const InputGroup = (props) => {
  const {
    labelClassName, labelText, inputName, isRequried, ...rest
  } = props;
  return (
    <div className="form-input-group tw-flex tw-flex-col tw-mb-3">
      <Label
        className={labelClassName}
        text={labelText}
        isRequried={isRequried}
      />
      <input
        name={inputName}
        required={isRequried}
        {...rest}
      />
    </div>
  );
};

export default InputGroup;
