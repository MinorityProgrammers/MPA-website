import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import CareersMainComponent from "../../components/career-components/CareersMainComponent";
import CompanySkeleton from "../../components/career-components/CompanyLoadingSkeleton";
import MP_IconSvg from "../../components/career-components/svgs/MP_IconSvg";

export async function getServerSideProps(context) {
  return {
    props: {
      query: context.query,
    },
  };
}

const CompaniesMain = (props) => {
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);
  const nameRef = useRef();
  const diversityScoreRef = useRef();
  const locationRef = useRef();

  const fetchCompanies = () => {
    fetch("https://koinstreet-learn-api.herokuapp.com/api/v1/company")
      .then((response) => response.json())
      .then((response) => {
        setCompanies(response.data);
        setTimeout(() => {
          setLoading(false);
        }, 1000);
      });
  };

  useEffect(() => {
    fetchCompanies();
  }, []);

  const router = useRouter();
  let companyLoadingSkeleton;

  const companyStubs = companies.map((company) => (
    <a href={`/careers/companies/company?id=${company._id}`} key={company._id}>
      <div className="company-stub" key={company.id}>
        <div className="company-stub-box1">
          <div className="company-stub-box1-logo">
            <MP_IconSvg />
          </div>
          <div className="company-stub-box1-location">
            {company.headquarter}
          </div>
          <div className="company-stub-box1-createdDate">
            {new Date(company.started_at).toDateString().substr(3)}
          </div>
        </div>
        <div className="company-stub-box2">
          <div className="company-stub-box2-name">{company.company_name}</div>
          <div className="company-stub-box2-size">{`(${company.size_company} Employees)`}</div>
          <div className="company-stub-box2-description">
            {company.company_description}
          </div>
        </div>
        <div className="company-stub-box3">
          <div className="company-stub-box3-diversity">
            <span>Diversity Score</span>
            <div className="company-stub-box3-diversity-score">{`${company.diversity_score}/10`}</div>
          </div>
        </div>
      </div>
    </a>
  ));

  const totalCount = 102;
  const perPage = 10;
  const totalPages = Math.ceil(102 / perPage); // 11

  function makePages() {
    const totPages = totalPages;

    const queryObj = { ...props.query };
    const { page } = queryObj;
    const pageArray = [];

    if (page) {
      pageArray.push(page);

      // push page to first placeholder if page number is greater than 1 and there are more than one pages
      if (page > 1) {
        pageArray.unshift(1);
      }

      // push page to second placeholder if page number is less than the last page
      if (page < totPages) {
        pageArray.push(totPages);
      }
    } else {
      pageArray.push(1);
      if (totPages > 1) {
        pageArray.push(totPages);
      }
    }
    return pageArray.map((page) => {
      let currPage;
      if (!props.query.page) {
        currPage = 1;
      } else {
        currPage = props.query.page;
      }

      return (
        <a key={page} style={currPage == page ? { background: "#151371" } : {}}>
          <button
            style={currPage == page ? { color: "white" } : {}}
            onClick={() => pageSelector(page)}
          >
            {page}
          </button>
        </a>
      );
    });
  }

  function pageSelector(page) {
    console.log(page);
    const queryObj = { ...props.query };
    if (page == 1 && queryObj.page) {
      delete queryObj.page;
    } else if (page != 1) {
      queryObj.page = page;
    }

    router.push({ query: queryObj });
  }

  function nextButton() {
    const queryObj = { ...props.query };
    if (!queryObj.page) {
      queryObj.page = 2;
    } else {
      queryObj.page = Number(queryObj.page) + 1;
      console.log(typeof queryObj.page);
    }

    router.push({ query: queryObj });
  }

  function prevButton() {
    console.log("prev");
    const queryObj = { ...props.query };
    if (queryObj.page == 2) {
      delete queryObj.page;
    } else {
      queryObj.page = Number(queryObj.page) - 1;
    }

    router.push({ query: queryObj });
  }

  const formSubmit = (e) => {
    e.preventDefault();
    const queryObj = {};
    let blank = true;
    if (nameRef.current.value) {
      queryObj.company = nameRef.current.value;
      blank = false;
      setCompanies(
        companies.filter((company) =>
          company.company_name.toLowerCase().includes(nameRef.current.value)
        )
      );
    }

    if (diversityScoreRef.current.value) {
      queryObj.score = diversityScoreRef.current.value;
      blank = false;
      setCompanies(
        companies.filter(
          (company) =>
            company.diversity_score == diversityScoreRef.current.value
        )
      );
    }

    if (locationRef.current.value) {
      queryObj.location = locationRef.current.value;
      blank = false;
      setCompanies(
        companies.filter((company) =>
          company.headquarter.toLowerCase().includes(locationRef.current.value)
        )
      );
    }

    if (!blank) {
      router.push({ query: queryObj });
    } else {
      delete queryObj.company;
      delete queryObj.score;
      delete queryObj.location;
      router.push({ query: queryObj });
      fetchCompanies();
    }
  };

  return (
    <CareersMainComponent>
      <div className="companiesMain">
        <div className="companiesMain-search">
          <h2 className="companiesMain-search-heading">Search For Companies</h2>
          <form
            className="companiesMain-search-inputs"
            action="/careers/companies"
            onSubmit={(e) => formSubmit(e)}
          >
            <input
              name="company_name"
              type="search"
              placeholder="Search by Name"
              ref={nameRef}
            />
            <input
              name="diversity_score"
              type="search"
              placeholder="Diversity Score"
              ref={diversityScoreRef}
            />
            <input
              name="location"
              type="search"
              placeholder="City, State, or Zip Code"
              ref={locationRef}
            />
            <button type="submit">Search</button>
          </form>
        </div>
        <div className="companies-main-container">
          {/* LOADING SKELETON HERE */}
          {loading ? (
            <>
              <CompanySkeleton />
              <CompanySkeleton />
              <CompanySkeleton />
              <CompanySkeleton />
            </>
          ) : (
            <>
              <div className="companiesMain-options">
                <div>{`${companies.length} Results`}</div>
                <div className="companiesMain-options-sort">
                  <span>Sort by:</span>
                  <select>
                    <option>Newest</option>
                  </select>
                </div>
              </div>
              <div>
                {companyStubs}
                <div className="jobs-paginator">
                  <a>
                    <button
                      className="jobs-paginator-btn"
                      disabled={!props.query.page}
                      onClick={prevButton}
                    >
                      {"<"}
                    </button>
                  </a>
                  <div className="jobs-paginator-numbers">{makePages()}</div>
                  <a>
                    <button
                      className="jobs-paginator-btn"
                      disabled={props.query.page == totalPages}
                      onClick={nextButton}
                    >
                      {">"}
                    </button>
                  </a>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </CareersMainComponent>
  );
};

export default CompaniesMain;
