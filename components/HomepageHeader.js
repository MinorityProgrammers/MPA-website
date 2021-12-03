import React from "react";

const HomepageHeader = () => {
  return (
    <>
      <section className="homepage__hero">
        <div className="container">
          <div className="hero__item">
            <h1 className="hero__title text_white">
              Minority programmers association
            </h1>
            <h3 className="hero__subtitle text_white">
              Code, Culture, and Community.
            </h3>
            <div className="hero__button">
              <a href="/join" className="btn__homepage btn-hero">
                Join
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default HomepageHeader;
