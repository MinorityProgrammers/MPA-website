import React from 'react';
import Link from 'next/link';
import { RiArrowDropDownLine, RiArrowDropUpLine } from 'react-icons/ri';

const SidebarNav = ({
  section,
  active,
  collapse,
  setCollapse,
  handleClick,
}) => (
  <nav className="sidebarNav">
    {section.dropdown ? (
      <div className="dropdownHeader" onClick={() => setCollapse(!collapse)}>
        <h3 className=" tw-text-white">{section.title}</h3>
        {collapse ? (
          <RiArrowDropDownLine size={20} />
        ) : (
          <RiArrowDropUpLine size={20} />
        )}
      </div>
    ) : (
      ''
    )}
    <ul
      className={
        !collapse || !section.dropdown ? 'links' : 'links collapseLinks'
      }
    >
      {section.links.map((link) => (
        <li
          onClick={() => { if (link.comingsoon === true) handleClick(); }}
          key={link.name}
          className={active === link.name ? 'active' : ''}
        >
          <Link href={link.url}>
            <span className="link">{link.name}</span>
          </Link>
        </li>
      ))}
    </ul>
  </nav>
);

export default SidebarNav;
