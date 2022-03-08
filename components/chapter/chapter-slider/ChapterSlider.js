import React, { useState, useEffect } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import styles from './slider.module.css';

const ChapterSlider = ({ locations: data }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [sliderRef, setSliderRef] = useState(null);
  const [locations, setLocations] = useState(data);

  useEffect(() => {
    setLocations(data);
  }, [data]);
  // Slider Settings
  const slidesToShow = 3;
  const slidesPerRow = 2;
  const totalSlides = slidesToShow * slidesPerRow;
  const pagination = Math.ceil(locations.length / totalSlides);
  const conditionalInfinite = {
    arrows: false,
    dots: false,
    className: 'chapter__slick-slider',
    speed: 2000,
    slidesToShow,
    slidesPerRow,
    infinite: locations.length > totalSlides,
    autoplay: false,
    slidesToScroll: 1,
    afterChange: (current) => { if (current <= pagination) { setCurrentIndex(current); } },
    responsive: [
      {
        breakpoint: 1755,
        settings: {
          slidesToShow: 3,
          infinite: locations.length > totalSlides,
        },
      },
      {
        breakpoint: 1180,
        settings: {
          slidesToShow: 1,
          infinite: locations.length > 1,
        },
      },
    ],
  };
  const searchHandler = (e) => {
    const filterLocation = data.filter(
      (location) => location.location.toLowerCase().includes(e.target.value.toLowerCase())
      || location.LocationName.toLowerCase().includes(e.target.value.toLowerCase())
      ,
    );
    setLocations(filterLocation);
  };
  console.log(locations);
  return (
    <div className="container">
      <div className={styles.title}>
        All Chapters
      </div>
      <div className={styles.text}>
        Search and select a chapter to find out more
      </div>
      <div className={styles.serchBar}>
        <div>
          <input type="text" onChange={searchHandler} placeholder="Search by Location, School etc." />
        </div>
        <a>Search</a>
      </div>
      {locations?.length ? (

        <>
          <Slider ref={setSliderRef} {...conditionalInfinite}>
            {locations.map(
              (location) => (
                <div key={location._id} className={styles.cardContainer}>
                  <div className={styles.imgWrapper}>
                    <img src="/assets/images/chapter/locationDemo.png" alt="location-img" />
                  </div>
                  <div className={styles.universityName}>
                    <img src="/assets/images/chapter/mpa-logo.png" alt="MPA logo" />
                    <p>{location.location}</p>
                  </div>
                  <div className={styles.description}>
                    {location.description}

                  </div>
                  <div className={styles.detail}>
                    <div className="tw-flex tw-justify-between tw-mb-4">
                      <div>
                        <h2>Chapter Leader</h2>
                        <p>{location.chapter_leader}</p>
                      </div>
                      <div>
                        <h2>Member Size</h2>
                        <p style={{ width: 'fit-content' }} className="tw-ml-auto">{location.member_size}</p>
                      </div>
                    </div>
                    <div>
                      <h2>Chapter Type</h2>
                      <p>{location.chapter_type}</p>
                    </div>
                  </div>
                  <div className={styles.btnRow}>
                    <a>Join Chapter</a>
                    <p>Learn More</p>
                  </div>
                </div>
              ),
            )}
          </Slider>
          <div style={{ justifyContent: 'center' }} className="profile-projects-controllers">
            <div className={styles.sliderController}>
              <img onClick={sliderRef?.slickPrev} style={{ transform: 'rotate(180deg)' }} src="/assets/images/arrow-righ-circle.svg" alt="control" />
              <p>
                {locations.length > 0
                  ? `${currentIndex + 1}/${pagination}` : '1/1'}
              </p>
              <img onClick={sliderRef?.slickNext} src="/assets/images/arrow-righ-circle.svg" alt="control" />
            </div>
          </div>
        </>

      ) : (
        <span className="note tw-text-white tw-m-4 tw" style={{ cursor: 'default' }}>
          No Chapters yet
        </span>
      )}

    </div>
  );
};

export default ChapterSlider;
