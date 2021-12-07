import React, { useState } from 'react';
import DatePicker from 'react-datepicker';

const CustomDate = function () {
  return (
    <DatePicker
      onChange={onChange}
      value={value}
    />
  );
};

export default CustomDate;
