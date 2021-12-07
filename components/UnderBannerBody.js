import React from "react";

const UnderBannerBody = (props) => {
  let text = props.text;

  return (
    <div class="below-banner-text">
      <p>{text}</p>
    </div>
  );
};
export default UnderBannerBody;
