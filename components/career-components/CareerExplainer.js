import Link from "next/link";
import { useEffect, useState, Fragment } from "react";
import classes from "../../public/assets/css/career.module.css";
import LoginPage from "../consultancy/helperFiles/login-page";
import Category from "./careerExplainerHelper/category";

function CareerExplainer({
  data,
  setClickRegister,
  active,
  clickRegister,
  navBarRef,
}) {
  const allSections = [
    {
      innerText:
        "Find the company that better fit for you according to your skills, passions,experience, etc",
      header: "Search Companies",
      src: "/assets/images/icons/career_landing/search_companies.png",
      redirectTo: "/careers/companies",
    },
    {
      innerText:
        "Diversity & Inclusion are more important than ever. The Minority Programmers Association uses a metric that lets future employees know companies' organization and which actionable items to improve their diversity & inclusion practices. As an employee of a company you can rate and provide us the Diversity Score information.",
      header: "Improve Diversity Score",
      src: "/assets/images/icons/career_landing/improve_diversity_score.png",
      redirectTo: "/careers",
    },
    {
      innerText:
        "Apply for the perfect job for you based on title, location, remote vs in-person, etc. check the recommendations based on your interests.",
      header: "Apply for Jobs",
      src: "/assets/images/icons/career_landing/apply_for_jobs.png",
      redirectTo: "/careers",
    },
  ];
  const [marginTop, setMarginTop] = useState(0);
  useEffect(() => {
    if (navBarRef.current && window) {
      let currHeight = parseInt(
        window.getComputedStyle(navBarRef.current).height
      );
      if (typeof currHeight === "number" && currHeight > marginTop)
        setMarginTop((prev) => {
          return currHeight + "px";
        });
    }
  }, []);
  return (
    <Fragment>
      <div className={classes.body}>
        <div
          className={classes.secondGradientBkg}
          style={{ paddingTop: marginTop }}
        >
          <div
            className={`${classes.largeImage} ${classes.centered} ${classes.column}`}
          >
            <article
              className={`${classes.largeImageArticle} ${classes.centered} ${classes.column}`}
            >
              <h1>Careers</h1>
              <p>
                Find a company that best fits you, see their diversity rating,
                their qualifications, and easy apply with a MPA profile.
              </p>
            </article>
          </div>
          <div className={classes.restOfBody}>
            {allSections.map((category, index) => {
              return (
                <Category
                  key={index}
                  innerText={category.innerText}
                  header={category.header}
                  src={category.src}
                  redirectTo={category.redirectTo}
                  data={data}
                  setClickRegister={setClickRegister}
                />
              );
            })}
            <div className={`${classes.category} ${classes.btnWrap}`}>
              {data === null ? (
                <button
                  onClick={() => {
                    setClickRegister(true);
                  }}
                >
                  Sign In
                </button>
              ) : <Link href="/careers/saved-jobs"><button>Verify Employment</button></Link>}

            </div>
          </div>
        </div>
      </div>
      <LoginPage
        clickRegister={clickRegister}
        setClickRegister={setClickRegister}
      />
    </Fragment>
  );
}
export default CareerExplainer;
