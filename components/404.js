import React, { useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

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
            <div className="link-404">
              <Link href="/" className="nav-links">
                <a className="small-404-text anchor-404 ">Home</a>
              </Link>
            </div>
            <div className="link-404">
              <Link href="/learn-page" className="nav-links">
                <a className="small-404-text anchor-404">Learn</a>
              </Link>
            </div>
            <div className="link-404">
              <Link href="/events" className="nav-links">
                <a className="small-404-text anchor-404">Events</a>
              </Link>
            </div>
            <div className="link-404">
              <Link href="/consultancy" className="nav-links">
                <a className="small-404-text anchor-404">Consultancy</a>
              </Link>
            </div>
            <div className="link-404">
              <Link href="/incubator" className="nav-links">
                <a className="small-404-text anchor-404">Incubator</a>
              </Link>
            </div>
            <div className="link-404">
              <Link href="/sponsorship" className="nav-links">
                <a className="small-404-text anchor-404">Sponsorship</a>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NotFound;
