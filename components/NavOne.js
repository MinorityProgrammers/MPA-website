import React, { Component } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import Modal from "../components/login-signup/modal/index";

class NavOne extends Component {
  constructor() {
    super();
    this.state = {
      sticky: false,
      displayModal: false,
    };
  }
  componentDidMount() {
    window.addEventListener("scroll", this.handleScroll);

    //Mobile Menu
    this.mobileMenu();

    //Search Toggle
    this.serachButton();
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
  }

  handleScroll = () => {
    if (window.scrollY > 70) {
      this.setState({
        sticky: true,
      });
    } else if (window.scrollY < 70) {
      this.setState({
        sticky: false,
      });
    }
  };

  mobileMenu = () => {
    //Mobile Menu Toggle
    let mainNavToggler = document.querySelector(".menu-toggler");
    let mainNav = document.querySelector(".main-navigation");

    mainNavToggler.addEventListener("click", function () {
      mainNav.style.display =
        mainNav.style.display != "block" ? "block" : "none";
    });
  };

  serachButton = () => {
    let searchToggle = document.querySelector(".search-toggle");
    let searchPopup = document.querySelector(".search-popup");
    let searchClose = document.querySelector(".cancel");
    let searchOverlay = document.querySelector(".search-overlay");

    // searchToggle.addEventListener("click", function () {
    //     searchPopup.classList.add('active');
    // });

    searchClose.addEventListener("click", function () {
      searchPopup.classList.remove("active");
    });

    searchOverlay.addEventListener("click", function () {
      searchPopup.classList.remove("active");
    });
  };

  render() {
    return (
      <header className="site-header site-header__header-one ">
        <nav
          className={`navbar navbar-expand-lg navbar-light header-navigation stricky ${
            this.state.sticky ? "stricked-menu stricky-fixed" : ""
          }`}
        >
          <div className="container clearfix">
            <div className="logo-box clearfix">
              <Link href="/">
                <a className="navbar-brand">
                  <img
                    src="/assets/images/mp_gradient_rock.svg"
                    className="main-logo"
                    width="128"
                    alt="MPA Logo"
                  />
                </a>
              </Link>
              <div className="header__social">
                <a href="https://twitter.com/minorityprogram">
                  <i className="fab fa-twitter"></i>
                </a>
                <a href="https://www.facebook.com/MinorityProgrammers">
                  <i className="fab fa-facebook-square"></i>
                </a>
                <a href="https://linkedin.com/company/minority-programmers/">
                  <i className="fab fa-linkedin"></i>
                </a>
                <a href="https://www.instagram.com/minorityprogrammers/">
                  <i className="fab fa-instagram"></i>
                </a>
              </div>
              <button className="menu-toggler">
                <span className="kipso-icon-menu"></span>
              </button>
            </div>
            <div className="main-navigation">
              <ul className=" navigation-box">
                {/* <li id="about-nav" className="">
                                    <Link href="/"><a>About</a></Link>
                                    <ul className="sub-menu">
                                        <li><Link href="#our-story"><a>Our Story</a></Link></li>
                                        <li><Link href="#mission"><a>Mission</a></Link></li>
                                        <li><Link href="#vision"><a>Vision</a></Link></li>
                                        <li><Link href="#team"><a>Meet The Team</a></Link></li>
                                    </ul>
                                </li> */}

                <li id="services-nav">
                  <a href="/services">Services</a>
                  <ul className="sub-menu">
                    {/* <li><Link href="/services#consultancy"><a>Consultancy</a></Link></li>
                                        <li><Link href="/services#education"><a>Education</a></Link></li>
                                        <li><Link href="/services#training"><a>Training</a></Link></li>
                                        <li><Link href="/services#onboarding"><a>Onboarding</a></Link></li> */}
                  </ul>
                </li>
                {/* <li id="services-nav">
                                    <a>Core Principles</a>
                                    <ul className="sub-menu">
                                        <li><Link href="/principle-diversity"><a>Diversity in STEM</a></Link></li>
                                        <li><Link href="/services#education"><a>Software Engineering</a></Link></li>
                                        <li><Link href="/services#training"><a>Interdisciplinary Learning</a></Link></li>
                                        <li><Link href="/services#onboarding"><a>Project Based Learning</a></Link></li> 
                                        <li><Link href="/services#consultancy"><a>Activating Passions</a></Link></li>
                                        <li><Link href="/services#education"><a>Training/Onboarding</a></Link></li>
                                        <li><Link href="/services#training"><a>Job Placement</a></Link></li>
                                        <li><Link href="/services#onboarding"><a>Entrepreneurship</a></Link></li> 
                                        <li><Link href="/services#consultancy"><a>Innovation</a></Link></li>
                                        <li><Link href="/services#education"><a>Professional Development</a></Link></li>
                                        <li><Link href="/services#training"><a>Sense of Community</a></Link></li>
                                        <li><Link href="/services#onboarding"><a>Mentorship</a></Link></li> 
                                        <li><Link href="/services#onboarding"><a>Humanitarian Focused</a></Link></li> 
                                    </ul>
                                </li> */}
                <li id="events-nav">
                  <Link href="/events">
                    <a>Events</a>
                  </Link>
                  {/* <ul className="sub-menu">
                                        <li><Link href="/events#lectures"><a>Lectures</a></Link></li>
                                        <li><Link href="/events#workshops"><a>Workshops</a></Link></li>
                                        <li><Link href="/events#hackathons"><a>Hackathons</a></Link></li>
                                        <li><Link href="/events#incubator"><a>Incubators</a></Link></li>
                                        <li><Link href="/events#accelerator"><a>Accelerators</a></Link></li>
                                        <li><Link href="/events#conferences"><a>Conferences</a></Link></li>
                                    </ul> */}
                </li>
                <li id="learn-nav">
                  <Link href="/learn">
                    <a>Learn</a>
                  </Link>
                  <ul className="sub-menu">
                    {/* <li><Link href="/learn#codecamp"><a>CodeCamp</a></Link>
                                            <ul className="sub-menu">
                                                <li><Link href="/teacher-details"><a>Blockchain</a></Link></li>
                                                <li><Link href="/become-teacher"><a>Full-Stack</a></Link></li>
                                                <li><Link href="/become-teacher"><a>Web-Development</a></Link></li>
                                            </ul>
                                        </li> */}
                    {/* <li><Link href="/learn#codecamp"><a>MinorityCodeCamp</a></Link></li>
                                        <li><Link href="/learn#mpu"><a>MPUniversity</a></Link></li> */}
                  </ul>
                </li>
                <li id="join-nav">
                  <Link href="/join">
                    <a>Join</a>
                  </Link>
                  <ul className="sub-menu">
                    {/* <li><Link href="/join#network"><a>Join Network</a></Link></li> */}
                    {/* <li><Link href="/join#chapter"><a>Join/Start Chapter</a></Link></li>
                                        <li><Link href="/join#mentoring"><a>Mentoring</a></Link></li>
                                        <li><Link href="/join#careers"><a>Careers</a></Link></li>
                                        <li><Link href="/join#partner"><a>Sponsor/Partner</a></Link></li> */}
                  </ul>
                </li>
              </ul>
            </div>
            <div className="right-side-box">
              <a
                href="https://discord.gg/zGBrEd7UCn"
                target="_blank"
                className="header__search-btn search-popup__toggler search-toggle"
              >
                <i className="kipso-icon-human-resources"></i>
              </a>
            </div>
          </div>
        </nav>
        <div className="site-header__decor">
          <div className="site-header__decor-row">
            <div className="site-header__decor-single">
              <div className="site-header__decor-inner-1"></div>
            </div>
            <div className="site-header__decor-single">
              <div className="site-header__decor-inner-2"></div>
            </div>
            <div className="site-header__decor-single">
              <div className="site-header__decor-inner-3"></div>
            </div>
          </div>
        </div>
      </header>
    );
  }
}

export default NavOne;
