import React from 'react';

const IncubatorHero = function () {
  const scrollTo = () => {
    const section = document.querySelector('#all-startups');
    section.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <section className="incubator-wrapper">
      <div className="incubator-header">
        <div className="container">
          <div className="row">
            <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12">
              <img src="/assets/images/incubator-hero2.png" className="incubator__image" />
            </div>
            <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 incubator__text">
              <h1 className="incubator__title">
                  Invest directly into minority innovations.
                                </h1>
              <div className="incubator__button">
                  <div onClick={scrollTo} className="button btn-gradient">
                            View Startups
                                    </div>
                </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
export default IncubatorHero;
