import React from 'react';

const InternshipHero = function () {
  const scrollTo = () => {
    const section = document.querySelector('#all-startups');
    section.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <section className="incubator-wrapper">
      <div className="internship-header">
        <div className="container ">
          <div className="incubator__text mtb-mpa">
            <div>
              <h1 className="display-4 font-weight-bold  d-flex justify-content-start">
                      MPA’s Internship Program
                                </h1>
              <p className="d-flex justify-content-center h5">Gain work experience with the latest technologies and grow as a highly qualified professional in an intensive 3-month internship program </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InternshipHero;
