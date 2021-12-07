import { useRouter } from 'next/router';
import { useState, useRef, useEffect } from 'react';
import CompaniesList from '../../../components/career-components/CompaniesList.json';
import Layout from '../../../components/Layout';
import Footer from '../../../components/Footer';
import HomepageNav from '../../../components/HomepageNav';
import SidebarTwo from '../../../components/SidebarTwo';
import links from '../../../contexts/utils/links';
import ComingSoon from '../../../components/ComingSoon';
import { useDetectOutsideClick } from '../../../components/UseDetectOutsideClick';

const CompanyDetails = function ({ id }) {
  const [company, setCompany] = useState([]);
  const [loading, setLoading] = useState(false);

  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);
  const [hide, setHide] = useDetectOutsideClick(dropdownRef, true);
  const handleClick = () => {
    setHide(!hide);
  };
  if (hide == false) {
    setTimeout(() => {
      setHide(true);
    }, 10000);
  }

  useEffect(() => {
    fetchCompany();
  }, []);

  const fetchCompany = () => {
    setLoading(true);
    fetch(`https://koinstreet-learn-api.herokuapp.com/api/v1/company/${id}`)
      .then((response) => response.json())
      .then((response) => {
        setCompany(response.data);
        setTimeout(() => {
          setLoading(false);
        }, 500);
      });
  };

  const router = useRouter();
  function goBack() {
    router.back();
  }

  return (
    <Layout>
      <HomepageNav open={open} setOpen={setOpen} page="Company" />
      <SidebarTwo open={open} setOpen={setOpen} links={links} active="Home" handleClick={handleClick} />
      {hide == false && <ComingSoon closeClick={handleClick} />}
      <div className="companyDetails">
        <div className="companyDetails-wrapper tw-mt-10">
          <div className="companyDetails-container-nav">
            <a href="/careers/companies">
              <svg xmlns="http://www.w3.org/2000/svg" width="51.229" height="23.136" viewBox="0 0 51.229 23.136">
                <path id="Icon_metro-arrow-left" data-name="Icon metro-arrow-left" d="M14.7,28.356l-9.64-9.64a1.928,1.928,0,0,1,0-2.727l9.64-9.64A1.928,1.928,0,0,1,17.43,9.075l-6.349,6.349H53.944a1.985,1.985,0,0,1,1.783,2.121,1.653,1.653,0,0,1-1.783,1.735H11.081l6.349,6.349A1.928,1.928,0,0,1,14.7,28.356Z" transform="translate(-4.499 -5.784)" fill="#ff00b8" />
              </svg>
              <span>Back to companies</span>
            </a>
          </div>
          <div className="companyDetails-container">

            <div className="companyDetails-container-info">
              <h2 className="companyDetails-container-info-name">{company.company_name}</h2>
              <div className="companyDetails-container-info-relationship">
                <strong>{company.relation_type}</strong>
                {' '}
                of Minority Programmers Association since 
{' '}
                <strong>{new Date(company.mpa_relationship_started).toDateString().substr(3)}</strong>
              </div>
              <div className="companyDetails-container-info-extra">
                <div className="companyDetails-container-info-extra-links">
                    <a className="companyDetails-container-info-extra-links-btn">
                        <button>
                            Visit Website
                                            <svg xmlns="http://www.w3.org/2000/svg" width="31.5" height="31.5" viewBox="0 0 31.5 31.5">
                                              <path id="Icon_awesome-external-link-square-alt" data-name="Icon awesome-external-link-square-alt" d="M31.5,5.625v24.75a3.375,3.375,0,0,1-3.375,3.375H3.375A3.375,3.375,0,0,1,0,30.375V5.625A3.375,3.375,0,0,1,3.375,2.25h24.75A3.375,3.375,0,0,1,31.5,5.625ZM25.313,6.75H17.44a1.689,1.689,0,0,0-1.193,2.881L18.5,11.88,4.747,25.628a.844.844,0,0,0,0,1.193L6.929,29a.844.844,0,0,0,1.193,0L21.87,15.255,24.119,17.5A1.689,1.689,0,0,0,27,16.311V8.438A1.687,1.687,0,0,0,25.313,6.75Z" transform="translate(0 -2.25)" fill="#fff" />
                                            </svg>
                          </button>
                      </a>
                    <div className="companyDetails-container-info-extra-links-social">
                        <a href={company.social_media_links ? company.social_media_links[0].fb : ''}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="31.5" height="31.5" viewBox="0 0 31.5 31.5">
                                <path id="Icon_awesome-facebook-square" data-name="Icon awesome-facebook-square" d="M28.125,2.25H3.375A3.375,3.375,0,0,0,0,5.625v24.75A3.375,3.375,0,0,0,3.375,33.75h9.65V23.041H8.6V18h4.43V14.158c0-4.37,2.6-6.784,6.586-6.784a26.836,26.836,0,0,1,3.9.34V12h-2.2a2.521,2.521,0,0,0-2.842,2.723V18h4.836l-.773,5.041H18.475V33.75h9.65A3.375,3.375,0,0,0,31.5,30.375V5.625A3.375,3.375,0,0,0,28.125,2.25Z" transform="translate(0 -2.25)" fill="#1778f2" />
                              </svg>
                          </a>
                        <a>
                            <svg xmlns="http://www.w3.org/2000/svg" width="31.518" height="31.511" viewBox="0 0 31.518 31.511">
                                <path id="Icon_awesome-instagram" data-name="Icon awesome-instagram" d="M15.757,9.914a8.079,8.079,0,1,0,8.079,8.079A8.066,8.066,0,0,0,15.757,9.914Zm0,13.331a5.252,5.252,0,1,1,5.252-5.252,5.262,5.262,0,0,1-5.252,5.252ZM26.051,9.584A1.884,1.884,0,1,1,24.166,7.7,1.88,1.88,0,0,1,26.051,9.584ZM31.4,11.5a9.325,9.325,0,0,0-2.545-6.6,9.387,9.387,0,0,0-6.6-2.545c-2.6-.148-10.4-.148-13,0a9.373,9.373,0,0,0-6.6,2.538,9.356,9.356,0,0,0-2.545,6.6c-.148,2.6-.148,10.4,0,13a9.325,9.325,0,0,0,2.545,6.6,9.4,9.4,0,0,0,6.6,2.545c2.6.148,10.4.148,13,0a9.325,9.325,0,0,0,6.6-2.545,9.387,9.387,0,0,0,2.545-6.6c.148-2.6.148-10.392,0-12.994ZM28.041,27.281a5.318,5.318,0,0,1-3,3c-2.074.823-7,.633-9.288.633s-7.221.183-9.288-.633a5.318,5.318,0,0,1-3-3c-.823-2.074-.633-7-.633-9.288s-.183-7.221.633-9.288a5.318,5.318,0,0,1,3-3c2.074-.823,7-.633,9.288-.633s7.221-.183,9.288.633a5.318,5.318,0,0,1,3,3c.823,2.074.633,7,.633,9.288S28.863,25.214,28.041,27.281Z" transform="translate(0.005 -2.238)" />
                              </svg>
                          </a>
                        <a>
                            <svg xmlns="http://www.w3.org/2000/svg" width="39.4" height="32" viewBox="0 0 39.4 32">
                                <path id="Icon_awesome-twitter" data-name="Icon awesome-twitter" d="M35.35,11.356c.025.35.025.7.025,1.05,0,10.675-8.125,22.975-22.975,22.975A22.819,22.819,0,0,1,0,31.756a16.7,16.7,0,0,0,1.95.1,16.172,16.172,0,0,0,10.025-3.45,8.089,8.089,0,0,1-7.55-5.6,10.183,10.183,0,0,0,1.525.125,8.541,8.541,0,0,0,2.125-.275A8.076,8.076,0,0,1,1.6,14.731v-.1a8.132,8.132,0,0,0,3.65,1.025,8.087,8.087,0,0,1-2.5-10.8,22.953,22.953,0,0,0,16.65,8.45,9.116,9.116,0,0,1-.2-1.85A8.083,8.083,0,0,1,33.175,5.931,15.9,15.9,0,0,0,38.3,3.981a8.053,8.053,0,0,1-3.55,4.45,16.188,16.188,0,0,0,4.65-1.25,17.358,17.358,0,0,1-4.05,4.175Z" transform="translate(0 -3.381)" fill="#1da1f2" />
                              </svg>
                          </a>

                      </div>
                    <div className="companyDetails-container-info-extra-links-info">
                        <span>{company.headquarters}</span>
                        <span>
                            Since:{new Date(company.started_at).toDateString().substr(3)}
                          </span>
                      </div>
                  </div>
                <div className="companyDetails-container-info-extra-logo">
                    <div className="companyDetails-container-info-extra-logo-img">Logo</div>
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

                {company.specialties ? company.specialties.map((specialty, idx) => (
                    <div key={idx}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="36" height="26.846" viewBox="0 0 36 26.846">
                            <path id="Icon_awesome-check" data-name="Icon awesome-check" d="M12.227,30.9.527,19.2a1.8,1.8,0,0,1,0-2.546L3.073,14.1a1.8,1.8,0,0,1,2.546,0L13.5,21.986,30.382,5.1a1.8,1.8,0,0,1,2.546,0L35.473,7.65a1.8,1.8,0,0,1,0,2.546l-20.7,20.7A1.8,1.8,0,0,1,12.227,30.9Z" transform="translate(0 -4.577)" fill="#151371" />
                          </svg>
                        <div>{specialty}</div>
                      </div>
                  )) : ''}

              </div>
            </div>
            <div className="companyDetails-container-description">
              <h3 className="companyDetails-container-description-title">About</h3>
              <p className="companyDetails-container-description-paragraph">{company.company_description}</p>
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
