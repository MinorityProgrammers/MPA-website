import React from 'react';

const Footer = () => {
  function scrollTop() {
    window.scrollTo(0, 0);
  }

  return (
    <div>
      <footer className="site-footer">
        <div className="site-footer__upper">
          <div className="container">
            <div className="row justify-content-between">
              <div className="col-xl-3 col-lg-6 col-sm-12">
                <div className="footer-widget footer-widget__contact">
                  <h2 className="footer-widget__title text-white">Services</h2>
                  <div className="footer-widget__link-wrap">
                    <ul className="list-unstyled footer-widget__link-list">
                      <li>
                        <a href="/consultancy">Consultancy</a>
                      </li>
                      <li>
                        <a href="/mentorship">Mentorship</a>
                      </li>
                      <li>
                        <a href="/incubator">Incubator</a>
                      </li>
                      <li>
                        <a href="/learn-page">Learn</a>
                      </li>
                      <li>
                        <a
                          href="https://www.defisummer.org"
                          target="_blank"
                          rel="noreferrer"
                        >
                          DefiSummer
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="col-xl-3 col-lg-6 col-sm-12">
                <div className="footer-widget footer-widget__link">
                  <h2 className="footer-widget__title text-white">Explore</h2>
                  <div className="footer-widget__link-wrap">
                    <ul className="list-unstyled footer-widget__link-list">
                      <li>
                        <a href="/">About</a>
                      </li>
                      <li>
                        <a href="/events">Events</a>
                      </li>
                      <li>
                        <a href="/partner">Partner</a>
                      </li>
                      <li>
                        <a href="/careers">Careers</a>
                      </li>
                      <li>
                        <a href="/sponsorship">Sponsorship</a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="col-xl-3 col-lg-6 col-sm-12 footerbout">
                <div className="footer-widget footer-widget__about">
                  <h2 className="footer-widget__title text-white">About</h2>
                  <p className="footer-widget__text">
                    We are an international network of programmers unifying
                    together to deliver socially impactful software solutions.
                  </p>
                  <div className="footer-widget__btn-block">
                    <a href="/join" className="thm-btn">
                      Join
                    </a>
                    <a href="/learn-page" className="thm-btn">
                      Learn
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="site-footer__bottom">
          <div className="row justify-content-center">
            <div
              onClick={scrollTop}
              className="scroll-to-target site-footer__scroll-top"
            >
              <i className="kipso-icon-top-arrow" />
            </div>
          </div>
          <div className="container">
            <div className="site-footer__social">
              <a
                href="https://www.facebook.com/MinorityProgrammers"
                target="_blank"
                rel="noreferrer"
              >
                <i className="fab fa-facebook-square" />
              </a>
              <a
                href="https://www.instagram.com/minorityprogrammers/"
                target="_blank"
                rel="noreferrer"
              >
                <i className="fab fa-instagram" />
              </a>
              <a
                href="https://github.com/MinorityProgrammers/"
                target="_blank"
                rel="noreferrer"
              >
                <i className="fab fa-github" />
              </a>
              <a
                href="https://www.reddit.com/r/MinorityProgrammers"
                target="_blank"
                rel="noreferrer"
              >
                <i className="fab fa-reddit-alien" />
              </a>
              <a
                href="https://medium.com/minority-programmers"
                target="_blank"
                rel="noreferrer"
              >
                <i className="fab fa-medium-m" />
              </a>
              <a
                href="https://twitter.com/minorityprogram"
                target="_blank"
                rel="noreferrer"
              >
                <i className="fab fa-twitter" />
              </a>
              <a
                href="https://youtube.com/c/minorityprogrammers"
                target="_blank"
                rel="noreferrer"
              >
                <i className="fab fa-youtube" />
              </a>
              <a
                href="https://linkedin.com/company/minority-programmers/"
                target="_blank"
                rel="noreferrer"
              >
                <i className="fab fa-linkedin" />
              </a>
              <a
                href="https://linktr.ee/MinorityProgrammers"
                target="_blank"
                rel="noreferrer"
              >
                <i className="fas fab fa-link" />
              </a>
            </div>
          </div>
          <div className="site-footer__copy row justify-content-center">
            &copy; Copyright
            &nbsp;
            {new Date().getFullYear()}
            {' '}
            by
            {' '}
            <a href="#">Minority Programmers Association</a>
          </div>
        </div>
      </footer>
      <div className="search-popup">
        <div className="search-popup__overlay custom-cursor__overlay search-overlay" />
        <div className="search-popup__inner">
          <form action="#" className="search-popup__form">
            <input
              type="text"
              name="search"
              placeholder="Type here to Search...."
            />
            <button type="submit">
              <i className="kipso-icon-magnifying-glass" />
            </button>
            <div className="cancel">
              <i className="fas fa-times-circle" />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Footer;
