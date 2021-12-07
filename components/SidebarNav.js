import Link from 'next/link';
import { RiArrowDropDownLine, RiArrowDropUpLine } from 'react-icons/ri';

const SidebarNav = function ({
  section,
  active,
  collapse,
  setCollapse,
  handleClick,
}) {
  return (
    <nav className="sidebarNav">
      {section.dropdown ? (
        <div
          className="dropdownHeader"
          onClick={() => setCollapse(!collapse)}
        >
          <h3 className="dropdownTitle">{section.title}</h3>
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
              !collapse || !section.dropdown
                ? 'links'
                : 'links collapseLinks'
            }
      >
        {section.links.map((link) => (
          <li
            onClick={handleClick}
            key={link.name}
            className={active == link.name ? 'active' : ''}
          >
            <Link href={link.url}>
              <a>
                <span className="link">{link.name}</span>
              </a>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default SidebarNav;
