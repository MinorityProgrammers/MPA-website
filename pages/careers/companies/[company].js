import { useRouter } from 'next/router';
import React, { useEffect, useRef, useState } from 'react';
import ArrowLeftIconSvg from '../../../components/career-components/svgs/ArrowLeftIconSvg';
import CheckIconSvg from '../../../components/career-components/svgs/CheckIconSvg';
import ExternalLinkSquareIconSvg from '../../../components/career-components/svgs/ExternalLinkSquareIconSvg';
import FacebookSquareIconSvg from '../../../components/career-components/svgs/FacebookSquareIconSvg';
import InstagramIconSvg from '../../../components/career-components/svgs/InstagramIconSvg';
import TwitterIconSvg from '../../../components/career-components/svgs/TwitterIconSvg';
import ComingSoon from '../../../components/ComingSoon';
import Footer from '../../../components/Footer';
import HomepageNav from '../../../components/homepage/HomepageNav';
import Layout from '../../../components/Layout';
import SidebarTwo from '../../../components/SidebarTwo';
import { useDetectOutsideClick } from '../../../components/UseDetectOutsideClick';
import links from '../../../contexts/utils/links';

const CompanyDetails = ({ id }) => {
  const [company, setCompany] = useState([]);
  const [loading, setLoading] = useState(false);

  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);
  const [hide, setHide] = useDetectOutsideClick(dropdownRef, true);

  const handleClick = () => {
    setHide(!hide);
  };
  if (hide === false) {
    setTimeout(() => {
      setHide(true);
    }, 10000);
  }

  const fetchCompany = () => {
    setLoading(true);
    fetch(`${process.env.BASE_URI}/company/${id}`)
      .then((response) => response.json())
      .then((response) => {
        setCompany(response.data);
        setTimeout(() => {
          setLoading(false);
        }, 500);
      });
  };

  useEffect(() => {
    fetchCompany();
  }, []);

  const router = useRouter();

  function goBack() {
    router.back();
  }

  return (
    <Layout>
      <HomepageNav open={open} setOpen={setOpen} page="Company" />
      <SidebarTwo
        open={open}
        setOpen={setOpen}
        links={links}
        active="Home"
        handleClick={handleClick}
      />
      {hide === false && <ComingSoon closeClick={handleClick} />}
      <div className="companyDetails">
        <div className="companyDetails-wrapper tw-mt-10">
          <div className="companyDetails-container-nav">
            <a href="/careers/companies">
              <ArrowLeftIconSvg />
              <span>Back to companies</span>
            </a>
          </div>

          <div className="companyDetails-container">
            <div className="companyDetails-container-info">
              <h2 className="companyDetails-container-info-name">
                {company.company_name}
              </h2>
              <div className="companyDetails-container-info-relationship">
                <strong>{company.relation_type}</strong>
                {' '}
                of Minority Programmers
                Association since
                {' '}
                <strong>
                  {new Date(company.mpa_relationship_started)
                    .toDateString()
                    .substr(3)}
                </strong>
              </div>
              <div className="companyDetails-container-info-extra">
                <div className="companyDetails-container-info-extra-links">
                  <a className="companyDetails-container-info-extra-links-btn">
                    <button type="button">
                      Visit Website
                      <ExternalLinkSquareIconSvg />
                    </button>
                  </a>
                  <div className="companyDetails-container-info-extra-links-social">
                    <a
                      href={
                        company.social_media_links
                          ? company.social_media_links[0].fb
                          : ''
                      }
                    >
                      <FacebookSquareIconSvg />
                    </a>
                    <a>
                      <InstagramIconSvg />
                    </a>
                    <a>
                      <TwitterIconSvg />
                    </a>
                  </div>
                  <div className="companyDetails-container-info-extra-links-info">
                    <span>{company.headquarters}</span>
                    <span>
                      Since:
                      {new Date(company.started_at).toDateString().substr(3)}
                    </span>
                  </div>
                </div>
                <div className="companyDetails-container-info-extra-logo">
                  <div className="companyDetails-container-info-extra-logo-img">
                    Logo
                  </div>
                  <div className="companyDetails-container-info-extra-logo-size">{`${company.size_company} Employees`}</div>
                </div>
              </div>
            </div>

            <div className="companyDetails-container-diversity">
              Diversity Visualization TBD
            </div>
            <div className="companyDetails-container-specialties">
              <h3>Specialties</h3>
              <div className="companyDetails-container-specialties-list">
                {company.specialties
                  ? company.specialties.map((specialty, idx) => (
                    <div key={idx}>
                      <CheckIconSvg />
                      <div>{specialty}</div>
                    </div>
                  ))
                  : ''}
              </div>
            </div>
            <div className="companyDetails-container-description">
              <h3 className="companyDetails-container-description-title">
                About
              </h3>
              <p className="companyDetails-container-description-paragraph">
                {company.company_description}
              </p>
            </div>
            <div className="companyDetails-container-type">
              <strong>Company Type: </strong>
              {company.type_company}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </Layout>
  );
};

CompanyDetails.getInitialProps = async ({ query }) => ({
  id: query.id,
});

export default CompanyDetails;
