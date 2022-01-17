import React from 'react';

const NeedHelp = function ({ link = '#' }) {
  return (
    <div className="fixed-help-div">
      <a href={link}>Need Help ?</a>
    </div>
  );
};
export default NeedHelp;
