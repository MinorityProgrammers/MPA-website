import React from "react";
import styles from "./footer.module.css";

const Footer = () => {
  return (
    <div className={styles.footer}>
      <footer className="">
        <div className="">
          <div className="container">
            <div className="row">
              <div className="col-xl-3 col-lg-6 col-sm-12">
                <div className="footer-widget footer-widget__contact">
                  <h2 className="footer-widget__title">Services</h2>
                  <div className="footer-widget__link-wrap">
                    <ul
                      id={styles.white_link}
                      className="list-unstyled footer-widget__link-list"
                    >
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
                        <a href="learn#mpu">Learn</a>
                      </li>
                      <li>
                        <a href="https://www.defisummer.org" target="_blank">
                          DefiSummer
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="col-xl-3 col-lg-6 col-sm-12">
                <div className="footer-widget footer-widget__link">
                  <h2 className="footer-widget__title">Explore</h2>
                  <div className="footer-widget__link-wrap">
                    <ul
                      className={`list-unstyled footer-widget__link-list`}
                      id={styles.white_link}
                    >
                      <li>
                        <a href="/">About</a>
                      </li>
                      <li>
                        <a href="/events">Events</a>
                      </li>
                      <li>
                        <a href="/learn">Join a Course</a>
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

              <div className="col-xl-3 col-lg-6 col-sm-12">
                <div className="footer-widget">
                  <h2 className="footer-widget__title">About</h2>
                  <p className={styles.text_white}>
                    We are an international network of programmers unifying
                    together to deliver socially impactful software solutions.
                  </p>
                  <div className="footer-widget__btn-block">
                    <a href="/join" className={styles.button1}>
                      Join
                    </a>
                    <a href="/learn" className={styles.button2}>
                      Learn
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* <div className="">
          <div className="container">
            <p className="site-footer__copy">
              &copy; Copyright 2021 by{" "}
              <a href="#">Minority Programmers Association</a>
            </p>
          </div>
        </div> */}
      </footer>

      {/* <div className="search-popup">
        <div className="search-popup__overlay custom-cursor__overlay search-overlay"></div>
        <div className="search-popup__inner">
          <form action="#" className="search-popup__form">
            <input
              type="text"
              name="search"
              placeholder="Type here to Search...."
            />
            <button type="submit">
              <i className="kipso-icon-magnifying-glass"></i>
            </button>
            <div className="cancel">
              <i className="fas fa-times-circle"></i>
            </div>
          </form>
        </div>
      </div> */}
    </div>
  );
};
export default Footer;
