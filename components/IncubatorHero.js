import React from "react";

const IncubatorHero = () => {
  const scrollTo = () => {
    const section = document.querySelector("#all-startups");
    section.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section
      style={{
        backgroundImage: "url(/assets/images/incubator/incubator_image.png)",
        backgroundSize: "cover",
        height: "100vh",
      }}
      className="incubator-wrapper"
    >
      <div className="incubator-header">
        <div className="incubator-center">
          <div />
          <div className="incubator__text">
            <h1 className="incubator__title">Incubator</h1>
            <h2>
              Build diverse startups in a transparent and accountable way. Build
              milestone driven DAOs around the projects you have a stake in.
            </h2>
            <div className="incubator-btns">
              <div className="incubator__button">
                <button onClick={scrollTo} className="incubator-btn1">
                  Begin Creating
                </button>
              </div>
              <div className="incubator__button">
                <button onClick={scrollTo} className="incubator-btn2">
                  View Startups
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
export default IncubatorHero;
