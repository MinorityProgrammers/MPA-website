import React, { useEffect } from 'react';

const BlurBackground = function ({ children }) {
  useEffect(() => {
    document.body.classList.add('hide-overflow');
  }, []);
  return (
    <div className="blurBkg">
      <div className="centered-blur-body">{children}</div>
    </div>
  );
};
export default BlurBackground;
