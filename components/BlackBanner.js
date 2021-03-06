import React from 'react';

const LegalBanner = (props) => {
  const { title } = props;
  const { subtitle } = props;
  const { bannerImgLink } = props;
  return (
    <section className="vote-section">
      <div className="vote-bg">
        <div className="container vote-hero">
          <div className="vote-text">
            <h1>{title}</h1>
            <p>{subtitle}</p>
          </div>
          <div className="vote-img">
            <img src={bannerImgLink} alt="legal_picture" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default LegalBanner;
