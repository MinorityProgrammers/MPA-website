/* eslint-disable */
import { useField } from "formik";
import React from "react";

const TextField = ({ label, alertStyle, textStyle, ...props }) => {
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

export const InputField = ({ label, alertStyle, textStyle, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <>
      <input
        {...field}
        {...props}
        className={textStyle}
      />
      {meta.touched && meta.error ? (
        <div className={alertStyle}>{meta.error}</div>
      ) : null}
    </>
  );
};

export const ResetInput = ({ label, textStyle, errorText, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <>
      <input
        style={{
          backgroundImage: "url('./assets/images/lock-icon.svg')",
        }}
        {...field}
        {...props}
        className={textStyle}
      />
      {meta.touched && meta.error ? (
        <div className={errorText}>{meta.error}</div>
      ) : null}
    </>
  );
};

export default TextField;
