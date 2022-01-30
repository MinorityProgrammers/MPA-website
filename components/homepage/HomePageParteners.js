import React, { useState } from 'react';
import { allies, sponsors } from './testimonialSectionData';

const HomePageParteners = () => {
  const [active, setActive] = useState({ parteners: true, allies: false });
  const [index, setIndex] = useState(8);
  return (
    <section className="homepage__partners tw-pb-28">
      <div className="container tw-text-white">

        <div className="row">
          <div className="col-lg-6" style={{ padding: '0' }}>
            <div className="allies-header" onClick={() => setActive({ parteners: true, allies: false })}>
              <h2 className={`top__part__title ${active.parteners ? '' : 'inactive'}`}>Our Partners</h2>
              <div className={`line ${active.parteners ? 'line-active' : ''}`} />
            </div>
          </div>
          <div className="col-lg-6" style={{ padding: '0' }}>
            <div className="allies-header" onClick={() => setActive({ parteners: false, allies: true })}>
              <h2 className={`top__part__title ${active.allies ? '' : 'inactive'}`}>Allies</h2>
              <div className={`line ${active.allies ? 'line-active' : ''}`} />

            </div>

          </div>
        </div>
        <div className="row">
          <div className="col-lg-6">
            <div>
              <h3 className="tw-text-4xl rw tw-mb-6 tw-mt-10 tw-font-bold tw-text-white">Partner with MPA</h3>
              <p className="tw-text-2xl rw-my-5">
                If your goal is to Invest in Minority Startup, or hire talent
                to build your product and more, consider partnering with us.
              </p>
              <a className="btn-become-partner" href="">Become a partner</a>
            </div>

          </div>
          <div className="col-lg-6 tw-mt-10">
            <div className="row">
              {active.parteners && sponsors.slice(0, index).map((sponsor, i) => (
                <div
                  className="col-lg-3 col-md-4 sponsor-col"
                  key={`${`sponsor${i}`}`}
                >
                  <a
                    href={sponsor.sponsorLink}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <div className="item sponsor-item">
                      <img src={sponsor.imgSrc} alt={sponsor.sponsorLink} />
                    </div>
                  </a>
                </div>
              ))}
              {active.allies && allies.slice(0, index).map((sponsor, i) => (
                <div
                  className="col-lg-3 col-md-4 sponsor-col"
                  key={`${`sponsor${i}`}`}
                >
                  <a
                    href={sponsor.sponsorLink}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <div className="item sponsor-item">
                      <img src={sponsor.imgSrc} alt={sponsor.sponsorLink} />
                    </div>
                  </a>
                </div>
              ))}
            </div>
            <p className="tw-text-xl see-all" onClick={() => setIndex(index === 8 ? sponsors.length : 8)}>
              <div className="see-all__line" />
              See
              {index === 8 ? ' All' : ' Less'}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomePageParteners;
