import React from "react";

const CheckBoxItem = ({ name, value, text, onChange }) => (
  <li>
    <input
      type="checkbox"
      name={name}
      value={value}
      onChange={(e) => onChange(e)}
    />
    <span>{text}</span>
  </li>
);

export default CheckBoxItem;
