import React from 'react';

const MentorshipProgramHero = () => {
  const scrollTo = () => {
    const section = document.querySelector('#all-startups');
    section.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };
  return (
    <section className="incubator-wrapper">
      <div className="mentorshipP-header">
        <div className="container">
          <div className="incubator__text mtb-mpa">
            <div>
              <h1 className="font-weight-bold  d-flex justify-content-center big__font ">
                Mentorship
              </h1>
              <p className="d-flex justify-content-center h5">
                Advance your career with 1-1 mentorship through or integrated
                mentorship programs and AI matching system
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MentorshipProgramHero;
