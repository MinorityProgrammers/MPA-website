import React from "react";
import Swiper from "react-id-swiper";
import "swiper/css/swiper.css";
import PrinciplesCard from "./PrinciplesCard";

const Principles = () => {
  const params = {
    slidesPerView: 6,
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
        slidesPerView: 6,
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
       const PrinciplesTile = [
        {category: "course-category-one__single color-1", icon: "kipso-icon-desktop", link: "/principle-diversity", name: "Mentorship"},
        {category: "course-category-one__single color-2", icon: "kipso-icon-programming", link: "#", name: "Software Engineering"},
        {category: "course-category-one__single color-3", icon: "kipso-icon-health", link: "#", name: "Interdisciplinary Learning"},
        {category: "course-category-one__single color-4", icon: "kipso-icon-strategy", link: "#", name: "Project Based Learning"},
        {category: "course-category-one__single color-5", icon: "kipso-icon-magnifying-glass", link: "#", name: "Activating Passions"},
        {category: "course-category-one__single color-6", icon: "kipso-icon-training", link: "#", name: "Training/Onboarding"},         
        {category: "course-category-one__single color-1", icon: "kipso-icon-contact", link: "#", name: "Job Placement"},         
        {category: "course-category-one__single color-2", icon: "kipso-icon-knowledge", link: "#", name: "Entrepreneurship"},         
        {category: "course-category-one__single color-3", icon: "kipso-icon-music-player", link: "#", name: "Innovation"},         
        {category: "course-category-one__single color-4", icon: "kipso-icon-human-resources", link: "#", name: "Professional Development"},         
        {category: "course-category-one__single color-5", icon: "kipso-icon-manager", link: "#", name: "Sense of Community"},         
        {category: "course-category-one__single color-6", icon: "kipso-icon-professor", link: "#", name: "Mentorship"},         
        {category: "course-category-one__single color-1", icon: "kipso-icon-targeting", link: "#", name: "Humanitarian Focused"}         
      ];

  return (
    <section className="thm-gray-bg course-category-one">
      <div className="container-fluid text-center">
        <div className="block-title text-center">
          <h2 className="block-title__title">
            Our Core
            <br />
            Principles
          </h2>
        </div>
        <div className="course-category-one__carousel">
          <Swiper {...params} >
            {PrinciplesTile.map((principles, index) => ( 
              <div className="swiper-slide" key={index}>
              <PrinciplesCard  item={principles} key={index}/>
                </div>
                ))}
            </Swiper>
        </div>

        <a href="/services" className="thm-btn">
          See Our Services
        </a>
      </div>
    </section>
  );
};
export default Principles;
