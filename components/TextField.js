import { useField } from 'formik';
import React from 'react';

const TextField = function ({
  label, alertStyle, textStyle, ...props
}) {
  const [field, meta] = useField(props);

  return (
    <div>
      <label htmlFor={field.name}>{label}</label>
      <br />
      <input {...field} {...props} className={textStyle} />
      {meta.touched && meta.error ? (
        <div className={alertStyle}>{meta.error}</div>
      ) : null}
    </div>
  );
};

export default TextField;
