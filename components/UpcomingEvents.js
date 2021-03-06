import React from 'react';
import Swiper from 'react-id-swiper';
import 'swiper/css/swiper.css';
import EventCard from './Events/EventCard';

const UpcomingEvents = () => {
  const Events = [
    {
      imgSrc: '/assets/images/DefiSummerAnimation.gif',
      catName: 'Workshop',
      eventName: 'How to Integrate Web3 Wallets',
      time: 'Tuesday, June 22nd, 2021 3PM EST',
      eventLink: 'http://discord.gg/TAmSpBvmR2',
      actionLink: 'http://discord.gg/TAmSpBvmR2',
      callToAction: 'Join Discord',
    },
    {
      imgSrc: '/assets/images/DefiSummerAnimation.gif',
      catName: 'Workshop',
      eventName: 'Blockchain Consultancy Case Study',
      time: 'Wednesday, June 23rd, 2021 6PM EST',
      eventLink: 'http://discord.gg/TAmSpBvmR2',
      actionLink: 'http://discord.gg/TAmSpBvmR2',
      callToAction: 'Join Discord',
    },
    {
      imgSrc: '/assets/images/DefiSummerAnimation.gif',
      catName: 'Hackathon',
      eventName: '#DefiSummer',
      time: 'All Summer',
      eventLink: 'https://defisummer.org/',
      actionLink: 'https://defi.devpost.com/',
      callToAction: 'Sign Up',
    },
    {
      imgSrc: '/assets/images/defiwinter.png',
      catName: 'Hackathon',
      eventName: '#DefiWinter',
      time: 'Nov-Feb',
      eventLink: 'https://winter.devpost.com/',
      actionLink: 'https://winter.devpost.com/',
      callToAction: 'Sign Up',
    },
  ];
  return (
    <div>
      <section className="course-one__top-title home-one">
        <div className="container">
          <div className="block-title mb-0">
            <h2 className="block-title__title">
              Our
              <br />
              Events
            </h2>
          </div>
        </div>
        <div className="course-one__top-title__curve" />
      </section>

      <section className="course-one course-one__teacher-details home-one">
        <div className="container">
          <div className="course-one__carousel">
            <Swiper>
              {Events.map((events) => (
                <EventCard item={events} key={events.eventName} />
              ))}
            </Swiper>
          </div>
        </div>
      </section>
    </div>
  );
};
export default UpcomingEvents;
