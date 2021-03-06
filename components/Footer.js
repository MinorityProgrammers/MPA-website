import React from 'react';
import Link from 'next/link';
import Account from './Account';
import {
  Discord, Link as LinkSvg, Linkedin, Medium, Youtube, Facebook, Instgram, Github, Twitter,
} from './FooterIcons';

const Footer = () => (
  <div>
    <footer className="site-footer">
      <div className="site-footer__upper">
        <div className="container">
          <div className="row justify-content-between">
            <div className="col-xl-6 col-lg-6 col-sm-12 footerbout">
              <div className="footer-widget footer-widget__about">
                <p className="footer-widget__text">
                  Join the minority wave Connnect
                  <br />
                  to jump start your career in web3
                </p>
                <div className="footer-widget__btn-block">
                  <Account />
                </div>
              </div>
            </div>
            <div className="col-xl-2 col-lg-2 col-sm-12">
              <div className="footer-widget footer-widget__contact">
                <div className="footer-widget__link-wrap">
                  <ul className="list-unstyled footer-widget__link-list">
                    <li>
                      <h2 className="footer-widget__title text-white">Services</h2>
                    </li>
                    <li>
                      <Link href="/consultancy_explainer">
                        <a>
                          Consultancy
                        </a>
                      </Link>
                    </li>
                    <li>
                      <Link href="/mentorshipProgram">
                        <a>
                          Mentorship
                        </a>
                      </Link>
                    </li>

                    <li>
                      <Link href="/incubator">
                        <a>
                          Incubator
                        </a>
                      </Link>
                    </li>
                    <li>
                      <Link href="/learn-page">
                        <a>Learn</a>
                      </Link>
                    </li>
                    <li>
                      <a
                        href="https://www.defisummer.org/"
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

            <div className="col-xl-2 col-lg-2 col-sm-12">
              <div className="footer-widget footer-widget__link">
                <div className="footer-widget__link-wrap">
                  <ul className="list-unstyled footer-widget__link-list">
                    <li>
                      <h2 className="footer-widget__title text-white">Explore</h2>
                    </li>
                    <li>
                      <Link href="/careers">
                        <a>Careers</a>
                      </Link>
                    </li>
                    <li>
                      <Link href="/">
                        <a>Partnership</a>
                      </Link>
                    </li>
                    <li>
                      <Link href="/events">
                        <a>Events</a>
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="col-xl-2 col-lg-2  col-sm-12">
              <div className="footer-widget footer-widget__link">
                <div className="footer-widget__link-wrap">
                  <ul className="list-unstyled footer-widget__link-list">
                    <li>
                      <h2 className="footer-widget__title text-white">Quick Links</h2>
                    </li>
                    <li>
                      <a href="https://snapshot.org/#/minorityprogrammers.eth" target="_blank" rel="noreferrer">The Dao</a>
                    </li>
                    <li>
                      <a href="https://www.genadrop.com/" target="_blank" rel="noreferrer">GenaDrop</a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

          </div>
          <div className="row">
            <div className="col-lg-6" />
            <div className="col-lg-6 col-sm-12" style={{ margin: '30px 0' }}>
              <div className="site-footer__social">
                <a
                  href="https://linktr.ee/MinorityProgrammers"
                  target="_blank"
                  rel="noreferrer"
                >
                  <LinkSvg />
                </a>
                <a
                  href="https://twitter.com/minorityprogram"
                  target="_blank"
                  rel="noreferrer"
                >
                  <Twitter />
                </a>
                <a
                  href="https://github.com/MinorityProgrammers/"
                  target="_blank"
                  rel="noreferrer"
                >
                  <Github />
                </a>

                <a
                  href="https://www.facebook.com/MinorityProgrammers"
                  target="_blank"
                  rel="noreferrer"
                >
                  <Facebook />
                </a>
                <a
                  href="https://www.instagram.com/minorityprogrammers/"
                  target="_blank"
                  rel="noreferrer"
                >
                  <Instgram />
                </a>
                <a
                  href="https://discord.com/invite/4vdtmQqz6d"
                  target="_blank"
                  rel="noreferrer"
                >
                  <Discord />
                </a>
                <a
                  href="https://linkedin.com/company/minority-programmers/"
                  target="_blank"
                  rel="noreferrer"
                >
                  <Linkedin />
                </a>
                <a
                  href="https://medium.com/minority-programmers"
                  target="_blank"
                  rel="noreferrer"
                >
                  <Medium />
                </a>
                <a
                  href="https://youtube.com/c/minorityprogrammers"
                  target="_blank"
                  rel="noreferrer"
                >
                  <Youtube />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="site-footer__bottom">
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

export default Footer;
