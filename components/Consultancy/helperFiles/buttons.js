import React from 'react';

const dummyFunction = () => {};
const Buttons = ({
  left,
  right,
  marginTop,
  plus = dummyFunction,
  minus = dummyFunction,
  customPlusText,
}) => (
  <div className="service_buttons">
    {left ? (
      <button
        type="button"
        onClick={() => {
          minus();
        }}
        style={marginTop ? { marginTop } : {}}
      >
        <span>&#8592;</span>
      </button>
    ) : null}
    {right ? (
      <button
        type="button"
        onClick={() => {
          plus();
        }}
        style={marginTop ? { marginTop } : {}}
      >
        <span>{customPlusText || <>&#8594;</>}</span>
      </button>
    ) : null}
  </div>
);

export default Buttons;
