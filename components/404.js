import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';

const NavItem = ({ href, text }) => (
  <div className="link-404">
    <Link href={href} className="nav-links">
      <a className="small-404-text anchor-404">{text}</a>
    </Link>
  </div>
);

const NotFound = function () {
  const router = useRouter();
  // Redirects to homepage after 3 sec.
  useEffect(() => {
    const timer = setTimeout(() => {
      router.push('/');
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section id="not-found">
      <div className="wrap-inner-text">
        <div>
          <div className="large-404-text">Oops!</div>
          <p className="mid-404-text">
            Umm, you are not supposed to be here, human. But, Its ok, we are
            here to help guide lost minorities :)
          </p>
          <p
            className="small-404-text"
            style={{ marginBottom: '0.5rem', fontWeight: 'bold' }}
          >
            Error code: 404
          </p>
          <p className="small-404-text">Here are a few helpful links: </p>
          <div>
            <NavItem href="/" text="Home" />

            <NavItem href="/learn-page" text="Learn" />

            <NavItem href="/events" text="Events" />

            <NavItem href="/consultancy" text="Consultancy" />

            <NavItem href="/incubator" text="Incubator" />

            <NavItem href="/sponsorship" text="Sponsorship" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default NotFound;
