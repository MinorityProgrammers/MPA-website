import React from "react";
import Link from 'next/link';
import ServicesCard from "../components/ServicesCard";
import Swiper from "react-id-swiper";
import "swiper/css/swiper.css";


const ServicesTiles = () => {
  const params = {
    slidesPerView: 5,
    loop: true,
    speed: 1000,
    spaceBetween: 30,
    autoplay: {
      delay: 3000,
      disableOnInteraction: false,
    },

    // Responsive breakpoints
    breakpoints: {
      1024: {
        slidesPerView: 5,
      },
      768: {
        slidesPerView: 4,
      },
      640: {
        slidesPerView: 3,
      },
      320: {
        slidesPerView: 2,
      },
    },
  };

     const ServicesTile = [
        {classNameOne: "course-category-two__single color-1", icon: "kipso-icon-manager", serviceLink: "/services#education", tileName: "Mentorship"},
        {classNameOne: "course-category-two__single color-2", icon: "kipso-icon-knowledge", serviceLink: "/services#education", tileName: "Education"},
        {classNameOne: "course-category-two__single color-3", icon: "kipso-icon-strategy", serviceLink: "/services#consultacy", tileName: "Consultancy"},
        {classNameOne: "course-category-two__single color-4", icon: "kipso-icon-email", serviceLink: "/services#onboarding", tileName: "Job Placement"},
        {classNameOne: "course-category-two__single color-5", icon: "kipso-icon-training", serviceLink: "/services#training", tileName: "Career Development"},
        {classNameOne: "course-category-two__single color-6", icon: "kipso-icon-programming", serviceLink: "/services#onboarding", tileName: "Software Products"}         
      ];

  return (
    <section className="course-category-two">
      <div className="container text-center">
        <div className="inner-container">
          <div className="block-title text-center">
            <h2 className="block-title__title"> Services</h2>
          </div>
          <div className="course-category-two__carousel">
            <Swiper {...params} >
            {ServicesTile.map((services, index) => ( 
              <div className="swiper-slide" key={index}>
              <ServicesCard  item={services} key={index}/>
                </div>
                ))}
            </Swiper>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesTiles;
