import React from 'react';
import DatePicker from 'react-datepicker';

const CustomDate = function ({ value, onChange }) {
  return (
    <DatePicker
      onChange={onChange}
      value={value}
    />
  );
};

export default CustomDate;
