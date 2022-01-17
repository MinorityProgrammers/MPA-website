import React, { useState } from 'react';
import { eventItems } from '../../helpers/dropDownItems';

const HomepageNavDropdown = ({ onCloseMobileMenu }) => {
  const [click, setClick] = useState(false);

  return (
    <ul
      onClick={onCloseMobileMenu}
      className={click ? 'dropdown-menu clicked' : 'dropdown-menu'}
    >
      {eventItems.map((item) => (
        <li key={item.title}>
          <div
            className={item.cName}
            href={item.path}
            onClick={() => setClick(false)}
          >
            <a>{item.title}</a>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default HomepageNavDropdown;
