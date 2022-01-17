import React, {
  useCallback, useEffect, useRef, useState,
} from 'react';
import $ from 'jquery';

const randomNames = [
  'James',
  'Koyer',
  'Ibukun',
  'Random',
  'Human',
  'Rice',
  'Chao',
  'Malin',
  'Sam',
  'Hueges',
  'Tom',
  'Holland',
  'jennifer',
  'Bukola',
  'Rita',
  'Stevey',
  'Leo',
  'Micheal',
  'Matt',
  'Davey',
  'Lee',
  'Homie',
  'Coder',
  'Creative',
  'Const',
  'Timmy',
  'Femi',
  'Tobi',
  'Gamer',
  'Peter',
  'Lois',
  'Lola',
  'Adeola',
  'Kane',
  'Usain',
  'Biggs',
  'Oliver',
  'Naija',
  'Naomi',
];
const randomLocation = [
  'Lagos, Nigeria',
  'Accra, Ghana',
  'Tokyo, Japan',
  'Maryland, United states',
  'Clarke County, Alabama',
  'Northwest Arctic Borough, Alaska',
  'Graham County, Arizona',
  'Hempstead County, Arkansas',
  'Kern County, California',
  'Jefferson County, Colorado',
  'Sussex County, Delaware',
  'Hardee County, Florida',
  'Palm Beach County, Florida',
  'Gordon County, Georgia',
  'Maui County, Hawaii',
];
const randomImages = [
  'https://minorityprogrammers.com/assets/images/taylor.svg',
  'https://minorityprogrammers.com/assets/images/SEEF.svg',
  'https://minorityprogrammers.com/assets/images/sarah.svg',
  'https://minorityprogrammers.com/assets/images/yixuan.svg',
  'https://minorityprogrammers.com/assets/images/fahad.svg',
  'https://minorityprogrammers.com/assets/images/wesley.svg',
  'https://minorityprogrammers.com/assets/images/Kaleb.svg',
  'https://minorityprogrammers.com/assets/images/vishal.svg',
  'https://minorityprogrammers.com/assets/images/Jose.svg',
  'https://minorityprogrammers.com/assets/images/shengqi.svg',
  'https://minorityprogrammers.com/assets/images/Yudi.svg',
  'https://minorityprogrammers.com/assets/images/SEEF.svg',
  'https://minorityprogrammers.com/assets/images/Bryanna.svg',
];
const testimonialText = 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis voluptatem eveniet delectus hic molestiae saepe expedita rem eum libero excepturi totam odit tempora porro asperiores eius, tempore explicabo reprehenderit culpa.';

const Testimonials = ({ homeClass, mode }) => {
  const [randomTestimony, setRandomTestimony] = useState([]);
  const containerRef = useRef();
  const uniqueKey = useRef(0);
  const interval = useRef();
  const userCardWidth = useRef(parseInt($('body').css('--testimonialWidth')));

  function newKey() {
    uniqueKey.current += 1;
    return uniqueKey.current;
  }

  const randomize = useCallback(() => {
    function oneHotEncode(number) {
      let counter = number;
      const retArr = [];
      for (let i = 0; i < 5; i += 1) {
        counter -= 1;
        retArr.push(counter >= 0 ? 1 : Math.abs(counter) < 1 ? 0.5 : 0);
      }
      return retArr;
    }
    let updateArray = [...randomTestimony];
    updateArray = updateArray.filter((testimony) => {
      if (testimony.markdown === true) {
        return false;
      }
      const shouldmarkDown = Math.floor(Math.random() * 2);
      if (shouldmarkDown) testimony.markdown = true;
      return true;
    });

    if (updateArray.length <= 10) {
      const maxRandom = 5;
      const containerWidth = $(containerRef.current).width();
      const containerHeight = $(containerRef.current).height();
      const widthOfCard = userCardWidth.current;
      const heightOfCard = parseInt($('body').css('--testimonialMaxHeight'));
      const numberOfNew = Math.floor(Math.random() * maxRandom) + 1;
      for (let i = 0; i < numberOfNew; i += 1) {
        const newObj = {
          firstName:
            randomNames[Math.floor(Math.random() * randomNames.length)],
          lastName: randomNames[Math.floor(Math.random() * randomNames.length)],
          testimonial: testimonialText,
          location:
            randomLocation[Math.floor(Math.random() * randomLocation.length)],
          stars: oneHotEncode(Math.floor(Math.random() * 6)),
          top: Math.floor(Math.random() * (containerHeight - heightOfCard)),
          left: Math.floor(Math.random() * (containerWidth - widthOfCard)),
          image: randomImages[Math.floor(Math.random() * randomImages.length)],
          markdown: false,
        };
        updateArray.push(newObj);
      }
      setRandomTestimony(updateArray);
    }
  }, [randomTestimony]);

  useEffect(() => {
    randomize();
  }, []);
  useEffect(() => {
    interval.current = setInterval(randomize, 5000);
    const resize = () => {
      setRandomTestimony([]);
      randomize();
    };
    $(window).on('resize', resize);

    return () => {
      clearInterval(interval.current);
      $(window).off('resize', resize);
    };
  }, [randomize]);

  return (
    <div className={`${homeClass.testimonials} ${homeClass[`${mode}Mode`]}`}>
      <h1>Testimonials</h1>
      <div className={homeClass.testimonialsSpace} ref={containerRef}>
        {randomTestimony.map((index) => {
          const {
            firstName,
            lastName,
            testimonial,
            location,
            stars,
            top,
            left,
            image,
            markdown,
          } = index;
          return (
            <div
              className={`${homeClass.testimonialsCard} ${
                markdown
                  ? homeClass.testimonyCardAnimateOut
                  : homeClass.testimonyCardAnimateIn
              }`}
              style={{ left, top }}
              key={newKey()}
            >
              <section className={homeClass.testimonialDets}>
                <div className={homeClass.testimonialUserImageWrap}>
                  <div className={homeClass.testimonialUserImage}>
                    <img src={image} alt="user display" />
                  </div>
                </div>
                <div className={homeClass.testimonial}>
                  <div className={homeClass.testimonialCardHeader}>
                    <span className={homeClass.testimonialFirstName}>
                      {firstName}
                    </span>
                    {' '}
                    <span className={homeClass.testimonialLastName}>
                      {lastName}
                    </span>
                  </div>
                  <p className={homeClass.testimonialCardDet}>{testimonial}</p>
                </div>
              </section>
              <section className={homeClass.testimonialsLocation}>
                <i className="fa fa-map-marker" aria-hidden="true" />
                &emsp;
                {location}
              </section>
              <section className={homeClass.testimonialsRating}>
                <div className={homeClass.testimonialWrapStars}>
                  {stars.map((star, idx) => {
                    if (star === 1) {
                      return (
                        <i
                          className={`fa fa-star ${homeClass.testimonialStar}`}
                          key={`${`star${idx}`}`}
                        />
                      );
                    }
                    if (star === 0) {
                      return (
                        <i
                          className={`fa fa-star-o ${homeClass.testimonialStar}`}
                          key={`${`star${idx}`}`}
                          aria-hidden="true"
                        />
                      );
                    }
                    if (star === 0.5) {
                      return (
                        <i
                          className={`fa fa-star-half-o ${homeClass.testimonialStar}`}
                          key={`${`star${idx}`}`}
                          aria-hidden="true"
                        />
                      );
                    }
                    return <span />;
                  })}
                </div>
              </section>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Testimonials;
