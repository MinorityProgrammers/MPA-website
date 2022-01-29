import React from 'react';

const ErrorPrint = ({ errors = [], red, left }) => (
  <div className="errorEle">
    {errors.map((error, index) => (
      <h4
        key={`${index + 1}`}
        style={{
          color: red ? 'var(--errorRed)' : '',
          textAlign: left ? 'left' : '',
        }}
      >
        -
        {error}
      </h4>
    ))}
  </div>
);

export default ErrorPrint;
