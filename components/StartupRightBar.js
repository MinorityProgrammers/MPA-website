import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Swiper from 'react-id-swiper';
import 'swiper/css/swiper.css';
import FeaturedInfoCard from './FeaturedInfoCard';
import StartupRoadmap from './StartupRoadmap';

const StartupRightBar = function ({ data }) {
  const params = {
    loop: true,
    speed: 700,
    spaceBetween: 0,
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    autoplay: {
      delay: 3000,
      disableOnInteraction: false,
    },
    observeParents: true,
    observer: true,
    rebuildOnUpdate: true,
    breakpoints: {
      1440: {
        slidesPerView: 3,
      },
      1025: {
        slidesPerView: 2,
      },
      1024: {
        slidesPerView: 2,
      },
      768: {
        slidesPerView: 2,
      },
      640: {
        slidesPerView: 2,
      },
      320: {
        slidesPerView: 1,
      },
    },
  };

  useEffect(() => {
    fetchStartups();
  }, []);

  const fetchStartups = async () => {
    try {
      const res = await axios.get(
        `${process.env.BASE_URI}/startup/`,
      );
      const result = await res.data.data;
      setStartups(result);
    } catch (error) {
      console.log(error);
    }
  };
  const [startups, setStartups] = useState([]);
  const [hover, setHover] = useState(false);
  const [hoverRoadMap, setHoverRoadMap] = useState(-1);
  const { roadmap } = data;

  return (
    <div className="row right__container pb-5 market">
      <div className="container p-4">
        <div className="row container">
          <h2 className="right__topic mb-3 mt-1">
            About
            {data.name}
          </h2>
        </div>
        <div className="row container">
          <p className="right__description">{data.about}</p>
        </div>
        <hr className="mt-4 mb-4" />
        <div className="row container">
          <h2 className="right__topic mb-3 mt-1">Mission/Vision</h2>
        </div>
        <div className="row container">
          <p className="right__description">{data.vision}</p>
        </div>
        <div className="row container">
          <h2 className="right__topic mb-3 mt-1">Problem</h2>
        </div>
        <div className="row container">
          <p className="right__description">{data.about}</p>
        </div>
        <div className="row container">
          <h2 className="right__topic mb-3 mt-1">Solution</h2>
        </div>
        <div className="row container">
          <p className="right__description">{data.solution}</p>
        </div>
        <hr className="mt-4 mb-4" />
        <div className="row container">
          <h2 className="right__topic mb-3 mt-1">Technical Architecture</h2>
        </div>
        <div className="row container">
          <div
            className="right__description "
            style={{
              display: 'flex',
              width: '100%',
            }}
          >
            {data.frontend.length > 0 && (
            <div style={{ flex: '1' }}>
              Front-end
              {data.frontend.indexOf('React') != -1 && (
              <img src="/assets/images/incubator/react.jpeg" />
              )}
              {data.frontend.indexOf('Express') != -1 && (
              <img src="/assets/images/incubator/express.png" />
              )}
            </div>
            )}
            {data.backend.length > 0 && (
            <div style={{ flex: '1' }}>
              Back-end
              {data.backend.indexOf('MongoDB') != -1 && (
              <img src="/assets/images/incubator/mongodb.png" />
              )}
              {data.backend.indexOf('node') != -1 && (
              <img src="/assets/images/incubator/node.png" />
              )}
            </div>
            )}
            {data.uiux.length > 0 && (
            <div style={{ flex: '1' }}>
              UI/UX
              {data.uiux.indexOf('figma') != -1 && (
              <img src="/assets/images/incubator/figma.png" />
              )}
            </div>
            )}
            {data.deployment.length > 0 && (
            <div style={{ flex: '1' }}>
              Deployment
              {data.deployment.indexOf('netlify') != -1 && (
              <img src="/assets/images/incubator/netlify.png" />
              )}
            </div>
            )}
          </div>
        </div>
        <div className="row container">
          <h2 className="right__topic mb-3 mt-1">Business Model</h2>
        </div>
        <div className="row container">
          <p className="right__description">{data.business_model}</p>
        </div>
        <div className="row container">
          <h2 className="right__topic mb-3 mt-1">Revenue Streams</h2>
        </div>
        <div className="row container">
          <p className="right__description">{data.revenue_stream}</p>
        </div>
        <div className="row container">
          <h2 className="right__topic mb-3 mt-1">
            Market Size(TAM, SAM, SOM)
            <button
              className="market__size"
              onMouseEnter={() => {
                setHover(true);
              }}
              onMouseLeave={() => {
                setHover(false);
              }}
            >
              ?
            </button>
          </h2>
        </div>

        <div className="row container market-size">
          <div className="tam__sam__som">
            <div className="tam">
              <div>
                <div>TAM - in$USD</div>
                <div className="tam_sam_som_box">
                  <span style={{ color: 'black' }}>{data.TAM}</span>
                </div>
              </div>
            </div>
            <div className="sam">
              <div
                style={{
                  flex: '1',
                  backgroundColor: '#3131ab',
                  margin: '20px',
                }}
              >
                <div>SAM</div>
                <div className="tam_sam_som_box">
                  <span style={{ color: 'black' }}>{data.SAM}</span>
                </div>
              </div>
            </div>
            <div className="sam">
              <div
                style={{
                  flex: '1',
                  backgroundColor: '#3131ab',
                  margin: '20px',
                }}
              >
                <div>SOM</div>
                <div className="tam_sam_som_box">
                  <span style={{ color: 'black' }}>{data.SOM}</span>
                </div>
              </div>
            </div>
          </div>

          {hover && (
          <div className="row container tam-sam-som-info">
            <div style={{ fontWeight: 'bold', color: 'black' }}>
              What is TAM, SAM,SOM?
            </div>
            <div>
              <span className="tam-sam-som-text">TAM- </span>
              <span>
                Total available market. The total market for your product
              </span>
            </div>
            <div>
              <span className="tam-sam-som-text">SAM-</span>

              <span>
                Serviceable available market. Subset of you TAM, the portion
                of the market you can acquire
              </span>
            </div>
            <div>
              <span className="tam-sam-som-text">SOM-</span>
              <span>
                Service Obtainable Market Subset of your SAM that you will
                realistically get to use your product
              </span>
            </div>
            <div className="tam-sam-som-buttons">
              <button>Learn more</button>
              <button
                onClick={() => {
                  setHover(false);
                }}
              >
                Got it
              </button>
            </div>
          </div>
          )}
        </div>
        <div className="row container">
          <h2 className="right__topic mb-3 mt-1">
            Market Size Justification
          </h2>
        </div>
        <div className="row container">
          <h2 className="right__description">
            Market Size Justification Lorem ipsum dolor sit amet, consectetur
            adipiscing elit. Etiam orci sapien, tempus sed dictum vitae,
            vulputate sed arcu. Integer non nulla suscipit, sodales purus non,
            elementum ipsum. Nunc eget ligula pharetra est laoreet finibus vel
          </h2>
        </div>
        <div className="row container">
          <h2 className="right__topic mb-3 mt-1">Roadmap</h2>
        </div>
        <div style={{ display: 'flex', position: 'relative' }}>
          {roadmap.map((r, i) => (
            <StartupRoadmap
              item={r}
              index={i}
              key={i}
              setHoverRoadMap={setHoverRoadMap}
              hoverRoadMap={hoverRoadMap}
              milestones={data.milestone}
            />
          ))}
        </div>
      </div>

      <div className="row right__container">
        <div className="container p-4">
          <h2 className="right__topic mb-3 mt-1">Related startups</h2>
          <div>
            <Swiper {...params} grabCursor>
              {startups.map((d, i) => (
                <div className="item" key={i}>
                  <FeaturedInfoCard data={d} />
                </div>
              ))}
            </Swiper>
          </div>
        </div>
      </div>
    </div>
  );
};
export default StartupRightBar;
